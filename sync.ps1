# =============================================================
#  sync.ps1  —  Save and push your work to GitHub in one step
#  Usage:  .\sync.ps1 "your message here"
# =============================================================

param(
    [string]$message = "update"
)

$branch = git rev-parse --abbrev-ref HEAD

Write-Host ""
Write-Host "Current branch: $branch" -ForegroundColor Cyan

# Warn if accidentally on master
if ($branch -eq "master") {
    Write-Host ""
    Write-Host "  WARNING: You are on master! You should be on your personal branch." -ForegroundColor Red
    Write-Host "  Switch with: git checkout philip  (or alex / nina)" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host "Saving and pushing your work to '$branch'..." -ForegroundColor Cyan

git add .

$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "Nothing new to save." -ForegroundColor Yellow
    exit 0
}

git commit -m $message
git push

Write-Host ""
Write-Host "Done! Saved to branch '$branch' on GitHub." -ForegroundColor Green
Write-Host ""
