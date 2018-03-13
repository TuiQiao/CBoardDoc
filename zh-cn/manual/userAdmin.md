# 权限管理

RBAC \(Role Based Access Control\)基于角色的权限管理，由用户、角色、操作/资源，三部分组成，访问列表也称之为资源列表被赋予角色/用户组之上，赋予用户一个或多个组让用户获得所在组的资源访问权限

![](../../../assets/RBAC.png)

与之相对应CBoard的用户管理界面分也为三块

<div class="bs-callout bs-callout-info">
    <h4><i class="fa fa-user" aria-hidden="true"></i> 用户：</h4>
    <ul>
      <li>用户列表</li>
      <li>新建、编辑用户</li>
      <li>搜索用户：默认通过用户名（包含登陆名）搜索，点击搜索框前面的<kbd>按名称</kbd>按钮可以切换为按用户组搜索</li>
      <li>用户多选框下面功能按钮分别为</li>
      <li>按住Ctrl鼠标左键选中多个用户或者角色</li>
      <li><kbd>Grant</kbd>： 选中用户与角色，对用户进行角色授权，用户授权<mark>非增量授权</mark>，每次Grant会更新用户角色为当前角色栏选中的角色列表，给用户增加授权时，按住Ctrl鼠标左键点击增加或者取消选中角色</li>
      <li><kbd>Revoke</kbd>：选中用户与角色，把用户从角色中移除</li>
      <li>资源<mark>不能授权给用户</mark></li>
      <li>选中一个用户之后，该用户对应的角色可以被联动选中</li>
    </ul>
</div>

<div class="bs-callout bs-callout-info">
    <h4><i class="fa fa-users" aria-hidden="true"></i> 角色(Role)：</h4>
    <ul>
      <li>点击＋号添加角色</li>
      <li>角色管理员用于管理当前角色所属</li>
      <li>除了Admin之外，角色管理员只能看到自己管理的角色</li>
    </ul>
</div>

<div class="bs-callout bs-callout-info">
    <h4>资源：</h4>
    <ul>
      <li>菜单：一级菜单与二级菜单分开控制，没有级联(技术问题，jstree第三状态无法程序获取回选)</li>
      <li>看板/数据源/数据集/图表: 由于文件夹为虚拟路径，可以级联，但是即使文件夹被选中，在新增了资源在文件夹里面之后，还是要手动添加授权</li>
      <li>管理员只能对自己创建的资源添加到组</li>
    </ul>
</div>


![](../../../assets/UserAdmin_Snap.png)



