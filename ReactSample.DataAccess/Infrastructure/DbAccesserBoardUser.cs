using ReactSample.DataAccess.Interfaces;
using ReactSample.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactSample.DataAccess.Infrastructure
{
    public class DbAccesserBoardUser : DbAccesserEF<UserBoard>, IDbAccesserBoardUser
    {
        public DbAccesserBoardUser(ChattyContext context) : base(context)
        {

        }

        public UserBoard AssignUser(UserBoard userBoard)
        {
            AddItem(userBoard);

            return userBoard;
        }

        public IEnumerable<UserBoard> GetUserBoards(User user)
        {
            var userBoards = GetItems(i => i.UserId == user.Id);

            return userBoards;
        }

        public IEnumerable<UserBoard> GetUsers(Board board)
        {
            var userBoards = GetItems(ub => ub.BoardId == board.Id);

            return userBoards;
        }

        public void UnAssignUser(UserBoard userBoard)
        {
            var itemToRemove = GetItem(i => i.UserId == userBoard.UserId && i.BoardId == userBoard.BoardId);

            DeleteItem(itemToRemove);
        }
    }
}
