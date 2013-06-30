//
// 本程序参考程序员老黄历而来，参考地址：http://runjs.cn/detail/ydp3it7b
// @author: haycco
//

/*
 * 注意：本程序中的“随机”都是伪随机概念，以当前的天为种子。
 */
var goodArr = [];
var badArr=[];

function random(dayseed, indexseed) {
	var n = dayseed % 11117;
	for (var i = 0; i < 100 + indexseed; i++) {
		n = n * n;
		n = n % 11117;   // 11117 是个质数
	}
	return n;
}

var today = new Date();
var iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

var weeks = ["日","一","二","三","四","五","六"];
var directions = ["北方","东北方","东方","东南方","南方","西南方","西方","西北方"];
var activities = [
	{name:"写单元测试", good:"写单元测试将减少出错",bad:"写单元测试会降低你的开发效率"},
	{name:"洗澡", good:"你几天没洗澡了？",bad:"会把设计方面的灵感洗掉", weekend: true},
	{name:"锻炼一下身体", good:"",bad:"能量没消耗多少，吃得却更多", weekend: true},
	{name:"抽烟", good:"抽烟有利于提神，增加思维敏捷",bad:"除非你活够了，死得早点没关系", weekend: true},
	{name:"白天上线", good:"今天白天上线是安全的",bad:"可能导致灾难性后果"},
	{name:"重构", good:"代码质量得到提高",bad:"你很有可能会陷入泥潭"},
	{name:"使用%t", good:"你看起来更有品位",bad:"别人会觉得你在装逼"},
	{name:"跳槽", good:"该放手时就放手",bad:"鉴于当前的经济形势，你的下一份工作未必比现在强"},
	{name:"招人", good:"你面前这位有成为牛人的潜质",bad:"这人会写程序吗？"},
	{name:"面试", good:"面试官今天心情很好",bad:"面试官不爽，会拿你出气"},
	{name:"投简历", good:"投的简历都有回应",bad:"石沉大海"},
	{name:"提交辞职申请", good:"公司找到了一个比你更能干更便宜的家伙，巴不得你赶快滚蛋",bad:"鉴于当前的经济形势，你的下一份工作未必比现在强"},
	{name:"申请加薪", good:"老板今天心情很好",bad:"公司正在考虑裁员"},
	{name:"晚上加班", good:"晚上是程序员精神最好的时候",bad:"", weekend: true},
	{name:"在妹子面前吹牛", good:"改善你矮穷挫的形象",bad:"会被识破", weekend: true},
	{name:"撸管", good:"避免缓冲区溢出",bad:"强撸灰飞烟灭", weekend: true},
	{name:"浏览成人网站", good:"重拾对生活的信心",bad:"你会心神不宁", weekend: true},
	{name:"看先进性教育片", good:"重拾对生活的信心",bad:"你会心神不宁", weekend: true},
	{name:"命名变量\"%v\"", good:"",bad:""},
	{name:"写超过%l行的方法", good:"你的代码组织的很好，长一点没关系",bad:"你的代码将混乱不堪，你自己都看不懂"},
	{name:"提交代码", good:"遇到冲突的几率是最低的",bad:"你遇到的一大堆冲突会让你觉得自己是不是时间穿越了"},
	{name:"代码复审", good:"发现重要问题的几率大大增加",bad:"你什么问题都发现不了，白白浪费时间"},
	{name:"开会", good:"写代码之余放松一下打个盹，有益健康",bad:"小心被扣屎盆子背黑锅"},
	{name:"打DOTA", good:"你将有如神助",bad:"你会被虐的很惨", weekend: true},
	{name:"打LOL", good:"如有神助，不是超神就是喷他Q在等着你",bad:"你会被虐的很惨,坑出翔来了", weekend: true},
	{name:"晚上上线", good:"晚上是程序员精神最好的时候",bad:"你白天已经筋疲力尽了"},
	{name:"修复BUG", good:"你今天对BUG的嗅觉大大提高",bad:"新产生的BUG将比修复的更多"},
	{name:"设计评审", good:"设计评审会议将变成头脑风暴",bad:"人人筋疲力尽，评审就这么过了"},
	{name:"需求评审", good:"",bad:""},
	{name:"上新浪微博", good:"今天发生的事不能错过",bad:"今天的微博充满负能量", weekend: true},
	{name:"上AB站", good:"还需要理由吗？",bad:"满屏的兄贵我会说出来？", weekend: true},
	{name:"理发", good:"是该换个新发型的时候了",bad:"你确定这不是在浪费钱？"},
	{name:"聚餐", good:"",bad:"买单的时候只剩下你一个人", weekend: true},
	{name:"做梦", good:"你喜欢的人正在想你，好运就要来了",bad:"你会做噩梦"},
	{name:"买彩票", good:"中奖的机率很大",bad:"你就是在浪费钱"},
	{name:"约炮", good:"还等什么？",bad:"你会被捉奸在床", weekend: true},
	{name:"网购", good:"",bad:"你会上当买到假货", weekend: true},
	{name:"打牌", good:"要什么就来什么",bad:"要什么没什么", weekend: true},
	{name:"打麻将", good:"要什么就来什么",bad:"你开不了糊，还会被抢杠", weekend: true},
	{name:"逛街", good:"有艳遇哦",bad:"别出去丢人了", weekend: true},
	{name:"跟对方表白", good:"成功率很大",bad:"", weekend: true},
	{name:"外出旅游", good:"有艳遇哦",bad:"", weekend: true},
	{name:"签合同", good:"",bad:""},
	{name:"文件重命名\"%v\"", good:"",bad:""},
	{name:"打台球", good:"你的状态很好",bad:"没什么状态咯，只有被虐的份", weekend: true},
	{name:"看电影", good:"重拾对生活的信心",bad:"你会心神不宁", weekend: true},
	{name:"访问好友QQ空间", good:"",bad:""}
];

