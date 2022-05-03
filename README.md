# nest-demo

记录学习nestjs
## 权限相关
邮箱唯一
name:admin
email:1594000695@qq.com
password:123456

1. coffee 只需要登陆
2. 用户的 create update remove read 都需要 admin
3. 用户的只能登陆
4. todo 用户可以update 但是不能改角色 可以注册创建 不能选角色
## 安装docker
ps(win10 需要专业版)
1. [win官网下载](https://docs.docker.com/desktop/windows/install/)
2. 查看cpu进程,保证开启虚拟化
3. 电脑搜索 启用或关闭windows功能 选中 Hyper-V,重启电脑
4. 打开docker 可能会提示 WSL 2 相关,按照提示操作安装更新即可
5. 配置 `docker-compose.yml`
```bash
version: '3'

services:
  db:
    image: postgres
    restart: always
    ports:
      - '5432:5432'
    environment:
      POSTGRES_PASSWORD: pass123

```
6. 执行 `docker-compose up -d ` 就会在docker创建镜像

## typeorm
推荐使用typeorm@0.2.41
```bash
  yarn add typeorm@0.2.41 @nestjs/typeorm pg 
```
### 数据库迁移
参照项目配置文件 `ormconfig.js`

1. 手动生成迁移文件
```bash
  npx typeorm migration:create -n CoffeeRefactor
```
编写命令语句
先`yarn build`
然后执行 `npx typeorm migration:run`
回退指令 `npx typeorm migration:revert`

typeorm 能根据打包后的文件对比数据库的字段自动生成迁移文件
先`yarn build`
自动生成 `npx typeorm migration:generate -n 文件名`
接着执行 `npx typeorm migration:run`