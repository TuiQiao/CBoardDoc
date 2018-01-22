## Introduction
An **open** BI Dashboard platform that supports **interactive** multi-dimensional report design and data analysis. Server side framework is Spring+MyBatis and front-end is based on AngularJS1 and Bootstrap. The whole architecture graphic is as below:

<div style="text-align:center">
  <img class="img-responsive" src="./assets/arch.png"  />
</div>


### Screenshot
![](/assets/cboard_snapshot.png)

### Near Realtime data refresh
**Be attention, refresh level is cube level rather than whole dashboard **

![realtime_demo](/assets/realtime_dashboard.gif)

## Features Of CBoard

* Simple and beautiful interface and layout</li>
* Lightweight architecture and concise source code, the entire project does not rely on any third-party multi-dimensional analysis tools </li>
  * Front page style and layout of CBoard is based on <a href="http://echarts.baidu.com/">AdminLTE2</a></li>
  * The chart plugin uses <a href="http://echarts.baidu.com/">ECharts</a> </li>
  * Javascript uses MVVM AngularJS 1.X framework  </li>
* Interactive, drag-and-drop **OLAP** classisc report development experience
* One dataset, multiple report widgets. Maximize reuse query resoult
* Supports OLAP slice filter operation
* Supports sort multiple columns/rows at the sametime
* Global query cache, to avoid repeated query requests for data
* Support common charts and cross tables</li>
  * Columnar/Stacked vertical and horizontal bar and line mixed chart with dual axis view
  * Pie chart
  * Radar Chart
  * Sanky Chart
  * Funnel Chart
  * KPI Widget
  * Cross-tabulation (Support Drill Down/Roll Up)
  * China Map
  * Bubble Chart
* Support JDBC data connection
* Support Native Elasticsearch connection for version 1.x, 2.x, 5.x
* Support Native Kylin connection for version 1.6
* Support to connect one of the most popular open source multi-dimensional analysis of products **Saiku2**, and will be able to selectively create data and graphics
* Cube level data refresh / realtime chart for quick query
* Easy to implement your own **DataProvider** to connect any data source. Even for expensive commercial BI suite, it's not possible to connect all the NOSQL and NewSQL data source in the era of big data. Due to the schema of NOSQL are various, such as hash tables, arrays, trees, maps, etc., different people using the same NoSQL products designed Schema may vary widely. The user who most familiar with their storage schema are the user themselves. And it's easy to find a Java programmers to code a Class to connect their own data source. So we leave this part of work to the end user with an easy extended data connection framework in CBoard

## Demo
### Load Data from query or DataSet
![case 0-switchdataload](/assets/9a874210-cb7d-11e6-9b7e-11721aac322c.gif)
### Base Operation
![case 1-](/assets/9c2ead88-cb7d-11e6-9ae4-4c1990f675c2.gif)
### Switch Chart
![case2](/assets/9de976b2-cb7d-11e6-8217-4290e5ad039b.gif)
### Type Calculated Measure
![case 3-calculatedmeasures 1](/assets/9f3be54a-cb7d-11e6-882b-ef82bbb5100b.gif)
### Add Dashboard Parameters
![case4-addboardparam](/assets/74216f2e-cb82-11e6-9612-390a2f93184c.gif)
### Use Parameters
![case4-useparam](/assets/73f81fe8-cb82-11e6-95ea-d98b43a4abf2.gif)


## Access Control
**RBAC** (Role Based Access Control), easy admin and view your users' role and roles' access resource list in one page.
- Grant roles to user by left **Grant** button.
- Grant access resource to a role by right **Grant** button.
- Resource can only be granted to role. A user can act as more than one roles.

![image](/assets/UserAdmin_Snap.png)


# Road Map
All tasks are listed in [Issue Page](https://github.com/yzhang921/CBoard/issues) group by milestone.
Also you can get our development status from [Project Page](https://github.com/yzhang921/CBoard/projects)


## Contact us
You can create any issue or requirements through the Issue system of github.
If you like CBoard then use it, contribute to CBoard and **don't forget to star it** :star:
Waiting for your Contribution and pull request!


# Let us kown you are using CBoard
If your company is using CBoard or prepare to use it, please let us known

# Donate (请我们喝咖啡)
![image](/assets/3eb1f00e-46b4-11e7-900f-77d9b1499f6b.png)