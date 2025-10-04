@echo off
echo =====================================
echo   ZKVote Client Cleanup Script
echo =====================================
echo.
echo This script will remove all heavy dependencies and build artifacts
echo to make the project lightweight for GitHub upload.
echo.
pause

echo Cleaning up Client dependencies...
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

REM Remove yarn.lock if exists
if exist "yarn.lock" (
    echo Removing yarn.lock...
    del "yarn.lock"
    echo ✓ yarn.lock removed
) else (
    echo ✓ yarn.lock not found
)

REM Remove .env files
if exist ".env" (
    echo Removing .env file...
    del ".env"
    echo ✓ .env file removed
) else (
    echo ✓ .env file not found
)

REM Remove .env.local files
if exist ".env.local" (
    echo Removing .env.local file...
    del ".env.local"
    echo ✓ .env.local file removed
) else (
    echo ✓ .env.local file not found
)

REM Remove Vite cache
if exist ".vite" (
    echo Removing Vite cache...
    rmdir /s /q ".vite"
    echo ✓ Vite cache removed
) else (
    echo ✓ Vite cache not found
)

REM Remove ESLint cache
if exist ".eslintcache" (
    echo Removing ESLint cache...
    del ".eslintcache"
    echo ✓ ESLint cache removed
) else (
    echo ✓ ESLint cache not found
)

REM Remove TypeScript cache
if exist ".tsbuildinfo" (
    echo Removing TypeScript build info...
    del ".tsbuildinfo"
    echo ✓ TypeScript build info removed
) else (
    echo ✓ No TypeScript build info found
)

REM Remove coverage directory
if exist "coverage" (
    echo Removing coverage directory...
    rmdir /s /q "coverage"
    echo ✓ coverage directory removed
) else (
    echo ✓ coverage directory not found
)

REM Remove log files
if exist "*.log" (
    echo Removing log files...
    del "*.log"
    echo ✓ Log files removed
) else (
    echo ✓ No log files found
)

REM Remove npm debug logs
if exist "npm-debug.log*" (
    echo Removing npm debug logs...
    del "npm-debug.log*"
    echo ✓ npm debug logs removed
) else (
    echo ✓ No npm debug logs found
)

REM Remove temporary files
if exist "tmp" (
    echo Removing tmp directory...
    rmdir /s /q "tmp"
    echo ✓ tmp directory removed
) else (
    echo ✓ tmp directory not found
)

REM Remove any generated certificates or keys (if any)
if exist "*.pem" (
    echo Removing certificate files...
    del "*.pem"
    echo ✓ Certificate files removed
) else (
    echo ✓ No certificate files found
)

echo.
echo =====================================
echo   Client Cleanup Complete!
echo =====================================
echo.
echo The following items were cleaned:
echo - node_modules directory
echo - dist/build artifacts
echo - package-lock.json / yarn.lock
echo - .env files
echo - Vite cache
echo - ESLint cache
echo - TypeScript cache
echo - coverage directory
echo - log files
echo - npm debug logs
echo - temporary files
echo - certificate files
echo.
echo Your client directory is now lightweight and ready for GitHub!
echo.
echo To restore dependencies, run: npm install
echo To build the project, run: npm run build
echo To start development, run: npm run dev
echo.
pause