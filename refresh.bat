@echo off
echo Stopping any running servers...
taskkill /F /IM node.exe 2>nul

echo.
echo Cleaning old build...
rmdir /s /q dist 2>nul

echo.
echo Building fresh version...
call npm run build

echo.
echo Starting preview server...
call npm run preview

pause
