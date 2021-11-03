using System;
using System.Collections.Generic;
using System.Text;

namespace ReactSample.Services.Dtos
{
    public class ListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int BoardId { get; set; }
        public CardDto[] Cards { get; set; } = new CardDto[] { };
    }
}
