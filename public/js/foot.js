
//객체 :function(){}()
var WheelScroll = (function() {
	function WheelScroll(_opt) {
		var obj = this;  //this = function
		if(_opt) {
			if(_opt.page)  this.page = $(_opt.page);
			else this.page = $(".page");
			//만약 _opt에서 page가 존재한다면 이 함수의 page는 $(_opt.page); 이다.
			//_opt에서 page가 존재하지 않는다면 이 함수의 page는 $(".page"); 이다.
			if(_opt.speed) this.speed = _opt.speed;
			else this.speed = 200;
			//만약 _opt에서 speed가 존재한다면 이 함수의 page는 $(_opt.page); 이다.
			//_opt에서 speed가 존재하지 않는다면 이 함수의 speed는 200 이다.
		}
		else {
			this.page = $(".page");
			this.speed = 200;
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
	speed: 700
}); 


//nav_wrap
$(".nav > .fa-bars").click(function() {
	$(".nav_wrap").show().stop().animate({"right":"79%"}, 500);
	$(this).hide();
	$(".nav > .nav_logo").hide();
	$(".nav > .fa-close").show();
})
$(".nav > .fa-close").click(function() {
	$(".nav_wrap").stop().animate({"right":"100%"}, 500);
	$(this).hide();
	$(".nav > .nav_logo").show();
	$(".nav > .fa-bars").show();
})

//page3
$("#page3 ul > li").mouseenter(function() {
	//console.log($(this).children('h4'));
	$(this).find('img').css({"transform":"scale(1.1)"});
	$(this).find('h4, span').css({"font-weight":"600"});
});
$("#page3 ul > li").mouseleave(function() {
	$(this).find('img').css({"transform":"scale(1)"});
	$(this).find('h4, span').css({"font-weight":"400"});
});