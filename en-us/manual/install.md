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
    <h4>URL:</h4>
    <p>http://docker-hostip:8026/cboard</p>
    <p>UserName: admin, Password: root123</p>
</div>


### Build docker image by yourself
Meta data of CBoard is stored in embedded DB H2 with file storage, user can <mark>change or add your own configuration by yourself then build project and docker image again</mark>
Use configuration files in <code>h2</code> folder, use env parameter then all the files in h2 folder will overwrite same files in resource folder
```bash
# use configuration files in h2 folder, use env parameter then all the files in h2 folder will overwrite same files in resource folder
$ maven clean package -Denv=h2
# build docker image
$ docker build --network=host -t cboard .
```

## Manual build project

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

### Install metadata of CBoard

?> take MySQL database as example

#### 1. From demo DB
- We provide a sample data. You can
- Download [cboard_demo & foodmart](https://www.dropbox.com/sh/zhgysm4ewandmwl/AADC4oPwn34vHv39AJMGzhyia?dl=0)
- and unzip <code>foodmart.zip</code>
- then use MySQL Command Line tool login and execute below command
```
mysql> source cboard_demo.sql
mysql> source foodmart.sql
```
- After success completed, check if cboard_demo2 and foodmart2 databases have been created

#### 2. From new meta database
You can alternative choose start from a blank setting. Execute below script to create a new meta database：
```mysql
$ cd cboard
mysql> create database cboard;
mysql> use cboard;
mysql> source sql/mysql/mysql.sql
```

### Modify configurations

?> src/main/resources/config.properties

```pro
validationQuery=SELECT 1
jdbc_url=jdbc:mysql://localhost:3306/cboard # # set to your metadata db connection url, if you are using demo db, change db name to cboard_demo2
jdbc_username=root # change to the username/password of your db
jdbc_password=111111

# Service configuration
dataprovider.resultLimit=300000
admin_user_id=1
phantomjs_path=D:/phantomjs-2.1.1-windows/bin/phantomjs.exe # change to the install path of your phantomjs

# configuration of Mail service
mail.smtp.host=127.0.0.1
mail.smtp.port=8825
mail.smtp.from=test@test.com
#mail.smtp.username=test@test.com
#mail.smtp.password=111111
#mail.smtp.ssl.checkserveridentity=false

```

### Compile and Package

cd root path of CBoard

!> Install SQLServer JDBC Driver into your local repository. If your company doesn't use SqlServer database as data source, you can freely remove follow dependency.

```xml
<dependency>
    <groupId>com.microsoft.sqlserver</groupId>
    <artifactId>sqljdbc4</artifactId>
    <version>4.0</version>
</dependency>
```

Install command as below:
```bash
$ mvn install:install-file -Dfile=lib/sqljdbc4-4.0.jar -DgroupId=com.microsoft.sqlserver -DartifactId=sqljdbc4 -Dversion=4.0 -Dpackaging=jar
$ mvn clean package
```


### Deploy war to Tomcat application

* Copy **CBoard/target/cboard.war** to **webapp** folder of Tomcat and rename cboard.war would be better to change name to ROOT.war
* Start up Tomcat

### Access CBoard

Open chrome
<b>http://_yourserverip_:8080</b>  
Default login username and passwor: admin/root123

### Check configuration of demo database
!> In case of password leak, we would reload password when edit `datasource`. So every time when you want to modify `datasource`, you have to retype password again.

![](../../../assets/demo_datasource.png)

## Operation road of CBoard

![](../../../assets/use-steps.png)