var specials = [
	{date:20130706, type:'good', name:'看任贤齐演唱会', description:'深圳湾体育中心'}
];

var tools = ["360浏览器上网", "Chrome上网", "FireFox上网", "MSOffice写文档", "记事本写程序", "Windows8", "Linux", "MacOS", "IE", "Android设备", "iOS设备"];

var varNames = ["jieguo", "huodong", "pay", "expire", "zhangdan", "every", "free", "i1", "a", "virtual", "ad", "spider", "mima", "pass", "ui", "fxck", "gg"];

var drinks = ["水","矿泉水","果味汽水","苏打水","果汁","运动饮料",
              "茶","红茶","绿茶","奶茶",
			  "咖啡","卡布奇诺咖啡","拿铁咖啡","摩卡咖啡","蓝山咖啡","维也纳咖啡","速溶咖啡","意大利浓咖啡",
			  "可乐","牛奶","豆奶","酸奶",
              "酒","啤酒","白酒","红酒" ];

var horoscope = ["水瓶座","双鱼座","白羊座","金牛座","双子座","巨蟹座","狮子座","处女座","天秤座","天蝎座","射手座","摩羯座"];

function getTodayString() {
	return "今天是" + today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日";
}

function star(num) {
	var result = "";
	var i = 0;
	while (i < num) {
		result += "★";
		i++;
	}
	while(i < 5) {
		result += "☆";
		i++;
	}
	return result;
} 

// 生成今日运势
function pickTodaysLuck() {
  var _activities = filter(activities);
    
	var numGood = random(iday, 98) % 3 + 2;
	var numBad = random(iday, 87) % 3 + 2;
	var eventArr = pickRandomActivity(_activities, numGood + numBad);
	
	var specialSize = pickSpecials();
	
	for (var i = 0; i < numGood; i++) {
		addToGood(eventArr[i]);
	}
	
	for (var i = 0; i < numBad; i++) {
		addToBad(eventArr[numGood + i]);
	}
}

// 去掉一些不合今日的事件
function filter(activities) {
    var result = [];
    
    // 周末的话，只留下 weekend = true 的事件
    if (isWeekend()) {
        
        for (var i = 0; i < activities.length; i++) {
            if (activities[i].weekend) {
                result.push(activities[i]);
            }
        }
        
        return result;
    }
    
    return activities;
}

function isWeekend() {
    return today.getDay() == 0 || today.getDay() == 6;
}

// 添加预定义事件
function pickSpecials() {
	var specialSize = [0,0];
	
	for (var i = 0; i < specials.length; i++) {
		var special = specials[i];
		
		if (iday == special.date) {
			if (special.type == 'good') {
				specialSize[0]++;
				addToGood({name: special.name, good: special.description});
			} else {
				specialSize[1]++;
				addToBad({name: special.name, bad: special.description});
			}
		}
	}
	
	return specialSize;
}

// 从 activities 中随机挑选 size 个
function pickRandomActivity(activities, size) {
	var picked_events = pickRandom(activities, size);
	
	for (var i = 0; i < picked_events.length; i++) {
		picked_events[i] = parse(picked_events[i]);
	}
	
	return picked_events;
}

