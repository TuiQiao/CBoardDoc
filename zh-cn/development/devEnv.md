# 开发环境搭建
---
<div class="admonition warning">
  <p class="admonition-title">注意：</p>
  <p>不推荐Eclipse下面搭建开发环境，所以请不要咨询我Eclipse相关环境配置，谢谢配合！</p>
</div>

## IDEA收费版
* 1 用IDEA打开Maven项目
File Open -> pom.xml 

![](/assets/1_OpenProject.png)


* 2 等待Maven依赖包下载完毕，之前没有用过Maven的同学可能得自己学习一下Maven的简单实用，可以参考这篇文章[使用IntelliJ IDEA 15和Maven创建Java Web项目](http://blog.csdn.net/myarrow/article/details/50824793) , 略过第三步 

* 3 Maven 骨架创建 Java Web 项目**

* 工具栏打开Toolbar

![](/assets/2_show_toolbar_2.png)

* Toolbar上打开“Project Structure”

![](/assets/2_show_toolbar.png)

* 配置Facets 

![](/assets/4_Facets.png)

* 配置Artifacts，下面的目录为Tomcat 服务器上部署的目录

![](/assets/6_Artifacts.png)

* 添加Tomcat运行环境 
* 启动“Edit Configurations” 

![](/assets/EditRunConf.png)

* Add New 'Tomcat Server' 配置 

![](/assets/AddTomcatRunConf.png)

* 配置Deplyment 

![](/assets/Deploy1.png)
![](/assets/Deploy2.png)


完成之后就可以点击工具栏上面的运行按钮运行了，默认通过**http://localhost:8080**访问应用，看到的登陆界面如下。

![](/assets/login.jpg)


## IDEA社区版
项目下载到本地导入IDEA方式和收费版IDEA一样，但是不需要配置tomcat和web相关配置，然后参考下面的方式直接运行和调试项目， 

[Add embed tomcat for developer](https://github.com/yzhang921/CBoard/pull/40) 

打开org.cboard.DebugTomcat
访问端口为http://localhost:7090




