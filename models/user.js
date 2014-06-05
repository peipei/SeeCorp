

// User schema in models/user.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	CoopType: Number,	//公司類別
	FBID: String,		//FB ID
	name: String,		//暱稱
	gender: Boolean,	//性別
	Coop: String,		//任職公司
	title: String,		//職稱
	year: Number,		//工作年數
	salary: Number,		//平均薪資
	worktime: Number	//平均工時
});

var User = mongoose.model('User', UserSchema);



















