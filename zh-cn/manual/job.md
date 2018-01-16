<h1> 定时任务 </h1>

---

## 定时邮件发送

### 邮件发送配置
```properties
phantomjs_path=D:/phantomjs-2.1.1-windows/bin/phantomjs.exe

mail.smtp.host=127.0.0.1
mail.smtp.port=8825
mail.smtp.from=test@test.com
#mail.smtp.username=test@test.com
#mail.smtp.password=111111
#mail.smtp.ssl.checkserveridentity=false
```
* 配置邮件任务之前确保系统环境已经正确配置
* 邮件服务器配置正确，并且应用环境能够正常调用邮件发送接口
* <a href="http://phantomjs.org/">phantomjs</a>安装配置正确正确，正常情况下如果Dashboard能够正常导出表示安装配置正确

### 新建任务，填写任务表单
* 任务名称
* 任务类型(邮件发送Send Mail)
* 任务有效期
* 周期

![](/assets/add_job.png) 

### 配置邮件内容
* 收件人(必填)/抄送/密送/邮件主题
* 添加看板：可以添加多个看板
* 配置看板展示形式
    * **Xls**：看板以Excel附件形式展示
    * **Image**：看板以页面截图形式在邮件正文展示
    * **Both**：两种形式共存
    
![](/assets/job_email_config.png)
 
### 立即运行
邮件添加完整可以立即运行，运行失败点击点击debug按钮查看出错信息


