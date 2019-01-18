// chart
var data = [{
	labels: ["책과 유투브를 통해 계속해서 연습하고 있습니다."],
	datasets: [{
		label: '# of Votes',
		data: [85],
		backgroundColor: [
			'rgba(255, 99, 132, 0.2)'
		],
		borderColor: [
			'rgba(255, 99, 132, 1)'
		],
		hoverBackgroundColor: [
			'rgba(255, 99, 132, 0.6)'
		],
		borderWidth: 1
	}]
}, {
	labels: ["시간과 정성과의 싸움, 자신있습니다."],
	datasets: [{
		label: '# of Votes',
		data: [80],
		backgroundColor: [
			'rgba(54, 162, 235, 0.2)'
		],
		borderColor: [
			'rgba(54, 162, 235, 1)'
		],
		hoverBackgroundColor: [
			'rgba(54, 162, 235, 0.6)'
		],
		borderWidth: 1
	}]
}, {
	labels: ["웹표준을 준수하여 코딩을 하여 웹사이트를 구현할 수 있습니다."],
	datasets: [{
		label: '# of Votes',
		data: [85],
		backgroundColor: [
			'rgba(255, 205, 86, 0.2)'
		],
		borderColor: [
			'rgba(255, 205, 86, 1)'
		],
		hoverBackgroundColor: [
			'rgba(255, 205, 86, 0.6)'
		],
		borderWidth: 1
	}]
}, {
	labels: ["하나하나 정성들여 작업합니다."],
	datasets: [{
		label: '# of Votes',
		data: [85],
		backgroundColor: [
			'rgba(75, 192, 192, 0.2)'
		],
		borderColor: [
			'rgba(75, 192, 192, 1)'
		],
		hoverBackgroundColor: [
			'rgba(75, 192, 192, 0.6)'
		],
		borderWidth: 1
	}]
}, {
	labels: ["간단한 애니메이션을 구현해 낼 수 있습니다."],
	datasets: [{
		label: '# of Votes',
		data: [75],
		backgroundColor: [
			'rgba(255, 159, 64, 0.2)'
		],
		borderColor: [
			'rgba(255, 159, 64, 1)'
		],
		hoverBackgroundColor: [
			'rgba(255, 159, 64, 0.6)'
		],
		borderWidth: 1
	}]
}];
var option = [{
	legend: {
		display: false //차트 분류
	}, 
	cutoutPercentage: 30, //두께
	rotation: -0.5 * Math.PI, //돌아가는 시작점의 각도
	circumference: 1.6 * Math.PI,
	animation: {
		animateRotate: false, //차트가 나올 때 돌아가는 애니메이션을 막음
		animateScale: true //차트가 나올 때 작아졌다 커짐
	}
}, {
	legend: {
		display: false
	}, 
	cutoutPercentage: 30,
	circumference: 1.4 * Math.PI,
	animation: {
		animateRotate: false,
		animateScale: true
	}
}, {
	legend: {
		display: false
	}, 
	cutoutPercentage: 30,
	circumference: 1.6 * Math.PI,
	animation: {
		animateRotate: false,
		animateScale: true
	}
}, {
	legend: {
		display: false
	}, 
	cutoutPercentage: 30,
	circumference: 1.6 * Math.PI,
	animation: {
		animateRotate: false,
		animateScale: true
	}
}, {
	legend: {
		display: false
	}, 
	cutoutPercentage: 30,
	circumference: 1.3 * Math.PI,
	animation: {
		animateRotate: false,
		animateScale: true
	}
}];
var chart = [];

var ctx = $(".chart");



