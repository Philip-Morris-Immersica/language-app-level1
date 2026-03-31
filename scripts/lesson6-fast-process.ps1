#Requires -Version 5.1
<#
  Lesson 6 — mechanical PDF steps 1.1–1.5 only (Main Book + Workbook).
  Requires on PATH: qpdf, pdftoppm, pdfimages (pdfimages = Poppler, same bundle as pdftoppm).

  Does NOT run cultural (1.6) or dictionary (1.7).

  Usage (from repo root, after installing tools):
    powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\lesson6-fast-process.ps1

  Optional parameters override paths if your files live elsewhere.
#>

[CmdletBinding()]
param(
    [string]$LessonRoot = 'C:\Users\Work Account\Desktop\CURSOR\a1-files\lessons\lesson-6',
    [string]$MainBookPdf = '',
    [string]$WorkbookPdf = '',
    [int]$MainBookFromPage = 56,
    [int]$MainBookToPage = 65,
    [int]$WorkbookPage = 17
)

$ErrorActionPreference = 'Stop'

function Assert-Tool {
    param([string]$Name)
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        Write-Error "Required tool not found on PATH: $Name. Install qpdf and Poppler (pdftoppm, pdfimages)."
    }
}

Assert-Tool qpdf
Assert-Tool pdftoppm
Assert-Tool pdfimages

if (-not $MainBookPdf) {
    $A1Root = (Resolve-Path (Join-Path $LessonRoot '..\..')).Path
    $MainBookPdf = Join-Path $A1Root 'A1-MAIN-BOOK.pdf'
}
if (-not $WorkbookPdf) {
    $A1Root = (Resolve-Path (Join-Path $LessonRoot '..\..')).Path
    $WorkbookPdf = Join-Path $A1Root 'a1-WORKBOOK-TESTS.pdf'
}

if (-not (Test-Path -LiteralPath $MainBookPdf)) { Write-Error "Main book not found: $MainBookPdf" }
if (-not (Test-Path -LiteralPath $WorkbookPdf)) { Write-Error "Workbook not found: $WorkbookPdf" }

$wholeDir = Join-Path $LessonRoot 'whole-lesson-PDF'
$splitDir = Join-Path $LessonRoot 'pages-to-seperate-pdfs'
$jpgDir = Join-Path $LessonRoot 'pdf-pages-to-images'
$extractDir = Join-Path $LessonRoot 'extracted-exercises -images'
$wbDir = Join-Path $LessonRoot 'Workbook-Lesson-exercises'

foreach ($d in @($wholeDir, $splitDir, $jpgDir, $extractDir, $wbDir)) {
    New-Item -ItemType Directory -Force -Path $d | Out-Null
}

$lessonPdf = Join-Path $wholeDir 'Main-Book-Lesson-6.pdf'

# --- 1.1 Extract pages Main Book ---
Write-Host "1.1 Extract pages $MainBookFromPage-$MainBookToPage -> Main-Book-Lesson-6.pdf"
& qpdf --empty --pages $MainBookPdf "$MainBookFromPage-$MainBookToPage" -- $lessonPdf

$pageCountStr = (& qpdf --show-npages $lessonPdf 2>&1) | Where-Object { $_ -match '^\d+$' } | Select-Object -Last 1
$pageCount = [int]$pageCountStr
if ($pageCount -ne ($MainBookToPage - $MainBookFromPage + 1)) {
    Write-Warning "Expected $(($MainBookToPage - $MainBookFromPage + 1)) pages in lesson PDF, got $pageCount"
}

# --- 1.2 Split one PDF per page ---
Write-Host '1.2 Split into single-page PDFs'
$splitPattern = Join-Path $splitDir 'split-%02d.pdf'
& qpdf --split-pages $lessonPdf $splitPattern
$splitFiles = Get-ChildItem -LiteralPath $splitDir -Filter 'split-*.pdf' | Sort-Object Name
$i = 1
foreach ($f in $splitFiles) {
    $dest = Join-Path $splitDir ("Main-Book-Lesson-6-{0}.pdf" -f $i)
    Move-Item -LiteralPath $f.FullName -Destination $dest -Force
    $i++
}

# --- 1.3 Full-page JPG 300 DPI ---
Write-Host '1.3 Render full pages to JPEG (300 DPI)'
$ppmBase = Join-Path $jpgDir 'A1-MAIN-BOOK-56-65-page'
& pdftoppm -jpeg -r 300 $lessonPdf $ppmBase
Get-ChildItem -LiteralPath $jpgDir -Filter 'A1-MAIN-BOOK-56-65-page-*.jpg' | Sort-Object Name | ForEach-Object {
    if ($_.Name -match 'page-0*(\d+)\.jpg$') {
        $n = [int]$Matches[1]
        $newName = ('A1-MAIN-BOOK-56-65-page-{0}.jpg' -f $n)
        if ($_.Name -ne $newName) {
            Rename-Item -LiteralPath $_.FullName -NewName $newName -Force -ErrorAction SilentlyContinue
        }
    }
}

# --- 1.4 Embedded images (pdfimages ships with Poppler, same as pdftoppm) ---
Write-Host '1.4 Extract embedded images per page'
Get-ChildItem -LiteralPath $extractDir -Directory -Filter 'page-*' -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
$rawDir = Join-Path $extractDir '_pdfimages_raw'
if (Test-Path -LiteralPath $rawDir) { Remove-Item -LiteralPath $rawDir -Recurse -Force }
New-Item -ItemType Directory -Force -Path $rawDir | Out-Null
$prefix = Join-Path $rawDir 'emb'
& pdfimages -j -p $lessonPdf $prefix

$imgFiles = @(Get-ChildItem -LiteralPath $rawDir -File | Sort-Object Name)
$rows = foreach ($file in $imgFiles) {
    if ($file.Name -match '^emb-(\d+)-(\d+)\.(?<ext>jpe?g|ppm|pbm|pgm|png)$') {
        [PSCustomObject]@{
            Page = [int]$Matches[1]
            Slot = [int]$Matches[2]
            Path = $file.FullName
            Ext  = $Matches['ext']
        }
    }
}
foreach ($g in ($rows | Group-Object Page)) {
    $pageNum = [int]$g.Name
    $pageFolder = Join-Path $extractDir ("page-{0}" -f $pageNum)
    New-Item -ItemType Directory -Force -Path $pageFolder | Out-Null
    $seq = 1
    foreach ($row in ($g.Group | Sort-Object Slot)) {
        $outExt = if ($row.Ext -match 'jpe?g') { 'jpg' } else { $row.Ext }
        $target = Join-Path $pageFolder ('img{0:00}.{1}' -f $seq, $outExt)
        Copy-Item -LiteralPath $row.Path -Destination $target -Force
        $seq++
    }
}

Remove-Item -LiteralPath $rawDir -Recurse -Force -ErrorAction SilentlyContinue

# --- 1.5 Workbook single page ---
Write-Host "1.5 Workbook page $WorkbookPage -> PDF + JPEG"
$wbPdf = Join-Path $wbDir 'Workbook-Lesson-6-page17.pdf'
& qpdf --empty --pages $WorkbookPdf "$WorkbookPage-$WorkbookPage" -- $wbPdf
$wbJpgBase = Join-Path $wbDir 'workbook-p17'
& pdftoppm -jpeg -r 300 $wbPdf $wbJpgBase

Write-Host 'Done (1.1–1.5). Handle 1.6 culture and 1.7 dictionary manually.'
