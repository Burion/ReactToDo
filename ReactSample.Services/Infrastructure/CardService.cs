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
    public class CardService : ICardService
    {
        readonly IDbAccesserCard _dbAccesserCard;
        readonly IMapper _mapper;
        public CardService(IDbAccesserCard dbAccesserCard, IMapper mapper)
        {
            _dbAccesserCard = dbAccesserCard;
            _mapper = mapper;
        }

        public CardDto AddCard(CardDto card)
        {
            var cardToAdd = _mapper.Map<CardDto, Card>(card);
            var addedCard = _dbAccesserCard.AddCard(cardToAdd);
            var cardToReturn = _mapper.Map<Card, CardDto>(addedCard);

            return cardToReturn;
        }

        public void DeleteCard(CardDto card)
        {
            var cardToDelete = _mapper.Map<CardDto, Card>(card);

            _dbAccesserCard.DeleteCard(cardToDelete);
        }

        public void DeleteCard(int id)
        {
            _dbAccesserCard.DeleteCard(new Card() { Id = id });
        }

        public CardDto GetCard(int id)
        {
            var card = _dbAccesserCard.GetCard(c => c.Id == id);
            var cardToReturn = _mapper.Map<Card, CardDto>(card);

            return cardToReturn;
        }

        public IEnumerable<CardDto> GetCards(ListDto list)
        {
            var cards = _dbAccesserCard.GetCards(c => c.ListId == list.Id);
            var cardsToReturn = _mapper.Map<IEnumerable<Card>, IEnumerable<CardDto>>(cards);

            return cardsToReturn;
        }

        public CardDto UpdateCard(CardDto card)
        {
            var cardToUpdate = _mapper.Map<CardDto, Card>(card);
            var updatedCard = _dbAccesserCard.EditCard(cardToUpdate);
            var cardToReturn = _mapper.Map<Card, CardDto>(updatedCard);

            return cardToReturn;
        }
    }
}
