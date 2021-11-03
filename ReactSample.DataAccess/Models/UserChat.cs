using System;
using System.Collections.Generic;
using System.Text;

namespace ReactSample.DataAccess.Models
{
    class UserChat
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public int ChatId { get; set; }
        public Chat Chat { get; set; }
    }
}
