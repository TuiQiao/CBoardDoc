<h1> DataSet </h1>

<div class="bs-callout bs-callout-info">
    <h4>DataSet：</h4>
    **DataSet** is similar to the cube of OLAP analysis. You can define the `query` , `calculated measures`, `dynamic filters` in advance. It's very useful when data model is relatively stable. Using dataset can avoid repeated input query scripts, create new aggregate expressions, and improve the efficiency of Dashboard loading(Dataset cached by id).
</div>

The difference of CBoard dataset against cube of other product is the model  is very light weight. Any simple query result set can be used as a cube. Cube update is simple and directly needn't conventional model tedious update steps(modification, release, test). For example, for the first business requirement needs you choose columns a, b, c, d four columns as dimensions of the a Cube, query as blow:

```sql
SELECT a, b, c,
       sum(xx) AS m1, count(yyy) AS m2
  FROM fact a
  JOIN dima a ON ...
  JOIN dimb b ON ...
 GROUP BY a, b, c
```

After a new demand, you need to introduce the new dimension columns: e, f, g. Under CBoard light model concept you just need to simply modify the query or copy as a new query then update script as below:

<pre><code class="SQL">SELECT a, b, c, <span class="text-danger"><b>e, f, g</b></span>
      sum(xx) AS m1, count(yyy) AS m2
 FROM fact a
 JOIN dima a ON ...
 JOIN dimb b ON ...
GROUP BY a, b, c, <span class="text-danger"><b>e, f, g</b></span></code></pre>

!> Before version `0.2`, all the result set will be load into your explorer for quick OLAP operation. Web explorer will be crashed by big volume dataset. <br/>
From version `0.3`, we introduced data source aggregation mechanism to make full use of calculation ability of all kinds distributed cluster data source in big  data era. As of now we completed data source aggregation feature in JDBC, Kylin, Elasticsearch. Consideration about use case of small size enterprise, there is not very large size data, their hardware is not very powerful and also they are not always want to do analysis begin at raw data. So we keep the offline dataset function.

## 1 Configure Dataset Model

A schema of dataset includes `measures`, `dimensions`, `calcuated measures` and `pre-defined filter groups`.

Choose a datasource instance, input query script or query parameter of that type of datasource, then click read data
* After success load data/metadata, a column list and a blank schema tree will appear at below
Drag the column in left box to the dimension node or measure node at right box, you can also click the optional columns to quickly transmit them to the schema. Default node type is set to dimension node, and then through the function key to switch some of them to the metric node
* A column can be used multiple times at different dimension levels, such as: Year -> Month -> Day, Year -> Week -> Day
Dimension column in the chart design can only drag and drop to the dimension bar; metric \(measure \) column can only be retracted to the measure bar, the aggregate function needs not to be defined at this step
All columns in the schema tree can support set <kbd>alias</kbd>
* <kbd>Add a hierarchy, modify the hierarchy name</kbd>, and then drag the corresponding column to the hierarchy group node
* Hierarchy is the precondition to do chart drill down and roll up

![image](/assets/schema.png)

## 2 Calculated Measures

* Edit calculated measure to do metric calculation after aggregation.
Eg: Math.log\(sum\(columnA\)/count\(columB\)\)
* Use input suggestion
* Calculated Measures can’t be edit during widget design

![image](/assets/952a5bfc-c2ce-11e6-89c9-fd15b514c173.png)

## 3 Filter Group

Filter can be used as dynamic time windows. Select a expression template and then edit size of the window.
![](/assets/pre-filter.png)

## 4 Additional specification

### 4.1 Kylin Native
![image](/assets/KylinDataSet.png)

!> You’d better to have basic knowledge of how kylin works.


### 4.2 Elasticsearch
![](/assets/es_dataset.png)

?>In order to reduce the dependency of Elasticsearch driver jar, CBoard choose to use `restful` + `DSL query` solution to send query to elastic. So you should be better to have some knowledge of DSL syntax for `dataset` configuration. <br/>
`Type` input of ES query is required. `Index name` can be set to a wildcard. <br/>
Since the data stored in the ES are mostly detail data, the granularity of the time dimension needs to be adjusted to the time period `date_histgram`, cboard can automatic derived a date gap by your date range, and you can also override default aggregation configuration as introduced as below:

#### 4.2.1 Override Aggregations

We build in three kinds of commonly used aggregation bucket input suggestions.
Refer Elasticsearch official document for detail introduction [Bucket Aggregations](https://www.elas tic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket.html)
1. `date_hist`: Date Histogram Aggregation
2. `number_range`: Number Range Aggregation
3. `number_hist`：Number Histogram Aggregation

![](/assets/es-override.png)

Override json structure as below (You can override multiple columns’ aggregations by one time writing):
```json
{
  "columnname":{
    "<aggregation_type>" : {
      <aggregation_body>
    }
  }
}
---------------------------------
Example：
Aggregate timestamp (long integer data type by default) by every 10 minutes and a specified number range to memory column.
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


#### 4.2.2 Add multiple bucket setting on a column (Custom)
In section 4.2.1, we explained how to add a global aggregation overwrite on ES index. You can only add multiple aggregation strategies to one column in schema tree node.

![](/assets/selects_custom_override.png)

```json
{
  "esBucket": {
    "<aggregation_type>" : {
      <aggregation_body>
    }
  }
}
```
!> `esBucket` is a reserved keyword, don't miss or change it!



#### 4.2.3 Calculate Measure of ES

Besides normal aggregation algorithms, [Filter Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filter-aggregation.html) is also supported in CBoard

```json
:
count/sum/avg/max/min("{
  'columnName': 'column for aggregation',
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

!> CBoard prepared some input suggestions to improve user experience

![](/assets/es-cm-completer.png)

## 5 Realtime dataset
Input a integer number as interval seconds to reload dataset when dashboard is presented.

