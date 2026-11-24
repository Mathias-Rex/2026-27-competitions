#!/usr/bin/env python3
"""PDF intake: inputs/*.pdf -> data/*.md + downloads/*.pdf + SHA-256 ujjlenyomat a memory fájlban.

Parancsok (a projekt gyökeréből futtatva):
  scan       Ha az inputs/ mappában nincs PDF, nem csinál semmit. Különben az új PDF-ekből Markdownt
             készít a data/ mappába. A PDF-et még NEM mozgatja. A már feldolgozott tartalmú
             másolatokat az inputs/_duplicates/ mappába teszi (nem töröl semmit).
  mark --comp ID [--title T --desc D] F...
             A PDF-eket átmozgatja az inputs/-ból a downloads/-ba, rögzíti az SHA-256 ujjlenyomatot és a
             versenyt (ID a js/data.js versenyeinek id-ja, vagy "altalanos") a memory fájlban, majd
             automatikusan frissíti a js/downloads.js letöltési adatait (versenyenkénti kártyák).
  assign --comp ID F...
             Már feldolgozott PDF versenyhez rendelésének módosítása (eredeti fájlnév alapján).
  describe F --title T --desc D
             Egy feldolgozott PDF oldalon megjelenő címének és ismertetőjének beállítása/módosítása.
  sync-html  A letöltési adatok újragenerálása a js/downloads.js jelölői között (a mark ezt maga is hívja).
  status     A memory fájl tartalmának kiírása.

Csak a Python standard könyvtárat és a PyMuPDF-et (import pymupdf) használja.
"""
import argparse
import datetime as dt
import hashlib
import html
import json
import re
import shutil
import statistics
import sys
import unicodedata
from pathlib import Path

START = "/* PDF-DOWNLOADS:START */"
END = "/* PDF-DOWNLOADS:END */"
MEMORY_NAME = "pdf-intake-fingerprints"
HEADER_COLS = "| sha256 | eredeti fájlnév | PDF (downloads/) | Markdown (data/) | verseny | cím | ismertető | feldolgozva |"
DUP_DIR = "_duplicates"
GENERAL = "altalanos"


