@echo off
echo =====================================
echo   ZKVote Server Cleanup Script
echo =====================================
echo.
echo This script will remove all heavy dependencies and build artifacts
echo to make the project lightweight for GitHub upload.
echo.
pause

echo Cleaning up Server dependencies...
echo.

REM Remove node_modules directory
if exist "node_modules" (
    echo Removing node_modules...
    rmdir /s /q "node_modules"
    echo ✓ node_modules removed
) else (
    echo ✓ node_modules not found
)

REM Remove dist/build directory
if exist "dist" (
    echo Removing dist directory...
    rmdir /s /q "dist"
    echo ✓ dist directory removed
) else (
    echo ✓ dist directory not found
)

REM Remove package-lock.json
if exist "package-lock.json" (
    echo Removing package-lock.json...
    del "package-lock.json"
    echo ✓ package-lock.json removed
) else (
    echo ✓ package-lock.json not found
)

REM Remove .env files (they might contain sensitive data)
if exist ".env" (
    echo Removing .env file...
    del ".env"
    echo ✓ .env file removed
) else (
    echo ✓ .env file not found
)

REM Remove log files
if exist "*.log" (
    echo Removing log files...
    del "*.log"
    echo ✓ Log files removed
) else (
    echo ✓ No log files found
)

REM Remove voters.json (contains sensitive voter data)
if exist "voters.json" (
    echo Removing voters.json (sensitive data)...
    del "voters.json"
    echo ✓ voters.json removed
) else (
    echo ✓ voters.json not found
)

REM Remove any result files
if exist "results_*.txt" (
    echo Removing result files...
    del "results_*.txt"
    echo ✓ Result files removed
) else (
    echo ✓ No result files found
)

REM Remove TypeScript cache
if exist ".tsbuildinfo" (
    echo Removing TypeScript build info...
    del ".tsbuildinfo"
    echo ✓ TypeScript build info removed
) else (
    echo ✓ No TypeScript build info found
)

REM Remove temporary files
if exist "tmp" (
    echo Removing tmp directory...
    rmdir /s /q "tmp"
    echo ✓ tmp directory removed
) else (
    echo ✓ tmp directory not found
)

echo.
echo =====================================
echo   Server Cleanup Complete!
echo =====================================
echo.
echo The following items were cleaned:
echo - node_modules directory
echo - dist/build artifacts
echo - package-lock.json
echo - .env files
echo - log files
echo - voters.json (sensitive data)
echo - result files
echo - TypeScript cache
echo - temporary files
echo.
echo Your server directory is now lightweight and ready for GitHub!
echo.
echo To restore dependencies, run: npm install
echo To build the project, run: npm run build
echo.
pause