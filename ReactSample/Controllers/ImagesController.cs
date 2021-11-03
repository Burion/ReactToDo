using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactSample.Services.Dtos;
using ReactSample.Services.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactSample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        readonly IImageService _imageService;
        public ImagesController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpGet]
        public ActionResult<ImageDto[]> Get()
        {
            var images = _imageService.GetImages();

            return images.ToArray();
        }
    }
}
