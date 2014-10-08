var config = require("../configreader");
var path = require("path");
var fs = require("fs");
var _ = require("underscore");
var moment = require('moment');

function getFile(date) {
	var fileName = date || moment().format('YYYY-MM-DD');
	var filePath = path.resolve(__dirname , '../logs', fileName + ".log");
	return filePath;
}

function getTime() {
	var time = moment().format("YYYY-MM-DD HH:mm:ss");
	return time;
}

exports.recordStart = function() {
	var filePath = getFile();
	var time = getTime();
	var obj = {
		time : time,
		start : true
	};
	var jsonStr = JSON.stringify(obj);
	fs.appendFileSync(filePath , jsonStr + '\n' , 'utf8');
};

exports.recordMemory = function(memory) {
	var filePath = getFile();
	var time = getTime();
	var obj = {
		time : time,
		memory : memory
	};
	var jsonStr = JSON.stringify(obj);
	fs.appendFileSync(filePath ,  jsonStr + "\n", "utf8");
};

exports.getLogDates = function() {
	var files = fs.readdirSync(path.resolve(__dirname , "../","logs"));
	var reg = /^(\d{4}\-\d{2}\-\d{2})\.log$/;
	var lists = [];
	files.forEach(function(fileName) {
		if(reg.test(fileName)) {
			lists.push(RegExp.$1);
		}
	});
	return lists;
};

function buildChart(arr) {
	var startTime = arr[0].time;
	var endTime = arr[arr.length - 1].time;
	var times = [],
		memory = [];
	var max = 0 , min = Number.MAX_VALUE;
	for(var i = 0 , len = arr.length ; i < len ; i++) {
		var item = arr[i];
		var val = parseFloat((item.memory / 1000).toFixed(2));
		times.push(moment(item.time).format('HH:mm:ss'));
		memory.push(val);
		if(val > max) {
			max = val;
		}
		if(val < min) {
			min = val;
		}
	}
	return {
		startTime : startTime,
		endTime : endTime,
		times : times,
		memory : memory,
		max : max,
		min : min
	};
}

exports.getLogCharts = function(date) {
	var filePath = getFile(date);
	if(!fs.existsSync(filePath)) {
		return [];
	}
	var fileContent = fs.readFileSync(filePath , "utf8");
	var lines = fileContent.split(/[\n]+/g);
	var charts = [] , tmpArr = [];
	for(var i = 0 , len = lines.length ; i < len ; i++) {
		var json = null;
		try {
			json = JSON.parse(lines[i]);
		} catch(e){}
		if(!json) {
			continue;
		}
		if(json.start && tmpArr.length) {
			var chart = buildChart(tmpArr);
			charts.push(chart);
			tmpArr = [];
		} else if (!json.start){
			tmpArr.push(json);
		}
	}
	if(tmpArr.length) {
		var chart = buildChart(tmpArr);
		charts.push(chart);
	}
	return charts;
};