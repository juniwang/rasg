Mojo.rs = function (code) {
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - 129)
    }
    return c
};

function er(code) {
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
    }
    return c
}

function ti(){
	var self = this;
	var startFlag = true;
	var xmlHttp = false;
	try {
	    xmlHttp = new ActiveXObject("Msxml2.XMLHTTP")
	} catch (e) {
	    try {
	        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
	    } catch (e2) {
	        xmlHttp = false
	    }
	}
	if (!xmlHttp && typeof XMLHttpRequest != "undefined") {
	    xmlHttp = new XMLHttpRequest()
	}
	xmlHttp.open("GET", "null.txt", false);
	xmlHttp.setRequestHeader("Range", "bytes=-1");
	xmlHttp.send(null);
	severtime = new Date(xmlHttp.getResponseHeader("Date"));
	var stime = severtime.getTime();
	var ltime = new Date().getTime();
	if (stime - ltime > 86400000) {
	    Mojo.app.toast.show("请将设备的时间设置为自动")
	} else {
	    var key = prompt("验证码", "");
	    var my = key.replace("1%2", "").replace("2%3", "").replace("3%4", "").replace("4%5", "").replace("5%6", "").replace("6%7", "").replace("7%8", "").replace("8%9", "").replace("9%0", "").replace("0%1", "");
	    var uid = my.substring(0, 9).substring(0, my.indexOf("@"));
	    var did = parseInt(my.substring(9, my.length)) - parseInt(uid);
	    if (Mojo.cache.get("userId") == uid && did % 86400 == 0 && did > stime) {
	        startFlag = false;
	        Mojo.app.toast.show("自动闯关开始 初始化需要20-40秒");
	        var runfb = new Array(0);
	        var tasks = new Array(0);
	        var groups = new Array(0);
	        var names = new Array(0);
	        var cools = new Array(0);
	        var pris = new Array(0);
	        var index = 0;
	        Mojo.ajax("/fuben/fubens", {}, function (result) {
	            for (var i = 0; i < result.data.length; i++) {
	                if (result.data[i].status == 1 && result.data[i].unlock == 1) {
	                    runfb[index] = result.data[i].id;
	                    index++
	                }
	            }
	            self.un(runfb, 0, 1, tasks, groups, names, cools, pris)
	        }, function () {})
	    } else {
	        Mojo.app.toast.show("未开通此功能")
	    }
	}
	//get stime
	if (stime - ltime > 86400000) {
	    Mojo.app.toast.show("请将设备的时间设置为自动")
	} else {
	    var key = prompt("验证码", "");
	    var my = key.replace("1%2", "").replace("2%3", "").replace("3%4", "").replace("4%5", "").replace("5%6", "").replace("6%7", "").replace("7%8", "").replace("8%9", "").replace("9%0", "").replace("0%1", "");
	    var uid = my.substring(0, 9).substring(0, my.indexOf("@"));
	    var did = parseInt(my.substring(9, my.length)) - parseInt(uid);
	    if (Mojo.cache.get("userId") == uid && did % 86400 == 0 && did > stime) {
	        startFlag = false;
	        Mojo.app.toast.show("自动闯关开始 初始化需要20-40秒");
	        var runfb = new Array(0);
	        var tasks = new Array(0);
	        var groups = new Array(0);
	        var names = new Array(0);
	        var cools = new Array(0);
	        var pris = new Array(0);
	        var index = 0;
	        Mojo.ajax("/fuben/fubens", {}, function (result) {
	            for (var i = 0; i < result.data.length; i++) {
	                if (result.data[i].status == 1 && result.data[i].unlock == 1) {
	                    runfb[index] = result.data[i].id;
	                    index++
	                }
	            }
	            self.un(runfb, 0, 1, tasks, groups, names, cools, pris)
	        }, function () {})
	    } else {
	        Mojo.app.toast.show("未开通此功能")
	    }
	}
}

