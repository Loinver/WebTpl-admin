//速度动画
var $obj = $('');
$obj.each(function() {
	var $this = $(this);
	var max_number = $this.data("value"); //最大值
	var plus_number = Math.ceil(max_number / 99); //增加值,因为时间变化一样的
	var start_number = 0;
	var Interval = setInterval(function() {
		start_number += plus_number;
		if(start_number > max_number) {
			$this.html(max_number);
			clearInterval(Interval);
		} else {
			$this.text(start_number);
		}
	}, 10);
});
//时间差
function timeDiff(olddate) {
	var old = new Date(olddate);
	var dateNum = (new Date()) - old;
	var days = dateNum / 1000 / 60 / 60 / 24;
	return Math.floor(days);
}
//获取当前时间
function getNowDate() {
	var now = new Date();
	return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
}
//获取星期几
function getWeek() {
	return(new Date()).getDay();
}
getWeek();