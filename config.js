var port = '3000';

var localhost = "http://localhost:" + port;

module.exports = {
	port : port,
	scriptPath : "./berserkScript/antrol.js",
	fileName : "AntrolMaster",
	loadTimes : 10,
	scriptParams : {
		recordstarturl :   localhost + "/log/start",
		recordmemoryurl  : localhost + "/log/record",
		loginurl : "https://ap.antfact.com/login", 
		mainurl  : "/service",
		submitselector : "#login-button",
		usernameselector : "#name",
		passwordselector : "#uipassword",
		username : "zhoulianyi",
		password : "123abc123abc",
		interval : 60 * 1000
	}
};