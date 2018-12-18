  // Initialize Firebase
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
function initKelImg() {
	ref = db.ref("root/kellogg/nav_img");
	ref.on("child_added", kelImgAdd);
	ref.on("child_removed", kelImgRev);
	ref.on("child_changed", kelImgChg);
}
initKelImg();
//kel_Img
function kelImgAdd(data) {
	var id = data.key;
	var img = data.val().img;
	var src = '../img/kellogg/nav/' + img;
	var link = data.val().link;
	var html = '';
	html += '<ul class="add_list clear row">';
	html += '<li class="add_img" id="' + id + '">';
	html += '<div>';
	html += '<img src="' + src + '">';
	html += '<input type="text" class="nav_img form-control" placeholder="이미지" value="' + img + '">';
	html += '<input type="text" class="img_link form-control" style="margin-top:5px;" placeholder="링크주소" value="' + link + '">';
	html += '</div>';
	html += '<div>';
	html += '<button class="btn btn-danger" onclick="kelImgDel(this);">삭제</button> ';
	html += '<button class="btn btn-warning" onclick="kelImgUp(this);">수정</button>';
	html += '</div>';
	html += '</li>';
	html += '</ul>';
	$(".kel_img_cont").append(html);
}

function kelImgRev(data) {	
	var id = data.key;
	$("#" + id).parent().remove();
}
function kelImgChg(data) {
	var id = data.key;
	var li = $("#" + id);
	$(".nav_img", li).attr("src", "../img/kellogg/nav/" + data.val().img);
	alert("수정되었습니다.");
}

$("#kellogg_img_save").on('click', function () {
	var img = $("#kellogg_wrap .nav_img").val();
	var link = $("#kellogg_wrap .img_link").val();
	if (link == '' || img == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/kellogg/nav_img");
		ref.push({
			img: img,
			link: link
		}).key;
		alert("등록되었습니다.");
	}
	$(this).parent().prev().find(".nav_img").val('');
	$(this).parent().prev().find(".img_link").val('');
});

function kelImgUp(obj) {
	var li = $(obj).parent().parent();
	var id = li.attr("id");
	var img = $(".nav_img", li).val();
	var link = $(".img_link",li).val();
	if (img == '' || link == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/kellogg/nav_img/" + id);
		ref.update({
			img: img,
			link: link
		});
	}
}

function kelImgDel(obj) {	
	if (confirm("정말로 삭제하시겠습니까?")) {
		//var id = obj.parentNode.parentNode.parentNode.id;
		var id = $(obj).parent().parent().attr("id");
		if (id != "") {
			db.ref("root/kellogg/nav_img/" + id).remove();
		}
	}
}

//kel_Nav
//페이지가 생성될 때 한번 실행되며 shop레퍼런스에 콜백을 링크한다.
function initNav() {
	$(".kel_nav_cont > li").remove();
	ref = db.ref("root/kellogg/nav");
	ref.on("child_added", kelNavAdd);
	ref.on("child_removed", kelNavRev);
	ref.on("child_changed", kelNavChg);
}
initNav();

//chk 변수의 값(C, U)에 따라 ul을 생성 또는 수정한다.
function kelNavMake(chk, data) {
	var id = data.key;
	var html = '';
	html += '<li id="' + id + '" class="add_nav clear">';
	html += '<div>';
	html += '<input type="text" value="' + data.val().nav + '" class="navi form-control" placeholder="제목">';
	html += '<input type="text" value="' + data.val().link + '" class="nav_link form-control" style="margin-top:5px;" placeholder="링크">';
	html += '</div>';
	html += '<div>';
	html += '<button class="btn btn-danger" style="margin-right:0.5rem;" onclick="kelNavDel(this);">삭제</button>';
	html += '<button class="btn btn-warning" onclick="kelNavUp(this);">수정</button>';
	html += '</div>';
	if(chk == 'C') {
		html += '</li>';
		$(".kel_nav_cont").append(html);
	}
	else if(chk == 'U') {
		var obj = $("#"+id);
		obj.find(".navi").val(data.val().nav);
		obj.find(".nav_link").val(data.val().link);
	}
	
}

//child_added 콜백
function kelNavAdd(data) {
	var id = data.key;
	kelNavMake('C', data);
}

//child_remove 콜백
function kelNavRev(data) {
	var id = data.key;
	//console.log(id);
	$("#"+id).remove();
}

