//清除页面缓存
App.webview.clearAllPagesInCache();
// 访问页面
App.webview.open('{$loginurl}'); 
// 监听文档加载完成
App.webview.addEventListener('load', function() {
	App.webview.addEventListener('message', function(evt) {
		App.webview.sendMouseEvent(App.webview.elementRects('{$submitselector}')[0]);			
	});

	function logMemoryUsage() {
		var memory = App.memory();
		App.httpRequest("POST" , "{$recordmemoryurl}" , "memory=" + memory , "utf-8");
	}

	App.webview.addEventListener('urlChanged' , function(url) {
		console.log("url change to :" + url);
		if(url.indexOf('{$mainurl}') >= 0) {
			App.httpRequest("POST" , "{$recordstarturl}" , "" , "utf-8");
			logMemoryUsage();
			setInterval(function() {
				logMemoryUsage();
			},{$interval});
		}
	});
	App.webview.execScript(function() {
		var timer = setInterval(function() {
			var d = document.querySelectorAll("{$usernameselector}");
			if(d.length) {
				clearInterval(timer);
				document.querySelectorAll("{$usernameselector}")[0].value =  '{$username}';
				document.querySelectorAll("{$passwordselector}")[0].value =  '{$password}';
				__pageExtension.message("press_submit");
			}
		} , 100);
	});
});