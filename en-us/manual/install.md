<h1> Quick Start </h1>

## Quick Start from docker
We provide a docker image build on centos6 with a sample dataset in it.
```bash
$ docker pull peterzhang921/cboard:0.4.1
$ docker run --rm -itd --name=cboard -p 8026:8080 --privileged=true peterzhang921/cboard:0.4.1

# after docker container is start then attach into it and start tomcat server
$ docker attach cboard
$ /opt/apache-tomcat/bin/startup.sh

# wait after server successfully started
$ tail -f /opt/apache-tomcat/logs/catalina.out
```

### Access CBoard in Container

<div class="bs-callout bs-callout-info">
    <h4>Url:</h4>
    <p>http://docker-hostip:8026/cboard</p>
    <p>UserName: admin, Password: root123</p>
</div>


### Build image by yourself
Meta data of CBoard is stored in embedded DB H2 with file storage, user can <mark>change or add your own configuration by yourself then build project and docker image again</mark>
Use configuration files in <code>h2</code> folder, use env parameter then all the files in h2 folder will overwrite same files in resource folder
```bash
# use configuration files in h2 folder, use env parameter then all the files in h2 folder will overwrite same files in resource folder
$ maven clean package -Denv=h2
# build docker image
$ docker build --network=host -t cboard .
```

## Build CBoard by yourself

!> In order to avoid all kinds of weird bug due to version conflict, you are suggested to build war package by yourself.

### Pre-Requirements

* JDK1.8 \(Java Environment\)
* Maven3
* MySQL5+/SQLServer \(Used for metadata storage\)
* Chrome \(Only Chrome explorer is supported as of now\)
* We develop, test and use CBoard as a internal tool of our company. So compatibility feature is not so important for use. And also we have none Front-End developer, it's hard for us to deal any compatibility issue. We use [angular-drag-and-drop-lists](https://github.com/marceljuenemann/angular-drag-and-drop-lists) for drag-and-drop designer. If you are professional at deal with compatibility issues, welcome to help us out.
* [PhantomJS](http://phantomjs.org/) Version 2.1+ \(Used for export dashboard and send dashboard email\)
* You'd better to have basic database, data warehouse, olap data analyze or Excel pivot analyze knowledge
* Application operator should have J2EE project experience


### Get source code
Download or git clone project
!> The branches that name start with <code>branch-</code> are used for develop and the release version is also based on branch after a internal test use. The <code>master</code> is only used to sync our latest code from branches. That means master is unstable, not ready to use branch. Please don't build your application on master.

```bash
git clone https://github.com/yzhang921/CBoard.git
git checkout branch-0.4
```

### 准备CBoard元数据库

?> 以MySQL为例

#### 1. 从演示数据库开始
- 你可以从用于演示的样本数据库开始，包含样本元数据库(cboard_demo2)和样本DW库(foodmart2)
- 下载[cboard_demo & foodmart](https://pan.baidu.com/s/1skOyPh7)
- 终端命令行进入下载这两个脚本的目录，并解压foodmart.zip
- 进入MySQL命令行工具，执行下面两个脚本文件
```
mysql> source cboard_demo.sql
mysql> source foodmart.sql
```
- 成功执行之后检查 cboard_demo2 和 foodmart2 两个DB已经成功导入，最后查看一下数据

#### 2. 从空白元数据库开始
执行元数据创建脚本：
```mysql
$ cd cboard
mysql> create database cboard;
mysql> use cboard;
mysql> source sql/mysql/mysql.sql
```

### 修改配置文件

?> src/main/resources/config.properties

```pro
validationQuery=SELECT 1
jdbc_url=jdbc:mysql://localhost:3306/cboard # 修改指向第一步元数据库地址
jdbc_username=root # 修改数据库用户名连接密码
jdbc_password=111111

# Service configuration
dataprovider.resultLimit=300000
admin_user_id=1
phantomjs_path=D:/phantomjs-2.1.1-windows/bin/phantomjs.exe # 修改为服务器上的phantomjs位置，linux环境下确保有执行权限

# 邮件发送配置
mail.smtp.host=127.0.0.1
mail.smtp.port=8825
mail.smtp.from=test@test.com
#mail.smtp.username=test@test.com
#mail.smtp.password=111111
#mail.smtp.ssl.checkserveridentity=false

# Cache Properties 使用Redis做数据缓存的配置
cache.redis.hostName=127.0.0.1
cache.redis.port=6379
```

### 编译构建

进入项目根目录(<code>pom.xml</code>所在目录)

<div class="admonition warning">
  <p class="admonition-title"><i class="fa fa-info-circle" aria-hidden="true"></i> 注意</p>
  由于我们再maven依赖中默认包含了SQLServer的JDBC驱动，但是该驱动在公有的Maven仓库中不存在，所以在不修改maven依赖的前提下构建项目需要本地安装一次SQLServer JDBC Driver；
  如果贵司使用环境中不涉及SQLServer数据库，可以选择把pom中下面依赖移除：
</div>

```xml
<dependency>
    <groupId>com.microsoft.sqlserver</groupId>
    <artifactId>sqljdbc4</artifactId>
    <version>4.0</version>
</dependency>
```

```bash
$ mvn install:install-file -Dfile=lib/sqljdbc4-4.0.jar -DgroupId=com.microsoft.sqlserver -DartifactId=sqljdbc4 -Dversion=4.0 -Dpackaging=jar
$ mvn clean package
```


### 部署war到tomcat容器

* 拷贝CBoard\target\cboard.war到tomcat的webapp目录
* 启动tomcat

### 访问应用

通过Chrome访问应用  
<b>http://_yourserverip_:8080</b>  
默认登录用户名和密码: admin/root123

### 样本数据源是否配置正确
<div class="admonition warning">
  <p class="admonition-title"><i class="fa fa-info-circle" aria-hidden="true"></i> 注意</p>
  为了数据安全，在编辑数据源的时候，密码不会被加载回前端。故每次测试数据连接和修改数据连接的时候请再次输入连接密码。
</div>

![](/assets/demo_datasource.png)

## CBoard使用基本步骤

![](/assets/use-steps.png)






