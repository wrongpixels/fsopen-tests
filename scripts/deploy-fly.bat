@echo off
cd %~dp0
echo Deploying on Fly.io...
flyctl deploy
pause