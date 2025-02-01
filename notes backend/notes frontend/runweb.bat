@echo off 
color 0A 
taskkill /F /IM node.exe >nul 2>&1 
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173"') do ( 
    taskkill /F /PID %%a >nul 2>&1 
) 
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5174"') do ( 
    taskkill /F /PID %%a >nul 2>&1 
) 
echo Starting development server... 
start "" npm run dev 
timeout /t 4 >nul 
start http://localhost:5173 
