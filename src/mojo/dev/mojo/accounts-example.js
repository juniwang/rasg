(function(w,$,undefined){
	w.Mojo = w.Mojo || {};
    var g = w.Mojo.app = w.Mojo.app || {};
    g.automode = g.automode || {};
    // 可选fn: 
    // "force":内政; 
    // "collect":收宝;
    // "zhufushi":祝福石兑换;
    // "fuben":自动闯关
    // "suipian":势力兑换活动碎片
    // "biansuiweibao":变碎为宝活动祝福石或转生丹
    // "mission":自动任务
    // "huangjin":黄巾宝藏祝福石、转生丹
    // "signin": 自动签到
    g.automode.accounts = {
		"common": {
			"pass": "公共密码",
			"fn":["force", "zhufushi","huangjin"]
		},
		"users" : [
			{"name":"账号1","pass":"密码1", "fn":["zhufushi","force", "fuben", "collect", "biansuiweibao","mission","huangjin"]},
			{"name":"账号2" ,"fn":["force", "collect", "zhufushi", "biansuiweibao","huangjin"]}
			{"name":"账号3"}
		]
	};	
})(window, jQuery);