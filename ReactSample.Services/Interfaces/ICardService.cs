using ReactSample.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactSample.Services.Interfaces
{
    public interface ICardService
    {
        public CardDto GetCard(int id);
        public IEnumerable<CardDto> GetCards(ListDto list);
        public CardDto AddCard(CardDto card);
        public CardDto UpdateCard(CardDto card);
        public void DeleteCard(CardDto card);
        public void DeleteCard(int id);
    }
}
