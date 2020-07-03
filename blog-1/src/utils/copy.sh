# shell 脚本的可执行文件
#!/bin/sh
cd /Users/tommy/Documents/personal-projects/nodejs-blog/blog-1/logs
# 将 access.log 拷贝并重命名为 020-07-03.access.log
cp access.log $(date +%Y-%m-%d).access.log
# 清空 access.log 文件，继续积累日志
echo "" > access.log