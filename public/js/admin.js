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
	$(".list:not(#kellogg_wrap)").remove();
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
	html += '<ul class="list clear row">';
	html += '<li class="kel_img" id="' + id + '">';
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
	$("#kellogg_lists").append(html);
}

function kelImgRev(data) {	
	var id = data.key;
	$("#" + id).remove();
}
function kelImgChg(data) {
	var id = data.key;
	var li = $("#" + id);
	$(".nav_img", li).attr("src", "../img/kellogg/nav/" + data.val().img);
	alert("수정되었습니다.");
}

$("#kellogg_img_save").on('click', function () {
	var img = $(".kel_img .nav_img").val();
	var link = $(".kel_img .img_link").val();
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
	$(".kel_nav").remove();
	ref = db.ref("root/kellogg/nav");
	ref.on("child_added", navAdd);
	ref.on("child_removed", navRev);
	ref.on("child_changed", navChg);
}
initNav();

//chk 변수의 값(C, U)에 따라 ul을 생성 또는 수정한다.
function navMake(chk, data) {
	var id = data.key;
	var html = '';
	if(chk == 'C')
	html += '<li class="kel_nav">';
	html += '<div class="kel_nav_li>';
	html += '<div>';
	html += '<input type="text" value="' + data.val().nav + '" class="nav form-control" placeholder="nav">';
	html += '<input type="text" value="' + data.val().link + '" class="nav_link form-control" placeholder="nav Link">';
	html += '</div>';
	html += '<div>';
	html += '<button class="btn btn-danger" onclick="kelNavDel(this);">삭제</button>';
	html += '<button class="btn btn-warning" onclick="kelNavUp(this);">수정</button>';
	html += '</div>';
	html += '</div>';
	if(chk == 'C') {
		html += '</li>';
		$(".kel_nav").append(html);
	}
	else if(chk == 'U') {
		$("#"+id).html(html);
	}
	if(data.val().sub) {
		db.ref("root/kellogg/nav/"+id+"/sub").once("value").then(function(snapshot){
			snapshot.forEach(function(item){
				html  = '<li class="kel_nav" id="'+item.key+'">';
				html += '<div>';
				html += '<input type="text" value="'+item.val().nav+'" class="nav form-control" placeholder="제목">';
				html += '<input type="text" value="'+item.val().nav+'" class="nav_link form-control" placeholder="링크">';
				html += '</div>';
				html += '<div>';
				html += '<button class="btn btn-danger" onclick="kelNavDel2(this);">삭제</button>';
				html += '<button class="btn btn-warning" onclick="KelNavUp2(this);">수정</button>';
				html += '</div>';
				html += '</li>';
				$("#"+id).append(html);
			});
		});
	}
}

//child_added 콜백
function navAdd(data) {
	var id = data.key;
	navMake('C', data);
}

//child_remove 콜백
function navRev(data) {
	var id = data.key;
	$("#"+id).remove();
}

//child_changed 콜백
function navChg(data) {
	var id = data.key;
	navMake('U', data);
}

//1차 카테고리 생성
$(".kellogg_nav_save").click(function () {
	var nav = $(".kel_nav .nav").val();
	var link = $(".kel_nav .nav_link").val();
	if (nav == "") {
		alert("제목을 입력하세요.");
		$(".kel_nav .nav").focus();
	} else {
		ref = db.ref("root/kellogg/nav");
		ref.push({
			nav: nav,
			link: link
		}).key;
	}
});

//2차 카테고리 생성
function navAdd2(obj) {
	var div = $(obj).parent().prev();
	var idUl = $(obj).parent().parent().parent().attr("id");
	var nav = $(".nav", div).val();
	var link = $(".nav_link", div).val();
	ref = db.ref("root/kellogg/nav/" + idUl + "/sub");
	ref.push({
		nav: nav,
		link: link
	}).key;
}

//1차 카테고리 삭제
function navDel(obj) {
	if(confirm("정말로 삭제하시겠습니까?\n1차 카테고리 삭제시 하위 카테고리도 삭제됩니다.")) {
		var id = $(obj).parent().parent().parent().attr("id");
		db.ref("root/kellogg/"+id).remove();
	}
}

//1차 카테고리 수정
function navUp(obj) {
	var id = $(obj).parent().parent().parent().attr("id");
	var div = $(obj).parent().prev();
	var nav = $(".nav", div).val();
	var link = $(".nav_link", div).val();
	if(nav == "") {
		alert("카테고리 명을 입력하세요.");
		$(".nav", div).focus();
		return false;
	}
	else {
		db.ref("root/kellogg/nav/"+id).update({
			title: title,
			link: link
		});
	}
}

//2차 카테고리 삭제
function navDel2(obj) {
	if(confirm("정말로 삭제하시겠습니까?")) {
		var id = $(obj).parent().parent().parent().attr("id");	//ul
		var id2 = $(obj).parent().parent().attr("id");	//li
		db.ref("root/kellogg/nav/"+id+"/sub/"+id2).remove();
	}
}

//2차 카테고리 수정
function navUp2(obj) {
	var id = $(obj).parent().parent().parent().attr("id");	//ul
	var id2 = $(obj).parent().parent().attr("id");	//li
	var div = $(obj).parent().prev();
	var nav = $(".nav", div).val();
	var link = $(".nav_link", div).val();
	if(nav == "") {
		alert("카테고리 명을 입력하세요.");
		$(".nav", div).focus();
		return false;
	}
	else {
		db.ref("root/kellogg/nav/"+id+"/sub/"+id2).update({
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


/***** 참조사항 ******/
/*
|| : or 연산자  (이거나) 	=> true||true(true) / true||false(true)  / false||false (false)
&& : and 연산자 (그리고) 	=> true||true(true) / true||false(false) / false||false (false)
var img = $("#home_wr .tit_img").val();
var img = $(".tit_img", "#home_wr").val();
var img = $("#home_wr").find(".tit_img").val();
var img = $("#home_wr").children(".tit_img").val();
*/