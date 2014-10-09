ProjectMemoryLog
================

用来进行项目内存记录，在windows下面双击start.bat进行运行。

运行过程中，每隔设置的秒数就会将页面消耗的内存记录到logs文件架下面。

服务启动后，会在本机开启3000端口。

访问http://localhost:3000能够看到项目内存使用情况。

config.js说明如下：
	
		loginurl : "http://localhost:8181/login",           //项目使用的登录页面地址
		
		mainurl  : "/main",                                 // 登录成功后页面跳转的url的一部分
	
		username : "antrol",                                //登录的用户名
		
		password : "antrol",                                //登录的密码
		
		interval : 3 * 60 * 1000                            //每隔多长时间记录一次内存