// 从数组中随机挑选 size 个
function pickRandom(array, size) {
	var result = [];
	
	for (var i = 0; i < array.length; i++) {
		result.push(array[i]);
	}
	
	for (var j = 0; j < array.length - size; j++) {
		var index = random(iday, j) % result.length;
		result.splice(index, 1);
	}
	
	return result;
}

// 解析占位符并替换成随机内容
function parse(event) {
	var result = {name: event.name, good: event.good, bad: event.bad};  // clone
	
	if (result.name.indexOf('%v') != -1) {
		result.name = result.name.replace('%v', varNames[random(iday, 12) % varNames.length]);
	}
	
	if (result.name.indexOf('%t') != -1) {
		result.name = result.name.replace('%t', tools[random(iday, 11) % tools.length]);
	}
	
	if (result.name.indexOf('%l') != -1) {
		result.name = result.name.replace('%l', (random(iday, 12) % 247 + 30).toString());
	}
	
	return result;
}

// 添加到“宜”
function addToGood(event) {
	$('.good .content ul').append('<li><div class="name">' + event.name + '</div><div class="description">' + event.good + '</div></li>');
	goodArr.push(event.name + (event.good!=""?('(' + event.good + ')'):event.good));
}

// 添加到“不宜”
function addToBad(event) {
	$('.bad .content ul').append('<li><div class="name">' + event.name + '</div><div class="description">' + event.bad + '</div></li>');
	badArr.push(event.name + (event.bad!=""?('(' + event.bad + ')'):event.bad));
}

$(function(){
	var todayStr = getTodayString();
	var weekStr = "星期" + weeks[today.getDay()];
	var lunarDate = getLunarCalendar().lunarDate;
	$('.date').html(todayStr);
    $('.week').html(weekStr);
	$('.lunar').html(lunarDate);
	$('.direction_value').html(directions[random(iday, 2) % directions.length]);
	$('.drink_value').html(pickRandom(drinks, 3).join('，'));
	$('.goddes_value').html(star(random(iday, 6) % 5 + 1));
	$('.luck_horoscope_value').html(pickRandom(horoscope, 1).join('，'));
	$('.bad_horoscope_value').html(pickRandom(horoscope.sort(), 1).join('，'));
	pickTodaysLuck();

    var shareContent =  todayStr + " " + lunarDate + " " + weekStr + " 宜：" + goodArr.join('，') + "；不宜：" + badArr.join('，')+"。更多详情，请查看屌丝日历";
    //生成新浪微博分享内容
	$('#weiboShareBtn').attr('title', shareContent);
    //生成QQ空间分享内容
	(function(){
        var p = {
        url:location.href,
        showcount:'0',/*是否显示分享总数,显示：'1'，不显示：'0' */
        desc:shareContent,/*默认分享理由(可选)*/
        summary:shareContent,/*分享摘要(可选)*/
        title:'屌丝日历',/*分享标题(可选)*/
        site:'屌丝日历',/*分享来源 如：腾讯网(可选)*/
        pics:'http://diaosicalendar.sinaapp.com/shareimage.png', /*分享图片的路径(可选)*/
        style:'202',
        width:31,
        height:31
        };
        var s = [];
        for(var i in p){
        s.push(i + '=' + encodeURIComponent(p[i]||''));
        }
        $('#qzoneShareBtn').append(['<a version="1.0" class="qzOpenerDiv" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',s.join('&'),'" target="_blank">分享</a>'].join(''));
    })();

    (function(){
      var p = {
      url:location.href, /*获取URL，可加上来自分享到QQ标识，方便统计*/
      desc:shareContent, /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
      title:'屌丝日历', /*分享标题(可选)*/
      summary:shareContent, /*分享摘要(可选)*/
      pics:'http://diaosicalendar.sinaapp.com/shareimage.png', /*分享图片(可选)*/
      flash: '', /*视频地址(可选)*/
      site:'屌丝日历', /*分享来源(可选) 如：QQ分享*/
      style:'202',
      width:24,
      height:24
      };
      var s = [];
      for(var i in p){
      s.push(i + '=' + encodeURIComponent(p[i]||''));
      }
       $('#qqShareBtn').append(['<a class="qcShareQQDiv" href="http://connect.qq.com/widget/shareqq/index.html?',s.join('&'),'" target="_blank">分享到QQ</a>'].join(''));
    })();
});