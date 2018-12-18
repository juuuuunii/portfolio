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
 (function initHome() {
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
	html += '<img onclick="location.href='+ link +'"';
	html += 'src="'+ src +'" class="img" alt="nav_banner"/>';
	$(".nav_ban").append(html);
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
		$(".nav_list").append(html);
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
