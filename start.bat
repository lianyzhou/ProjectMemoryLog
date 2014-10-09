call taskkill /F /FI "WINDOWTITLE eq MemLog" /T
call npm install
call bower install
call node "%~dp0\app"
pause