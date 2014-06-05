// Require models
var mongoose = require('mongoose');
var coop = require('./Coop');
var User = mongoose.model('User');

/*
 * GET users listing.
 */
exports.list = function(req, res){

  User.find(function (err, users, count){
    if(err){
      console.error(err);
      res.json({error: err.name}, 500);
    };

    res.json({users: users});
  });
  
};

/*Create users*/
exports.create = function(req,res){
	//console.log(req.body);
	var user = new User({
		CoopType : req.body.CoopType,
		FBID : req.body.FBID,
		name : req.body.name,
		gender : req.body.gender,
		Coop : req.body.Coop,
		title : req.body.title,
		year : req.body.year,
		salary : req.body.salary,
		worktime : req.body.worktime
	});
	coop.newuser(req.body);
	user.save(function (err, newUser){
		console.log('create user');
		console.log(user);
		if(err){
			//console.log(user);
			console.error(err);
			res.json(500,{error: err.name});
		};
	});
	res.redirect('http://peipei.csie.org:5000/index.html');
};

exports.nickname = function(req,res){
	User.find({FBID:req.body.FBID},function(err, user){
		//console.log(req.body.FBID);
		res.json({nick:user[0].name});
	});	
};

exports.check = function(req,res){
	User.find({FBID:req.body.id},function(err, user){
		if(user.length==0){
			res.json({log:0});
		}else{
			res.json({log:1});
		}
	});	
}