//child_changed 콜백
function kelNavChg(data) {
	var id = data.key;
	kelNavMake('U', data);
}

//카테고리 생성
$(".kel_nav_save").click(function () {
	var nav = $("#kellogg_wrap .navi").val();
	var link = $("#kellogg_wrap .nav_link").val();
	if (nav == "") {
		alert("제목을 입력하세요.");
		$("#kellogg_wrap .navi").focus();
	} else {
		ref = db.ref("root/kellogg/nav");
		ref.push({
			nav: nav,
			link: link
		}).key;
		alert("등록되었습니다.");
	}
	$(this).parent().prev().find(".navi").val('');
	$(this).parent().prev().find(".nav_link").val('');
});

function kelNavDel(obj) {
	if(confirm("정말로 삭제하시겠습니까?")) {
		var id = $(obj).parent().parent().attr("id");
		//console.log(id);
		db.ref("root/kellogg/nav/"+id).remove();
	}
}

function kelNavUp(obj) {
	var id = $(obj).parent().parent().attr("id");
	var div = $(obj).parent().prev();
	var nav = $(".navi", div).val();
	var link = $(".nav_link", div).val();
	if(nav == "") {
		alert("카테고리 명을 입력하세요.");
		$(".navi", div).focus();
		return false;
	}
	else {
		db.ref("root/kellogg/nav/"+id).update({
			nav: nav,
			link: link
		});
	}
}


/***** brand ******/
function initBrdImg() {
	ref = db.ref("root/brand/nav_img");
	ref.on("child_added", brdImgAdd);
	ref.on("child_removed", brdImgRev);
	ref.on("child_changed", brdImgChg);
}
initBrdImg();
//brd_Img
function brdImgAdd(data) {
	var id = data.key;
	var img = data.val().img;
	var src = '../img/kellogg/nav/' + img;
	var link = data.val().link;
	var html = '';
	html += '<ul class="add_list clear row">';
	html += '<li class="add_img" id="' + id + '">';
	html += '<div>';
	html += '<img src="' + src + '">';
	html += '<input type="text" class="nav_img form-control" placeholder="이미지" value="' + img + '">';
	html += '<input type="text" class="img_link form-control" style="margin-top:5px;" placeholder="링크주소" value="' + link + '">';
	html += '</div>';
	html += '<div>';
	html += '<button class="btn btn-danger" onclick="brdImgDel(this);">삭제</button> ';
	html += '<button class="btn btn-warning" onclick="brdImgUp(this);">수정</button>';
	html += '</div>';
	html += '</li>';
	html += '</ul>';
	$(".brd_img_cont").append(html);
}

function brdImgRev(data) {	
	var id = data.key;
	$("#" + id).parent().remove();
}
function brdImgChg(data) {
	var id = data.key;
	var li = $("#" + id);
	$(".nav_img", li).attr("src", "../img/kellogg/nav/" + data.val().img);
	alert("수정되었습니다.");
}

$("#brand_img_save").on('click', function () {
	var img = $("#brand_wrap .nav_img").val();
	var link = $("#brand_wrap .img_link").val();
	if (link == '' || img == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/brand/nav_img");
		ref.push({
			img: img,
			link: link
		}).key;
		alert("등록되었습니다.");
	}
	$(this).parent().prev().find(".nav_img").val('');
	$(this).parent().prev().find(".img_link").val('');
});

function brdImgUp(obj) {
	var li = $(obj).parent().parent();
	var id = li.attr("id");
	var img = $(".nav_img", li).val();
	var link = $(".img_link",li).val();
	if (img == '' || link == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/brand/nav_img/" + id);
		ref.update({
			img: img,
			link: link
		});
	}
}

function brdImgDel(obj) {	
	if (confirm("정말로 삭제하시겠습니까?")) {
		//var id = obj.parentNode.parentNode.parentNode.id;
		var id = $(obj).parent().parent().attr("id");
		if (id != "") {
			db.ref("root/brand/nav_img/" + id).remove();
		}
	}
}

//brd_Nav
function initBrdNav1() {
	$(".brd_nav1_cont > li").remove();
	ref = db.ref("root/brand/nav1");
	ref.on("child_added", brdNav1Add);
	ref.on("child_removed", brdNav1Rev);
	ref.on("child_changed", brdNav1Chg);
}
initBrdNav1();

