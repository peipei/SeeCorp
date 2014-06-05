var QQ = "'http://peipei.csie.org:5000/CorporationPage.html?name=";
var QQQ = "'";
$.post('/cooplist',function(data){
for(k=0;k<data.length;k++){
i = data[k].Type;
// ＩＴ產業
if(i==1){
	var corpname1 = [data[k].name];
	for(var i=0;i+1<=corpname1.length;i++){
		var inputinfo = '<button type="button" class="btn btn-lg btn-primary" onclick="window.location.href='+QQ+corpname1[i]+QQQ+'">'+corpname1[i]+'</button> ';
		console.log(inputinfo);
		var html1 = [];
		if(i%5==4){
			html1 += [ inputinfo+'<br><br>' ].join("");
		}else{
			html1 += [ inputinfo ].join("");
		}
		$('#it').append(html1);
		html1.length=0;
	}	
}
// media產業
if(i==2){
	var corpname2 = [data[k].name];
	for(var i=0;i+1<=corpname2.length;i++){
		var inputinfo = '<button type="button" class="btn btn-lg btn-danger" onclick="window.location.href='+QQ+corpname2[i]+QQQ+'">'+corpname2[i]+'</button> ';
		console.log(inputinfo);
		var html1 = [];
		if(i%5==4){
			html1 += [ inputinfo+'<br><br>' ].join("");
		}else{
			html1 += [ inputinfo ].join("");
		}
		$('#media').append(html1);
		html1.length=0;
	}	
}
// fmcg產業
if(i==3){
	var corpname3 = [data[k].name];
	for(var i=0;i+1<=corpname3.length;i++){
		var inputinfo = '<button type="button" class="btn btn-lg btn-warning" onclick="window.location.href='+QQ+corpname3[i]+QQQ+'">'+corpname3[i]+'</button> ';
		console.log(inputinfo);
		var html1 = [];
		if(i%5==4){
			html1 += [ inputinfo+'<br><br>' ].join("");
		}else{
			html1 += [ inputinfo ].join("");
		}
		$('#fmcg').append(html1);
		html1.length=0;
	}	
}
// fin產業
if(i==4){
	var corpname4 = [data[k].name];
	for(var i=0;i+1<=corpname4.length;i++){
		var inputinfo = '<button type="button" class="btn btn-lg btn-success" onclick="window.location.href='+QQ+corpname4[i]+QQQ+'">'+corpname4[i]+'</button> ';
		console.log(inputinfo);
		var html1 = [];
		if(i%5==4){
			html1 += [ inputinfo+'<br><br>' ].join("");
		}else{
			html1 += [ inputinfo ].join("");
		}
		$('#fin').append(html1);
		html1.length=0;
	}	
}
}
});