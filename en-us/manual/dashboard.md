<h1> Dashboard Design </h1>

---

`My Dashboard` is the list of board which created by current user. The category of dashboard is maintained by Administrator.
It is recommended that be supervised and maintained by super administrators.

## Grid layout

* Use simple Row+Column layout pattern. The total length of each row is 12, and each column contains a chart. The row height can be adjusted in pixels and the column height inheritance row height;
* The default row height of the cross table is higher than the general chart. When using, it is recommended to place the table in a separated row. If the data rows in the table are too few, adjust the suitable row height;
* There will be a little difference between the demo animation and the latest version

![board design](https://raw.githubusercontent.com/yzhang921/CloudResource/gif/gif/cboard/board_degin.gif)

## Timeline layout

* The timeline layout is suitable for the the overall / partial structure dashboard
* Composition of dashboard structure
    * `Param Row`: there is and only one row, and can only be at the top of the dashboard and the parameter row does not display when the parameter bar is empty.
    * `Main node` 
        * A dashboard can contains multiple main nodes
        * The main node can have a name which can be seen on the left time line
        * The dashboard corresponding to the main node requires `main title`
    * `Sub-Node`
        * A main node can have 0 or more sub nodes, each of which can be considered as an independent dashboard.
        * Data will not be loaded when the sub node is collapsed

### Node unfold state

![](../../../assets/TimeLineBoard.png)

### Node fold state

![](../../../assets/timeline_collapse.png)

## Dashboard parameter

The feature of dashboard parameters were added in version 0.2, it can be used to support interacting in Dashboard display page;
Panel parameters are essentially linked with the column of the data set or a query that in this Dashboard.

Slide type parameter is added in v0.3.2
![](../../../assets/config_param_slider.png)

* We use the `Elasticsearch` for displaying real-time data, found the timestamp as a query parameter, but the timestamp is a continuous variable but the value of relative content can predict. so there is no need to get the time range from  query. Also interaction on `selector` is not intuitive, which prompted us to add the `slider type` interaction parameter
* the sequence value of a `slider` is an automatically generated number, and the number can be used as a timestamp and formatted as a date string
* We know that automatic generation of a sequence needs to know the sequence
    * Minimum value (Min), maximum (Max): built-in timestamp variable `now(N,'M/d/h')` present a the timestamp that corresponding current time offset N time unit (M month /d days /h hours)
    * Step: built-in step length timestamp variable interval `interval(N,'d/h/m/s')`, D: days /h: hours /m: minutes /h: hours
    * Slide needs to set the interval
    * `Default Range`
    * `Max Range`
    * Display Width (maximum 12), and
    * view format can be specified in order to make the timestamp readable.
    * Timestamp interaction does not have to set `value format`
    * Date type have to set `value format`

![](../../../assets/slider_param.png)

### Charts linked with parameter

A parameter can be linked to different column among multiple Cube or queries.
After select the type of operation  (>, <, > =, < =, =, =, range) that for setting parameter value, the value will filter the values of all associated cube. For example, the following figure creates a new parameter named year, which is linked with columns of different names in three cube.

!> Don't link parameter to a measure column
![case4-addboardparam](https://cloud.githubusercontent.com/assets/6037522/21478022/74216f2e-cb82-11e6-9612-390a2f93184c.gif)

### Use Parameter
![case4-useparam](https://cloud.githubusercontent.com/assets/6037522/21478021/73f81fe8-cb82-11e6-95ea-d98b43a4abf2.gif)

## Save parameter template
![](../../../assets/board_param_template.png)

When the dashboard parameters are too much, or when the group of the parameter`s member is very complex, you can save the current parameters as a template.
Then, next time after login, you can quickly reload back the parameters, bind dashboard parameter and bind with user, each user can save his specific parameter template.