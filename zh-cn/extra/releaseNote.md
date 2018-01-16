# 发布日志[V0.4]

<div class="bs-callout bs-callout-info">
    <h4>数据源：</h4>
    <ol>
      <li>Elasticsearch数据源添加登录认证功能</li>
      <li>增加SolrDataProvider，支持数据源聚合</li>
      <li>FileDataProvider添加了CSV和JSON数据格式的解析</li>
      <li>修复FileDataProvider Java 读取UTF-8文件表头好办BOM Bytes导致数据异常</li>
      <li>重构SQL相关DataProvider</li>
      <li>增加Imapla依赖包</li>
    </ol>
</div>

<div class="bs-callout bs-callout-info">
    <h4>数据集：</h4>
    <ol>
      <li>表达式与过滤组设计页面同时显示可选列别名与真实列名</li>
      <li>支持表达式传递引用</li>
      <li>编辑数据集时懒加载离线数据</li>
    </ol>
</div>

<div class="bs-callout bs-callout-info">
    <h4>图表：</h4>
    <ol>
      <li>雷达图增加按行绘制</li>
      <li>交叉表增加左右对其选项</li>
      <li>增加ECharts Gauge(仪表盘KPI)、Liquid（水珠KPI）、WordCloud(词云)、区域地图、标线地图、热点地图、百度GIS地图、日历热力图、柱行对比图、力导向图</li>
      <li>增加图表微调解决方案</li>
      <li>柱线图支持设置值轴最大、最小值，</li>
      <li>改进了图表切换机制，严格按照配置要求激活可切换图表</li>
      <li>ECharts图表组件支持图表间联动，EChart图表关联其他看板</li>
      <li>修复图表过多之后配置要求弹出层位置不正确问题</li>
      <li>增加图表设计沉浸模式，L模式下尽量缩小图表预览区域之外页面占比</li>
      <li>决定放弃D3三级地图</li>
      <li>更好的拖拽用户体验，拖拽设计时高亮目标栏</li>
    </ol>
</div>

<div class="bs-callout bs-callout-info">
    <h4>看板：</h4>
    <ol>
       <li>看板参数支持设置默认值</li>
       <li>允许用户姓名、用户角色作为参数值</li>
       <li>修复看板加载时Loading层重叠，挤压样式问题</li>
       <li>防止点击看板数据刷新时，相同离线数据集重复加载</li>
       <li>增加看板导出Java后台日志显示，以及异常时页面无反馈问题</li>
       <li>增加看板页面跳转看板编辑页面</li>
       <li>离线数据集定时刷新时，强制读取新数据</li>
       <li>增加全屏图表时Loading过渡</li>
       <li>增加看板参数改变时图表Loading过渡，避免慢查询让用户误以为参数没有生效</li>
    </ol>
</div>

<div class="bs-callout bs-callout-info">
    <h4>邮件发送：</h4>
    <ol>
       <li>支持Excel加密</li>
       <li>简化用户配置，移除web_port and web_context</li>
    </ol>
</div>

<div class="bs-callout bs-callout-info">
    <h4>性能：</h4>
    <ol>
      <li>优化离线数据聚合与缓存性能，增加最大允许离线数据集到100W</li>
      <li>JDBC离线数据集Load与cache采用异步加载处理方式，减少load时长</li>
    </ol>
</div>

<div class="bs-callout bs-callout-info">
    <h4>其他：</h4>
    <ol>
      <li>增加Oracle元数据库支持</li>
      <li>增加元素创建人与最后修改人信息提示框</li>
      <li>统一处理异常信息，</li>
      <li>原有代码中调用e.printStackTrace输出日志方式不能在log文件中显示，现在统一改为log输出</li>
      <li>新的异常经常封装为CBoardException运行期异常，交由Spring Controller统一处理</li>
      <li>记录用户服务请求日志，添加日志正则过滤规则支持</li>
      <li>资源分享页面用户体验优化</li>
      <li>增加h2演示数据库</li>
      <li>增加dockerfile, Docker镜像支持</li>
      <li>增加主页，数据集直接开始图表设计</li>
      <li>权限</li>
      <li>增加文件夹右键批量跳转读写权限</li>
      <li>支持CAS单点登录</li>
    </ol>
</div>


