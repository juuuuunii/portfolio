// chart
var data = [{
	labels: ["PHOTOSHOP"],
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
	labels: ["ILLUSTRATOR"],
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
	labels: ["HTML5"],
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
	labels: ["CSS"],
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
	labels: ["Javascript"],
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
		animateRotate: false
	}
}, {
	legend: {
		display: false
	}, 
	cutoutPercentage: 30,
	circumference: 1.6 * Math.PI,
	animation: {
		animateRotate: false
	}
}, {
	legend: {
		display: false
	}, 
	cutoutPercentage: 30,
	circumference: 1.6 * Math.PI,
	animation: {
		animateRotate: false
	}
}, {
	legend: {
		display: false
	}, 
	cutoutPercentage: 30,
	circumference: 1.3 * Math.PI,
	animation: {
		animateRotate: false
	}
}];
var chart = [];

var ctx = $(".chart");



// scroll
var WheelScroll = (function() {
	function WheelScroll(_opt) {
		var obj = this;  //this = function
		if(_opt) {
			if(_opt.page)  this.page = $(_opt.page);
			else this.page = $(".page");
			if(_opt.speed) this.speed = _opt.speed;
			else this.speed = 200;
		}
		else {
			this.page = $(".page");
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

var pages = new WheelScroll({
	page: ".page", 
	nav: ".nav_bt",
	speed: 700
});


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


//////// main
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
	iphoneAni();
	$(".nav_bt").eq(1).trigger("click");
});




//////// portfolio
var portNum = 0;
var portNumOld = 0;
$(".tit_line").mouseenter(function() {
	portNumOld = portNum;
	portNum = $(this).index();
	console.log(portNumOld, portNum);
	$(".tit_line").css({"border-top":"0"});
	$(".tit_line").children("h4").css({"color":"#222"});
	$(this).css({"border-top":"1px solid #3e95ce"});
	$(this).children("h4").css({"color":"#3e95ce"});
	$(".cards").eq(portNumOld).stop().animate({"margin-top":"200px", "opacity":0}, 600, function () {
		$(this).hide();
	});
	$(".cards").eq(portNum).css({"margin-top":"200px", "opacity":0, "display":"block"}).stop().animate({"margin-top":0, "opacity":1}, 600);
});
$(".tit_line").eq(0).trigger("mouseenter");
//weather
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
$(window).resize(function(){
	$(".slides").height($(".slide").height());
}).trigger("resize");

/*
var n1 = 0;
$("#slides").find(".slide").each(function(){
	var name = $(this).data("name");
	var html = '<span class="w3-bar-item" onclick="paging1(this);">●</span>';
	$(this).parent().next().find(".pager").append(html);
});
interval = setInterval(slide, 3000);
function slide() {
	$("#slides").parent().find(".pager").find("span").removeClass("w3-text-red");
	$("#slides").parent().find(".pager").find("span").eq(n1).addClass("w3-text-red");
	$("#slides1").stop().animate({"left":-(n1*100)+"%"}, 500, function(){
		if(n1 == 5) n1 = -1;
		n1++;
	});
}
function paging1(obj) {
	n1 = $(obj).index();
	clearInterval(interval);
	slide();
	interval = setInterval(slide, 3000);
}
$("#slides").hover(function(){
	clearInterval(interval);
}, function(){
	interval = setInterval(slide, 3000);
});
*/
// reset
window.onbeforeunload = function () {
	window.scrollTo(0, 0);
} 
