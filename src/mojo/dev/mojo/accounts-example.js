(function(w,$,undefined){
	w.Mojo = w.Mojo || {};
    var g = w.Mojo.app = w.Mojo.app || {};
    g.automode = g.automode || {};
    // 可选fn: 
    // "force":内政; 
    // "collect":收宝;
    // "fuben":自动闯关
    // "biansuiweibao":变碎为宝活动祝福石或转生丹
    // "mission":自动任务
    // "huangjin":黄巾宝藏祝福石、转生丹
    // "signin": 自动签到
    // "qiandai": 变碎为宝钱袋
    // "zhufushi":势力祝福石兑换(20粮),此功能已包括在fex中，可以用fex代替
    // "suipian":势力兑换活动碎片.
    // "fex": 势力兑换。默认只兑换祝福石(20粮)和分解卷(20).如需兑换别的，设置为"fex@dh0001,dh0101,dh0137"的格式。
//物品代码如下:dh0001=祝福石(20),dh0002=分解卷(20),dh0101=女将蛋(25),dh0102=3星蛋(200),
//dh0103=装备蛋(888),dh0104=3星东汉蛋(1200),dh0105=4星东汉蛋(3500),dh0137=求仙问道蛋(5000)
    // "activity": 活动兑换。蒋干+蒙古马+银币，自动买蒋干、蒙古马（需留够钱）
    // "salary": 自动领取战场俸禄
    // "bgexchange": 战场兑换，默认只兑换丹石。如需兑换别的，设置为"bgexchange@1,2,16"的格式.物品代码如下：1=丹 2祝福石 8体力丹 7超级宝物蛋 3三星将领蛋 4三星装备蛋  5四星将领蛋 6四星装备蛋 16轮回符
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