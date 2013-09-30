using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace sgll.net.Core
{
    public class MultipleUserCtl
    {
        static Dictionary<string, SGLLController> controllers = new Dictionary<string, SGLLController>();

        public static void RegisterController(string userName, SGLLController controller)
        {
            if (string.IsNullOrWhiteSpace(userName) || controller == null)
                throw new ArgumentNullException();

            if (controllers.ContainsKey(userName)) controllers.Remove(userName);
            controllers.Add(userName, controller);
        }

        public static void UnRegisterController(string userName)
        {
            if (string.IsNullOrWhiteSpace(userName))
                throw new ArgumentNullException();

            if (controllers.ContainsKey(userName))
                controllers.Remove(userName);
        }

        public static void StartQueueForAllLogonUsers(object sender, int qid)
        {
            foreach (var ctl in controllers.Values)
            {
                ctl.StartQueue(qid);
                ctl.CallStatusUpdate(sender, ChangedType.All);
            }
        }

        public static void StopQueueForAllLogonUsers(object sender, int qid)
        {
            foreach (var ctl in controllers.Values)
            {
                ctl.StopQueue(qid);
                ctl.CallStatusUpdate(sender, ChangedType.All);
            }
        }
    }
}
