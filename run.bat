@echo off
echo =========================================
echo      Starting ATM Simulator...
echo =========================================

echo.
echo Starting Backend Server (Port 3001)...
start "ATM Backend Server" cmd /k "cd server && npm install && node index.js"

echo.
echo Starting Frontend Client (Vite)...
start "ATM Frontend Client" cmd /k "cd client && npm install && npm run dev"

echo.
echo Both services are booting up in separate windows!
echo You can close this window now.
