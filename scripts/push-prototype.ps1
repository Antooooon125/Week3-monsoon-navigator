# Run this in your normal authenticated PowerShell. No token is printed or stored.
[CmdletBinding()]
param([switch]$PrepareOnly)

$ErrorActionPreference = 'Stop'
$sourceRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$checkoutRoot = "$sourceRoot-publish"
$repositoryUrl = 'https://github.com/Antooooon125/Week3-monsoon-navigator.git'
$branch = 'design/atlas-of-moving-worlds'
$credentialOptions = @('-c', 'credential.helper=', '-c', 'credential.helper=!gh auth git-credential')
$paths = @('prototype.html', 'prototype', 'scripts/build-prototype.mjs', 'scripts/push-prototype.ps1', 'tests/prototype-engine.test.mjs', 'docs/prototype.md')
$prototypeNote = @'

## Playable atlas prototype

Open [prototype.html](prototype.html) for **An Atlas of Moving Worlds**, the offline visual prototype. It preserves the original game engine and adds the editorial opening, seasonal map/calendar, commodity plates, event reports and print ledger. The default index.html remains the original game.

See [prototype notes](docs/prototype.md) for development, font licences, validation and known limitations.
'@

function Invoke-CheckedGit {
    param([string[]]$GitArguments)
    & git @credentialOptions @GitArguments
    if ($LASTEXITCODE -ne 0) { throw "Git failed: $($GitArguments[0])" }
}
function Normalize-Text([string]$Text) { return $Text.Replace("`r`n", "`n").TrimEnd() }
function Resolve-NodeExecutable {
    $candidates = @()
    $pathNode = @(Get-Command node -CommandType Application -ErrorAction SilentlyContinue)
    if ($pathNode.Count -gt 0) { $candidates += $pathNode[0].Source }
    if ($env:CODEX_PRIMARY_RUNTIME_NODE) { $candidates += $env:CODEX_PRIMARY_RUNTIME_NODE }
    # This official bundled executable was verified when preparing this prototype.
    $candidates += 'C:\Program Files\WindowsApps\OpenAI.CodexPrimaryRuntime.v26-1111-570-0_26.1111.570.0_x64__3k8sg7r9htsxt\dependencies\node\bin\node.exe'
    foreach ($candidate in $candidates) {
        if (Test-Path -LiteralPath $candidate -PathType Leaf) { return $candidate }
    }
    # Locate a newer installed Codex runtime if the recorded bundle was replaced.
    if (Get-Command Get-AppxPackage -ErrorAction SilentlyContinue) {
        foreach ($package in Get-AppxPackage -Name 'OpenAI.CodexPrimaryRuntime*' | Sort-Object Version -Descending) {
            $candidate = Join-Path $package.InstallLocation 'dependencies\node\bin\node.exe'
            if (Test-Path -LiteralPath $candidate -PathType Leaf) { return $candidate }
        }
    }
    throw 'Could not locate Node.js on PATH or in the installed Codex runtime.'
}
function Get-GitFileText([string]$RevisionPath) {
    if ($RevisionPath -notmatch '^(HEAD|origin/main):[A-Za-z0-9._/-]+$') { throw 'Unexpected Git file reference.' }
    # Read file bytes as UTF-8, independent of the Windows console code page.
    $startInfo = New-Object System.Diagnostics.ProcessStartInfo
    $startInfo.FileName = @(Get-Command git -CommandType Application)[0].Source
    $startInfo.Arguments = "-C `"$checkoutRoot`" show $RevisionPath"
    $startInfo.UseShellExecute = $false
    $startInfo.CreateNoWindow = $true
    $startInfo.RedirectStandardOutput = $true
    $startInfo.RedirectStandardError = $true
    $startInfo.StandardOutputEncoding = [Text.UTF8Encoding]::new($false)
    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = $startInfo
    try {
        $null = $process.Start()
        $text = $process.StandardOutput.ReadToEnd()
        $errorText = $process.StandardError.ReadToEnd()
        $process.WaitForExit()
        if ($process.ExitCode -ne 0) { throw "Could not read Git file: $errorText" }
        return $text
    } finally { $process.Dispose() }
}
function Get-ExpectedReadme([string]$Text) {
    if ($Text.Contains('## Playable atlas prototype')) { return $Text }
    return $Text.TrimEnd() + "`n" + $prototypeNote + "`n"
}
function Test-ManagedPath([string]$RelativePath) {
    if ($RelativePath -eq 'README.md') { return $true }
    foreach ($entry in $paths) {
        if ($RelativePath -eq $entry -or $RelativePath.StartsWith("$entry/")) { return $true }
    }
    return $false
}

# Reuse the checkout created by an earlier attempt; never reset or delete work.
$nodeExecutable = Resolve-NodeExecutable
Write-Host "Using Node.js: $nodeExecutable"
if (-not (Test-Path -LiteralPath $checkoutRoot)) {
    if ($PrepareOnly) { throw 'PrepareOnly needs an existing checkout.' }
    Invoke-CheckedGit -GitArguments @('clone', '--', $repositoryUrl, $checkoutRoot)
}
$actualRoot = ((Invoke-CheckedGit -GitArguments @('-C', $checkoutRoot, 'rev-parse', '--show-toplevel')) -join "`n").Trim()
if ([IO.Path]::GetFullPath($actualRoot) -ine [IO.Path]::GetFullPath($checkoutRoot)) { throw 'The checkout root does not match the intended publish directory.' }
$origin = ((Invoke-CheckedGit -GitArguments @('-C', $checkoutRoot, 'remote', 'get-url', 'origin')) -join "`n").Trim()
if ($origin -cne $repositoryUrl) { throw 'The existing checkout points to a different origin. No files were changed.' }
$currentBranch = ((Invoke-CheckedGit -GitArguments @('-C', $checkoutRoot, 'branch', '--show-current')) -join "`n").Trim()
if ($currentBranch -notin @('main', $branch)) { throw "The existing checkout is on $currentBranch. Review it before publishing." }

# Resume only clean work or the exact prepared files from this source folder.
$headReadme = Get-GitFileText 'HEAD:README.md'
$expectedReadme = Get-ExpectedReadme $headReadme
$dirty = @(Invoke-CheckedGit -GitArguments @('-C', $checkoutRoot, '-c', 'core.quotePath=false', 'status', '--porcelain=v1', '--untracked-files=all'))
foreach ($line in $dirty) {
    $relativePath = $line.Substring(3)
    if (-not (Test-ManagedPath $relativePath)) { throw "Unrelated local change found: $relativePath. It has been preserved." }
    $localFile = Join-Path $checkoutRoot $relativePath
    if (-not (Test-Path -LiteralPath $localFile -PathType Leaf)) { throw "Review the local deletion or rename: $relativePath" }
    if ($relativePath -eq 'README.md') {
        if ((Normalize-Text ([IO.File]::ReadAllText($localFile))) -cne (Normalize-Text $expectedReadme)) { throw 'README.md has a local edit outside the prepared prototype note. It has been preserved.' }
    } else {
        $sourceFile = Join-Path $sourceRoot $relativePath
        if (-not (Test-Path -LiteralPath $sourceFile -PathType Leaf)) { throw "No matching prepared source for $relativePath" }
        if ((Get-FileHash -LiteralPath $localFile).Hash -cne (Get-FileHash -LiteralPath $sourceFile).Hash) { throw "Local changes differ from the prepared source: $relativePath. They have been preserved." }
    }
}

if (-not $PrepareOnly) {
    Invoke-CheckedGit -GitArguments @('-C', $checkoutRoot, 'fetch', 'origin', 'main')
    $remoteIndex = Get-GitFileText 'origin/main:index.html'
    $testedIndex = [IO.File]::ReadAllText((Join-Path $sourceRoot 'index.html'))
    if ((Normalize-Text $remoteIndex) -cne (Normalize-Text $testedIndex)) { throw 'Upstream index.html changed again. Rebuild against it before publishing; nothing was pushed.' }
}
$indexBefore = [IO.File]::ReadAllText((Join-Path $checkoutRoot 'index.html'))
$testedIndex = [IO.File]::ReadAllText((Join-Path $sourceRoot 'index.html'))
if ((Normalize-Text $indexBefore) -cne (Normalize-Text $testedIndex)) { throw 'The checked-out index.html differs from the tested source. Rebuild and review before publishing.' }
if ($currentBranch -eq 'main') {
    Invoke-CheckedGit -GitArguments @('-C', $checkoutRoot, 'switch', '-c', $branch)
}

foreach ($relativePath in $paths) {
    $fromPath = Join-Path $sourceRoot $relativePath
    if (Test-Path -LiteralPath $fromPath -PathType Container) {
        foreach ($file in Get-ChildItem -LiteralPath $fromPath -File -Recurse) {
            $suffix = $file.FullName.Substring($sourceRoot.Length).TrimStart([char[]]'\/')
            $toPath = Join-Path $checkoutRoot $suffix
            $null = New-Item -ItemType Directory -Force -Path (Split-Path -Parent $toPath)
            Copy-Item -LiteralPath $file.FullName -Destination $toPath -Force
        }
    } else {
        $toPath = Join-Path $checkoutRoot $relativePath
        $null = New-Item -ItemType Directory -Force -Path (Split-Path -Parent $toPath)
        Copy-Item -LiteralPath $fromPath -Destination $toPath -Force
    }
}
[IO.File]::WriteAllText((Join-Path $checkoutRoot 'README.md'), $expectedReadme, [Text.UTF8Encoding]::new($false))

Push-Location -LiteralPath $checkoutRoot
try {
    & $nodeExecutable scripts/build-prototype.mjs
    if ($LASTEXITCODE -ne 0) { throw 'Prototype build failed.' }
    & $nodeExecutable --test tests/prototype-engine.test.mjs
    if ($LASTEXITCODE -ne 0) { throw 'Prototype regression or baseline checks failed.' }
} finally { Pop-Location }

Invoke-CheckedGit -GitArguments (@('-C', $checkoutRoot, 'add', '--', 'README.md') + $paths)
Invoke-CheckedGit -GitArguments @('-C', $checkoutRoot, 'diff', '--cached', '--check')
if ($PrepareOnly) {
    Write-Host 'Prepared and staged the prototype; all checks passed. No commit or push was attempted.'
    return
}
& git -C $checkoutRoot diff --cached --quiet
if ($LASTEXITCODE -eq 1) {
    # Fill a missing identity only in this checkout, using the connected account's
    # public GitHub noreply identity. Existing local/global choices take precedence.
    $authorName = (& git -C $checkoutRoot config --get user.name) -join "`n"
    $authorEmail = (& git -C $checkoutRoot config --get user.email) -join "`n"
    if ([string]::IsNullOrWhiteSpace($authorName)) {
        Invoke-CheckedGit -GitArguments @('-C', $checkoutRoot, 'config', '--local', 'user.name', 'Azuromalachite')
    }
    if ([string]::IsNullOrWhiteSpace($authorEmail)) {
        Invoke-CheckedGit -GitArguments @('-C', $checkoutRoot, 'config', '--local', 'user.email', '33855967+Azuromalachite@users.noreply.github.com')
    }
    Invoke-CheckedGit -GitArguments @('-C', $checkoutRoot, 'commit', '-m', 'Add offline Atlas of Moving Worlds playable prototype')
} elseif ($LASTEXITCODE -ne 0) { throw 'Could not inspect staged changes.' }
Invoke-CheckedGit -GitArguments @('-C', $checkoutRoot, 'push', '-u', 'origin', $branch)
Write-Host 'Prototype pushed successfully.'
Write-Host 'https://github.com/Antooooon125/Week3-monsoon-navigator/tree/design/atlas-of-moving-worlds'
Write-Host 'https://github.com/Antooooon125/Week3-monsoon-navigator/compare/main...design/atlas-of-moving-worlds'
