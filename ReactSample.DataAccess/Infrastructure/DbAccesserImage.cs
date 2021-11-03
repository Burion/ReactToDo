using ReactSample.DataAccess.Interfaces;
using ReactSample.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactSample.DataAccess.Infrastructure
{
    public class DbAccesserImage : DbAccesserEF<Image>, IDbAccesserImage
    {
        readonly ChattyContext _context;
        public DbAccesserImage(ChattyContext context) : base(context)
        {
            _context = context;
        }
        public Image AddImage(Image image)
        {
            AddItem(image);

            return image;
        }

        public void DeleteImage(Image image)
        {
            var imageToDelete = GetItem(i => i.Id == image.Id);

            DeleteImage(imageToDelete);
        }

        public Image GetImage(string id)
        {
            var imageToReturn = GetItem(i => i.Id == id);

            return imageToReturn;
        }

        public IEnumerable<Image> GetImages()
        {
            var images = GetItems();

            return images;
        }
    }
}
