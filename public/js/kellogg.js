// admin 불러오기
var config = {
    apiKey: "AIzaSyCihLa0DgYwwegQpn5HvCIrnvdpX_l_jhg",
    authDomain: "juuuuunii-portfolio.firebaseapp.com",
    databaseURL: "https://juuuuunii-portfolio.firebaseio.com",
    projectId: "juuuuunii-portfolio",
    storageBucket: "juuuuunii-portfolio.appspot.com",
    messagingSenderId: "793722252437"
  };
  firebase.initializeApp(config);

var db = firebase.database();
var ref;
var key;
 /***** kellogg ******/
 //img
 (function initKelImg() {
	ref = db.ref("root/kellogg/nav_img");
	ref.on("child_added", kelImgAdd);
	ref.on("child_removed", kelImgRev);
	ref.on("child_changed", kelImgChg);
})();
function kelImgAdd(data) {
	var id = data.key;
	var img = data.val().img;
	var src = '../img/kellogg/nav/' + img;
	var link = data.val().link;
	var html = '';
	html += '<img id="'+ id +'" onclick="location.href='+ link +'"';
	html += 'src="'+ src +'" class="img" alt="nav_banner"/>';
	$(".kel_nav_ban").append(html);
}
function kelImgRev(data) {	
	var id = data.key;
	$("#" + id).remove();
}
function kelImgChg(data) {
	var id = data.key;
	var li = $("#" + id);
	$(".nav_img", li).attr("src", "../img/kellogg/nav/" + data.val().img);
	$(".nav_img", li).attr("onclick", data.val().link);
}
//nav
function initNav() {
	ref = db.ref("root/kellogg/nav");
	ref.on("child_added", kelNavAdd);
	ref.on("child_removed", kelNavRev);
	ref.on("child_changed", kelNavChg);
}
initNav();
function kelNavAdd(data) {
	kelNavMake('C', data);
}
function kelNavRev(data) {
	var id = data.key;
	$("#"+id).remove();
}
function kelNavChg(data) {
	kelNavMake('U', data);
}
function kelNavMake(chk, data) {
	var id = data.key;
	var v = data.val();
	var html = '';
	if(chk == "C") {
		html = '<a href="'+v.link+'">'+v.nav+'</a>';
		$(".kel_nav_list").append(html);
	}
	else {
		$("#"+id).html(html);
	}
}

 /***** brand ******/
 //img
 (function initBrdImg() {
	ref = db.ref("root/brand/nav_img");
	ref.on("child_added", brdImgAdd);
	ref.on("child_removed", brdImgRev);
	ref.on("child_changed", brdImgChg);
})();
function brdImgAdd(data) {
	var id = data.key;
	var img = data.val().img;
	var src = '../img/kellogg/nav/' + img;
	var link = data.val().link;
	var html = '';
	html += '<img id="'+ id +'" onclick="location.href='+ link +'"';
	html += 'src="'+ src +'" class="img" alt="nav_banner"/>';
	$(".brd_nav_ban").append(html);
}
function brdImgRev(data) {	
	var id = data.key;
	$("#" + id).remove();
}
function brdImgChg(data) {
	var id = data.key;
	var li = $("#" + id);
	$(".nav_img", li).attr("src", "../img/kellogg/nav/" + data.val().img);
	$(".nav_img", li).attr("onclick", data.val().link);
}
//nav1
function initBrdNav1() {
	ref = db.ref("root/brand/nav1");
	ref.on("child_added", brdNav1Add);
	ref.on("child_removed", brdNav1Rev);
	ref.on("child_changed", brdNav1Chg);
}
initBrdNav1();
function brdNav1Add(data) {
	brdNav1Make('C', data);
}
function brdNav1Rev(data) {
	var id = data.key;
	$("#"+id).remove();
}
function brdNav1Chg(data) {
	brdNav1Make('U', data);
}
function brdNav1Make(chk, data) {
	var id = data.key;
	var v = data.val();
	var html = '';
	if(chk == "C") {
		html = '<a href="'+v.link+'">'+v.nav+'</a>';
		$(".brd_nav1_list").append(html);
	}
	else {
		$("#"+id).html(html);
	}
}
//nav1
function initBrdNav2() {
	ref = db.ref("root/brand/nav2");
	ref.on("child_added", brdNav2Add);
	ref.on("child_removed", brdNav2Rev);
	ref.on("child_changed", brdNav2Chg);
}
initBrdNav2();
function brdNav2Add(data) {
	brdNav2Make('C', data);
}
function brdNav2Rev(data) {
	var id = data.key;
	$("#"+id).remove();
}
function brdNav2Chg(data) {
	brdNav2Make('U', data);
}
function brdNav2Make(chk, data) {
	var id = data.key;
	var v = data.val();
	var html = '';
	if(chk == "C") {
		html = '<a href="'+v.link+'">'+v.nav+'</a>';
		$(".brd_nav2_list").append(html);
	}
	else {
		$("#"+id).html(html);
	}
}

 /***** nutri ******/
 //img
 (function initNutri() {
	ref = db.ref("root/nutri/nav_img");
	ref.on("child_added", nutImgAdd);
	ref.on("child_removed", nutImgRev);
	ref.on("child_changed", nutImgChg);
})();
function nutImgAdd(data) {
	var id = data.key;
	var img = data.val().img;
	var src = '../img/kellogg/nav/' + img;
	var link = data.val().link;
	var html = '';
	html += '<img id="'+ id +'" onclick="location.href='+ link +'"';
	html += 'src="'+ src +'" class="img" alt="nav_banner"/>';
	$(".nut_nav_ban").append(html);
}
function nutImgRev(data) {	
	var id = data.key;
	$("#" + id).remove();
}
function nutImgChg(data) {
	var id = data.key;
	var li = $("#" + id);
	$(".nav_img", li).attr("src", "../img/kellogg/nav/" + data.val().img);
	$(".nav_img", li).attr("onclick", data.val().link);
}
//nav
function initNutNav() {
	ref = db.ref("root/nutri/nav");
	ref.on("child_added", nutNavAdd);
	ref.on("child_removed", nutNavRev);
	ref.on("child_changed", nutNavChg);
}
initNutNav();
function nutNavAdd(data) {
	nutNavMake('C', data);
}
function nutNavRev(data) {
	var id = data.key;
	$("#"+id).remove();
}
function nutNavChg(data) {
	nutNavMake('U', data);
}
function nutNavMake(chk, data) {
	var id = data.key;
	var v = data.val();
	var html = '';
	if(chk == "C") {
		html = '<a href="'+v.link+'">'+v.nav+'</a>';
		$(".nut_nav_list").append(html);
	}
	else {
		$("#"+id).html(html);
	}
}

