@echo off
setlocal

REM 获取当前目录
set "current_dir=%cd%"

REM Chrome 可执行文件路径 (根据你的实际路径修改)
set "chrome_path=C:\Program Files\Google\Chrome\Application\chrome.exe"

REM 创建一个新的用户数据目录，以确保不会影响默认的浏览器设置
set "user_data_dir=%current_dir%\ChromeDevProfile"

REM 指定要打开的页面URL
set "target_url=https://bilibili.com"

REM 启动 Chrome，带有指定的用户数据目录
start "" "%chrome_path%" --user-data-dir="%user_data_dir%" --load-extension="%current_dir%"  --no-first-run  "%target_url%"

endlocal

