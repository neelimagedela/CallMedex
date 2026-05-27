@echo off
setlocal

set "SOURCE=%~1"
set "DESTINATION=%~2"

if "%SOURCE%"=="" (
    echo Usage: copysrc.bat source destination
    exit /b 1
)

if "%DESTINATION%"=="" (
    echo Usage: copysrc.bat source destination
    exit /b 1
)

if not exist "%SOURCE%" (
    echo Source directory does not exist:
    echo %SOURCE%
    exit /b 1
)

if not exist "%DESTINATION%" (
    echo Destination directory does not exist:
    echo %DESTINATION%
    exit /b 1
)

echo Copying from:
echo %SOURCE%
echo To:
echo %DESTINATION%

rmdir /s /q "%DESTINATION%"
mkdir "%DESTINATION%"

xcopy "%SOURCE%\*" "%DESTINATION%\" /E /H /C /I /Y

echo Copy complete.