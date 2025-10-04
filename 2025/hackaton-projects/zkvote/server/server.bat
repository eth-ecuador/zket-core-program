@echo off
echo Starting ZKVote voting server...
echo.

rem Install and build
call npm install || exit /b
call npm run build || exit /b

rem Ask for number of voters
:ask_voters
set /p VOTERS_COUNT="How many voters will participate? (minimum 2): "
if %VOTERS_COUNT% LSS 2 (
    echo Error: Minimum 2 voters required.
    goto ask_voters
)

rem Generate IDs and start server
echo.
call npm run genvoters %VOTERS_COUNT% || exit /b
echo.
echo IMPORTANT: You will be asked for:
echo 1. IP blocking (y/n)
echo 2. Voting subject
echo 3. Options (comma-separated)
echo.
pause
cls

echo Starting server...
call npm run start
if errorlevel 1 goto error
goto end

:error
echo.
echo Error executing the previous command
exit /b 1

:end
if !ERRORLEVEL! NEQ 0 (
    echo Error: The server could not be started
    exit /b 1
)
exit /b