<div class="bs-callout bs-callout-warning">
    <h4>修复：</h4>
    <ol>
      <li>用双引号包裹kylin查询列，防止关键词冲突</li>
      <li>解决因为折线图返回数据为undefined导致折线断点的情况</li>
      <li>解决同一个页面，多个地图，只显示一个的Bug</li>
      <li>修改了angularjs模板初始化和验证的BUG，使用后台参数初始化和验证 #b7866db</li>
      <li>解决由于Tomcat所在路径包含空格引起的数据源模板无法加载的问题</li>
      <li>修复不钻取的图表无法更新实时数据的问题</li>
      <li>修复交叉表翻页之后下钻事件丢失Bug</li>
      <li>值单元格不能解析为数字时返回0</li>
      <li>修复看板ID大于129时引起的邮件发送异常问题</li>
      <li>邮件发送空交叉表时异常</li>
    </ol>
</div>


# 发布日志[V0.3.2]
- **[重要]**交叉表改进
- 增加前端分页功能
- 使用Server端服务端导出Excel
- 支持下钻、上卷
- **[重要]** 聚合下推
- 聚合下推服务端，减轻前端压力
- 对于高性能数据源可选聚合下推数据源，JDBC/KYLIN/ELASTICSEARCH
- **[重要]**数据集配置升级
- 支持数据集选定列
- 支持列别名
- 支持维度层级
- 新增预定义过滤器组
- 用于动态过滤时间窗口
- 固定过滤器
- 图表设计时可选列树形展示
- 支持指标范围过滤, 支持指标排序 [[#66]](https://github.com/yzhang921/CBoard/issues/66)
- **[重要]**支持钻取(仅限于表格)
- **[重要]**自定义表达式支持脚本
- 用于条件SQL统计sum(case when c>100 then 1 else o end)
- ES桶过滤
- 新增DataProvider
- **[重要]**ElasticSearch 1.x, 2.x, 5.x \(原生读取Index与Mapping，根据用户拖拽生成查询DSL\)
- **[重要]**Kylin 1.6 \(原生读取kylin Model，根据用户拖拽生成查询SQL\)
- TextFile \(文本文件，文本需要存放于CBoard应用服务器上面，读取本地文件\)
- 新增图形
- 新增散点图
- 新增百分比堆叠图
- 引入EhCache替代JVM缓存
- **[重要]**看板导出Excel
- 权限管理升级
- 支持通过用户组搜索用户
- 支持权限回收
- 支持没有管理权限用户的普通用户资源分享
- 区分只读、编辑、删除权限
- **[重要]**看板升级
- 支持看板参数模板保存
- 支持滑动条交互看板参数
- 新增时间线布局看板
- 增加数据源连接验证
- 修复了**若干Bug**，**若干用户体验改善**修改，若干代码重构


# 发布日志[V0.2]

- **[重要]** 基于角色的权限控制
- 增加用户管理，角色管理，权限管理模块
- 系统菜单权限控制/数据源权限控制/数据集权限控制/Dashboard权限控制/图表权限控制
- 支持密码修改
- 用户、角色、权限新建、修改、授权、查看**在一个页面做完**
- **[重要]** 流畅的图表切换机制，图表设计器里面切换图表类型保留原有拖拽内容 [[#42](https://github.com/yzhang921/CBoard/issues/42)]
- **[重要]** 看板参数，可以关联多个不同数据集做到数据交互与数据联动 [[#14](https://github.com/yzhang921/CBoard/issues/14)]
- Olap DataService 性能优化，解决行维、列维过大情况下面的性能问题
- 增加表格数据显示格式化功能
- 图表设计页面增加读取缓存可选项
- 用ngJstree替代原有的uib-accordion:
- UI更加简洁美观
- 支持多级目录（图表、数据集）
- 通过拖拽重新组织目录结构、包括文件夹拖拽和图表拖拽
- 增加搜索功能（图表、数据集）
- 增加表单验证与错误提示机制
- 增加基于D3.js的中国地图
- 增加数据源测试功能
- 支持以非ROOT Context的形式部署应用
- 升级JDK到1.8

- 修复了若干bug:
查看更多详细信息 [[Issue List](https://github.com/yzhang921/CBoard/issues?q=is%3Aissue+is%3Aclosed+milestone%3Av0.2)]

