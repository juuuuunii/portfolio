
var navNum = 0;
var navNumOld = 0;
$(".nav > li > a").mouseenter(function() {
	navNumOld = navNum;
	navNum = $(this).index();
	$(".nav > li > a").css({"background-color":"#fff","color":"#222"});
	$(this).css({"background-color":"#c80136","color":"#fff"});
	$(".nav > li").mouseenter(function() {
		$(this).find(".nav_hover").slideDown(500, function() {
			$(".nav_hover").mouseleave(function() {
				$(".nav_hover").stop().slideUp(500);
				$(".nav > li > a").css({"background-color":"#fff","color":"#222"});
			});
		});
	});
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