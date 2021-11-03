using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactSample.Services.Dtos;
using ReactSample.Services.Interfaces;
using ReactSample.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactSample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardsController : ControllerBase
    {
        readonly ICardService _cardService;
        readonly IMapper _mapper;

        public CardsController(ICardService cardService, IMapper mapper)
        {
            _cardService = cardService;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<CardDto> Get()
        {
            return new CardDto();
        }

        [HttpPost]
        public ActionResult<CardDto> Post([FromBody] CardViewModel model)
        {
            var cardToAdd = _mapper.Map<CardViewModel, CardDto>(model);
            var addedCard = _cardService.AddCard(cardToAdd);

            return addedCard;
        }

        [HttpPut]
        public ActionResult<CardDto> Put([FromBody] CardViewModel model)
        {
            var cardToEdit = _mapper.Map<CardViewModel, CardDto>(model);
            var editedCard = _cardService.UpdateCard(cardToEdit);

            return editedCard;
        }

        [HttpDelete]
        public ActionResult Delete([FromBody] CardViewModel model)
        {
            var cardToDelete = _mapper.Map<CardViewModel, CardDto>(model);
            _cardService.DeleteCard(cardToDelete);

            return Ok();
        }
    }
}
