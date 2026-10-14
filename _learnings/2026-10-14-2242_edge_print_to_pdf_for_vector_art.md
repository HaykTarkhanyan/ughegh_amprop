# Headless Edge turns SVG into vector PDF for LaTeX, but each start-up is slow

LuaLaTeX cannot include SVG, and colour emoji fonts do not render reliably. Edge can print an
HTML page of `<img src="data:image/svg+xml;base64,...">` tags to PDF:

```
msedge --headless=new --disable-gpu --no-pdf-header-footer --user-data-dir=<profile>
       --print-to-pdf=<out.pdf> file:///<page.html>
```
with `@page{size:360px 360px;margin:0}` and `break-after:page` on each image.

Evidence: one Twemoji doughnut printed to a 3.8 KB PDF, `pdfimages -list` showed no raster
images, the background is transparent, and LaTeX includes a page with
`\includegraphics[page=N]`. The banner SVG (fonts embedded as base64 @font-face) printed with its
fonts embedded.

**Cost**: each Edge start-up took 20-80 s on 2026-10-14 (24 s for a single emoji, then 40-80 s per
call while the machine was loaded). Hence `build_art.py` puts all 144 emoji in one multi-page PDF
and checks the page count with `pdfinfo` afterwards, so a dropped page fails the build.

The Edge processes that show in Task Manager outside builds are Hayk's own browser
(`--no-startup-window` startup boost), not hung headless runs; check command lines with
`Get-CimInstance Win32_Process -Filter "Name='msedge.exe'"` before killing anything.
