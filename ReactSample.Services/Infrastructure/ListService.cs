using AutoMapper;
using ReactSample.DataAccess.Interfaces;
using ReactSample.DataAccess.Models;
using ReactSample.Services.Dtos;
using ReactSample.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactSample.Services.Infrastructure
{
    public class ListService : IListService
    {
        readonly IDbAccesserList _dbAccesserList;
        readonly IDbAccesserCard _dbAccesserCard;
        readonly ICardService _cardService;
        readonly IMapper _mapper;

        public ListService(IDbAccesserList dbAccesserList, IDbAccesserCard dbAccesserCard, ICardService cardService, IMapper mapper)
        {
            _dbAccesserList = dbAccesserList;
            _dbAccesserCard = dbAccesserCard;
            _cardService = cardService;
            _mapper = mapper;
        }
        public ListDto AddList(ListDto list)
        {
            var listToAdd = _mapper.Map<ListDto, List>(list);
            var addedList = _dbAccesserList.AddList(listToAdd);
            var listToReturn = _mapper.Map<List, ListDto>(addedList);

            return listToReturn;
        }

        public void DeleteList(ListDto list)
        {
            var listToDelete = _mapper.Map<ListDto, List>(list);
            _dbAccesserList.DeleteList(listToDelete);
        }

        public void DeleteList(int id)
        {
            var listToDelete = _dbAccesserList.GetList(l => l.Id == id);
            _dbAccesserList.DeleteList(listToDelete);
        }

        public ListDto GetList(int id)
        {
            var list = _dbAccesserList.GetList(l => l.Id == id);
            var listToReturn = _mapper.Map<List, ListDto>(list);

            var cards = _cardService.GetCards(listToReturn);
            listToReturn.Cards = cards.ToArray();

            return listToReturn;
        }

        public IEnumerable<ListDto> GetLists(BoardDto board)
        {
            var lists = _dbAccesserList.GetLists(l => l.BoardId == board.Id);
            var listsToReturn = _mapper.Map<IEnumerable<List>, IEnumerable<ListDto>>(lists);

            foreach(var l in listsToReturn)
            {
                l.Cards = _cardService.GetCards(l).ToArray();
            }

            return listsToReturn;
        }

        public ListDto UpdateList(ListDto list)
        {
            var listToUpdate = _dbAccesserList.GetList(l => l.Id == list.Id);

            listToUpdate.Name = list.Name;

            var editedList = _dbAccesserList.EditList(listToUpdate);
            var listToReturn = _mapper.Map<List, ListDto>(editedList);

            return listToReturn;
        }
    }
}
