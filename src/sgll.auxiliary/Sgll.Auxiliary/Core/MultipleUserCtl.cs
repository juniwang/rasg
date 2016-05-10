using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sgll.Auxiliary.Core
{
    public class MultipleUserCtl
    {
        static Dictionary<string, SgllController> controllers = new Dictionary<string, SgllController>();

        public static void RegisterController(string role, SgllController controller)
        {
            if (string.IsNullOrWhiteSpace(role) || controller == null)
                throw new ArgumentNullException();

            if (controllers.ContainsKey(role)) controllers.Remove(role);
            controllers.Add(role, controller);
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

        public static void AdvanceCall(object sender, AdvanceCallArgs args)
        {
            foreach (var ctl in controllers.Values)
            {
                ctl.AdvanceCall(sender, args);
            }
        }
    }
}
