# Lesson 6 Phase 1 — thin wrapper (avoids long agent runs; run locally).
# Requires: Node + npm deps. Optional: Poppler on PATH for JPG / pdfimages / pdftotext.
$ErrorActionPreference = "Stop"
$LessonRoot = if ($env:LESSON_ROOT) { $env:LESSON_ROOT } else {
  "C:\Users\Work Account\Desktop\CURSOR\a1-files\lessons\lesson-6"
}
$RepoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $RepoRoot
$env:LESSON_ROOT = $LessonRoot
Write-Host "LESSON_ROOT=$LessonRoot"
& npm run lesson6:pdf
exit $LASTEXITCODE
