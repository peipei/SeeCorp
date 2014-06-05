require('./db');
require('./dbcoop');

var http = require('http');
var express = require('express');
var user = require('./routes/user');
var coop = require('./routes/Coop');

var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname + '/public'));
app.use( express.bodyParser());
app.use( express.json());

app.get('/',function(request, response){
    response.end('你好！'); //作出回應
});
app.post('/users', user.create);	//新增User  ->test done
//app.post('/coop/:name', coop.search);	//搜尋公司
app.post('/message', coop.message);		//新增公司留言 ->code done
app.post('/score', coop.score);			//新增評分 ->code done
app.post('/cooplist',coop.list);	//公司列表 ->code done
app.post('/coop',coop.one);
app.post('/nick',user.nickname);
app.post('/checkuser',user.check);

server.listen(5000,'140.112.193.89',function(){
    console.log('HTTP伺服器在 http://140.112.193.89:5000/ 上運行');
});



