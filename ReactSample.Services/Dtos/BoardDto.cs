using System;
using System.Collections.Generic;
using System.Text;

namespace ReactSample.Services.Dtos
{
    public class BoardDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ListDto[] Lists { get; set; } = new ListDto[] { };
        public UserDto[] Users { get; set; } = new UserDto[] { };
        public ImageDto Image { get; set; } = new ImageDto();
    }
}
