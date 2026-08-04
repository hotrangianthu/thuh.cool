"""Render a bounded number of PDF pages for public Sa. Partners previews."""

from pathlib import Path
import sys

try:
    import fitz
except ImportError as error:
    raise SystemExit(
        "PyMuPDF is required. Install it with: python3 -m pip install --user -r scripts/requirements-sa-partners.txt"
    ) from error


if len(sys.argv) != 4:
    raise SystemExit("Usage: render-sa-partners-pdf.py INPUT.pdf OUTPUT_DIR PAGE_COUNT")

pdf_path = Path(sys.argv[1])
output_dir = Path(sys.argv[2])
page_count = int(sys.argv[3])
output_dir.mkdir(parents=True, exist_ok=True)

with fitz.open(pdf_path) as document:
    if len(document) != 26:
        raise SystemExit(f"Expected 26 PDF pages, found {len(document)} in {pdf_path.name}")
    if page_count < 1 or page_count > len(document):
        raise SystemExit(f"Invalid page count: {page_count}")

    for page_number in range(page_count):
        page = document.load_page(page_number)
        pixmap = page.get_pixmap(matrix=fitz.Matrix(1.6, 1.6), alpha=False)
        target = output_dir / f"slide-{page_number + 1:02d}.jpg"
        target.write_bytes(pixmap.tobytes(output="jpeg", jpg_quality=88))