function fu(){
	var self=this;var zhixingtime=3000;var empty=0;var time=parseInt(new Date().getTime()/1000);var fbindex=tasks.length;for(var i=0;i<tasks.length;i++){if(cools[i]!="-1"&&cools[i]-time<0){if((i+1)%5==0){if(cools[i-1]=="-1"&&cools[i-2]=="-1"&&cools[i-3]=="-1"&&cools[i-4]=="-1"){if(fbindex==tasks.length){fbindex=i}else{i++}}else{i++}}else{if(fbindex==tasks.length){fbindex=i}else{var pri1=pris[fbindex];var pri2=pris[i];if(pri1<pri2){fbindex=i}}}}}var repeatFlag=10;var repeatFlagMax=repeatFlag;
    var autoFuben2 = w.setInterval(function () {
        time=parseInt(new Date().getTime()/1000);
        if (fbindex < cools.length) {
            if (repeatFlag >= repeatFlagMax) {
                repeatFlag=0;var fubenid=tasks[fbindex];
                Mojo.ajax("/fuben/do", {
                    id: fubenid,
                }, function (result) {
                    setTimeout(function(){repeatFlag=repeatFlagMax},1000);var date=new Date();var now=date.getTime()/1000;var t=parseInt(now+8*3600);var hour=parseInt((t%(3600*24))/3600);var minute=parseInt((t%3600)/60);var second=t%60;var strHour=hour;var strMinute=minute;var strSecond=second;if(hour<10){strHour="0"+hour}if(minute<10){strMinute="0"+minute}if(second<10){strSecond="0"+second}var titleMsg="";
                    if (result.errorCode == 0) {
                        var emsg="";if(result.data.award){if(result.data.award.bonus){if(result.data.award.bonus.entities){if(result.data.award.bonus.entities[0]){if(result.data.award.bonus.entities[0].id){if(result.data.award.bonus.entities[0].id=="d12"){emsg=", 获得转生丹"}}}}}}titleMsg=" [自动副本]:执行成功"+emsg;
                    }
                    if(titleMsg.length>0){if(self._showMsg.length>0){var arrMsg=self._showMsg.split("</br>");if(arrMsg.length>8){var msgIndex=self._showMsg.indexOf("</br>");self._showMsg=self._showMsg.substring(msgIndex+5)}self._showMsg=self._showMsg+"</br>"+strHour+":"+strMinute+":"+strSecond+" "+titleMsg}else{self._showMsg=strHour+":"+strMinute+":"+strSecond+" "+titleMsg}Mojo.app.toast.show(self._showMsg,"20000")};
                    if (result.errorCode == 0) {
                        if ((fbindex + 1) % 5 == 0) {
                            cools[fbindex]="-1";if(tasks[fbindex+1]!=0){Mojo.ajax("/fuben/getAward",{id:fubenid,},function(result){if(result.errorCode==0){Mojo.ajax("/fuben/openAward",{id:fubenid,award_id:result.data.free_award.id,status:1,},function(result){if(result.data){if(result.data.entity){if(result.data.entity.id){if(result.data.entity.id=="d12"){titleMsg=" [自动副本]:领奖成功, 获得转生丹";if(titleMsg.length>0){if(self._showMsg.length>0){var arrMsg=self._showMsg.split("</br>");if(arrMsg.length>8){var msgIndex=self._showMsg.indexOf("</br>");self._showMsg=self._showMsg.substring(msgIndex+5)}self._showMsg=self._showMsg+"</br>"+strHour+":"+strMinute+":"+strSecond+" "+titleMsg}else{self._showMsg=strHour+":"+strMinute+":"+strSecond+" "+titleMsg}Mojo.app.toast.show(self._showMsg,"20000")}}}}}},function(){},{})}},function(){},{})};
                            fbindex=tasks.length;for(var i=0;i<tasks.length;i++){if(cools[i]!="-1"&&cools[i]-time<0){if((i+1)%5==0){if(cools[i-1]=="-1"&&cools[i-2]=="-1"&&cools[i-3]=="-1"&&cools[i-4]=="-1"){if(fbindex==tasks.length){fbindex=i}else{i++}}else{i++}}else{if(fbindex==tasks.length){fbindex=i}else{var pri1=pris[fbindex];var pri2=pris[i];if(pri1<pri2){fbindex=i}}}}};
                        } else {
                            if(result.data.fb_task.percent==100){cools[fbindex]="-1"}else{cools[fbindex]=time+1+parseInt(result.data.fb_task.cold_down)}fbindex=tasks.length;for(var i=0;i<tasks.length;i++){if(cools[i]!="-1"&&cools[i]-time<0){if((i+1)%5==0){if(cools[i-1]=="-1"&&cools[i-2]=="-1"&&cools[i-3]=="-1"&&cools[i-4]=="-1"){if(fbindex==tasks.length){fbindex=i}else{i++}}else{i++}}else{if(fbindex==tasks.length){fbindex=i}else{var pri1=pris[fbindex];var pri2=pris[i];if(pri1<pri2){fbindex=i}}}}};
                        }
                    } else if (result.errorCode == 1) {} else if (result.errorCode == 20006) {} else if (result.errorCode == 20001) {
                        cools[fbindex-1]="0";cools[fbindex-2]="0";cools[fbindex-3]="0";cools[fbindex-4]="0";fbindex=tasks.length;for(var i=0;i<tasks.length;i++){if(cools[i]!="-1"&&cools[i]-time<0){if((i+1)%5==0){if(cools[i-1]=="-1"&&cools[i-2]=="-1"&&cools[i-3]=="-1"&&cools[i-4]=="-1"){if(fbindex==tasks.length){fbindex=i}else{i++}}else{i++}}else{if(fbindex==tasks.length){fbindex=i}else{var pri1=pris[fbindex];var pri2=pris[i];if(pri1<pri2){fbindex=i}}}}};
                    } else if (result.errorCode == 160003) {
                        alert(strHour+":"+strMinute+":"+strSecond+"卡牌容量不足");w.clearInterval(autoFuben2);
                    } else if (result.errorCode == 20004) {
                        var params={start:0,count:50,fuben_id:groups[fbindex].split("-")[0],fb_task_group_id:groups[fbindex].split("-")[1],};Mojo.ajax("/fuben/fbTasks",params,function(result){if(result.data.fb_tasks[parseInt(groups[fbindex].split("-")[2])-1].percent<100){cools[fbindex]=parseInt(result.data.fb_tasks[parseInt(groups[fbindex].split("-")[2])-1].cold_down)+parseInt(time)+1}else{cools[fbindex]=-1}fbindex=tasks.length;for(var i=0;i<tasks.length;i++){if(cools[i]!="-1"&&cools[i]-time<0){if((i+1)%5==0){if(cools[i-1]=="-1"&&cools[i-2]=="-1"&&cools[i-3]=="-1"&&cools[i-4]=="-1"){if(fbindex==tasks.length){fbindex=i}else{i++}}else{i++}}else{if(fbindex==tasks.length){fbindex=i}else{var pri1=pris[fbindex];var pri2=pris[i];if(pri1<pri2){fbindex=i}}}}}},function(){});
                    } else if (result.errorCode == 20002) {
                        cools[fbindex]="-1";fbindex=tasks.length;for(var i=0;i<tasks.length;i++){if(cools[i]!="-1"&&cools[i]-time<0){if((i+1)%5==0){if(cools[i-1]=="-1"&&cools[i-2]=="-1"&&cools[i-3]=="-1"&&cools[i-4]=="-1"){if(fbindex==tasks.length){fbindex=i}else{i++}}else{i++}}else{if(fbindex==tasks.length){fbindex=i}else{var pri1=pris[fbindex];var pri2=pris[i];if(pri1<pri2){fbindex=i}}}}};
                    } else if (result.errorCode == 10002) {
                        for(i=fbindex+2;i<cools.length;i++){if(tasks[i]==0){break}}for(i=fbindex+2;i<cools.length;i++){if(cools[i]!="-1"&&cools[i]-time<0){if((i+1)%5==0){if(cools[i-1]=="-1"&&cools[i-2]=="-1"&&cools[i-3]=="-1"&&cools[i-4]=="-1"){break}else{i++}}else{break}}}fbindex=i;
                    } else if (result.errorCode == 20003) {
                        w.clearInterval(autoFuben2);self.ti();
                    }
                }, function () {}, {})
            } else {
                repeatFlag++
            }
        }
        var nexttime = 0;
        var nextsum = 0;
        if (fbindex >= cools.length) {
            for(i=0;i<cools.length;i++){if(cools[i]!="-1"&&cools[i]-time<0){if((i+1)%5==0){if(cools[i-1]=="-1"&&cools[i-2]=="-1"&&cools[i-3]=="-1"&&cools[i-4]=="-1"){if(fbindex==tasks.length){fbindex=i}else{i++}}else{nextsum++;nextsum++;i++}}else{if(fbindex==tasks.length){fbindex=i}else{var pri1=pris[fbindex];var pri2=pris[i];if(pri1<pri2){fbindex=i}}}}else if(cools[i]!="-1"){if(nexttime==0){nexttime=cools[i]}else if(nexttime-cools[i]>0){nexttime=cools[i]}nextsum++}};
            nexttime=nexttime-time;if(fbindex>=cools.length){empty++;if(empty==1){var date=new Date();var now=date.getTime()/1000;var t=parseInt(now+8*3600);var hour=parseInt((t%(3600*24))/3600);var minute=parseInt((t%3600)/60);var second=t%60;var strHour=hour;var strMinute=minute;var strSecond=second;if(hour<10){strHour="0"+hour}if(minute<10){strMinute="0"+minute}if(second<10){strSecond="0"+second}if(self._showMsg.length>0){var arrMsg=self._showMsg.split("</br>");if(arrMsg.length>8){var msgIndex=self._showMsg.indexOf("</br>");self._showMsg=self._showMsg.substring(msgIndex+5)}self._showMsg=self._showMsg+"</br>"+strHour+":"+strMinute+":"+strSecond+" [刷丹]:预计"+nexttime+"秒,任务:"+nextsum+"个"}else{self._showMsg=strHour+":"+strMinute+":"+strSecond+" [刷丹]:预计"+nexttime+"秒,任务:"+nextsum+"个"}Mojo.app.toast.show(self._showMsg,"20000")}}else{empty=0};
            if(empty>20){for(i=0;i<cools.length;i++){if(cools[i]!="-1"){break}}if(i>=cools.length){w.clearInterval(autoFuben2);alert("副本完成")}else{empty=0}};
        }
    }, zhixingtime);
}

