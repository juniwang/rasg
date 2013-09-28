// -----------------------------------------------------------------------
// <copyright file="MojoSigninQueue.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace sgll.net.Core.Queue
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using sgll.net.Core.Entieies;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class SigninQueue : AbstractQueue
    {
        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.SigninQueue; }
        }

        public override int CountDown
        {
            get
            {
                if (Data.SignInData != null && Data.SignInData.Status == SignStatus.NeedSignin)
                    return 0;

                return 1;
            }
        }

        public override void Action()
        {
            SignIn();
        }

        internal void SignIn()
        {
            dynamic resp = Post("/player/checkIn", "");
            if (resp != null && resp.errorCode == 0)
            {
                string msg = "签到成功";
                if (resp.data.award != null)
                {
                    string at = "获得：" + (string)resp.data.award.name + ",数量:" + (string)resp.data.award.count;
                    if ((bool)resp.data.award.is_double) at += "*2";

                    msg += "," + at;
                    Data.SignInData.AwardToday = at;
                }
                LogWarn(msg);
                Data.SignInData.Status = SignStatus.Completed;

                var player = resp.data.player;
                if (player != null && SGLL.Data.PlayerInfo != null)
                {
                    SGLL.Data.PlayerInfo.EP = player.ep;
                    SGLL.Data.PlayerInfo.SP = player.sp;
                    SGLL.Data.PlayerInfo.VM = player.vm;
                    SGLL.Data.PlayerInfo.RM = player.rm;
                    SGLL.Data.PlayerInfo.Exp = player.xp;
                    SGLL.Data.PlayerInfo.LevelExp = player.next_xp;
                    SGLL.Data.PlayerInfo.Level = player.level;
                    SGLL.Data.PlayerInfo.Energy = player.energy;
                    SGLL.Data.PlayerInfo.Stamima = player.stamina;
                    SGLL.Data.PlayerInfo.Grain = player.grain;
                }
                SGLL.CallStatusUpdate(this, ChangedType.SignIn | ChangedType.Profile);
            }
            else
            {
                LogWarn("签到失败:" + (string)resp.errorMsg);
                Data.SignInData = null;
            }
        }
    }

    public class SigninQueryQueue : AbstractQueue
    {
        public override int QueueGUID
        {
            get { return SGLLController.QueueGUID.SigninQueryQueue; }
        }

        public override int CountDown
        {
            get
            {
                if (SGLL.Data.SignInData == null || SGLL.Data.SignInData.NeedSync)
                    return 0;

                if (Data.SignInData.LastSyncTime.Day != DateTime.Today.Day)
                {
                    Data.SignInData.Status = SignStatus.Unknown;
                    Data.SignInData.AwardToday = "";
                }

                return 1;
            }
        }

        public override void Action()
        {
            dynamic resp = Post("/player/loginstatus", "");
            if (resp != null && resp.errorCode == 0)
            {
                LogWarn("查询签到状态");
                if (Data.SignInData == null)
                    Data.SignInData = new MojoSigninData();

                Data.SignInData.LastSyncTime = DateTime.Now;
                Data.SignInData.SyncIntervalSec = 6 * 60 * 60 + random.Next(0, 3600);
                Data.SignInData.Status = resp.data.check_in != null ? SignStatus.NeedSignin : SignStatus.Completed;

                SGLL.CallStatusUpdate(this, ChangedType.SignIn);
            }
        }
    }
}
