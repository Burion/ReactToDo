using AutoMapper;
using ReactSample.DataAccess.Interfaces;
using ReactSample.DataAccess.Models;
using ReactSample.Services.Dtos;
using ReactSample.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactSample.Services.Infrastructure
{
    public class ImageService : IImageService
    {
        readonly IDbAccesserImage _dbAccesserImage;
        readonly IMapper _mapper;
        public ImageService(IDbAccesserImage dbAccesserImage, IMapper mapper)
        {
            _dbAccesserImage = dbAccesserImage;
            _mapper = mapper;
        }

        public ImageDto AddImage(ImageDto image)
        {
            var imageToAdd = _mapper.Map<ImageDto, Image>(image);
            var addedImage = _dbAccesserImage.AddImage(imageToAdd);
            var imageToReturn = _mapper.Map<Image, ImageDto>(addedImage);

            return imageToReturn;
        }

        public void DeleteImage(ImageDto image)
        {
            var imageToDelete = _dbAccesserImage.GetImage(image.Id);

            _dbAccesserImage.DeleteImage(imageToDelete);
        }

        public IEnumerable<ImageDto> GetImages()
        {
            var images = _dbAccesserImage.GetImages();

            var imagesToReturn = _mapper.Map<IEnumerable<Image>, IEnumerable<ImageDto>>(images);

            return imagesToReturn;
        }
    }
}
