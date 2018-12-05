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
	$(".iphone_nav").stop().animate({"bottom":"100%"}, 500, "linear", function() {
		$(".iphone_nav").stop().animate({"left":"80%"}, 500, "linear");
		$(".sign_bt").hide();
	});
};

$(".iphone").click(function(e) {
	$(this).parent().stop().animate({"bottom":"60%"}, 600, function(){
		$(".nav").stop().slideDown(300);
	});
});

$(".sign_bt").click(function(){
	iphoneAni();
	$(".nav_bt").eq(1).trigger("click");
});


// portfolio
var lineNum = 0

$(".tit_line").hover(function() {
	if($(this).index() !== lineNum) {
		$(this).css({"border-top":"1px solid #3e95ce"});
		$(this).children("h4").css({"color":"#3e95ce"});
		//$(this).stop().animate({"width":"100%"},100);
	}
}, function(){
	if($(this).index() !== lineNum) {
		$(this).css({"border-top":"0"});
		$(this).children("h4").css({"color":"#222"});
		//$(this).stop().animate({"width":"100%"},100);
	}
});
$(".tit_line").eq(0).trigger("hover");
