// User schema in models/company.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CoopSchema = new Schema({
  name: {type: String, unique: true},
  picture: {type: String, default:'http://i.imgur.com/Ay7LKff.jpg'},
  Type: Number,
  score: [
	{
		a: Number,
		b: Number
	}
  ],
  scorepeople:[
	{
		//a:Number,
		//b:Number
		//FBID: String,
		a: Number,	//哪一條0~2
		c: Number,	//左邊0或右邊1,
		FBID: String
	}
  ],
  people:[
	{
		title: String,
		salary: Number, 
		time: Number, 
		year: Number
	}
  ],
  comment:[
	{
		nick: String,
		content: String
	}
  ]
});

var Coop = mongoose.model('Coop', CoopSchema);