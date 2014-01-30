(function(w,$,undefined){
	w.Mojo = w.Mojo || {};
    var g = w.Mojo.app = w.Mojo.app || {};
    g.automode = g.automode || {};
    // 可选fn: 
    // "force":内政; 
    // "collect":收宝;
    // "zhufushi":势力祝福石兑换;
    // "fuben":自动闯关
    // "suipian":势力兑换活动碎片
    // "biansuiweibao":变碎为宝活动祝福石或转生丹
    // "mission":自动任务
    // "huangjin":黄巾宝藏祝福石、转生丹
    // "signin": 自动签到
    // "qiandai": 钱袋
    // "fex": 25粮食蛋，女将
    // "activity": 活动兑换。蒋干+蒙古马+银币，自动买蒋干、蒙古马（需留够钱）
    // "salary": 自动领取俸禄
    // "bgexchange": 战场兑换，默认只兑换丹石。如需兑换别的，设置为"bgexchange@1,2,16"的格式.其中1=丹 2祝福石 8体力丹 7超级宝物蛋 3三星将领蛋 4三星装备蛋  5四星将领蛋 6四星装备蛋 16轮回符
    g.automode.accounts = {
		"common": {
			"pass": "公共密码",
			"fn":["force", "zhufushi","huangjin"]
		},
		"users" : [
			{"name":"账号1","pass":"密码1", "fn":["zhufushi","force", "fuben", "collect", "biansuiweibao","mission","huangjin"]},
			{"name":"账号2" ,"fn":["force", "collect", "zhufushi", "biansuiweibao","huangjin"]}
			{"name":"账号3"},
            {"name":"Ningque01", "fn":["salary","bgexchange"]},
            {"name":"Ningque02" ,"fn":["salary", "bgexchange@1,2,16","force"]}
		]
	};	
})(window, jQuery);