/***** event ******/
 //img
 (function initEvtImg() {
	ref = db.ref("root/event/nav_img");
	ref.on("child_added", evtImgAdd);
	ref.on("child_removed", evtImgRev);
	ref.on("child_changed", evtImgChg);
})();
function evtImgAdd(data) {
	var id = data.key;
	var img = data.val().img;
	var src = '../img/kellogg/nav/' + img;
	var link = data.val().link;
	var html = '';
	html += '<img id="'+ id +'" onclick="location.href='+ link +'"';
	html += 'src="'+ src +'" class="img" alt="nav_banner"/>';
	$(".evt_nav_ban").append(html);
}
function evtImgRev(data) {	
	var id = data.key;
	$("#" + id).remove();
}
function evtImgChg(data) {
	var id = data.key;
	var li = $("#" + id);
	$(".nav_img", li).attr("src", "../img/kellogg/nav/" + data.val().img);
	$(".nav_img", li).attr("onclick", data.val().link);
}
//nav1
function initEvtNav1() {
	ref = db.ref("root/event/nav1");
	ref.on("child_added", evtNav1Add);
	ref.on("child_removed", evtNav1Rev);
	ref.on("child_changed", evtNav1Chg);
}
initEvtNav1();
function evtNav1Add(data) {
	evtNav1Make('C', data);
}
function evtNav1Rev(data) {
	var id = data.key;
	$("#"+id).remove();
}
function evtNav1Chg(data) {
	evtNav1Make('U', data);
}
function evtNav1Make(chk, data) {
	var id = data.key;
	var v = data.val();
	var html = '';
	if(chk == "C") {
		html = '<a href="'+v.link+'">'+v.nav+'</a>';
		$(".evt_nav1_list").append(html);
	}
	else {
		$("#"+id).html(html);
	}
}
//nav1
function initEvtNav2() {
	ref = db.ref("root/event/nav2");
	ref.on("child_added", evtNav2Add);
	ref.on("child_removed", evtNav2Rev);
	ref.on("child_changed", evtNav2Chg);
}
initEvtNav2();
function evtNav2Add(data) {
	evtNav2Make('C', data);
}
function evtNav2Rev(data) {
	var id = data.key;
	$("#"+id).remove();
}
function evtNav2Chg(data) {
	evtNav2Make('U', data);
}
function evtNav2Make(chk, data) {
	var id = data.key;
	var v = data.val();
	var html = '';
	if(chk == "C") {
		html = '<a href="'+v.link+'">'+v.nav+'</a>';
		$(".evt_nav2_list").append(html);
	}
	else {
		$("#"+id).html(html);
	}
}


