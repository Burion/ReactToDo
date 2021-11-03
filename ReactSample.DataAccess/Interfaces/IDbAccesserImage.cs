using ReactSample.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactSample.DataAccess.Interfaces
{
    public interface IDbAccesserImage
    {
        public Image GetImage(string id);
        public IEnumerable<Image> GetImages();
        public Image AddImage(Image image);
        public void DeleteImage(Image image);
    }
}