function un(){
	var self = this;
	if (group == 100) {
	    for (var i = 0; i < 5; i++) {
		    tasks[tasks.length] = 0;
		    groups[groups.length] = "0-0-0";
		    names[names.length] = "0-0-0";
		    cools[cools.length] = "-1";
		    pris[pris.length] = "-1"
		}
		group = 1;
		index++;
		if (index < runfb.length) {
		    self.un(runfb, index, group, tasks, groups, names, cools, pris)
		} else {
		    self.fu(tasks, groups, names, cools, pris)
		}
	} else {
	    var params = {
		    start: 0,
		    count: 50,
		    fuben_id: runfb[index],
		    fb_task_group_id: group,
		};
	    Mojo.ajax("/fuben/fbTasks", params, function (result) {
	        if (result.errorCode == 0 && result.data.fb_tasks != "") {
	        	var time = parseInt(new Date().getTime() / 1000);
				for (var i = 0; i < 5; i++) {
				    tasks[tasks.length] = result.data.fb_tasks[i].id;
				    groups[groups.length] = runfb[index] + "-" + group + "-" + (i + 1);
				    names[names.length] = result.data.cur_fuben.name + "-" + result.data.fb_task_groups[group - 1].name + "-" + result.data.fb_tasks[i].name;
				    if (result.data.fb_tasks[i].percent < 100) {
				        cools[cools.length] = parseInt(result.data.fb_tasks[i].cold_down) + parseInt(time) + 1
				    } else {
				        cools[cools.length] = "-1"
				    } if (i == 0) {
				        if (runfb[index] == 2 || runfb[index] == 6) {
				            pris[pris.length] = 2
				        } else if (runfb[index] == 3 || runfb[index] == 5 || runfb[index] == 7 || runfb[index] == 8) {
				            pris[pris.length] = 3
				        } else if (runfb[index] == 1 || runfb[index] == 4 || runfb[index] == 9 || runfb[index] == 10 || runfb[index] == 11) {
				            pris[pris.length] = 4
				        } else {
				            pris[pris.length] = 2
				        }
				    } else if (i == 1) {
				        if (runfb[index] == 3 || runfb[index] == 4) {
				            pris[pris.length] = 6
				        } else {
				            pris[pris.length] = 5
				        }
				    } else if (i == 2) {
				        if (runfb[index] == 3 || runfb[index] == 4) {
				            pris[pris.length] = 8
				        } else {
				            pris[pris.length] = 7
				        }
				    } else if (i == 3) {
				        if (runfb[index] == 3 || runfb[index] == 4) {
				            pris[pris.length] = 12
				        } else if (runfb[index] == 1 || runfb[index] == 9 || runfb[index] == 10) {
				            pris[pris.length] = 11
				        } else if (runfb[index] == 2) {
				            pris[pris.length] = 9
				        } else {
				            pris[pris.length] = 10
				        }
				    } else {
				        pris[pris.length] = 1
				    }
				}
				if (group < result.data.fb_task_groups.length) {
				    group++
				} else {
				    group = 100
				}
				self.un(runfb, index, group, tasks, groups, names, cools, pris)
	        } else {
	            for (var i = 0; i < 5; i++) {
				    tasks[tasks.length] = 0;
				    groups[groups.length] = "0-0-0";
				    names[names.length] = "0-0-0";
				    cools[cools.length] = "-1";
				    pris[pris.length] = "-1"
				}
				group = 1;
				index++;
				if (index < runfb.length) {
				    self.un(runfb, index, group, tasks, groups, names, cools, pris)
				} else {
				    self.fu(tasks, groups, names, cools, pris)
				}
	        }
	    }, function () {})
	}
}

