using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactSample.AuthModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactSample.Services.Dtos;
using ReactSample.ViewModels;
using ReactSample.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

namespace ReactSample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BoardsController : ControllerBase
    {
        readonly IBoardService _boardService;
        readonly IUserService _userService;
        readonly IMapper _mapper;

        public BoardsController(IBoardService boardService, IUserService userService, IMapper mapper)
        {
            _boardService = boardService;
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public ActionResult<BoardDto> Get(string id)
        {
            var board = _boardService.GetBoard(int.Parse(id));
            
            return board;
        }

        [HttpGet("boardsForCurrentUser")]
        public ActionResult<BoardDto[]> GetBoardsForCurrentUser()
        {
            var userName = User.Identity.Name;
            var user = _userService.GetUserByLogin(userName);

            var boards = _boardService.GetBoardsForUser(user).ToArray();

            return boards;
        }

        [HttpPost]
        public ActionResult<BoardDto> Post([FromBody] BoardViewModel model)
        {
            var userName = User.Identity.Name;
            var user = _userService.GetUserByLogin(userName);

            var boardToAdd = new BoardDto() { Name = model.Name, Image = new ImageDto() { Id = model.ImageId } };
            var boardToReturn = _boardService.AddBoard(boardToAdd, user.Id);

            return boardToReturn;
        }

        [HttpPut]
        public ActionResult<BoardDto> Put([FromBody] BoardViewModel model)
        {
            var boardToEdit = _mapper.Map<BoardViewModel, BoardDto>(model);
            boardToEdit.Image.Id = model.ImageId;

            var boardToReturn = _boardService.UpdateBoard(boardToEdit);

            return boardToReturn;
        }

        [HttpDelete]
        public ActionResult Delete([FromBody] BoardViewModel model)
        {
            var boardToDelete = _mapper.Map<BoardViewModel, BoardDto>(model);

            return Ok();
        }

        [HttpPost("assign")]
        public ActionResult<UserDto> AddUserToBoard([FromBody] BoardUserViewModel model)
        {
            UserDto user;
            try
            {
                user = _userService.GetUserByLogin(model.Login);
            }
            catch(Exception e)
            {
                Console.WriteLine("User is not found");

                var response = BadRequest();

                return response;
            }

            var board = _boardService.GetBoard(model.BoardId);
            var userToReturn = _boardService.AssignUserToBoard(user, board);

            return userToReturn;
        }
    }
}
