using ReactSample.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactSample.Services.Interfaces
{
    public interface IListService
    {
        public ListDto GetList(int id);
        public IEnumerable<ListDto> GetLists(BoardDto board);
        public ListDto AddList(ListDto list);
        public ListDto UpdateList(ListDto list);
        public void DeleteList(ListDto list);
        public void DeleteList(int id);
    }
}
