@echo off
set OLDDIR=%CD%
cd /d "C:\Program Files (x86)\Google\Chrome\Application"
chrome.exe --disable-web-security --user-data-dir="%localappdata%\Google\Chrome\User Data" "%OLDDIR%\..\index.html" --profile-directory="Default"