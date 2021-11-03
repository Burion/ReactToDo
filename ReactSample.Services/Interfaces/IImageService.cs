using ReactSample.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactSample.Services.Interfaces
{
    public interface IImageService
    {
        public ImageDto AddImage(ImageDto image);
        public void DeleteImage(ImageDto image);
        public IEnumerable<ImageDto> GetImages();
    }
}
