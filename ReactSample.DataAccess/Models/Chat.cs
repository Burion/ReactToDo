using System;
using System.Collections.Generic;
using System.Text;

namespace ReactSample.DataAccess.Models
{
    class Chat
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<User> Users { get; set; }
    }
}
