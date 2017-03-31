//手动添加课程编号，下面的数组为是否是学位课
var favorClass=['091M4002H','011M1010H','011M1012H','011M1014H','011M4006H','011M4008H'];
var isXuewei=[true,true,true,true,true,true];

var classList=new Array();


function course(classCode,className,classId){
	this.classCode=classCode;
	this.className=className;
	this.classId=classId;
}

//需访问http://jwxk.ucas.ac.cn/courseManage/main页面
//根据该页面的button属性，取得课程列表的url
var url=$("#regfrm2").attr('action');
var index=0;

function run(){
	
	//ajax提交的url
	var ajaxUrl="http://jwxk.ucas.ac.cn/courseManage/saveCourse"+url.substring(url.indexOf('?'));

	//从所有课里查找要选的课
	var i=0;
	while(i<classlist.length){ if(classlist[i].classcode="=favorClass[index]){" break;="" }="" i++;="" 没有要选的课，返回="" if(i="">=classList.length){
		return;
	}

	//构造Post参数
	var data='sids='+classList[i].classId;
	if(isXuewei[index]){
		data=data+'&did_'+classList[i].classId+'='+classList[i].classId;
	}

	$.ajax({
		type: "POST",
		url: ajaxUrl,
		data: data,
		success: function(result){
			var reg='<label id="loginError" class="error">(.*)</label>'
			var group=result.match(reg);
			if(group){
				console.info(group[1]);
			}
		}
	});
	index=(index+1)%favorClass.length;
}


//访问所有课程列表，解析课程存到数组
var postData='deptIds=910&deptIds=911&deptIds=957&deptIds=912&deptIds=928&deptIds=913&deptIds=914&deptIds=921&deptIds=951&deptIds=952&deptIds=958&deptIds=917&deptIds=945&deptIds=927&deptIds=915&deptIds=954&deptIds=955&deptIds=959&deptIds=946&deptIds=961&deptIds=962&deptIds=963&sb=0';
$.ajax({
	type: 'POST',
	url: 'http://jwxk.ucas.ac.cn'+url,
	data: postData,
	success: function(result){
		$(result).find('tbody tr').each(function(){
			var classId = $(this).children().find(':input').val();
			var className = $(this).children().eq(3).text();
			var classCode = $(this).children().eq(2).text();
			classList.push(new course(classCode,className,classId));
		});
		//执行抢课函数，5秒一次
		window.setInterval(run,5000); 
	}
});</classlist.length){>