// start
var WheelScroll = (function() {
	function WheelScroll(_opt) {
		var obj = this;  //this = function
		if(_opt) {
			if(_opt.page)  this.page = $(_opt.page);
			else this.page = $(".pages");
			if(_opt.speed) this.speed = _opt.speed;
			else this.speed = 200;
		}
		else {
			this.page = $(".pages");
			this.speed = 200;
			this.nav = null;
		}
		this.scTop = $(window).scrollTop();
		this.gap = [];
		this.oldNow = 0;
		this.now = 0;
		this.dir = 0;
		this.speedGap = 0;
		
		$(window).resize(function() {
			$(obj.page).each(function(i) {
				obj.gap[i] = $(this).offset().top; 
			});
		}).trigger("resize");
		this.init(this);
		if(_opt.nav) this.navAdd(obj, _opt.nav);
	}
		
	WheelScroll.prototype.init = function(obj) {
		var chartChk = true;
		$(window).scroll(function(){
			$(obj.page).each(function(i) {
				obj.gap[i] = $(this).offset().top; 
			});
			obj.scTop = $(window).scrollTop();	
			for(var i=0; i<obj.gap.length; i++) {
				if(obj.scTop <= obj.gap[i] + 500) {
					obj.now = i;
					break;
				}
			}
			console.log(obj.now)
			if(obj.now == 3 && chartChk) {
				chartChk = false;
				ctx.each(function (i) {
					chart[i] = new Chart($(this), {
						type: 'doughnut',
						data: data[i],
						options: option[i]
					});
				});
			}
		});
		
		

		iphoneAni();
		/*
		$(window).on("mousewheel DOMMouseScroll", wheelFn);
		function wheelFn(e) {
			e.preventDefault();
			e.stopPropagation();
			obj.dir = e.originalEvent.wheelDelta;
			obj.scTop = $(window).scrollTop();	
			$(window).off("mousewheel DOMMouseScroll");

			for(var i=0; i<obj.gap.length; i++) {
				if(obj.scTop <= obj.gap[i]) {
					obj.now = i;
					break;
				}
			}
			obj.oldNow = obj.now;
			if(obj.dir > 0) { if(obj.now > 0) obj.now--; }
			else { if(obj.now < obj.gap.length-1) obj.now++; }
			obj.animation(obj, function() {
					$(window).on("mousewheel DOMMouseScroll", wheelFn);
					if(obj.now == 1) {
						ctx.each(function (i) {
							chart[i] = new Chart($(this), {
								type: 'doughnut',
								data: data[i],
								options: option[i]
							});
						});
					}
			});
		}
		*/
		iphoneAni();
	}
	WheelScroll.prototype.navAdd = function(obj, navObj) {
		$(navObj).on("click", function() {
			obj.oldNow = obj.now;
			obj.now = $(this).data("now");
			obj.animation(obj, null);
		});
	}
	WheelScroll.prototype.animation = function(obj, fn) {
		obj.speedGap = Math.abs(obj.now - obj.oldNow);
		$("html, body").stop().animate({"scrollTop":obj.gap[obj.now]+"px"}, obj.speed*obj.speedGap, fn);
	}
	return WheelScroll;
}());


//////// intro
// cloud 
function cloudAni() {
	$(".cloud").animate({"left":"-5440px"}, 300000, "linear", function(){
	   $(this).css({"left":"100%"});
	   cloudAni();
	});
 }
 cloudAni();

// nav
function iphoneAni() {
	$(".iphone_nav").stop().animate({"bottom":"107%"}, 2000, "linear", function() {
		$(".iphone_nav").stop().animate({"left":"80%"}, 2000, "linear", function(){
			$(".iphone").trigger("click");
		});
		$(".sign_bt").hide();
	});
};
// toogle
var iphoneChk = false;
$(".iphone").click(function(e) {
	if(iphoneChk) {
		//내려와 있다면
		$(".nav").stop().slideUp(700, function() {
			$(this).parent().stop().animate({"bottom":"107%"}, 1000);
			iphoneChk = false;
		});
	}
	else {
		//올라가 있다면
		$(this).parent().stop().animate({"bottom":"60%"}, 1000, function(){
			$(".nav").stop().slideDown(700);
			iphoneChk = true;
		});
	}
});

$(".sign_bt").click(function(){
	$("section").css({"display":"block"})
	iphoneAni();
	var pages = new WheelScroll({
		page: ".pages", 
		nav: ".nav_bt",
		speed: 700
	});
	$(".nav_bt").eq(1).trigger("click");
});

//////// main




//////// portfolio
var Num;
var NumOld;
$(".tit_line").mouseenter(function() {
	NumOld = Num;
	Num = $(this).index();
	//console.log(portNumOld, portNum);
	$(".tit_line").css({"border-top":"0"});
	$(".tit_line").children("h4").css({"color":"#222"});
	$(this).css({"border-top":"1px solid #3e95ce"});
	$(this).children("h4").css({"color":"#3e95ce"});
	$(".cards").eq(NumOld).stop().animate({"margin-top":"200px", "opacity":0}, 600, function () {
		$(this).hide();
	});
	$(".cards").eq(Num).css({"margin-top":"200px", "opacity":0, "display":"block"}).stop().animate({"margin-top":0, "opacity":1}, 600);
});
$(".tit_line").eq(0).trigger("mouseenter");


