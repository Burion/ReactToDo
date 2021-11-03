using ReactSample.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactSample.Services.Interfaces
{
    public interface IBoardService
    {
        public BoardDto GetBoard(int id);
        public BoardDto AddBoard(BoardDto board);
        public BoardDto AddBoard(BoardDto board, string userId);
        public BoardDto UpdateBoard(BoardDto board);
        public void DeleteBoard(int id);
        public IEnumerable<BoardDto> GetBoardsForUser(UserDto userDto);
        public UserDto AssignUserToBoard(UserDto user, BoardDto board);
    }
}
