<h1> Cron Job </h1>

---

## EMail Report Job

### Configuration
```properties
phantomjs_path=D:/phantomjs-2.1.1-windows/bin/phantomjs.exe

mail.smtp.host=127.0.0.1
mail.smtp.port=8825
mail.smtp.from=test@test.com
#mail.smtp.username=test@test.com
#mail.smtp.password=111111
#mail.smtp.ssl.checkserveridentity=false
```
* Make sure the system environment correctly configured before setting the e-mail task.
* The `SMTP` server is available and it can be accessed from application.
* <a href="http://phantomjs.org/">phantomjs</a> has been correct configured. If Dashboard can be exported successfully means the configuration is correct.

### Create and config job
* Name
* Active Range
* Every (Frequency)

![](/assets/add_job.png) 

### E-mail configuration content
* Receiver(required)/CC/BCC/subject
* Add dashboard: can add more than one dashboard.
* Content type
    * **Xls**：By Excel
    * **Image**：By screen shoot in E-mail
    * **Both**：
    
![](/assets/job_email_config.png)
 
### Run immediately
You can run the task after added a new job. Click the `debug button` to check the exception info.


