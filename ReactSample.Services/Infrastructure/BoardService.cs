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
    public class BoardService : IBoardService
    {
        readonly IDbAccesserBoard _dbAccesserBoard;
        readonly IDbAccesserBoardUser _dbAccesserBoardUser;
        readonly IDbAccesserList _dbAccesserList;
        readonly IListService _listService;
        readonly IDbAccesserUser _dbAccesserUser;
        readonly IDbAccesserImage _dbAccesserImage;
        readonly IMapper _mapper;

        public BoardService(IListService listService, IDbAccesserUser dbAccesserUser, IDbAccesserBoard dbAccesser, IMapper mapper, IDbAccesserBoardUser dbAccesserBoardUser, IDbAccesserList dbAccesserList, IDbAccesserImage dbAccesserImage)
        {
            _dbAccesserBoard = dbAccesser;
            _dbAccesserBoardUser = dbAccesserBoardUser;
            _dbAccesserList = dbAccesserList;
            _listService = listService;
            _dbAccesserUser = dbAccesserUser;
            _dbAccesserImage = dbAccesserImage;
            _mapper = mapper;
        }

        public BoardDto AddBoard(BoardDto board)
        {
            var boardToAdd = _mapper.Map<BoardDto, Board>(board);
            var addedBoard = _dbAccesserBoard.AddBoard(boardToAdd);
            var boardToReturn = _mapper.Map<Board, BoardDto>(addedBoard);

            return boardToReturn;
        }

        public BoardDto AddBoard(BoardDto board, string userId)
        {
            var boardToReturn = AddBoard(board);
            _dbAccesserBoardUser.AssignUser(new UserBoard() { UserId = userId, BoardId = boardToReturn.Id });

            return boardToReturn;
        }

        public UserDto AssignUserToBoard(UserDto user, BoardDto board)
        {
            _dbAccesserBoardUser.AssignUser(new UserBoard() { BoardId = board.Id, UserId = user.Id });

            return user;
        }

        public void DeleteBoard(int id)
        {
            _dbAccesserBoard.DeleteBoard(new Board() { Id = id });
        }

        public BoardDto GetBoard(int id)
        {
            var board = _dbAccesserBoard.GetBoard(b => b.Id == id);
            var boardToReturn = _mapper.Map<Board, BoardDto>(board);

            var lists = _listService.GetLists(boardToReturn);

            var userIds = _dbAccesserBoardUser.GetUsers(board).Select(b => b.UserId);
            var users = _dbAccesserUser.GetUsers(u => userIds.Contains(u.Id));
            var usersDtos = _mapper.Map<IEnumerable<User>, IEnumerable<UserDto>>(users);

            var image = _dbAccesserImage.GetImage(board.ImageId);
            var imageToSet = _mapper.Map<Image, ImageDto>(image);

            boardToReturn.Users = usersDtos.ToArray();
            boardToReturn.Lists = lists.ToArray();
            boardToReturn.Image = imageToSet;

            return boardToReturn;
        }

        public IEnumerable<BoardDto> GetBoardsForUser(UserDto userDto)
        {
            var user = _mapper.Map<UserDto, User>(userDto);
            var userBoards = _dbAccesserBoardUser.GetUserBoards(user);
            var boardIds = userBoards.Select(ub => ub.BoardId);
            var boards = _dbAccesserBoard.GetBoards(b => boardIds.Contains(b.Id));
            var boardsToReturn = _mapper.Map<IEnumerable<Board>, IEnumerable<BoardDto>>(boards);

            return boardsToReturn;
        }

        public BoardDto UpdateBoard(BoardDto board)
        {
            var boardToEdit = _mapper.Map<BoardDto, Board>(board);
            boardToEdit.ImageId = board.Image.Id;
            var editedBoard = _dbAccesserBoard.EditBoard(boardToEdit);
            var boardToReturn = _mapper.Map<Board, BoardDto>(editedBoard);

            return boardToReturn;
        }
    }
}
