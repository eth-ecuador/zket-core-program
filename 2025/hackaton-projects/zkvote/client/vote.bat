@echo off
title ZKVote Client
cls
echo Starting ZKVote voting client...

rem Check Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo Error: Node.js is not installed.
    echo Install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

rem Install dependencies if needed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install --no-audit --no-fund >nul 2>&1
)

:start
cls
call npm --silent run vote
if %ERRORLEVEL% EQU 0 (
    echo.
    echo Your response has been successfully recorded.
    echo.
    pause
    exit /b 0
) else if %ERRORLEVEL% EQU 2 (
    echo.
    :ask_retry
    set /p "retry=Invalid voter ID. Would you like to try again? (Y/N): "
    if /i "%retry%"=="Y" goto start
    if /i "%retry%"=="N" exit /b 1
    echo Invalid response. Please enter Y or N.
    goto ask_retry
) else (
    echo.
    pause
    exit /b 1
)