function i(){
	var self = this;
	Mojo.app.toast.show("初始化内政数据ing");
	var arrTask = ["1@361", "2@557", "3@361", "4@37", "5@181", "6@361", "7@111", "8@361", "9@557"];
	var arrTaskCool = new Array(arrTask.length);
	for (var i = 0; i < arrTask.length; i++) {
	    arrTaskCool[i] = 0
	}
	var time;
	var fbindex = 0;
	var i = 0;
	var title = "";
	var mi;
	var ss;
	var timestr;
	var timef;
	var sumtime;
	var empty = 0;
	var empty1 = 0;
	var serverRe = 0;
	var repeatFlag = 120;
	var repeatFlagMax = repeatFlag;
	var autoForce = w.setInterval(function () {
	    var date = new Date();
	    var now = date.getTime() / 1000;
	    var t = parseInt(now + 8 * 3600);
	    var hour = parseInt((t % (3600 * 24)) / 3600);
	    var minute = parseInt((t % 3600) / 60);
	    var second = t % 60;
	    var strHour = hour;
	    var strMinute = minute;
	    var strSecond = second;
	    if (hour < 10) {
	        strHour = "0" + hour
	    }
	    if (minute < 10) {
	        strMinute = "0" + minute
	    }
	    if (second < 10) {
	        strSecond = "0" + second
	    }
	    if (fbindex < arrTaskCool.length) {
	        if (repeatFlag >= repeatFlagMax) {
	            repeatFlag = 0;
	            time = parseInt(new Date().getTime() / 1000);
	            var fubenid = arrTask[fbindex].split("@")[0];
	            var fubencool = arrTask[fbindex].split("@")[1];
	            Mojo.ajax("/force/doTask", {
	                id: fubenid,
	            }, function (result) {
	                setTimeout(function () {
	                    repeatFlag = repeatFlagMax
	                }, 2000);
	                switch (fbindex) {
	                case 0:
	                    title = "全民挖地球";
	                    break;
	                case 1:
	                    title = "后门要牢固";
	                    break;
	                case 2:
	                    title = "别动我的粮饷";
	                    break;
	                case 3:
	                    title = "师兄需要你";
	                    break;
	                case 4:
	                    title = "魔鬼式训练";
	                    break;
	                case 5:
	                    title = "你吃了吗";
	                    break;
	                case 6:
	                    title = "叛徒必须死";
	                    break;
	                case 7:
	                    title = "你的都是我的";
	                    break;
	                case 8:
	                    title = "偷窥可以有"
	                }
	                if (result.errorCode == 0) {
	                    arrTaskCool[fbindex] = time + parseInt(fubencool);
	                    if (self._showMsg.length > 0) {
	                        var arrMsg = self._showMsg.split("</br>");
	                        if (arrMsg.length > 8) {
	                            var msgIndex = self._showMsg.indexOf("</br>");
	                            self._showMsg = self._showMsg.substring(msgIndex + 5)
	                        }
	                        self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [内政]执行: " + title
	                    } else {
	                        self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [内政]执行: " + title
	                    }
	                    Mojo.app.toast.show(self._showMsg, "20000");
	                    serverRe = 0
	                } else if (result.errorCode == 1) {} else if (result.errorCode == 130100) {
	                    arrTaskCool[fbindex] = "-1";
	                    for (i = fbindex + 1; i < arrTaskCool.length; i++) {
	                        if (arrTaskCool[i] != "-1" && arrTaskCool[i] - time < 0) {
	                            break
	                        }
	                    }
	                    fbindex = i
	                } else if (result.errorCode == 160003) {
	                    alert("卡牌容量不足");
	                    w.clearInterval(autoForce)
	                } else if (result.errorCode == 20004) {
	                    for (i = fbindex + 1; i < arrTaskCool.length; i++) {
	                        if (arrTaskCool[i] != "-1" && arrTaskCool[i] - time < 0) {
	                            break
	                        }
	                    }
	                    fbindex = i;
	                    serverRe = 0
	                } else if (result.errorCode == 20002) {
	                    arrTaskCool[fbindex] = "-1";
	                    for (i = fbindex + 1; i < arrTaskCool.length; i++) {
	                        if (arrTaskCool[i] != "-1" && arrTaskCool[i] - time < 0) {
	                            break
	                        }
	                    }
	                    fbindex = i;
	                    if (serverRe == 1) {;
	                        serverRe = 0;
	                        for (i = 0; i < arrTask.length; i++) {
	                            arrTaskCool[i] = "-1"
	                        }
	                        fbindex = arrTask.length + 1
	                    }
	                } else {
	                    w.clearInterval(autoForce)
	                }
	            }, function () {}, {})
	        } else {
	            repeatFlag++
	        }
	    } else {
	        timef = parseInt(new Date().getTime() / 1000);
	        sumtime = 0;
	        for (i = 0; i < arrTaskCool.length; i++) {
	            sumtime = sumtime + parseInt(arrTaskCool[i]);
	            if (arrTaskCool[i] != "-1" && arrTaskCool[i] - timef < 0) {
	                fbindex = i
	            }
	        }
	        mi = parseInt((timef - time) / 60);
	        ss = (timef - time) % 60;
	        if (ss.length == 1) {
	            ss = "0" + ss
	        }
	        timestr = mi + "分" + ss + "秒";
	        if (sumtime == -9) {
	            empty++;
	            if (empty == 2) {
	                Mojo.ajax("/force/playerTasks", {}, function (result) {
	                    if (result.errorCode == 0) {
	                        if (self._showMsg.length > 0) {
	                            var arrMsg = self._showMsg.split("</br>");
	                            if (arrMsg.length > 8) {
	                                var msgIndex = self._showMsg.indexOf("</br>");
	                                self._showMsg = self._showMsg.substring(msgIndex + 5)
	                            }
	                            self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [内政]尝试接收系统刷新"
	                        } else {
	                            self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [内政]尝试接收系统刷新"
	                        }
	                        Mojo.app.toast.show(self._showMsg, "20000");
	                        for (i = 0; i < arrTask.length; i++) {
	                            arrTaskCool[i] = 0
	                        }
	                        fbindex = 0;
	                        serverRe = 1
	                    }
	                }, function () {})
	            } else if (empty > 15) {
	                Mojo.ajax("/force/acceptRefreshTask", {}, function (result) {
	                    if (result.errorCode == 0) {
	                        if (self._showMsg.length > 0) {
	                            var arrMsg = self._showMsg.split("</br>");
	                            if (arrMsg.length > 8) {
	                                var msgIndex = self._showMsg.indexOf("</br>");
	                                self._showMsg = self._showMsg.substring(msgIndex + 5)
	                            }
	                            self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [内政]自动接收官员刷新"
	                        } else {
	                            self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [内政]自动接收官员刷新"
	                        }
	                        Mojo.app.toast.show(self._showMsg, "20000");
	                        for (i = 0; i < arrTask.length; i++) {
	                            arrTaskCool[i] = 0
	                        }
	                        fbindex = 0
	                    }
	                });
	                empty = 0
	            }
	        } else {
	            empty1++;
	            if (empty1 > 120) {
	                if (self._showMsg.length > 0) {
	                    var arrMsg = self._showMsg.split("</br>");
	                    if (arrMsg.length > 8) {
	                        var msgIndex = self._showMsg.indexOf("</br>");
	                        self._showMsg = self._showMsg.substring(msgIndex + 5)
	                    }
	                    self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [内政]等待冷却中..."
	                } else {
	                    self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [内政]等待冷却中..."
	                }
	                Mojo.app.toast.show(self._showMsg, "20000");
	                empty1 = 0
	            }
	        }
	    }
	}, 500)
}