//chk 변수의 값(C, U)에 따라 ul을 생성 또는 수정한다.
function brdNav1Make(chk, data) {
	var id = data.key;
	var html = '';
	html += '<li id="' + id + '" class="add_nav clear">';
	html += '<div>';
	html += '<input type="text" value="' + data.val().nav + '" class="navi form-control" placeholder="제목">';
	html += '<input type="text" value="' + data.val().link + '" class="nav_link form-control" style="margin-top:5px;" placeholder="링크">';
	html += '</div>';
	html += '<div>';
	html += '<button class="btn btn-danger" style="margin-right:0.5rem;" onclick="brdNav1Del(this);">삭제</button>';
	html += '<button class="btn btn-warning" onclick="brdNav1Up(this);">수정</button>';
	html += '</div>';
	if(chk == 'C') {
		html += '</li>';
		$(".brd_nav1_cont").append(html);
	}
	else if(chk == 'U') {
		var obj = $("#"+id);
		obj.find(".navi").val(data.val().nav);
		obj.find(".nav_link").val(data.val().link);
	}
	
}

//child_added 콜백
function brdNav1Add(data) {
	var id = data.key;
	brdNav1Make('C', data);
}

//child_remove 콜백
function brdNav1Rev(data) {
	var id = data.key;
	//console.log(id);
	$("#"+id).remove();
}

//child_changed 콜백
function brdNav1Chg(data) {
	var id = data.key;
	brdNav1Make('U', data);
}

//카테고리 생성
$(".brd_nav1_save").click(function () {
	var nav = $(".nav_li2_1 .navi").val();
	var link = $(".nav_li2_1 .nav_link").val();
	if (nav == "") {
		alert("제목을 입력하세요.");
		$(".nav_li2_1 .navi").focus();
	} else {
		ref = db.ref("root/brand/nav1");
		ref.push({
			nav: nav,
			link: link
		}).key;
		alert("등록되었습니다.");
	}
	$(this).parent().prev().find(".navi").val('');
	$(this).parent().prev().find(".nav_link").val('');
});

function brdNav1Del(obj) {
	if(confirm("정말로 삭제하시겠습니까?")) {
		var id = $(obj).parent().parent().attr("id");
		//console.log(id);
		db.ref("root/brand/nav1/"+id).remove();
	}
}

function brdNav1Up(obj) {
	var id = $(obj).parent().parent().attr("id");
	var div = $(obj).parent().prev();
	var nav = $(".navi", div).val();
	var link = $(".nav_link", div).val();
	if(nav == "") {
		alert("카테고리 명을 입력하세요.");
		$(".navi", div).focus();
		return false;
	}
	else {
		db.ref("root/brand/nav1/"+id).update({
			nav: nav,
			link: link
		});
	}
}



/***** nutri ******/
function initNutImg() {
	ref = db.ref("root/nutri/nav_img");
	ref.on("child_added", nutImgAdd);
	ref.on("child_removed", nutImgRev);
	ref.on("child_changed", nutImgChg);
}
initNutImg();
//nut_Img
function nutImgAdd(data) {
	var id = data.key;
	var img = data.val().img;
	var src = '../img/kellogg/nav/' + img;
	var link = data.val().link;
	var html = '';
	html += '<ul class="add_list clear row">';
	html += '<li class="add_img" id="' + id + '">';
	html += '<div>';
	html += '<img src="' + src + '">';
	html += '<input type="text" class="nav_img form-control" placeholder="이미지" value="' + img + '">';
	html += '<input type="text" class="img_link form-control" style="margin-top:5px;" placeholder="링크주소" value="' + link + '">';
	html += '</div>';
	html += '<div>';
	html += '<button class="btn btn-danger" onclick="nutImgDel(this);">삭제</button> ';
	html += '<button class="btn btn-warning" onclick="nutImgUp(this);">수정</button>';
	html += '</div>';
	html += '</li>';
	html += '</ul>';
	$(".nut_img_cont").append(html);
}

function nutImgRev(data) {	
	var id = data.key;
	$("#" + id).parent().remove();
}
function nutImgChg(data) {
	var id = data.key;
	var li = $("#" + id);
	$(".nav_img", li).attr("src", "../img/kellogg/nav/" + data.val().img);
	alert("수정되었습니다.");
}