# ------------------------------------------------------------------ segédek
def sha256_of(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def slugify(name: str) -> str:
    s = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
    s = re.sub(r"[^A-Za-z0-9]+", "-", s).strip("-").lower()
    return s or "dokumentum"


def slug_for(pdf: Path, h: str, man: dict) -> str:
    """Determinisztikus slug: ütközésnél (más tartalom, ugyanaz a név) az ujjlenyomat eleje kerül mögé."""
    base = slugify(pdf.stem)
    taken = {Path(v["download"]).stem for k, v in man.items() if k != h}
    return f"{base}-{h[:8]}" if base in taken else base


def main_worktree_root(root: Path) -> Path:
    """A fő munkamappa (git worktree esetén is): a memory fájl így minden worktree-nek közös."""
    import subprocess
    try:
        out = subprocess.run(["git", "-C", str(root), "rev-parse", "--path-format=absolute", "--git-common-dir"],
                             capture_output=True, text=True, check=True).stdout.strip()
        return Path(out).parent
    except Exception:
        return root


def default_memory_path(root: Path) -> Path:
    slug = re.sub(r"[^A-Za-z0-9]", "-", str(main_worktree_root(root).resolve()))
    return Path.home() / ".claude" / "projects" / slug / "memory" / f"{MEMORY_NAME}.md"


def clean(text: str) -> str:
    """Táblacellába szánt szöveg: nincs sortörés és függőleges vonal."""
    return re.sub(r"\s+", " ", (text or "").replace("|", "/")).strip()


def unique_path(p: Path) -> Path:
    if not p.exists():
        return p
    i = 2
    while True:
        q = p.with_name(f"{p.stem}-{i}{p.suffix}")
        if not q.exists():
            return q
        i += 1


def html_competitions(page: Path) -> list:
    """A versenyek (js/data.js) id / név / szín értékei, a megadás sorrendjében."""
    src = page.read_text(encoding="utf-8")
    pat = r"id:\s*'([a-z0-9-]+)',\s*name:\s*'(?:[^'\\]|\\.)*',\s*shortName:\s*'((?:[^'\\]|\\.)*)'"
    out = []
    for m in re.finditer(pat, src):
        color = re.search(r"color:\s*'(#[0-9A-Fa-f]{6})'", src[m.end():])
        out.append({
            "id": m.group(1),
            "name": m.group(2).replace("\\'", "'"),
            "color": color.group(1) if color else "#64748B",
        })
    return out


def check_comp(a, comp: str) -> str:
    ids = [c["id"] for c in html_competitions(Path(a.root) / a.data_js)] + [GENERAL]
    if comp not in ids:
        sys.exit(f"Ismeretlen verseny: {comp!r}. Választható: {', '.join(ids)}")
    return comp


# ------------------------------------------------------------------ memory fájl
def load_manifest(mem: Path) -> dict:
    """sha256 -> {name, download, markdown, comp, title, desc, done}"""
    out = {}
    if not mem.exists():
        return out
    for line in mem.read_text(encoding="utf-8").splitlines():
        if not re.match(r"^\|\s*[0-9a-f]{64}\s*\|", line):
            continue
        c = [x.strip() for x in line.strip().strip("|").split("|")]
        if len(c) == 5:  # régi formátum: nincs verseny
            c.insert(4, GENERAL)
        if len(c) == 6:  # régi formátum: nincs cím és ismertető
            c[5:5] = ["", ""]
        if len(c) == 8:
            out[c[0]] = {"name": c[1], "download": c[2], "markdown": c[3], "comp": c[4],
                         "title": c[5], "desc": c[6], "done": c[7]}
    return out


def save_manifest(mem: Path, man: dict) -> None:
    mem.parent.mkdir(parents=True, exist_ok=True)
    rows = "\n".join(
        f"| {h} | {v['name']} | {v['download']} | {v['markdown']} | {v['comp']} | {clean(v['title'])} | {clean(v['desc'])} | {v['done']} |"
        for h, v in sorted(man.items(), key=lambda kv: kv[1]["name"].lower())
    )
    text = f"""---
name: {MEMORY_NAME}
description: A pdf-intake skill által már feldolgozott PDF-ek SHA-256 ujjlenyomata; ami itt szerepel, azt nem kell újra feldolgozni
metadata:
  type: reference
---

A `pdf-intake` skill ezt a táblát olvassa és írja. Csak a `mark` / `assign` paranccsal módosítsd, kézzel ne.
Egy PDF akkor számít késznek, ha az ujjlenyomata (SHA-256) szerepel itt, a fájlnevétől függetlenül.

{HEADER_COLS}
|---|---|---|---|---|---|---|---|
{rows}
"""
    mem.write_text(text, encoding="utf-8")
    index = mem.parent / "MEMORY.md"
    pointer = f"- [PDF intake ujjlenyomatok]({mem.name}) — melyik inputs/*.pdf lett már feldolgozva (SHA-256)"
    cur = index.read_text(encoding="utf-8") if index.exists() else ""
    if mem.name not in cur:
        index.write_text(cur.rstrip("\n") + ("\n" if cur.strip() else "") + pointer + "\n", encoding="utf-8")


# ------------------------------------------------------------------ PDF -> Markdown
def pdf_to_markdown(pdf: Path):
    import pymupdf

    doc = pymupdf.open(pdf)
    sizes = []
    pages = []
    for page in doc:
        d = page.get_text("dict")
        pages.append(d)
        for b in d["blocks"]:
            for ln in b.get("lines", []):
                for sp in ln["spans"]:
                    if sp["text"].strip():
                        sizes.extend([round(sp["size"], 1)] * len(sp["text"].strip()))
    if not sizes:
        return "", len(doc), False
    body = statistics.median(sizes)

    out = []
    for pno, d in enumerate(pages, 1):
        out.append(f"\n<!-- oldal {pno} -->\n")
        blocks = [b for b in d["blocks"] if b.get("lines")]
        blocks.sort(key=lambda b: (round(b["bbox"][1] / 4), b["bbox"][0]))
        for b in blocks:
            lines = []
            for ln in b["lines"]:
                txt = "".join(sp["text"] for sp in ln["spans"]).strip()
                if not txt:
                    continue
                size = max(sp["size"] for sp in ln["spans"])
                bold = all((sp["flags"] & 16) or "bold" in sp["font"].lower()
                           for sp in ln["spans"] if sp["text"].strip())
                lines.append((txt, size, bold))
            if not lines:
                continue
            size = max(s for _, s, _ in lines)
            joined = re.sub(r"\s+", " ", " ".join(t for t, _, _ in lines))
            if size >= body * 1.6 and len(joined) < 160:
                out.append(f"# {joined}\n")
            elif size >= body * 1.25 and len(joined) < 160:
                out.append(f"## {joined}\n")
            elif all(b_ for _, _, b_ in lines) and len(joined) < 100:
                out.append(f"### {joined}\n")
            else:
                para = "\n".join(
                    re.sub(r"^[•●▪◦–·]\s*", "- ", t) if re.match(r"^[•●▪◦·]\s*", t) else t
                    for t, _, _ in lines
                )
                out.append(para + "\n" if any(l.startswith("- ") for l in para.split("\n")) else joined + "\n")
    text = re.sub(r"\n{3,}", "\n\n", "\n".join(out)).strip() + "\n"
    has_text = len(re.sub(r"<!--.*?-->|\s", "", text)) > 80
    return text, len(doc), has_text


# ------------------------------------------------------------------ parancsok
def cmd_scan(a):
    root = Path(a.root)
    inputs = root / a.inputs
    pdfs = sorted(inputs.glob("*.pdf"), key=lambda p: p.name.lower()) if inputs.is_dir() else []
    if not pdfs:
        print(json.dumps({"status": "nothing_to_do", "message": "Az inputs mappában nincs PDF, nincs teendő."},
                         ensure_ascii=False))
        return
    man = load_manifest(a.memory)
    data_dir = root / a.data
    data_dir.mkdir(parents=True, exist_ok=True)
    report, seen = [], {}
    for pdf in pdfs:
        h = sha256_of(pdf)
        entry = {"file": pdf.name, "sha256": h}
        if h in man or h in seen:
            dup_dir = inputs / DUP_DIR
            dup_dir.mkdir(exist_ok=True)
            shutil.move(str(pdf), str(unique_path(dup_dir / pdf.name)))
            entry["status"] = "duplicate"
            entry["same_as"] = man[h]["name"] if h in man else seen[h]
            entry["note"] = f"azonos tartalom, áthelyezve: inputs/{DUP_DIR}/"
        else:
            seen[h] = pdf.name
            slug = slug_for(pdf, h, man)
            try:
                text, pages, has_text = pdf_to_markdown(pdf)
            except Exception as e:  # sérült / jelszavas PDF
                text, pages, has_text = "", 0, False
                entry["error"] = str(e)
            md_path = data_dir / f"{slug}.md"
            md_path.write_text(f"<!-- forrás: {pdf.name} | sha256: {h} -->\n\n{text}", encoding="utf-8")
            entry.update(
                status="new",
                markdown=str(md_path.relative_to(root)).replace("\\", "/"),
                pages=pages,
                chars=len(text),
                needs_visual_read=not has_text,
            )
        report.append(entry)
    comps = [c["id"] for c in html_competitions(root / a.data_js)] + [GENERAL]
    print(json.dumps({"memory": str(a.memory), "competitions": comps, "files": report},
                     ensure_ascii=False, indent=2))


def cmd_mark(a):
    comp = check_comp(a, a.comp)
    if (a.title or a.desc) and len(a.files) != 1:
        sys.exit("--title / --desc csak egyetlen fájl mellett adható meg (több fájlnál használd utólag a describe parancsot).")
    root = Path(a.root)
    man = load_manifest(a.memory)
    today = dt.date.today().isoformat()
    dl_dir, data_dir = root / a.downloads, root / a.data
    for name in a.files:
        pdf = root / a.inputs / name
        if not pdf.exists():
            sys.exit(f"Nincs ilyen fájl: {pdf}")
        h = sha256_of(pdf)
        if h in man:
            sys.exit(f"Már rögzített tartalom: {name} (futtasd a scan-t, az a duplikátumot félreteszi)")
        slug = slug_for(pdf, h, man)
        if not (data_dir / f"{slug}.md").exists():
            sys.exit(f"Hiányzik a Markdown: {data_dir / (slug + '.md')} (futtasd előbb a scan-t)")
        dl_dir.mkdir(parents=True, exist_ok=True)
        dest = unique_path(dl_dir / f"{slug}.pdf")
        shutil.move(str(pdf), str(dest))
        man[h] = {"name": name, "download": dest.name, "markdown": f"{slug}.md", "comp": comp, "title": clean(a.title), "desc": clean(a.desc), "done": today}
        save_manifest(a.memory, man)  # fájlonként mentünk, hogy megszakadásnál se vesszen el
        print(f"kész: {name} -> {a.downloads}/{dest.name}, {a.data}/{slug}.md, verseny: {comp} ({h[:12]}…)")
    cmd_sync_html(a)


def cmd_assign(a):
    comp = check_comp(a, a.comp)
    man = load_manifest(a.memory)
    for name in a.files:
        hits = [h for h, v in man.items() if name in (v["name"], v["download"])]
        if not hits:
            sys.exit(f"Nincs ilyen feldolgozott fájl: {name}")
        for h in hits:
            man[h]["comp"] = comp
        print(f"{name} -> {comp}")
    save_manifest(a.memory, man)
    cmd_sync_html(a)


def cmd_describe(a):
    man = load_manifest(a.memory)
    hits = [h for h, v in man.items() if a.file in (v["name"], v["download"])]
    if not hits:
        sys.exit(f"Nincs ilyen feldolgozott fájl: {a.file}")
    for h in hits:
        if a.title is not None:
            man[h]["title"] = clean(a.title)
        if a.desc is not None:
            man[h]["desc"] = clean(a.desc)
    save_manifest(a.memory, man)
    print(f"{a.file}: {man[hits[0]]['title']!r} / {man[hits[0]]['desc']!r}")
    cmd_sync_html(a)


def cmd_sync_html(a):
    """A letöltési adatok (DOWNLOADS) újragenerálása a js/downloads.js jelölői között."""
    root = Path(a.root)
    page = root / a.html
    src = page.read_text(encoding="utf-8")
    if START not in src or END not in src:
        sys.exit(f"Hiányzik a {START} / {END} jelölő az {a.html} fájlból.")
    man = load_manifest(a.memory)
    groups = [(c["id"], c["name"], c["color"]) for c in html_competitions(root / a.data_js)]
    groups.append((GENERAL, "Általános dokumentumok", "#64748B"))
    known = {g[0] for g in groups}
    out, total = [], 0
    for cid, cname, color in groups:
        docs = [v for v in man.values()
                if (v["comp"] if v["comp"] in known else GENERAL) == cid
                and (root / a.downloads / v["download"]).exists()]
        if not docs:
            continue
        items = []
        for v in sorted(docs, key=lambda v: v["name"].lower()):
            f = root / a.downloads / v["download"]
            title = v["title"] or re.sub(r"\s*\(\d+\)$", "", Path(v["name"]).stem).replace("_", " ").strip()
            items.append({
                "title": title,
                "desc": v["desc"] or "",
                "href": f'{a.downloads}/{v["download"]}',
                "size": max(1, round(f.stat().st_size / 1024)),
            })
            total += 1
        out.append({"id": cid, "name": cname, "color": color, "docs": items})
    data = json.dumps(out, ensure_ascii=False, indent=2)
    block = START + "\nconst DOWNLOADS = " + data + ";\n" + END
    new = re.sub(re.escape(START) + r".*?" + re.escape(END), lambda _: block, src, flags=re.S)
    if new != src:
        page.write_text(new, encoding="utf-8")
    print(f"{a.html} letöltési adatok: {len(out)} kártya, {total} PDF")


def cmd_status(a):
    man = load_manifest(a.memory)
    print(f"memory: {a.memory} ({'van' if a.memory.exists() else 'még nincs'})")
    for h, v in man.items():
        print(f"{h[:12]}…  {v['done']}  [{v['comp']}]  {v['name']}  ->  {v['download']}, {v['markdown']}")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--root", default=".")
    p.add_argument("--inputs", default="inputs")
    p.add_argument("--downloads", default="downloads")
    p.add_argument("--data", default="data")
    p.add_argument("--html", default="js/downloads.js", help="a letöltési adatokat tartalmazó JS fájl")
    p.add_argument("--data-js", default="js/data.js", help="a versenyek adatait tartalmazó JS fájl")
    p.add_argument("--memory", type=Path, default=None)
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("scan")
    m = sub.add_parser("mark")
    m.add_argument("--comp", required=True, help="verseny id a js/data.js-ből, vagy altalanos")
    m.add_argument("--title", default="", help="rövid, olvasható cím az oldalra (egy fájlnál)")
    m.add_argument("--desc", default="", help="egymondatos ismertető az oldalra (egy fájlnál)")
    m.add_argument("files", nargs="+")
    asg = sub.add_parser("assign")
    asg.add_argument("--comp", required=True)
    asg.add_argument("files", nargs="+")
    d = sub.add_parser("describe")
    d.add_argument("file", help="eredeti fájlnév")
    d.add_argument("--title")
    d.add_argument("--desc")
    sub.add_parser("sync-html")
    sub.add_parser("status")
    a = p.parse_args()
    a.memory = a.memory or default_memory_path(Path(a.root))
    {"scan": cmd_scan, "mark": cmd_mark, "assign": cmd_assign, "describe": cmd_describe,
     "sync-html": cmd_sync_html, "status": cmd_status}[a.cmd](a)


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
