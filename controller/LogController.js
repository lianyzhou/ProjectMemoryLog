var log = require("../service/log");
var _ = require("underscore");
var fs = require("fs");
var readline = require("readline");
var path = require("path");
function LogRecord(req,res) {
	var memory = req.body.memory;
	log.recordMemory(memory);
	res.send("ok");
}

function LogReport(req,res) {
	res.render("report");
}

function LogStart(req,res) {
	log.recordStart();
	res.send("ok");
}

function LogDates(req,res) {
	var dates = log.getLogDates();
	res.json(dates);
}

function LogCharts(req, res) {
	var date = req.query.date;
	var ret = log.getLogCharts(date);
	res.json(ret);
}

exports.init = function(app) {
	app.post("/log/start" , LogStart);
	app.post("/log/record" , LogRecord);
	app.get("/log/report" , LogReport);
	app.get("/log/dates" , LogDates);
	app.get("/log/charts" , LogCharts);
};