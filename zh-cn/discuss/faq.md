# 常见问题
### 新建数据源保存失败
>**解决办法**： 查看CBoard源数据库连接配置是否正确，CBoard/src/main/resources/config.properties
```
validationQuery=SELECT 1
jdbc_url=jdbc:mysql://localhost:3306/cboard
jdbc_username=root
jdbc_password=111111
```

### 语言配置
```
src\main\webapp\org\cboard\Settings.js
```


```javascript
/**
* Created by Peter on 2016/10/23.
*/
// CBoard settings
var settings = {
preferredLanguage: "en" // en/cn: Switch language to Chinese
}
```

### tomcat7启动报错
```
java.lang.VerifyError: Cannot inherit from final class
at java.lang.ClassLoader.defineClass1(Native Method)
at java.lang.ClassLoader.defineClass(ClassLoader.java:792)
```
> **解决办法**： 可能是由于kylin的jdbc依赖包和tomcat本身依赖的包有版本冲突，不需要使用kylin连接可以在pom里面移除kylin相关依赖，或者换成tomcat8  


### Mysql保存中文元数据乱码问题
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
