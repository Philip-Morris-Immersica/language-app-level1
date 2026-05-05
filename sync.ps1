# =============================================================
#  sync.ps1  —  Save and push your work to GitHub in one step
#  Usage:  .\sync.ps1 "your message here"
# =============================================================

param(
    [string]$message = "update"
)

Write-Host ""
Write-Host "Saving and pushing your work..." -ForegroundColor Cyan

git add .

if ((git status --porcelain) -eq "") {
    Write-Host "Nothing new to save." -ForegroundColor Yellow
    exit 0
}

git commit -m $message
git push

Write-Host ""
Write-Host "Done! Your work is saved on GitHub." -ForegroundColor Green
Write-Host ""
