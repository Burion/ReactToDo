﻿using System;
using System.Collections.Generic;
using System.Text;

namespace ReactSample.DataAccess.Models
{
    public class Card
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ListId { get; set; }
    }
}