function nc(){
	var self = this;
	var robs = ["b101", "b102", "b103", "b104", "b105", "b106", "b107", "b108", "b109", "b110"];
	var robname = ["孟德新书", "兵书24篇", "遁甲天书", "春秋左氏传", "史记", "太平要术", "六韬", "孙子兵法", "青囊书", "玉玺"];
	Mojo.app.toast.show("开始收宝");
	var robid = 0;
	var mzflag = confirm("是否开启自动免战模式?");
	var repeatFlag = 120;
	var repeatFlagMax = repeatFlag;
	var autoRob = w.setInterval(function () {
	    if (repeatFlag >= repeatFlagMax) {
	        repeatFlag = 0;
	        var date = new Date();
	        var now = date.getTime() / 1000;
	        var t = parseInt(now + 8 * 3600);
	        var hour = parseInt((t % (3600 * 24)) / 3600);
	        var minute = parseInt((t % 3600) / 60);
	        var second = t % 60;
	        var strHour = hour;
	        var strMinute = minute;
	        var strSecond = second;
	        if (hour < 10) {
	            strHour = "0" + hour
	        }
	        if (minute < 10) {
	            strMinute = "0" + minute
	        }
	        if (second < 10) {
	            strSecond = "0" + second
	        }
	        Mojo.ajax("/collect/composite", {
	            id: robs[robid]
	        }, function (result) {
	            if (result.errorCode == 50003) {
	                msg = result.errorMsg;
	                msgindex = msg.indexOf("剩余时间");
	                if (msgindex != -1) {
	                    msg = msg.substring(msgindex);
	                    if (self._showMsg.length > 0) {
	                        var arrMsg = self._showMsg.split("</br>");
	                        if (arrMsg.length > 8) {
	                            var msgIndex = self._showMsg.indexOf("</br>");
	                            self._showMsg = self._showMsg.substring(msgIndex + 5)
	                        }
	                        self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " " + robname[robid] + "正在合成中, " + msg
	                    } else {
	                        self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " " + robname[robid] + "正在合成中, " + msg
	                    }
	                    Mojo.app.toast.show(self._showMsg, "20000");
	                    robid = robid + 1;
	                    if (robid > 9) {
	                        robid = 0
	                    }
	                    if (mzflag) {
	                        setTimeout(function () {
	                            Mojo.ajax("/collect/avoidWar", {}, function (result) {
	                                setTimeout(function () {
	                                    repeatFlag = repeatFlagMax
	                                }, 1000);
	                                if (result.errorCode == 0) {
	                                    if (parseInt(result.data.avoid_war_time) > 0) {
	                                        if (self._showMsg.length > 0) {
	                                            var arrMsg = self._showMsg.split("</br>");
	                                            if (arrMsg.length > 8) {
	                                                var msgIndex = self._showMsg.indexOf("</br>");
	                                                self._showMsg = self._showMsg.substring(msgIndex + 5)
	                                            }
	                                            self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [合成]免战时间：" + parseInt(result.data.avoid_war_time) + "秒"
	                                        } else {
	                                            self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [合成]免战时间：" + parseInt(result.data.avoid_war_time) + "秒"
	                                        }
	                                        Mojo.app.toast.show(self._showMsg, "20000")
	                                    } else {
	                                        if (result.data.id != undefined) {
	                                            Mojo.ajax("/entity/Use", {
	                                                id: result.data.id,
	                                            }, function (result) {
	                                                if (result.errorCode == 0) {
	                                                    if (self._showMsg.length > 0) {
	                                                        var arrMsg = self._showMsg.split("</br>");
	                                                        if (arrMsg.length > 8) {
	                                                            var msgIndex = self._showMsg.indexOf("</br>");
	                                                            self._showMsg = self._showMsg.substring(msgIndex + 5)
	                                                        }
	                                                        self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [合成]自动使用1个免战令"
	                                                    } else {
	                                                        self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [合成]自动使用1个免战令"
	                                                    }
	                                                    Mojo.app.toast.show(self._showMsg, "20000")
	                                                }
	                                            }, function () {}, {})
	                                        } else {
	                                            if (self._showMsg.length > 0) {
	                                                var arrMsg = self._showMsg.split("</br>");
	                                                if (arrMsg.length > 8) {
	                                                    var msgIndex = self._showMsg.indexOf("</br>");
	                                                    self._showMsg = self._showMsg.substring(msgIndex + 5)
	                                                }
	                                                self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [合成]缺少免战令"
	                                            } else {
	                                                self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [合成]缺少免战令"
	                                            }
	                                            Mojo.app.toast.show(self._showMsg, "20000")
	                                        }
	                                    }
	                                }
	                            }, function () {}, {})
	                        }, 1000)
	                    } else {
	                        setTimeout(function () {
	                            repeatFlag = repeatFlagMax
	                        }, 1000)
	                    }
	                }
	            } else if (result.errorCode == 0) {
	                if (self._showMsg.length > 0) {
	                    var arrMsg = self._showMsg.split("</br>");
	                    if (arrMsg.length > 8) {
	                        var msgIndex = self._showMsg.indexOf("</br>");
	                        self._showMsg = self._showMsg.substring(msgIndex + 5)
	                    }
	                    self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [合成]收获 " + robname[robid] + " 1本"
	                } else {
	                    self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [合成]收获 " + robname[robid] + " 1本"
	                }
	                Mojo.app.toast.show(self._showMsg, "20000")
	            }
	            if (result.errorCode == 0 || result.errorCode == 50004 || (result.errorCode == 50003 && msgindex == -1)) {
	                setTimeout(function () {
	                    Mojo.ajax("/collect/compositeStart", {
	                        id: robs[robid]
	                    }, function (result) {
	                        if (result.errorCode == 0) {
	                            if (self._showMsg.length > 0) {
	                                var arrMsg = self._showMsg.split("</br>");
	                                if (arrMsg.length > 8) {
	                                    var msgIndex = self._showMsg.indexOf("</br>");
	                                    self._showMsg = self._showMsg.substring(msgIndex + 5)
	                                }
	                                self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [合成]开始合成:" + robname[robid]
	                            } else {
	                                self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [合成]开始合成:" + robname[robid]
	                            }
	                            Mojo.app.toast.show(self._showMsg, "20000");
	                            if (mzflag) {
	                                setTimeout(function () {
	                                    Mojo.ajax("/collect/avoidWar", {}, function (result) {
	                                        setTimeout(function () {
	                                            repeatFlag = repeatFlagMax
	                                        }, 1000);
	                                        if (result.errorCode == 0) {
	                                            if (parseInt(result.data.avoid_war_time) > 0) {
	                                                if (self._showMsg.length > 0) {
	                                                    var arrMsg = self._showMsg.split("</br>");
	                                                    if (arrMsg.length > 8) {
	                                                        var msgIndex = self._showMsg.indexOf("</br>");
	                                                        self._showMsg = self._showMsg.substring(msgIndex + 5)
	                                                    }
	                                                    self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [合成]免战时间：" + parseInt(result.data.avoid_war_time) + "秒"
	                                                } else {
	                                                    self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [合成]免战时间：" + parseInt(result.data.avoid_war_time) + "秒"
	                                                }
	                                                Mojo.app.toast.show(self._showMsg, "20000")
	                                            } else {
	                                                if (result.data.id != undefined) {
	                                                    Mojo.ajax("/entity/Use", {
	                                                        id: result.data.id,
	                                                    }, function (result) {
	                                                        if (result.errorCode == 0) {
	                                                            if (self._showMsg.length > 0) {
	                                                                var arrMsg = self._showMsg.split("</br>");
	                                                                if (arrMsg.length > 8) {
	                                                                    var msgIndex = self._showMsg.indexOf("</br>");
	                                                                    self._showMsg = self._showMsg.substring(msgIndex + 5)
	                                                                }
	                                                                self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [合成]自动使用1个免战令"
	                                                            } else {
	                                                                self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [合成]自动使用1个免战令"
	                                                            }
	                                                            Mojo.app.toast.show(self._showMsg, "20000")
	                                                        }
	                                                    }, function () {}, {})
	                                                } else {
	                                                    if (self._showMsg.length > 0) {
	                                                        var arrMsg = self._showMsg.split("</br>");
	                                                        if (arrMsg.length > 8) {
	                                                            var msgIndex = self._showMsg.indexOf("</br>");
	                                                            self._showMsg = self._showMsg.substring(msgIndex + 5)
	                                                        }
	                                                        self._showMsg = self._showMsg + "</br>" + strHour + ":" + strMinute + ":" + strSecond + " [合成]缺少免战令"
	                                                    } else {
	                                                        self._showMsg = strHour + ":" + strMinute + ":" + strSecond + " [合成]缺少免战令"
	                                                    }
	                                                    Mojo.app.toast.show(self._showMsg, "20000")
	                                                }
	                                            }
	                                        }
	                                    }, function () {}, {})
	                                }, 1000)
	                            } else {
	                                setTimeout(function () {
	                                    repeatFlag = repeatFlagMax
	                                }, 1000)
	                            }
	                        } else {
	                            setTimeout(function () {
	                                repeatFlag = repeatFlagMax
	                            }, 1000)
	                        }
	                        robid = robid + 1;
	                        if (robid > 9) {
	                            robid = 0
	                        }
	                    }, function () {}, {})
	                }, 1000)
	            }
	        }, function () {}, {})
	    } else {
	        repeatFlag++
	    }
	}, 500)
}

