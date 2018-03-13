<h1> 数据集管理 </h1>

---

<div class="bs-callout bs-callout-info">
    <h4>数据集：</h4>
    <b>数据集</b>类似于OLAP分析的Cube(数据立方体)，可以提前定义<code>查询、聚合表达式、动态时间漏斗</code>。在用户<mark>数据模型比较稳定</mark>的前提下，可以减少相同数据集下不同表报设计时重复的填写查询脚本、新建聚合表达式工作。
</div>

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

<pre><code class="SQL">SELECT a, b, c, <span class="text-danger"><b>e, f, g</b></span>
      sum(xx) AS m1, count(yyy) AS m2
 FROM fact a
 JOIN dima a ON ...
 JOIN dimb b ON ...
GROUP BY a, b, c, <span class="text-danger"><b>e, f, g</b></span></code></pre>

!> <b>0.2</b>之前的查询数据结果数据会全部读取到浏览器端，OLAP操作都在浏览器端进行，使用不当的情况下会造成客户端浏览器压力巨大。<br/>
<b>0.3</b>引入数据源聚合，实现了JDBC、Kylin、Elasticsearch的数据源聚合功能。同时考虑到小企业存在原始数据大、数据源配置低，但是需要分析的最终数据较小的应用场景，所以保留了离线数据集特性，使用时只需在JDBC数据源创建时不要勾选数据源聚合即可。

## 1 数据集模型定义

数据集的schema包含<code>维度列、度量列、聚合表达式、预定义漏斗</code>

* 选择数据源，填写对应的查询脚本，JDBC数据源为查询SQL，读取数据
* 读取数据成功之后，可选列和Schema空树出现在页面下方
* 拖拽左边方框的列到右边维度节点/度量节点下方，也可以通过点击左边的可选列，快速把列添加到schema，默认添加到维度节点，之后可通过功能键<kbd>切换到度量</kbd>
* 一个列可在不同的维度层级下多次使用，如：年-&gt;月-&gt;日，年-&gt;周-&gt;日
* 维度列在图表设计时只能拖拽到维度栏；指标\(度量\)列只能退拽到指标栏，聚合函数需要在设计时选定
* 加入Schema树的列可以编辑修改<kbd>别名</kbd>
* <kbd>添加层级、修改层级名</kbd>，之后拖拽相应的列到层级组节点下
* <span class="text-danger">层级是图表下钻基础</span>
* 计算表达式和过滤组通过<kbd>点击添加新建</kbd>
![image](../../../assets/schema.png)

## 2 预定义聚合表达式

1. 编辑聚合表达式并测试正确，表达式是用于聚合后再计算.  
如: <code>Math.log\(sum\(columnA\)/count\(columB\)\)</code>, <kbd>check</kbd>按钮只能检测到表达式的格式是否基本正确，复杂表达式不能保证验证成功之后后续100%能够工作
2. 0.3编辑栏替换为ace编辑器之后之前的点击辅助输入出现了一些兼容性问题，可以借助输入提示输入!  
![image](../../../assets/952a5bfc-c2ce-11e6-89c9-fd15b514c173.png)

3. 数据集中预定义的聚合表达式在图表设计时不支持修改

## 3 预定义漏斗（过滤器）

用于预定义动态日期窗口，点击下拉选择动态时间表达式模板，模板中的值可以编辑文本。用户可根据自己的需求改成任意大小时间窗口。
![](../../../assets/pre-filter.png)

## 4 特殊数据集的查询定义说明

### 4.1 Kylin Native
![image](../../../assets/KylinDataSet.png)
<div class="bs-callout bs-callout-info">
    使用Kylin数据源之前需对Kylin基本原理有所了解。
    需要填写项, 以及解释如下：
    <ul>
        <li><b>Kylin Project</b>：对应Kylin本身的Project</li>
        <li><b>Data Model</b>：对应Kylin Model</li>
    </ul>
</div>


### 4.2 Elasticsearch
![](../../../assets/es_dataset.png)
<div class="bs-callout bs-callout-info">
    为了减少对ES版本以及第三方ES库的依赖，CBoard采取<mark>restful + DSL连接与查询模式</mark>。所以ES的使用需要使用者（尤其是建模者）对ES基本概念有所了解，之外还需要掌握一些DSL语法。
    ES查询需要参数需要精确到<code>Type，Index</code>名称可使用通配符原理与ES DSL查询URL参数一样。  
    由于ES里面存储的数据大多为明细数据，时间维度聚合的时候粒度需要调整为时间段<code>date_histgram</code>，而默认的聚合级别为<code>term</code>也就是关键词，所以在使用时间维度聚合之前需要调整聚合粒度。
</div>



#### 4.2.1 Override Aggregations

CBoard提供了三类常见的聚合Bulket覆盖辅助输入，具体可配置参数请参考官方文档[Bucket Aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket.html)

1. date\_hist: 日期类型直方图聚合
2. number\_range: 数字区间聚合
3. number\_hist：数字直方图

![](../../../assets/es-override.png)

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


#### 4.2.2 相同列不同聚合Bucket设置(Custom扩展)

在4.2.1中的聚合覆盖设置在数据集查询之上，相当于全局查询列聚合覆盖；同时如果想对一个列采取多种分桶策略，可以在Schema树上多次引用可选列，然后编辑custom信息

![dd](../../../assets/selects_custom_override.png)

```json
{
  "esBucket": {
    "<aggregation_type>" : {
      <aggregation_body>
    }
  }
}
```
<div class="admonition warning">
  <p class="admonition-title"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> 注意:</p>
   <code>esBucket</code>为内置关键词，不能替换
</div>



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

![](../../../assets/ES-CM.png)

!> CBoard也内建了一些常用过滤器输入辅助

![](../../../assets/es-cm-completer.png)

## 5 准实时数据集

实时刷新时间间隔可以保持空，留空则不做后台刷新，填入大于0的值看板展示的是会按设置的时间间隔刷新数据集

