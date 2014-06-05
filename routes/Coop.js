// Require models
var mongoose = require('mongoose');
var user = require('./user');
var Coop = mongoose.model('Coop');

/*
 * GET Coop listing.
 */
exports.list = function(req, res){
  console.log('ask for list!!');
  Coop.find(function (err, coops, count){
    if(err){
      console.error(err);
      res.json({error: err.name}, 500);
    };

    res.json(coops);
  });
  
};

/*
* POST ONE Coop Info
*/
exports.one = function(req,res){
	Coop.find({name:req.body.name},function(err,docs){
		res.json(docs[0]);
	});

};


//new user-> check if his company exists
exports.newuser = function(data){
	userinfo = data;
	//console.log(data);
	Coop.find({name:data.Coop},function(err, docs){
		//console.log(docs.people);
		if(err){
			console.error(err);
		};
		if(docs.length == 0){
			create(userinfo);	//new company
		}else{
			updateuser(userinfo);
		}
	});
};


/*
 * POST new Coop create.
 */
function create(data){	//receive data from routes/user
	
	var coop = new Coop({
		name: data.Coop,
		Type: data.CoopType,
		people:[{
			title: data.title,
			salary: data.salary,
			time: data.worktime,
			year: data.year
		}],
		score: [{
			a: 0,
			b: 0
		},{a: 0,b: 0},{a:0,b:0}],
		//scorepeople: [{
		//	FBID: 'first',
		//	type: 5,
		//	score: 5
		//},{FBID:'second',type:5,score:10}],
		scorepeople: [{
			a: 0,
			c: 0,
			FBID: 'temp'
		}],
		comment: []
	});
	coop.save(function (err, newCoop){
		console.log('create Coop');
		console.log(coop);
		if(err){
			console.error(err);
		};
	});
};

/*
/	Put new user into old Coop
*/
function updateuser(data){
	//console.log(data);
	Coop.find({name:data.Coop},function(err, coop){
		coop[0].people.push({
			title: data.title,
			salary: data.salary,
			time: data.worktime,
			year: data.year
		});
		coop[0].save( function(err, updatedUser){
			console.log('new employee to old coop');
			if(err){
				console.error(err);
			};
		});	
	});
};

/*
 * POST coop message
 */
exports.message = function(req, res){
	Coop.find({name:req.body.name},function(err,coop){
		coop[0].comment.push({
			nick: req.body.nick,
			content: req.body.content
		});
		coop[0].save( function(err, updatedUser){
			console.log(coop[0]);
			if(err){
				console.error(err);
				res.json({error: err.name}, 500);
			};
		});
	});
};

/*
 * POST users score
 */
exports.score = function(req, res){
	console.log('score!!!');
	rate = 0;
	Coop.find({name:req.body.name},function(err,coop){	
		//檢查評過分了沒
		coop = coop[0];
		for(i=0;i<coop.scorepeople.length;i++){
			//如果評過，把原本的刪掉
			if(coop.scorepeople[i].FBID==req.body.FBID&&coop.scorepeople[i].a==req.body.type){
				console.log('rated!!!!!!!!!!!!!!!!!');
				rate = 1;
				break;
				/*
				if(coop.scorepeople[i].c==0){
					coop.score[coop.scorepeople[i].a].a =  coop.score[coop.scorepeople[i].a].a -1;
				}else{
					coop.score[coop.scorepeople[i].a].c =  coop.score[coop.scorepeople[i].a].c -1;
				}
				break;*/
			}
		}
		//新增評分
		if(rate==0){
			coop.scorepeople.push({
				FBID: req.body.FBID,
				a: req.body.type,
				c: req.body.score
			});
			if(req.body.score==0){
				coop.score[req.body.type].a = coop.score[req.body.type].a+1;
			}else{
				coop.score[req.body.type].b = coop.score[req.body.type].b+1;
			}
			//save
			coop.save( function(err, updatedUser){
				if(err){
					console.error(err);
					res.json({error: err.name}, 500);
				};
			});
		}
		
		//response兩邊人數
		if(rate==0){
			res.json({a:coop.score[req.body.type].a,b:coop.score[req.body.type].b});
		}else{
			res.json({a:'rated'});
		}
	});	
};