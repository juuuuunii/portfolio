
var navNum = 0;
var navNumOld = 0;
$(".nav .navi").mouseenter(function() {
	navNum = $(this).index();
	$(".nav .nav_tit").css({"background-color":"#fff","color":"#222"});
	$(".nav .nav_hover").each(function(i){
		if(i != navNum) {
			$(this).stop().slideUp(300);
			$(this).off("mouseleave");			
		}		
	});
	$(this).children("a").css({"background-color":"#c80136","color":"#fff"});
	$(this).find(".nav_hover").stop().slideDown(400, function(){
		$(".nav .navi").mouseleave(function(){
			$(this).children(".nav_hover").stop().slideUp(300);
			$(".nav .nav_tit").css({"background-color":"#fff","color":"#222"});
		});		
	});	
});

$(".mo_nav .navi").click(function() {
	navNum = $(this).index();
	$(".mo_nav .nav_hover").each(function(i){
		if(i != navNum) {
			$(this).stop().slideUp(300);			
		}		
	});
	$(this).children("a").css({"background-color":"#c80136","color":"#fff"});
	$(this).find(".nav_hover").stop().slideToggle(400);	
});

$(".prds").mouseenter(function() {
	$(this).children("img").eq(0).stop().animate({"opacity":0}, 300);	
	$(this).children("img").eq(1).stop().animate({"opacity":1}, 300);	
});
$(".prds").mouseleave(function() {
	$(this).children("img").eq(0).stop().animate({"opacity":1}, 300);	
	$(this).children("img").eq(1).stop().animate({"opacity":0}, 300);	
});

$(".mo_navs > i").click(function() {
	$(".mo_nav").stop().slideToggle(500);
})

$(".you_bt").mouseenter(function() {
	$(this).stop().animate({"opacity":0}, 300);
	$(".you_bt_hover").stop().animate({"opacity":1}, 300);
});
$(".you_bt_hover").mouseleave(function() {
	$(this).stop().animate({"opacity":0});
	$(".you_bt").stop().animate({"opacity":1}, 300);
});

/*
$(".nav > li").mouseenter(function() {
	$(this).find(".nav_hover").slideDown(500, function() {
		$(".nav_hover").mouseleave(function() {
			$(".nav_hover").stop().slideUp(500);
			$(".nav > li > a").css({"background-color":"#fff","color":"#222"});
		});
	});
});
*/
