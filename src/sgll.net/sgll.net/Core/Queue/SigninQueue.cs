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
                if (UpCall.Data.SignInData == null || UpCall.Data.SignInData.NeedSync || UpCall.Data.SignInData.NeedSignIn)
                    return 0;

                return 1;
            }
        }

        public override void Action()
        {
            
        }

        
    }
}