$(".card:not(#cards3 > .card)").mouseenter(function() {
	NumOld = Num;
	Num = $(this).index();
	console.log($(this));
	//console.log($(this).find("img"));
	$(this).css({"background-color":"#222"});
	$(this).find("img").css({"transform":"scale(1.15)", "bacground-color":"#222", "opacity":"0.4"});
});
$(".card:not(#cards3 > .card)").mouseleave(function() {
	NumOld = Num;
	Num = $(this).index();
	//console.log($(this).find("img"));
	$(this).find("img").css({"transform":"scale(1)", "opacity":"1"});
});

//weather
$("#modal_open").click(function(){
	$("#modal").show();
});
$("#modal_close").click(function(){
	$("#modal").hide();
});


$.ajax({
	url: "../json/city.json",
	type: "get",
	dataType: "json",
	success: function(data){
		var city = data.cities;
		var html = '';
		for(i=0; i<city.length; i++){
			html = '<option value="'+city[i].id+'">'+city[i].name+'</option>';
			$("#area").append(html);
		}
		$("#area").trigger("change");
	},
	error: function(xhr, status, error){
		console.log(xhr, status, error);
	}
});
//오늘의 날씨
$("#area").change(function(){
	var id = $(this).val();
	var city = $(this).find('option:selected').text();
	var appid = "9850c950c6a3c3a3ca7a04a13d867c1a";
	var units = "metric";
	var dt = new Date();
	var date = dt.getFullYear()+"년 "+(dt.getMonth()+1)+"월 "+dt.getDate()+"일";
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/weather",
		type: "get",
		dataType: "json",
		data: {
			id: id,
			appid: appid,
			units: units
		},
		success: function(data){
			document.querySelector(".dl_icon").src = "../img/weather/"+data.weather[0].icon+".mp4";
			document.querySelector("#weather_wrap").load();
			$(".dl_area > span").html(city);
			$(".dl_date").html(date);
			$(".dl_temp").html(data.main.temp+'℃(최고: '+data.main.temp_max+'℃/최저: '+data.main.temp_min+'℃)');
			$(".dl_desc").html(data.weather[0].description);
			//console.log(data.main.temp);
			//console.log(data.main.temp_max);
			//console.log(data.main.temp_min);
			//console.log(data.weather[0].description);
			//console.log(data.weather[0].icon);
			$("#modal").hide();
		},
		error: function(xhr, status, error){
			console.log(xhr, status, error);
		}
	});
});

//////// about
var n = 1;
var interval;
$("#slides").find(".slide").each(function(){
	var html = '<span class="w3-bar-item" onclick="paging(this);">●</span>';
	$(this).parent().next().find(".pager").append(html);
});
interval = setInterval(slide, 5000);
function slide() {
	$("#slides").parent().find(".pager").find("span").removeClass("w3-text-amber");
	$("#slides").parent().find(".pager").find("span").eq(n).addClass("w3-text-amber");
	$("#slides").stop().animate({"left":-(n*100)+"%"}, 1000, function(){
		if(n == 4) {
			n = 0;
			$(this).css({"left":0});
		}
		n++;
	});
}
function paging(obj) {
	n = $(obj).index();
	clearInterval(interval);
	slide();
	interval = setInterval(slide, 5000);
}
$("#slides").hover(function(){
	clearInterval(interval);
}, function(){
	interval = setInterval(slide, 5000);
});
/*
var abNum = 0;
var abNumOld = 0;
$(".slide li").mouseenter(function() {
	abNumOld = abNum;
	abNum = $(this).index();
	//console.log(abNumOld, abNum);
	//console.log($(".slide li").eq(abNumOld).find("div"));
	$(".slide li").eq(abNum).find("#ab_nohover").hide();
	$(".slide li").eq(abNum).find("#ab_hover").show();
	$(".slide li").mouseleave(function() {
		//console.log(abNumOld, abNum);
		$(".slide li").eq(abNum).find("#ab_nohover").show();
		$(".slide li").eq(abNum).find("#ab_hover").hide();
	});
});
$("#reset").click(function() {
	window.location.reload(true);
})
*/
// reset
/*window.onbeforeunload = function () {
	window.scrollTo(0, 0);
} */
