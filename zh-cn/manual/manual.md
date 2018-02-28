# 快速开始

---

为了避免由于JDK版本不匹配引起的各种问题强烈建议自行编译构建项目。

## 0 项目要求

* JDK1.8 \(Java环境\)
* Maven3
* MySQL5+/SQLServer \(系统元数据存储\)
* Chrome \(客户端主流浏览器访问现在只支持Chrome\)
  * 我们用的图表设计的拖拽现在测试下来只能支持chrome，我们是公司内部使用，对于兼容性没有太在意。由于我们没有专业前端开发，兼容性问题搞不定。拖拽使用的组件来自[angular-drag-and-drop-lists](https://github.com/marceljuenemann/angular-drag-and-drop-lists), 
    希望有前端开发资源的朋友能够帮忙一起解决兼容性问题
* 并配置好maven仓库，这里推荐一个阿里云的maven镜像，速度还不错
  ```xml
  <mirror>
    <id>alimaven</id>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    <mirrorOf>central</mirrorOf> 
  </mirror>
  ```
* [PhantomJS](http://phantomjs.org/) Version 2.1+ \(用于看板导出与邮件发送\)
* 基础的数据库、数据仓库、OLAP数据分析知识或者Excel透视表使用经验
* 系统维护与管理者需要有一定的J2EE项目经验

## 0 github上下载或者clone项目源代码，进入Master分支
git clone https://github.com/yzhang921/CBoard.git
## 1 准备CBoard元数据库 (以MySQL为例)  
    - 2.1 你可以从用于演示的样本数据库开始，包含样本元数据库(cboard_demo2)和样本DW库(foodmart2)
        - 下载[cboard_demo & foodmart](https://pan.baidu.com/s/1skOyPh7)
        - 终端命令行进入下载这两个脚本的目录，并解压foodmart.zip
        - 进入MySQL命令行工具，执行下面两个脚本文件
        ```
            source cboard_demo.sql
            source foodmart.sql
        ```
        - 成功执行之后检查 cboard_demo2 和 foodmart2 两个DB已经成功导入，最后查看一下数据
    - 2.2 同样你也可以从空白元数据库开始
        ```mysql
            -- CREATE DATEBASE cboard;
            Execute ddl to create metadata table: sql/mysql/mysql.sql
        ```

## 2 修改元数据配置文件

> CBoard/src/main/resources/config.properties

```pro
validationQuery=SELECT 1
jdbc_url=jdbc:mysql://localhost:3306/cboard # 修改指向第一步元数据库地址
jdbc_username=root # 修改数据库用户名连接密码
jdbc_password=111111 

# Service configuration
dataprovider.resultLimit=300000
admin_user_id=1
phantomjs_path=D:/phantomjs-2.1.1-windows/bin/phantomjs.exe  # 修改为服务器上的phantomjs位置，linux环境下确保有执行权限
web_port=8026 # tomcat启动端口号
web_context=  # 数据应用的名称以ROOT部署此处留空

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

## 3 Maven 编译打包

cd 进入项目根目录\(pom.xml所在目录\)  
### 3.1 Install SQLServer JDBC Driver into your local respository 
mvn install:install-file -Dfile=lib/sqljdbc4-4.0.jar -DgroupId=com.microsoft.sqlserver -DartifactId=sqljdbc4 -Dversion=4.0 -Dpackaging=jar
mvn clean package 



## 4 部署war到tomcat容器

* 拷贝CBoard\target\cboard.war到tomcat的webapp目录
* 启动tomcat

## 5 访问应用

通过Chrome访问应用  
[http://\_yourserverip\_:8080](http://_yourserverip_:8080)  
默认登录用户名和密码: admin/root123

## 6 基本步骤

![](/assets/use-steps.png)

## 7 项目启动，进去数据源管理界面确认一下样本数据源是否配置正确
![](/assets/demo_datasource.png)


#
# 服务端配置config.properties
-----

```properties
# 配置元数据库连接项
validationQuery=SELECT 1
jdbc_url=jdbc:mysql://localhost:3306/cboard
jdbc_username=root
jdbc_password=111111

# 配置离线数据集大小，不建议更改
dataprovider.resultLimit=300000
admin_user_id=1 # 超级管理员uid，1为admin
# phantomjs_path，web_port，web_context三项配置用于Dashboard导出
phantomjs_path=D:/phantomjs-2.1.1-windows/bin/phantomjs.exe
web_port=8026
# 非ROOT部署需要修改为实际部署的WebContext
web_context=

# 邮件服务器配置
mail.smtp.host=127.0.0.1
mail.smtp.port=8825
mail.smtp.from=test@test.com
#mail.smtp.username=test@test.com
#mail.smtp.password=111111
#mail.smtp.ssl.checkserveridentity=false


# Cache Properties
cache.redis.hostName=127.0.0.1
cache.redis.port=6379
```


## Spring相关配置

### spring.xml 缓存类型Redis/Ehcache，缓存类型二者任选其一

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:context="http://www.springframework.org/schema/context"
xsi:schemaLocation="http://www.springframework.org/schema/beans
http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
http://www.springframework.org/schema/context
http://www.springframework.org/schema/context/spring-context-3.0.xsd">

<context:property-placeholder location="classpath:*.properties"/>
<context:component-scan base-package="org.cboard"/>

<bean id="schedulerFactoryBean" class="org.springframework.scheduling.quartz.SchedulerFactoryBean">
<property name="applicationContextSchedulerContextKey" value="applicationContext"/>
</bean>

<!--<import resource="spring-cacher-redis.xml"/>-->
<import resource="spring-cacher-ehcache.xml"/>
</beans>
```

### ehcache.xml 配置ehache相关信息
```xml
<?xml version="1.0" encoding="UTF-8"?>
<config
xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
xmlns='http://www.ehcache.org/v3'
xsi:schemaLocation="http://www.ehcache.org/v3 http://www.ehcache.org/schema/ehcache-core.xsd">
<!-- 确保应用程序在该路径有新建文件与写入数据权限 -->
<persistence directory="mycache"/>
<cache alias="jvmAggregator">
<key-type>java.lang.String</key-type>
<value-type>org.cboard.cache.CacheObject</value-type>
<expiry>
<ttl unit="hours">12</ttl>
</expiry>
<resources>
<heap unit="MB">100</heap>
<disk unit="GB">500</disk>
</resources>
</cache>
</config>

```
### spring-redis.xml 配置redis连接

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:p="http://www.springframework.org/schema/p"
>

<bean class="org.cboard.cache.RedisCacheManager">
<property name="redisTemplate">
<bean id="redisTemplate" class="org.springframework.data.redis.core.RedisTemplate">
<property name="connectionFactory">
<bean class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory"
p:hostName="127.0.0.1"
p:port="6379" p:usePool="true"/>
</property>
<property name="keySerializer">
<bean class="org.springframework.data.redis.serializer.StringRedisSerializer"/>
</property>
</bean>
</property>
</bean>
</beans>
```

# 前端配置Settings.js

CBoard\src\main\webapp\org\cboard\Settings.js

```javascript
/**
* Created by Peter on 2016/10/23.
*/
// CBoard settings
var settings = {
preferredLanguage: "en" // en/cn: Switch language to Chinese
}
```



#
数据源管理

---

目前CBoard支持以下数据源连接：

* JDBC数据源
* ElasticSearch 1.x, 2.x, 5.x \(原生读取Index与Mapping，根据用户拖拽生成查询DSL\)
* Kylin 1.6 \(原生读取kylin Model，根据用户拖拽生成查询SQL\)
* TextFile \(文本文件，文本需要存放于CBoard应用服务器上面，读取本地文件\)
* Saiku2.x \(读取Saiku图表数据而非集成Saiku生成图表\)

操作路径图如下：
![](/assets/new_datasource.png)

## 1 JDBC数据源

我们来点实际的，在此我们不纯粹为了宣传而罗列各种数据库产品，懂JDBC原理的都知道没有意义。基本上所有RMDB都能支持，或许会存在一点点语法兼容问题，但是修改起来都比较简单。遇到后台日志抛语法错误异常请在github上面提issue，附上详细的异常日志，和操作步骤，我们会协助解决，更加欢迎提PR合并解决方案到我们的版本。
目前我们生产环境上连接的是MySQL和SQLServer。
![](/assets/jdbc-datasource.png)

另外，**Presto也是通过JDBC的方式连接**。Presto的JDBC连接认证**没有用户名密码认证机制**，用户名和密码输入留空即可。
![](/assets/datasource-presto.png)

理论上Hive、Spark-SQL也可以通过JDBC的方式连接，考虑到二者执行效率都不是太高不适合做及时交互查询引擎。不推荐引入

**注意：**
添加JDBC数据源之前确认_WEB-INF\lib_下面已经包含了对应的JDBC驱动包，MySQL/SQLServer/Kylin的JDBC驱动不需要额外引入。

### 驱动引入方式
1 Maven方式在打包之前修改pom.xml\(推荐\)
下面是mysql的maven依赖：
```xml
<dependency>
<groupId>mysql</groupId>
<artifactId>mysql-connector-java</artifactId>
<version>5.1.24</version>
</dependency>
```
2 应用在Web容器解包之后拷贝驱动到WEB-INF\lib，之后**重启Tomcat**

* 填写完毕之后可以点击**测试**按钮，输入简单的sql查询测试数据源与CBoard之间的连通性
* 0.3新增两项配置
* **是否使用连接池**设置数据源是否通过druid连接池的方式连接数据源
* **数据源聚合**0.3之后的版本支持聚合下推数据源

## 2 Kylin 1.6数据源

### JDBC方式连接

0.2版本添加了kylin的jdbc依赖，可以直接连接，连接方式如下

```
Driver ：org.apache.kylin.jdbc.Driver
JdbcUrl：jdbc:kylin://<host>:<port>/<project>
```

用JDBC方式连接Kylin可以选数据源聚合也就是聚合下推Kylin，或者使用CBoard提供的JVM聚合器，通过查询预聚合返回小的结果集，结果集缓存在CBoard服务器上在JVM内做二次聚合。 聚合下推原理参照[性能优化章节](./性能调优.md)。
**非数据源聚合的连接，切记注意数据集或者Query查询结果集大小。**
![image](https://cloud.githubusercontent.com/assets/6037522/21212867/6d91308c-c2cb-11e6-8366-3422662c0837.png)

另外由于Kylin1.6对子查询支持得不是太好，CBoard中采用的基于数据集定义的子查询嵌套之后group by的形式聚合下推数据源。
我们在实际使用中遇到过查询结果不准的bug，遇此情况可以通过图表设计模块下预览查询功能查看调试实际执行的Query。

### Kylin原生连接

0.3版本之后支持连接Kylin1.6原生通过restful接口读取解析Kylin数据模型，kylin2.0由于返回的json元数据定义有所改动，我们公司内部版本还停留在1.6，所以暂时只支持到1.6版本。
**原生连接模式下聚合操作只会再数据源进行。**
![](/assets/kylin-native-datasource.png)

## 3 Elasticsearch

为搜索而生的ES，最近几年在数据分析领域使用得越来越广，Kibana5之前的版本基本不具备多维分析功能，Kibana5具备了简单的指标分组split metric功能，但是还是缺少不同聚合指标的计算功能（常用于计算转化率与占比之类的需求）（P.S. 或许是本人还不会用，有说错的地方请指正），所以CBoard0.3版本更新特意在原计划之外评估比较和Saiku3数据源的支持之后决定选择先支持ES。  
### ES 数据源配置
![](/assets/es-datasource.png)

### 连通性测试
![](/assets/ds-test-es.png)

## 4 Saiku2.x

CBoard实现了对Saiku2.6的数据源连接，Saiku3.x的Restful接口相比2.6有些变动，暂不支持。Saiku生成图表的样式和CBoard本身不太搭配，这里Saiku集成读取Saiku图表数据把Saiku保存之后的图表通过Restful请求查询，返回数据作为数据集，再在CBoard上渲染生成图表，而非集成Saiku生成图表。

### Saiku数据获取**说明**

用过Saiku的可能会在这里产生疑问，Saiku的交叉表行列表头往往有层级关系，下图展示了一个2级列表头
![image](https://raw.githubusercontent.com/yzhang921/CloudResource/gif/gif/cboard/saiku_crtbl.png)
当前CBoard获取数据的默认以粒度最小的列作为表头，**两级表头会合并为一级**，合并之后新的表头效果如下图所示：
![](https://raw.githubusercontent.com/yzhang921/CloudResource/gif/gif/cboard/saiku_crtbl_header.png)

## 5 TextFile 文本数据源

文本数据只能读取CBoard应用服务器本地文件，使用者需要自己架设ftp服务器单独维护文本文件的上传与管理。

![](/assets/datasource-textfile.png)

#
数据集管理

---

**数据集**类似于OLAP分析的Cube\(数据立方体\)，可以提前定义查询、聚合表达式、动态时间漏斗。在用户**数据模型比较稳定**的前提下，可以减少相同数据集下不同表报设计时重复的填写查询脚本、新建聚合表达式工作。

CBoard的数据集为轻模型，任何一条简单的查询输出都可以当做一个cube来使用，cube修改避免了常规数据建模、修改、发布测试的繁琐过程。打个比方，第一次业务需求你可能选择了，a,b,c,d四个列作为聚合维度建立了一个Cube

```sql
SELECT a, b, c,
sum(xx) AS m1, count(yyy) AS m2
FROM fact a
JOIN dima a ON ...
JOIN dimb b ON ...
GROUP BY a, b, c
```

之后有了新的需求，需要引入维度e, f, g 列，常规的报表工具需要重新引入表、更新模型定义、发布，这个时候CBoard轻模型的优势就体现出来了只需要简单的修改或者复制之前的模型再修改一下查询

```sql
SELECT a, b, c, e, f, g
sum(xx) AS m1, count(yyy) AS m2
FROM fact a
JOIN dima a ON ...
JOIN dimb b ON ...
GROUP BY a, b, c, e, f, g
```

0.2之前的查询数据结果数据会全部读取到浏览器端，OLAP操作都在浏览器端进行，使用不当的情况下会造成客户端浏览器压力巨大。
0.3引入数据源聚合，实现了JDBC、Kylin、Elasticsearch的数据源聚合功能。同时考虑到小企业存在原始数据大、数据源配置低，但是需要分析的最终数据较小的应用场景，所以保留了离线数据集特性，使用时只需在JDBC数据源创建时不要勾选数据源聚合即可。

## 1 数据集模型定义

数据集的schema包含维度列、度量列、聚合表达式、预定义漏斗

* 选择数据源，填写对应的查询脚本，JDBC数据源为查询SQL，读取数据
* 读取数据成功之后，可选列和Schema空树出现在页面下方
* 拖拽左边方框的列到右边维度节点/度量节点下方，也可以通过点击左边的可选列，快速把列添加到schema，默认添加到维度节点，之后可通过功能键切换到度量
* 一个列可在不同的维度层级下多次使用，如：年-&gt;月-&gt;日，年-&gt;周-&gt;日
* 维度列在图表设计时只能拖拽到维度栏；指标\(度量\)列只能退拽到指标栏，聚合函数需要在设计时选定
* 加入Schema树的列可以编辑修改别名
* 添加层级、修改层级名，之后拖拽相应的列到层级组节点下
* 层级是图表下钻基础
* 计算表达式和过滤组只能点击添加新建
![image](/assets/schema.png)

## 2 预定义聚合表达式

1. 编辑聚合表达式并测试正确，表达式是用于聚合后再计算.
如: Math.log\(sum\(columnA\)/count\(columB\)\), check按钮只能检测到表达式的格式是否基本正确，复杂表达式不能保证验证成功之后后续100%能够工作
2. 0.3编辑栏替换为ace编辑器之后之前的点击辅助输入出现了一些兼容性问题，可以借助输入提示输入!
![image](https://cloud.githubusercontent.com/assets/6037522/21213330/952a5bfc-c2ce-11e6-89c9-fd15b514c173.png)
3. 数据集中预定义的聚合表达式在图表设计时不支持修改

## 3 预定义漏斗（过滤器）

用于预定义动态日期窗口，点击下拉选择动态时间表达式模板，模板中的值可以编辑文本。用户可根据自己的需求改成任意大小时间窗口。
![](/assets/pre-filter.png)

## 4 特殊数据集的查询定义说明

### 4.1 Kylin Native

![image](/assets/KylinDataSet.png)
使用Kylin数据源之前需对Kylin基本原理有所了解。
需要填写项, 以及解释如下：
Kylin Project：对应Kylin本身的Project
Data Model：对应Kylin Model

### 4.2 Elasticsearch

![](/assets/es_dataset.png)
为了减少对ES版本以及第三方ES库的依赖，CBoard采取restful + DSL连接与查询模式。所以ES的使用需要使用者（尤其是建模者）对ES基本概念有所了解，之外还需要掌握一些DSL语法。
ES查询需要参数需要精确到Type，Index名称可使用通配符原理与ES DSL查询URL参数一样。
由于ES里面存储的数据大多为明细数据，时间维度聚合的时候粒度需要调整为时间段（date\_histgram），而默认的聚合级别为term也就是关键词，所以在使用时间维度聚合之前需要调整聚合粒度。

#### 4.2.1 Override Aggregations

CBoard提供了三类常见的聚合Bulket覆盖辅助输入，具体可配置参数请参考官方文档[Bucket Aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket.html)
1. date\_hist: 日期类型直方图聚合
2. number\_range: 数字区间聚合
3. number\_range：数字直方图![](/assets/es-override.png)

```json
语法如下(可以重复覆盖多个列的聚合):
{
"columnname":{
"<aggregation_type>" : {
<aggregation_body>
}
}
}
---------------------------------
样例：
对时间戳字段timestamp(long类型)按每10分钟一段进行聚合, 数字memory按自定义区间聚合
{
"timestamp": {
"date_histogram": {
"field": "timestamp",
"format": "yyyy-MM-dd HH:mm:ss",
"interval": "10m",
"time_zone": "+08:00"
}
},
"memory": {
"range": {
"field": "memory",
"ranges": [
{
"to": 10000
},
{
"from": 10000,
"to": 30000
},
{
"from": 30000
}
]
}
}
}
```


#### 4.2.2 相同列不同聚合Bucket设置

在4.2.1中的聚合覆盖设置在数据集查询之上，相当于全局查询列聚合覆盖；同时如果想对一个列采取多种分桶策略，可以在Schema树上多次引用可选列，然后编辑custom信息

![dd](/assets/selects_custom_override.png)

```json
{
"esBucket": {
"<aggregation_type>" : {
<aggregation_body>
}
}
}
```

**注意：esBucket为内置关键词，不能替换**



#### 4.2.3 高级聚合表达式

除了常规聚合统计之外，ES的聚合表达式还支持[Filter Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filter-aggregation.html), 用作条件统计，或者静态占比

```json
语法如下:
count/sum/avg/max/min("{
'coulumn': '用于聚合的column',
'filter': <filter_body>
}")
-------------------------------
count("{
'column': 'orderId',
'filter': {
'term': {
'order.platform': 'online'
}
}
}")
```

![](/assets/ES-CM.png)
CBoard也内建了一些常用过过滤器输入辅助
![](/assets/es-cm-completer.png)

## 准实时数据集

实时刷新时间间隔可以保持空，留空则不做后台刷新，填入大于0的值看板展示的是会按设置的时间间隔刷新数据集

#
图表设计

---

**图表设计-&gt;new-&gt;数据源（下拉选择）**

## 获取数据

### 已有数据集

已有数据集能够加载之前预定义的聚合表达式
![aa](https://raw.githubusercontent.com/yzhang921/CloudResource/gif/gif/cboard/use_dataset.gif)

### 读取JDBC数据

默认获取数据方式为读取已有数据集，点击切换为查询获取数据之后，选择要查询的**JDBC数据源**需要填写读取数据对应的_SQL TEXT_，真正实现**Type SQL, Get Chart的体验**
![image](https://cloud.githubusercontent.com/assets/6037522/21214061/62f937b6-c2d3-11e6-9d68-71ab6d6c947c.png)

### 读取Saiku数据

**Saiku数据**需要填写Saiku Repository下面保存查询的path

| Saiku Repository | CBoard Saiku Query |
| --- | --- |
| ![image](https://raw.githubusercontent.com/yzhang921/CloudResource/gif/gif/cboard/Saiku Rep.jpg) | ![image](https://raw.githubusercontent.com/yzhang921/CloudResource/gif/gif/cboard/saikuquery.jpg) |

## 图表设计

![](/assets/config_widget.png)

* **【图表列表区】**
* 显示已保保存的图表
* 左上角功能键可以新建、复制、编辑、删除图表，除新建图表外，其他的操作需要先选中单个图表
* 删除也一样只能删除单个图表
* 用户在保存列表名称时候按照\[Folder\]?/\[SubFolder\]\*/\[图表名称\]的格式保存之后，会自动目录树结构
* 列表中的文件加为虚拟目录，实际上并不存在文件夹实体
* **鼠标双击图表**进入编辑状态
* 选中图表**键盘Delete**可以快捷删除一个图表
* **【查询区】**
* 查询区默认为选择已经保存的数据集\(Cube\)
* 下方两个功能按钮分别为切换查询方式\(在数据集与新建AD-Hoc查询之间切换查询\)，加载数据（JDBC离线数据源数据会加载至服务端缓存，支持数据源聚合的连接对应的查询只会加载模型）
* **【当前操作状态】**
* **新建\(New\)**状态：新建状态下每次保存都会新建或者另存一个图表，方便连续设计不同粒度的不同展示形态的多张图表，当然也可以通过复制功能，复制之后再进入编辑
* **注意**：新建状态下如果不需求图表名称，连续点击保存会提示重名错误
* **编辑\(Edit\)**状态：修改保存至影响当前报表，可以重复点击保存
* **【模型区】**
* 模型区的层级结构\(Hierarchy\)需要在数据集设计页面提前定义，否则只能看到原始的可选列属性
* 模型包含4个一级分类节点
* **维度\(Dimensions\)**
* 层级下面的列在支持下钻的图表组件下面可以进行下钻/上卷操作
![](/assets/drill_table.gif)
* **度量\(Measures\)**
* **二次计算指标\(Calulated Measures\)**
* 预先定义： 数据集预先定义只能使用，不能修改，不能查看具体内容；数据集上对指标进行修改会影响图表；数据集中删除已经在图表中使用的指标会导致图表运行失败
* **+** 新建: 新建的计算指标可以修改，只在当前图表有效，其他图表中不可见
* 只在单列上的聚合操作可以不使用计算维度
* **过滤器\(Filter\)**
* 预先定义： 数据集预先定义只能使用，不能修改，不能查看具体内容
* **【设计区】**
* 图表名称格式如：\[Folder\]?/\[SubFolder\]\*/\[图表名称\]
* 图表类型切换：不同类型的图表对于输入有不同的限制，鼠标放置在图表类型ICON上面有详细提示，点亮状态下为理论可切换状态
* 通过拖拽至设计区输入栏进行OLAP设计
| 设计区目标框 | 模型区节点类型 |
| :--- | :--- |
| **行维**框、**列维**框、**过滤**框 | **维度**\(Dimension\)节点 |
| **指标/值**框 | 指标列节点、可选表达式节点 |
| **过滤**框 | 维度节点、过滤器节点 |
* 功能按钮
* 预览
* 预览查询：用于查看、调试数据源聚合查询下动态查询脚本
* 保存
* 取消：暂时没有功能
* **【预览区】**
预览图形

### 基本原理★

OLAP多维分析的数据理论上都基于多维数据，多个序列加上相同的index，数据上与之对应最直观的展现为交叉表，交叉表原理同Excel的透视表

| 交叉表组成 | 图表设栏 |
| :--- | :--- |
| 行表头 | 行维栏放置的胶囊 |
| 列表头 | **列维栏**放置的胶囊 与 **值栏**胶囊的组合 |
| 中间交叉处对应的聚合数据 | 交叉表头查询条件的数据集合+聚合函数 |

* 对应关系如下图所示，交叉表的表头合并只有在表头排序正确的情况下才能正确合并
* 开始图表设计之前请先理解此处的对应关系。后续所有图表对应的数据都和交叉表相关

![](/assets/cross_table.png)

### 维度过滤/切片排序

* 放置在**行维**与**列维**上面的**胶囊**点击编辑按钮可以进行数据过滤
* 也可以放置**维度**在**过滤**栏单纯对数据进行过滤
* 为了防止某个维度下面成员数量过大，或者误把连续值如时间戳之类的维度不经处理直接放置在维度框，引起服务端数据源查询压力过大，所以再加载维度成员之前加入了确认操作
![](/assets/filter.png)
![](/assets/Range_Filter.png)
* 过滤比较只支持字符串和数值型比较，由于不同数据库的时间函数处理不一样，但是大多数数据库的时间都能与一个标准的日期字符串进行比较，可能某些数据库会有由于数据类型转换引起的索引失效，这里没有特殊处理，请数据准备的时候在这块进行一些预处理，时刻使用预览查询进行调试
* 值上的列也可以排序和过滤（0.3之后）
* 支持输入值域范围比较
* TOP N展示
* 从交叉表的形式可以看出，在值排序与行表头排序是冲突的，**行排序、各值排序有且仅有一个生效**

![bb](https://raw.githubusercontent.com/yzhang921/CloudResource/gif/gif/cboard/filter.gif)

### 柱线图

每列显示显示为一条线，或者一个柱形图序列。柱线图有着很多的图形类别，如百分比堆叠图、折线堆叠图、折线面积图等。
![](/assets/line_bar.png)

| 设计区 | 图表 | 要求 |
| :--- | :--- | :--- |
| 行维 | X轴 | 放置一个或者多个维度节点 |
| 列维 | 分类 | 放置0个或者多个维度节点 |
| 指标 | | 放置1个或者多个指标节点\(**请不要在没有放置指标的时候反复的问我们为什么没有图形出来**\) |
| 添加轴 | 显示双轴 | 建议为不同的轴配置成不同的图形类别，如：柱线 |
| 垂直/水平 | X/Y轴位置互换 | |

### 饼图

每列显示一个饼图

![](/assets/chart_pie.png)

| 设计区 | 图表 | 要求 |
| :--- | :--- | :--- |
| 行维 | 极坐标系的径向轴 | 放置1个或者多个维度节点 |
| 列维 | 分类 | 放置0个或者多个维度节点 |
| 指标 | | 放置1个或者多个指标节点\(**请不要在没有放置指标的时候反复的问我们为什么没有图形出来**\) |
| 添加轴 | 显示双轴 | 建议为不同的轴配置成不同的图形类别，如：环形图和饼图 |
| 垂直/水平 | X/Y轴位置互换 | |

### KPI

KPI输入没有维度信息，只有**一个度量值**，可选择颜色和数字格式化，格式化Formtter参考[numbro做format](http://numbrojs.com/format.html)

### 漏斗图

一般情况下一个漏斗需要显示如 \_展示-&gt;点击-&gt;提交-&gt;付款, 一连串不同度量的数值， 在交叉表里面为值轴放置的多个列
行里面的值会按大小自动排序之后形成漏斗
**所以漏斗图一行一个漏斗**， 下面的Demo没有实际意义，仅仅作为演示说明

![](/assets/chart_funnel.png)

### 桑基图

![](/assets/Sanky.png)

以行值和列值为节点，单元格为**行到列**的连接进行画图，交叉表可以视为一个连接矩阵
有很多人问为什么自己的桑吉图没有层级，其实桑基图的层级和你的数据本身有关
数据里面有
A -&gt; B 和 B -&gt; C， B为中间层，就会自动适配出两层
另外注意一点EChart对数据要求，不能成环 \(A-&gt;B..-&gt;A\)

### 雷达图

一列数据在雷达上绘制一个网 ![](/assets/Chart_Radar.png)

### 气泡图

| 设计区 | 图表 | 要求 |
| :--- | :--- | :--- |
| 行维 | X轴 | 放置一个或者多个维度节点 |
| 列维 | 分类 | 放置0个或者多个维度节点 |
| 值 | Y轴、气泡大小、颜色深度 | 每个指标节点对应一个属性 |

![](/assets/Chart_Bubble.png)

#### 对比图

| 设计区 | 图表 | 要求 |
| :--- | :--- | :--- |
| 行维 | Y轴 | 只能放置一个维度节点 |
| 指标 | X轴左右两边 | 只能放置两个指标节点 |

![](/assets/chart_contrast.png)

### 标签云

根据多个行维生成笛卡尔积个标签。

![](/assets/chart_wordcloud.png)

### 矩形树图

| 设计区 | 图表 | 要求 |
| :--- | :--- | :--- |
| 行维 | 多个行维代表多层，用颜色来区分类目 | 放置一个或者多个维度节点 |
| 指标 | 用面积来表示数值  | 放置1个指标节点|

![](/assets/chart_treemap.jpg)

### 热点图

| 设计区 | 图表 | 要求 |
| :--- | :--- | :--- |
| 行维 | x轴 | 放置1个或者多个维度节点 |
| 列维 | 分类 | 放置0个或者多个维度节点 |
| 指标 | | 放置1个指标节点 |

![](/assets/chart_calender.png)

### 关系图

| 设计区 | 图表 | 要求 |
| :--- | :--- | :--- |
| 行维 | 中心点集 | 放置1个或者2个维度节点 |
| 列维 | 分类 | 放置1个或者2个维度节点 |
| 指标 |  | 放置1个指标节点 |

![](/assets/chart_relation.png)

#
看板设计

---

**我的看板**为当前用户创建的看板，普通看板分类通过**分类管理**维护，保存看板时选择对应分类, 看板分类的添加需要有管理权限，建议超级管理员统一维护

## 网格布局

* 网格看板设计采用简单Row+Column布局模式，每行总长度为12，每列对应一个图表，行高度可以调节单位为像素，列高度继承行高；
* 交叉表默认行高要比普通图表高一些，使用时建议把表格单独放置一行，如果表格里面数据行过少，再自己调整合适的行高
* 演示动画和最新版本会有一些微小的差别
![board design](https://raw.githubusercontent.com/yzhang921/CloudResource/gif/gif/cboard/board_degin.gif)

## 时间轴布局

* 时间轴布局适合总分结构、有强业务先后步骤的看板设计
* 看板结构组成
* **看板参数行（Param Row）**：有且仅有一行，而且只能在看板最顶端，参数栏为空的时候展示页面不会显示参数行
* **主节点（Main Node）**
* 一个看板下面可以有多个主节点
* 主节点可以有节点名称，在左侧时间线上可以看到，节点名称尽可能精简，太长会导致显示溢出
* 主节点对应看板：需要填写主**标题（Main Title）**
* **子节点（Sub Node）**
* 一个主节点下面可以有0到多个子节点，每个子节点都可以视为一个独立的看板
* 子节点收起状态数据不会加载

### 节点展开状态

![](/assets/TimeLineBoard.png)

### 节点收起状态

![](/assets/timeline_collapse.png)

## 看板参数

v0.2新增面板参数功能，利用面板参数可以在Dashboard展示页面支持用户数据交互；面板参数实质是关联在当前看板包含图表的数据集或者查询的列之上

v0.3.2新增滑动条交互的参数![](/assets/config_param_slider.png)

* 我们在使用Elasticsearch展示实时数据时，发现需要使用到时间戳作为查询参数，而时间戳是连续变量，而且值内容相对可以预判，没有必要从数据源查询获取，而且select的交互方式不太直观，这促使我们加入了滑动条参数交互
* 滑动条的序列值是自动生成的**数字**，数字能够用作时间戳格式化为日期字符串
* 我们知道自动生成一个序列需要知道序列的
* **最小值\(Min\)**、**最大值\(Max\)**：内置时间戳变量_now\(N,'M/d/h'\)_，当前时间偏移N个时间单位\(M月/d天/h小时\)对应的时间戳
* **步长\(Step\)**：内置步长时间戳变量_interval\(N,'d/h/m/s'\)_，d天/h小时/m分钟/h小时
* 滑动调要设置区间\(interval\)
* **初始化范围（Default Range）**
* **最大允许范围（Max Range）**
* 显示在页面上可以控制滑动条
* **宽度\(Width最大12\)**、为了让时间戳有更好的可读性可以指定**显示格式化\(View Format\)**
* 时间戳交互是不用设置**值格式化\(Value Format\)**；用于日期类型交互时需要设置值格式化

### 下拉ParamType\(交互类型\)选择Slider

![](/assets/slider_param.png)

### 利用面板参数实现不同数据集之前的联动

一个参数可以关联到多个Cube/查询的相同或者不同列之上，面板上选择设置参数值的操作类型\(&gt;, &lt;, &gt;=, &lt;=, =, ≠, 区间范围\)之后，该值会以过滤形式过滤所有关联cube的值。如：下图新建一个名称为**year**的参数，同时关联到了三个cube的不同名称的列之上。

### 添加面板参数

* **注意面板参数只能用户维度列上面，不能用于值列之上**
![case4-addboardparam](https://cloud.githubusercontent.com/assets/6037522/21478022/74216f2e-cb82-11e6-9612-390a2f93184c.gif)

### 使用面板参数

![case4-useparam](https://cloud.githubusercontent.com/assets/6037522/21478021/73f81fe8-cb82-11e6-95ea-d98b43a4abf2.gif)

## 参数模板

![](/assets/board_param_template.png)

当看板参数过多的，或者参数成员组成比较复杂的时候，可以把当前参数保存为模板。第二次登陆，或者会话过期之后可以快速加载参数
看板参数绑定和用户绑定，每个用户可以保存自己特定的参数模板


#
看板设计

---

**我的看板**为当前用户创建的看板，普通看板分类通过**分类管理**维护，保存看板时选择对应分类, 看板分类的添加需要有管理权限，建议超级管理员统一维护

## 网格布局

* 网格看板设计采用简单Row+Column布局模式，每行总长度为12，每列对应一个图表，行高度可以调节单位为像素，列高度继承行高；
* 交叉表默认行高要比普通图表高一些，使用时建议把表格单独放置一行，如果表格里面数据行过少，再自己调整合适的行高
* 演示动画和最新版本会有一些微小的差别
![board design](https://raw.githubusercontent.com/yzhang921/CloudResource/gif/gif/cboard/board_degin.gif)

## 时间轴布局

* 时间轴布局适合总分结构、有强业务先后步骤的看板设计
* 看板结构组成
* **看板参数行（Param Row）**：有且仅有一行，而且只能在看板最顶端，参数栏为空的时候展示页面不会显示参数行
* **主节点（Main Node）**
* 一个看板下面可以有多个主节点
* 主节点可以有节点名称，在左侧时间线上可以看到，节点名称尽可能精简，太长会导致显示溢出
* 主节点对应看板：需要填写主**标题（Main Title）**
* **子节点（Sub Node）**
* 一个主节点下面可以有0到多个子节点，每个子节点都可以视为一个独立的看板
* 子节点收起状态数据不会加载

### 节点展开状态

![](/assets/TimeLineBoard.png)

### 节点收起状态

![](/assets/timeline_collapse.png)

## 看板参数

v0.2新增面板参数功能，利用面板参数可以在Dashboard展示页面支持用户数据交互；面板参数实质是关联在当前看板包含图表的数据集或者查询的列之上

v0.3.2新增滑动条交互的参数![](/assets/config_param_slider.png)

* 我们在使用Elasticsearch展示实时数据时，发现需要使用到时间戳作为查询参数，而时间戳是连续变量，而且值内容相对可以预判，没有必要从数据源查询获取，而且select的交互方式不太直观，这促使我们加入了滑动条参数交互
* 滑动条的序列值是自动生成的**数字**，数字能够用作时间戳格式化为日期字符串
* 我们知道自动生成一个序列需要知道序列的
* **最小值\(Min\)**、**最大值\(Max\)**：内置时间戳变量_now\(N,'M/d/h'\)_，当前时间偏移N个时间单位\(M月/d天/h小时\)对应的时间戳
* **步长\(Step\)**：内置步长时间戳变量_interval\(N,'d/h/m/s'\)_，d天/h小时/m分钟/h小时
* 滑动调要设置区间\(interval\)
* **初始化范围（Default Range）**
* **最大允许范围（Max Range）**
* 显示在页面上可以控制滑动条
* **宽度\(Width最大12\)**、为了让时间戳有更好的可读性可以指定**显示格式化\(View Format\)**
* 时间戳交互是不用设置**值格式化\(Value Format\)**；用于日期类型交互时需要设置值格式化

### 下拉ParamType\(交互类型\)选择Slider

![](/assets/slider_param.png)

### 利用面板参数实现不同数据集之前的联动

一个参数可以关联到多个Cube/查询的相同或者不同列之上，面板上选择设置参数值的操作类型\(&gt;, &lt;, &gt;=, &lt;=, =, ≠, 区间范围\)之后，该值会以过滤形式过滤所有关联cube的值。如：下图新建一个名称为**year**的参数，同时关联到了三个cube的不同名称的列之上。

### 添加面板参数

* **注意面板参数只能用户维度列上面，不能用于值列之上**
![case4-addboardparam](https://cloud.githubusercontent.com/assets/6037522/21478022/74216f2e-cb82-11e6-9612-390a2f93184c.gif)

### 使用面板参数

![case4-useparam](https://cloud.githubusercontent.com/assets/6037522/21478021/73f81fe8-cb82-11e6-95ea-d98b43a4abf2.gif)

## 参数模板

![](/assets/board_param_template.png)

当看板参数过多的，或者参数成员组成比较复杂的时候，可以把当前参数保存为模板。第二次登陆，或者会话过期之后可以快速加载参数
看板参数绑定和用户绑定，每个用户可以保存自己特定的参数模板