//navi
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
//mobile
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

$(".mo_navs > i").click(function() {
	$(".mo_nav").stop().slideToggle(500);
})


horzShow();
function horzShow() {
	//맨 앞의 li를 복사해서 $(".ban")맨 뒤에 붙여라
	$(".banners").append($(".banners > li").eq(0).clone());	
	var $wrap = $(".banners");
	var $slide = $(".banners > li");
	var now = 1;
	var speed = 500;
	var timeout = 3000;
	var end = $slide.length - 1;
	var interval;
	var hei = 0;
	//초기화
	$(window).resize(function(){
		hei = 0;
		$slide.each(function(i){
			//$(".ban > li")중 가장 큰 height 구함
			if(hei < $(this).height()) hei = $(this).height();	
		});
		$wrap.height(hei);		// $(".ban")의 높이를 넣어준다.
	}).trigger("resize");
	$slide.each(function(i){
		$(this).css({"left":(i*100)+"%", "position":"absolute"});
		if(i<end) $(".cycle-pager").append("<span>●</span>");
	});
	$(".cycle-pager span").click(function(){
		now = $(this).index();
		horzAni();
		clearInterval(interval);
		interval = setInterval(horzAni, timeout);
	});
	interval = setInterval(horzAni, timeout);
	function horzAni() {
		if(now == end) pnow = 0;
		else pnow = now;
		$(".cycle-pager span").removeClass("cycle-pager-active");
		$(".cycle-pager span").eq(pnow).addClass("cycle-pager-active");
		$wrap.stop().animate({"left":(-now*100)+"%"}, speed, function(){
			$(window).trigger("resize");
			if(now == end) {
				$wrap.css({"left":0});
				now = 1;
			}
			else now++;
		});
	}	
}

//products
$(".prds").mouseenter(function() {
	$(this).children("img").eq(0).stop().animate({"opacity":0}, 300);	
	$(this).children("img").eq(1).stop().animate({"opacity":1}, 300);	
});
$(".prds").mouseleave(function() {
	$(this).children("img").eq(0).stop().animate({"opacity":1}, 300);	
	$(this).children("img").eq(1).stop().animate({"opacity":0}, 300);	
});

//youtube
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
var num = 0;
var pos = [0,0,0,0];
$(".new_li").click(function(){
	if($(window).width() >= 798) {
		num = $(this).index();
		var gap = $(this).width() * 0.5;
		var wid = $(this).parent().width() - gap*3;
		for(var i=0; i<=num; i++) {
			pos[i] = -i * gap;
		}
		for(var i=3,j=1; i>num; i--,j++) {
			pos[i] = j * gap;
		}
		$(".new_li").each(function(i){
			$(this).find(".new_hover").hide();
			$(this).css({"transform":"translateX("+pos[i]+"px)"});
		});
		$(this).find(".new_hover").width(wid);
		$(this).find(".new_hover").show();
	}
});