$("#nutri_img_save").on('click', function () {
	var img = $("#nutri_wrap .nav_img").val();
	var link = $("#nutri_wrap .img_link").val();
	if (link == '' || img == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/nutri/nav_img");
		ref.push({
			img: img,
			link: link
		}).key;
		alert("등록되었습니다.");
	}
	$(this).parent().prev().find(".nav_img").val('');
	$(this).parent().prev().find(".img_link").val('');
});

function nutImgUp(obj) {
	var li = $(obj).parent().parent();
	var id = li.attr("id");
	var img = $(".nav_img", li).val();
	var link = $(".img_link",li).val();
	if (img == '' || link == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/nutri/nav_img/" + id);
		ref.update({
			img: img,
			link: link
		});
	}
}

function nutImgDel(obj) {	
	if (confirm("정말로 삭제하시겠습니까?")) {
		//var id = obj.parentNode.parentNode.parentNode.id;
		var id = $(obj).parent().parent().attr("id");
		if (id != "") {
			db.ref("root/nutri/nav_img/" + id).remove();
		}
	}
}

//nut_Nav
//페이지가 생성될 때 한번 실행되며 shop레퍼런스에 콜백을 링크한다.
function initNutNav() {
	$(".nut_nav_cont > li").remove();
	ref = db.ref("root/nutri/nav");
	ref.on("child_added", nutNavAdd);
	ref.on("child_removed", nutNavRev);
	ref.on("child_changed", nutNavChg);
}
initNutNav();

//chk 변수의 값(C, U)에 따라 ul을 생성 또는 수정한다.
function nutNavMake(chk, data) {
	var id = data.key;
	var html = '';
	html += '<li id="' + id + '" class="add_nav clear">';
	html += '<div>';
	html += '<input type="text" value="' + data.val().nav + '" class="navi form-control" placeholder="제목">';
	html += '<input type="text" value="' + data.val().link + '" class="nav_link form-control" style="margin-top:5px;" placeholder="링크">';
	html += '</div>';
	html += '<div>';
	html += '<button class="btn btn-danger" style="margin-right:0.5rem;" onclick="nutNavDel(this);">삭제</button>';
	html += '<button class="btn btn-warning" onclick="nutNavUp(this);">수정</button>';
	html += '</div>';
	if(chk == 'C') {
		html += '</li>';
		$(".nut_nav_cont").append(html);
	}
	else if(chk == 'U') {
		var obj = $("#"+id);
		obj.find(".navi").val(data.val().nav);
		obj.find(".nav_link").val(data.val().link);
	}
	
}function nutNavAdd(data) {
	var id = data.key;
	nutNavMake('C', data);
}
function nutNavRev(data) {
	var id = data.key;
	$("#"+id).remove();
}
function nutNavChg(data) {
	var id = data.key;
	nutNavMake('U', data);
}

//카테고리 생성
$("#nutri_nav_save").click(function () {
	var nav = $("#nutri_wrap .navi").val();
	var link = $("#nutri_wrap .nav_link").val();
	if (nav == "") {
		alert("제목을 입력하세요.");
		$(".nut_nav_li .navi").focus();
	} else {
		ref = db.ref("root/nutri/nav");
		ref.push({
			nav: nav,
			link: link
		}).key;
		alert("등록되었습니다.");
	}
	$(this).parent().prev().find(".navi").val('');
	$(this).parent().prev().find(".nav_link").val('');
});

function nutNavDel(obj) {
	if(confirm("정말로 삭제하시겠습니까?")) {
		var id = $(obj).parent().parent().attr("id");
		//console.log(id);
		db.ref("root/nutri/nav/"+id).remove();
	}
}

function nutNavUp(obj) {
	var id = $(obj).parent().parent().attr("id");
	var div = $(obj).parent().prev();
	var nav = $(".navi", div).val();
	var link = $(".nav_link", div).val();
	if(nav == "") {
		alert("카테고리 명을 입력하세요.");
		$(".navi", div).focus();
		return false;
	}
	else {
		db.ref("root/nutri/nav/"+id).update({
			nav: nav,
			link: link
		});
	}
}






/***** UI ******/
$(".nav_list").on("click", function () {
	var n = $(this).index();
	$(".nav_list").css({
		"background-color": "",
		"color": ""
	});
	$(this).css({
		"background-color": "#c80136",
		"color": "#fff"
	});
	$(".section").hide();
	$(".section").eq(n).show();
});
$(".nav_list").eq(0).trigger("click");

