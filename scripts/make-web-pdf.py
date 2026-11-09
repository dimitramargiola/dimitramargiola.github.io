"""Builds the web edition of the portfolio PDF (see README, "The original PDF").

  python scripts/make-web-pdf.py <master.pdf> <out.pdf> [dpi_threshold=400] [dpi_target=300] [jpeg_quality=90]

1. Removes Illustrator's private editing data (/PieceInfo), which viewers never display.
2. Re-encodes only images stored above `dpi_threshold`, down to `dpi_target`.
Text, vectors and page layout are not touched. Requires PyMuPDF (pip install pymupdf).
"""
import os, sys, tempfile
import pymupdf

src, dst = sys.argv[1], sys.argv[2]
threshold, target, quality = (int(a) for a in (sys.argv[3:6] + ["400", "300", "90"][len(sys.argv[3:6]):]))

doc = pymupdf.open(src)
for page in doc:
    doc.xref_set_key(page.xref, "PieceInfo", "null")
doc.xref_set_key(doc.pdf_catalog(), "PieceInfo", "null")
tmp = os.path.join(tempfile.mkdtemp(), "stripped.pdf")
doc.save(tmp, garbage=4, deflate=True)
doc.close()

doc = pymupdf.open(tmp)
doc.rewrite_images(dpi_threshold=threshold, dpi_target=target, quality=quality,
                   lossy=True, lossless=True, bitonal=False, color=True, gray=True, set_to_gray=False)
doc.save(dst, garbage=4, deflate=True)
doc.close()
os.remove(tmp)
print(f"{dst}: {os.path.getsize(dst) / 1e6:.1f} MB, {pymupdf.open(dst).page_count} pages")
