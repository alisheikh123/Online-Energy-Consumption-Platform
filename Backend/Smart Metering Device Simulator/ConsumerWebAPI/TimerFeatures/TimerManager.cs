namespace ConsumerWebAPI.TimerFeatures
{
    public class TimerManager
    {
        private Timer _timer;
        private AutoResetEvent _autoResetEvent;
        private Action _action;

        public DateTime TimeStarted { get; set; }

        public TimerManager(Action action)
        {
            _action = action;
            _autoResetEvent= new AutoResetEvent(false);
            _timer = new Timer(Execute, _autoResetEvent, 6000, 12000);
            TimeStarted = DateTime.Now;
        }

        public void Execute(object stateInfo)
        {
            _action();
            if ((DateTime.Now - TimeStarted).Seconds > 60)
            {
                _timer.Dispose();
            }
        }
    }
}
