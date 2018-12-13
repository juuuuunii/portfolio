
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

$(".prd").mouseenter(function() {
	$(this).hide(300, function() {
		$(this).parent().children(".prd_hover").show(100)
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
