@echo off
color 0A

:: Kill any node.js instances first
taskkill /F /IM node.exe >nul 2>&1

:: If that didn't work, force kill anything on those ports
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173"') do (
    taskkill /F /PID %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5174"') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo Starting development server...
start "" npm run dev

:: Wait for server to start
timeout /t 4 >nul

:: Open browser automatically
start http://localhost:5173