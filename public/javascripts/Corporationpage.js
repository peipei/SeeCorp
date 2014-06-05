$(function() {

	//get facebook id
	FBID=0;
	window.fbAsyncInit = function() {
		FB.init({
		appId      : '846862808662030',
		cookie     : true,  // enable cookies to allow the server to access 
                        // the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.0' // use version 2.0
	});
		FB.getLoginStatus(function(response) {
			FBID = response.authResponse.userID;
			//get nick name
			$.post('/nick',{FBID:FBID},function(data){
				nick = data.nick;
				console.log(nick);
			});
		});
	};
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	
	
	

	//about render
	temp = document.location.search.split('=');
	corpname = decodeURIComponent(temp[1]);
	console.log(corpname);
	$.post('/coop',{name:corpname},function(data){
		document.getElementById("corpname").innerHTML = data.name;
		document.getElementById("pic").src = data.picture;
		goodmoneypoint = data.score[0].a;
		badmoneypoint = data.score[0].b;
		goodworkhrpoint = data.score[1].a;
		badworkhrpoint = data.score[1].b;
		goodpoint = data.score[2].a;
		badpoint = data.score[2].b;
		setValue1();
		setValue2();
		setValue3();
		//about salary
		for(i=1;i<=data.people.length;i++){
			var inputinfo = '<tr><td>'+i+'</td><td>'+data.people[i-1].title+'</td><td>'+data.people[i-1].salary+'</td><td>'+data.people[i-1].time+'</td><td>'+data.people[i-1].year+'</td></tr>';
			console.log(inputinfo);
			var html1 = [];
			html1 += [inputinfo].join("");
			$('#tbody').append(html1);
			html1.length=0;
		}
		//about chatbox
		for(j=0;j<data.comment.length;j++){
			html = [];
			input = data.comment[j].content;
			user = data.comment[j].nick;
			var inputhtml = '<h3>'+user+'</h3>'+input;		
			console.log(inputhtml);
			html += [inputhtml].join("");
			$('#form > ul > li').append(html);
		}
	});

	//about vote
	var goodbottom = $('#goodbottom');
		badbottom = $('#badbottom');
		newsalary = $('#newsalary');
		value = 0;

		moneyvalue = 0;

		workhrvalue = 0;

		chatboxbotton= $("#chatboxbotton");

// 第三條Bar
	goodbottom.on('click', function() {
		if(FBID==0){
			alert('請先登入再評分～');
		}else{
			
			$.post('/score',{name:corpname,FBID:FBID,type:2,score:0},function(data){
				if(data.a=='rated'){
					alert('已經投過票囉');
				}else{
					goodpoint = data.a;
					badpoint = data.b
					setValue3();
				}
			});
		}
	});
	badbottom.on('click', function() {
		if(FBID==0){
			alert('請先登入再評分～');
		}else{
			$.post('/score',{name:corpname,FBID:FBID,type:2,score:1},function(data){
				if(data.a=='rated'){
					alert('已經投過票囉');
				}else{
					goodpoint = data.a;
					badpoint = data.b
					setValue3();
				}
			});
		}
	});
	var setValue3 = function(test) {
		document.getElementById("goodbottom").innerHTML = "良心事業(" + goodpoint + "票)";
		document.getElementById("badbottom").innerHTML = "血汗工廠(" + badpoint + "票)";
		value = (parseInt(goodpoint) / (parseInt(goodpoint) + parseInt(badpoint))) * 100;
		value2 = 100 - value;
		var value_percent = value + "%";
		var value2_percent = value2 + "%";
		$("#good").css("width", value_percent);
		$("#bad").css("width", value2_percent);
		if (test) {
			console.log("this is : " + test);
		}
	}

// 第一條Bar
	$("#goodmoneybottom").on('click', function() {
		if(FBID==0){
			alert('請先登入再評分～');
		}else{
			$.post('/score',{name:corpname,FBID:FBID,type:0,score:0},function(data){
				if(data.a=='rated'){
					alert('已經投過票囉');
				}else{
					goodmoneypoint = data.a;
					badmoneypoint = data.b
					setValue1();
				}
			});
		}
	});
	$("#badmoneybottom").on('click', function() {
		if(FBID==0){
			alert('請先登入再評分～');
		}else{
			$.post('/score',{name:corpname,FBID:FBID,type:0,score:1},function(data){
				if(data.a=='rated'){
					alert('已經投過票囉');
				}else{
					goodmoneypoint = data.a;
					badmoneypoint = data.b
					setValue1();
				}
			});
		}
	});
	var setValue1 = function(test) {
		document.getElementById("goodmoneybottom").innerHTML = "錢多超爽(" + goodmoneypoint + "票)";
		document.getElementById("badmoneybottom").innerHTML = "錢少靠背(" + badmoneypoint + "票)";
		moneyvalue = (parseInt(goodmoneypoint) / (parseInt(goodmoneypoint) + parseInt(badmoneypoint))) * 100;
		moneyvalue2 = 100 - moneyvalue;
		var moneyvalue_percent = moneyvalue + "%";
		var moneyvalue2_percent = moneyvalue2 + "%";
		$("#moneygood").css("width", moneyvalue_percent);
		$("#moneybad").css("width", moneyvalue2_percent);
		if (test) {
			console.log("this is : " + test);
		}
	}

// 第二條Bar
	$("#goodworkhrbottom").on('click', function() {
		if(FBID==0){
			alert('請先登入再評分～');
		}else{
			$.post('/score',{name:corpname,FBID:FBID,type:1,score:0},function(data){
				if(data.a=='rated'){
					alert('已經投過票囉～');
				}else{
					goodworkhrpoint = data.a;
					badworkhrpoint = data.b
					setValue2();
				}
			});
		}
	});
	$("#badworkhrbottom").on('click', function() {
		if(FBID==0){
			alert('請先登入再評分～');
		}else{
			$.post('/score',{name:corpname,FBID:FBID,type:1,score:1},function(data){
				if(data.a=='rated'){
					alert('已經投過票囉～');
				}else{
					goodworkhrpoint = data.a;
					badworkhrpoint = data.b
					setValue2();
				}
			});
		}
	});
	var setValue2 = function(test) {
		document.getElementById("goodworkhrbottom").innerHTML = "躺著摳腳(" + goodworkhrpoint + "票)";
		document.getElementById("badworkhrbottom").innerHTML = "辛苦爆肝(" + badworkhrpoint + "票)";
		workhrvalue = (parseInt(goodworkhrpoint) / (parseInt(goodworkhrpoint) + parseInt(badworkhrpoint))) * 100;
		workhrvalue2 = 100 - workhrvalue;
		var workhrvalue_percent = workhrvalue + "%";
		var workhrvalue2_percent = workhrvalue2 + "%";
		$("#workhrgood").css("width", workhrvalue_percent);
		$("#workhrbad").css("width", workhrvalue2_percent);
		if (test) {
			console.log("this is : " + test);
		}
	}


	//about checkbox
	
	chatboxbotton.on('click', function(e){
		if(FBID==0){
			alert("請先登入再留言");
		}else{
			
			var html = [];
			var input = $('#chatbox').val();
			var user = nick;
			var inputhtml = '<h3>'+user+'</h3>'+input;
			if(!input.length==0){		
				console.log(inputhtml);
				html += [inputhtml].join("");
				$('#form > ul > li').append(html);
			}
			$('#chatbox').val() = '';
			$.post('/message',{name:corpname,nick:user,content:input});
		}
	});

});