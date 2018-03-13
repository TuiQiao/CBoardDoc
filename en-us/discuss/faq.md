# 提问的正确姿势

!> 为打造良好的提问环境，节约所有成员时间，提问前请务必仔细度阅读文档；

!> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way) 、 [《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) [《如何有效地报告] Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html) 、 [《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393) ，更好的问题更容易获得帮助。

## Github Issue
- GitHub Issue可用固化为知识库，支持搜索、可被Google检索
- 在访问Github网络通畅的情况下，首推在GitHub上面通过issue的形式问题交流
- 在提问之前搜索相关问题是否被问及过，进入issue页面，删除默认搜索条件<code>is:issue is:open </code>，输入查询关键词
![](../../../assets/search-issue.png)
- 确认需要新建issue，请严格按照issue模板填写相关问题描述，否则问题很可能将不会得到答复

<a href="https://github.com/yzhang921/CBoard/issues"><button type="button" class="btn btn-primary btn-sm">确认去提问</button></a>

## QQ交流群
?> 中国用户QQ交流群：301028618

!> 请大家将自己的群名片更改为**所在地+公司+部门+呢称**(如:上海-Xxx-BI-Peter)，否则问问题将得不到响应，还会被定期清退，感谢合作!
- 为打造良好的提问环境，节约所有成员时间，提问前请务必仔细度阅读文档，同一用户多次提问对于文档里面明显提及的问题，将会被踢出群。
- GitHub的Issue系统,可以检索历史问题，提问前也请检索一下是否有小伙伴遇到过同样的问题。
- 开始清理半年来从来不曾发言的僵尸用户，这次我们是认真的了。


# 常见问题
## 新建数据源保存失败
>**解决办法**： 查看CBoard源数据库连接配置是否正确，CBoard/src/main/resources/config.properties
```
validationQuery=SELECT 1
jdbc_url=jdbc:mysql://localhost:3306/cboard
jdbc_username=root
jdbc_password=111111
```

## 语言配置/切换语言

?> src\main\webapp\org\cboard\Settings.js

```javascript
/**
* Created by Peter on 2016/10/23.
*/
// CBoard settings
var settings = {
    preferredLanguage: "en" // 可选值en/cn: cn切换中文
}
```

## tomcat7启动报错
```
java.lang.VerifyError: Cannot inherit from final class
at java.lang.ClassLoader.defineClass1(Native Method)
at java.lang.ClassLoader.defineClass(ClassLoader.java:792)
```
> **解决办法**： 可能是由于kylin的jdbc依赖包和tomcat本身依赖的包有版本冲突，不需要使用kylin连接可以在pom里面移除kylin相关依赖，或者换成tomcat8  


## Mysql保存中文元数据乱码问题
> 进入mysql 命令行, 查看mysql相关编码
```
mysql> show variables like 'character_set_%';
+--------------------------+---------------------------------------------------------+
| Variable_name | Value |
+--------------------------+---------------------------------------------------------+
| character_set_client | utf8 |
| character_set_connection | utf8 |
| character_set_database | utf8 |
| character_set_filesystem | binary |
| character_set_results | utf8 |
| character_set_server | utf8 |
| character_set_system | utf8 |
| character_sets_dir | C:\Program Files\MySQL\MySQL Server 5.7\share\charsets\ |
+--------------------------+---------------------------------------------------------+
8 rows in set (0.00 sec)
```

确保下面两项编码为utf-8
```
| character_set_database | utf8
| character_set_server | utf8
```
character_set_server 如果编码不对，有两种解决方案，

- 修改config.properties里面mysql的jdbc_url添加参数characterEncoding=utf-8
jdbc_url=jdbc:mysql://localhost:3306/cboard?characterEncoding=utf-8
- 参考这个网页，重新设置mysql服务 http://www.2cto.com/database/201310/248493.html 设置完成之后，重新cboard数据库
如果只有第一项数据库编码不对，可以先尝试drop掉DB之后重新创建
CREATE DATABASE cboard CHARACTER SET utf8;
- MAC用户修改my.cnf, 在[mysqld]之后添加一行 character-set-server = utf8 behind
