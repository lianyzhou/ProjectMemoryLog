var express = require('express') , 
	fs = require("fs") , 
	path = require("path") , 
	_ = require("underscore"),
	routes = require('./controller/init') ,
	config = require("./configreader");

var app = express();

app.set('port', config.get("port"));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.bodyParser());
app.use(express.compress());
app.use(express.methodOverride());

//针对window 2003检查并创建文件夹
if(!fs.existsSync(path.join(__dirname , "logs"))) {
	fs.mkdirSync(path.join(__dirname , "logs"));
}
if(!fs.existsSync(path.join(__dirname , "distScript"))) {
	fs.mkdirSync(path.join(__dirname , "distScript"));
}

app.use(app.router);
routes.init(app);

app.use('/resources',express.static(path.join(__dirname , "resources")));

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

var berserk = require("./service/berserk");
berserk.lanuch();