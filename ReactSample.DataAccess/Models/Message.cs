using System;
using System.Collections.Generic;
using System.Text;

namespace ReactSample.DataAccess.Models
{
    class Message
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ChatId { get; set; }
        public Chat Chat { get; set; }
        public string Text { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