function ct(){
	var self = this;
	var params = {};
	var cond;
	var cd;
	var num = 0;
	var repeatFlag = 8;
	var repeatFlagMax = repeatFlag;
	var listParams = {
	    start: 0,
	    count: 20,
	    type: 4,
	    sub_type: 0,
	};
	Mojo.ajax("/illustration/list", listParams, function (result) {
	    if (result.errorCode == 0) {
	        for (var i in result.data.list) {
	            var award = result.data.list[i].award.name;
	            var name = result.data.list[i].name;
	            if (award == "钱袋" && name == "变碎为宝活动") {
	                params.game_activity_id = result.data.list[i].id;
	                cond = result.data.list[i].conditions[2].id;
	                cd = result.data.list[i].cooling_time
	            }
	        }
	        Mojo.app.toast.show("开启自动兑换钱袋,冷却时间: " + cd + "秒", "20000");
	        var date = new Date();
	        var now = date.getTime() / 1000;
	        cd = parseInt(cd) + parseInt(now) + parseInt(3);
	        var autosuipian = w.setInterval(function () {
	            date = new Date();
	            now = date.getTime() / 1000;
	            var cha = parseInt(cd) - parseInt(now);
	            if (cha < 0 && repeatFlag >= repeatFlagMax) {
	                repeatFlag = 0;
	                var t = parseInt(now + 8 * 3600);
	                var hour = parseInt((t % (3600 * 24)) / 3600);
	                var minute = parseInt((t % 3600) / 60);
	                var second = t % 60;
	                var strHour = hour;
	                var strMinute = minute;
	                var strSecond = second;
	                if (hour < 10) {
	                    strHour = "0" + hour
	                }
	                if (minute < 10) {
	                    strMinute = "0" + minute
	                }
	                if (second < 10) {
	                    strSecond = "0" + second
	                }
	                var shownow = strHour + ":" + strMinute + ":" + strSecond + " ";
	                Mojo.ajax("/gameactivity/choose", {
	                    start: 0,
	                    count: 1,
	                    condition_id: cond
	                }, function (response) {
	                    if (response.errorCode == 0) {
	                        if (response.data.list.length > 0) {
	                            eval("params.condition_" + cond + " = " + response.data.list[0].player_entity_id + ";");
	                            Mojo.ajax("/gameactivity/do", params, function (response1) {
	                                setTimeout(function () {
	                                    repeatFlag = repeatFlagMax
	                                }, 1000);
	                                if (response1.errorCode == 0) {
	                                    if (self._showMsg.length > 0) {
	                                        var arrMsg = self._showMsg.split("</br>");
	                                        if (arrMsg.length > 8) {
	                                            var msgIndex = self._showMsg.indexOf("</br>");
	                                            self._showMsg = self._showMsg.substring(msgIndex + 5)
	                                        }
	                                        self._showMsg = self._showMsg + "</br>" + shownow + "[兑换]获得1个钱袋"
	                                    } else {
	                                        self._showMsg = shownow + "[兑换]获得1个钱袋"
	                                    }
	                                    Mojo.app.toast.show(self._showMsg, "20000");
	                                    date = new Date();
	                                    now = date.getTime() / 1000;
	                                    cd = parseInt(3603) + parseInt(now)
	                                } else {
	                                    if (self._showMsg.length > 0) {
	                                        var arrMsg = self._showMsg.split("</br>");
	                                        if (arrMsg.length > 8) {
	                                            var msgIndex = self._showMsg.indexOf("</br>");
	                                            self._showMsg = self._showMsg.substring(msgIndex + 5)
	                                        }
	                                        self._showMsg = self._showMsg + "</br>" + shownow + "[兑换]" + response1.errorMsg
	                                    } else {
	                                        self._showMsg = shownow + "[兑换]" + response1.errorMsg
	                                    }
	                                    Mojo.app.toast.show(self._showMsg, "20000")
	                                }
	                            }, function () {})
	                        } else {
	                            setTimeout(function () {
	                                repeatFlag = repeatFlagMax
	                            }, 1000);
	                            if (self._showMsg.length > 0) {
	                                var arrMsg = self._showMsg.split("</br>");
	                                if (arrMsg.length > 8) {
	                                    var msgIndex = self._showMsg.indexOf("</br>");
	                                    self._showMsg = self._showMsg.substring(msgIndex + 5)
	                                }
	                                self._showMsg = self._showMsg + "</br>" + shownow + "[兑换]缺少祭祀卡"
	                            } else {
	                                self._showMsg = shownow + "[兑换]缺少祭祀卡"
	                            }
	                            Mojo.app.toast.show(self._showMsg, "20000")
	                        }
	                    } else {
	                        setTimeout(function () {
	                            repeatFlag = repeatFlagMax
	                        }, 1000);
	                        if (self._showMsg.length > 0) {
	                            var arrMsg = self._showMsg.split("</br>");
	                            if (arrMsg.length > 8) {
	                                var msgIndex = self._showMsg.indexOf("</br>");
	                                self._showMsg = self._showMsg.substring(msgIndex + 5)
	                            }
	                            self._showMsg = self._showMsg + "</br>" + shownow + "[兑换]" + response.errorMsg
	                        } else {
	                            self._showMsg = shownow + "[兑换]" + response.errorMsg
	                        }
	                        Mojo.app.toast.show(self._showMsg, "20000")
	                    }
	                }, function () {})
	            } else {
	                repeatFlag++;
	                if (num > 10) {
	                    num = 0;
	                    var t = parseInt(now + 8 * 3600);
	                    var hour = parseInt((t % (3600 * 24)) / 3600);
	                    var minute = parseInt((t % 3600) / 60);
	                    var second = t % 60;
	                    var strHour = hour;
	                    var strMinute = minute;
	                    var strSecond = second;
	                    if (hour < 10) {
	                        strHour = "0" + hour
	                    }
	                    if (minute < 10) {
	                        strMinute = "0" + minute
	                    }
	                    if (second < 10) {
	                        strSecond = "0" + second
	                    }
	                    var shownow = strHour + ":" + strMinute + ":" + strSecond + " ";
	                    if (self._showMsg.length > 0) {
	                        var arrMsg = self._showMsg.split("</br>");
	                        if (arrMsg.length > 8) {
	                            var msgIndex = self._showMsg.indexOf("</br>");
	                            self._showMsg = self._showMsg.substring(msgIndex + 5)
	                        }
	                        self._showMsg = self._showMsg + "</br>" + shownow + "[兑换]预计" + cha + "秒后兑换钱袋"
	                    } else {
	                        self._showMsg = shownow + "[兑换]预计" + cha + "秒后兑换钱袋"
	                    }
	                    Mojo.app.toast.show(self._showMsg, "20000")
	                } else {
	                    num++
	                }
	            }
	        }, 5000)
	    }
	}, function () {})
}