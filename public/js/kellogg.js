
var navNum = 0;
var navNumOld = 0;
$(".nav > li").mouseenter(function() {
	navNumOld = navNum;
	navNum = $(this).index();
	$(".nav > li > a").css({"background-color":"#fff","color":"#222"});
	$(".nav_hover").each(function(i){
		if(i != navNum) {
			$(this).eq(i).stop().slideUp(300);
			$(this).eq(i).off("mouseleave");			
		}		
	});
	$(this).children("a").css({"background-color":"#c80136","color":"#fff"});
	
	$(".nav_hover").eq(navNum).stop().delay(300).slideDown(400, function(){
		$(".nav > li").mouseleave(function(){
			$(this).find(".nav_hover").stop().slideUp(300);
			$(".nav > li > a").css({"background-color":"#fff","color":"#222"});
		});		
	});	
});

$(".prds").mouseenter(function() {
	$(this).children("img").eq(0).stop().animate({"opacity":0}, 300);	
	$(this).children("img").eq(1).stop().animate({"opacity":1}, 300);	
});
$(".prds").mouseleave(function() {
	$(this).children("img").eq(0).stop().animate({"opacity":1}, 300);	
	$(this).children("img").eq(1).stop().animate({"opacity":0}, 300);	
});


var moNav = false;
$(".mo_nav").click(function(e) {
	if(moNav) {
		$(".nav_hover").stop().slideUp(500)
		moNav = false;
		}
	else {
		$(".nav_hover").stop().slideDown(500)
		moNav = true;
		}
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
