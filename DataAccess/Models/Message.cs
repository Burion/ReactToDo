using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Text { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
