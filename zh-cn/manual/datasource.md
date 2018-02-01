<h1> 数据源管理 </h1>

<div class="bs-callout bs-callout-info">
    <h4>目前CBoard支持以下数据源连接：</h4>
    <ul>
        <li>JDBC数据源</li>
        <li>ElasticSearch 1.x, 2.x, 5.x (原生读取Index与Mapping，根据用户拖拽生成查询DSL)</li>
        <li>Kylin 1.6 (原生读取kylin Model，根据用户拖拽生成查询SQL)</li>
        <li>TextFile (文本文件，文本需要存放于CBoard应用服务器上面，读取本地文件)</li>
        <li>Saiku2.x (读取Saiku图表数据而非集成Saiku生成图表)</li>
    </ul>
</div>


操作路径图如下：

![](/assets/new_datasource.png)

## 1 JDBC数据源

我们来点实际的，在此我们不纯粹为了宣传而罗列各种数据库产品，懂JDBC原理的都知道没有意义。<b class="bg-info">基本上所有关系型数据库都能支持.</b>
<p>或许会存在一点点语法兼容问题，但是修改起来都比较简单。遇到后台日志抛语法错误异常请在github上面提issue，附上详细的异常日志，和操作步骤，我们会协助解决，更加欢迎提PR合并解决方案到我们的版本。
目前我们生产环境上连接的是MySQL和SQLServer。</p>
![](/assets/jdbc-datasource.png)

### presto
另外，**Presto也是通过JDBC的方式连接**。Presto的JDBC连接认证**没有用户名密码认证机制**，用户名和密码输入留空即可。
![](/assets/datasource-presto.png)

### Impala
**Impala也是通过JDBC的方式连接**，Impala的JDBC连接驱动可以是Impala自己的驱动`com.cloudera.impala.jdbc4.Driver`
，也可以是Hive的驱动`org.apache.hive.jdbc.HiveDriver`。</p>
使用Impala驱动时无认证的URL为`jdbc:impala://localhost:21050/default`，有认证的URL为`jdbc:impala://localhost:21050/default;AuthMech=3`。</p>
使用Hive驱动时无认证的URL为`jdbc:hive2://localhost:10000/default;auth=noSasl`，有认证的URL为`jdbc:hive2://localhost:10000/default`。

### 关于Hive和Spark
理论上Hive、Spark-SQL也可以通过JDBC的方式连接，考虑到二者执行效率都不是太高不适合做及时交互查询引擎。不推荐引入

### 驱动引入方式

!> 添加JDBC数据源之前确认<code>WEB-INF\lib</code>下面已经包含了对应的JDBC驱动包，<b>MySQL/SQLServer/Kylin的JDBC驱动不需要额外引入。</b>
1. Maven方式在打包之前修改pom.xml(推荐),下面是mysql的maven依赖：

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.24</version>
</dependency>
```

2. 应用在Web容器解包之后拷贝驱动到<code>WEB-INF\lib</code>，之后**重启Tomcat**

    * 填写完毕之后可以点击**测试**按钮，输入简单的sql查询测试数据源与CBoard之间的连通性
    * 0.3新增两项配置
    * <code>是否使用连接池</code> 设置数据源是否通过druid连接池的方式连接数据源
    * <code>数据源聚合</code> 0.3之后的版本支持聚合下推数据源

## 2 Kylin 1.6数据源

### JDBC方式连接

<span class="text-primary">0.2版本</span>添加了kylin的jdbc依赖，可以直接连接，连接方式如下

```
Driver ：org.apache.kylin.jdbc.Driver
JdbcUrl：jdbc:kylin://<host>:<port>/<project>
```

用JDBC方式连接Kylin可以选数据源聚合也就是聚合下推Kylin，或者使用CBoard提供的内置聚合器，通过查询预聚合返回小的结果集，结果集缓存在CBoard服务器上做二次聚合。 聚合下推原理参照[性能优化章节](../discuss/optimize.md)。
<div class="admonition warning">
  <p class="admonition-title"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> 注意:</p>
  <p>**非数据源聚合的连接，切记注意数据集或者Query查询结果集大小。**</p>
</div>

![image](/assets/6d91308c-c2cb-11e6-8366-3422662c0837.png)

<div class="bs-callout bs-callout-warning">
    <h4>关于Kylin1.6对子查询支持结果异常问题：</h4>
    CBoard中采用的基于数据集定义的子查询嵌套之后group by的形式聚合下推数据源。
    我们在实际使用中遇到过查询结果不准的bug，遇此情况可以通过图表设计模块下预览查询功能查看调试实际执行的Query。
    <p>或者改用下面Kylin原生数据源</p>
</div>

### Kylin原生连接

<span class="text-primary">0.3版本</span>之后支持连接Kylin1.6原生通过restful接口读取解析Kylin数据模型，
<p><span class="text-danger">kylin2.x由于返回的json元数据定义有所改动</span>，<span class="text-primary">0.5版本</span>已经做好了兼容，但是未最终发布，敬请期待！</p>
<div class="bs-callout bs-callout-info">
   **原生连接模式下聚合操作只会在数据源进行。**
</div>

![](/assets/kylin-native-datasource.png)

## 3 Elasticsearch

为搜索而生的ES，最近几年在数据分析领域使用得越来越广，ELK技术栈中可视化工具，Kibana5之前的版本基本不具备多维分析功能，Kibana5具备了简单的指标分组split metric功能，但是还是缺少不同聚合指标的计算功能（常用于计算转化率与占比之类的需求）（P.S. 或许是本人还不会用，有说错的地方请指正），所以CBoard0.3版本更新特意在原计划之外评估比较和Saiku3数据源的支持之后决定选择先支持ES。  
### ES 数据源配置
![](/assets/es-datasource.png)

### 连通性测试
![](/assets/ds-test-es.png)

## 4 Saiku2.x

CBoard实现了对Saiku2.6的数据源连接，Saiku3.x的Restful接口相比2.6有些变动，暂不支持。Saiku生成图表的样式和CBoard本身不太搭配，这里Saiku集成读取Saiku图表数据把Saiku保存之后的图表通过Restful请求查询，返回数据作为数据集，再在CBoard上渲染生成图表，而非集成Saiku生成图表。

### Saiku数据获取**说明**

用过Saiku的可能会在这里产生疑问，Saiku的交叉表行列表头往往有层级关系，下图展示了一个2级列表头  

![](/assets/saiku_crtbl.png)  
当前CBoard获取数据的默认以粒度最小的列作为表头，**两级表头会合并为一级**，合并之后新的表头效果如下图所示：  

![](/assets/saiku_crtbl_header.png)

## 5 TextFile 文本数据源

文本数据只能读取CBoard应用服务器本地文件，使用者需要自己架设ftp服务器单独维护文本文件的上传与管理。

![](/assets/datasource-textfile.png)

