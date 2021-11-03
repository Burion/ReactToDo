using ReactSample.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactSample.DataAccess.Interfaces
{
    public interface IDbAccesserBoardUser
    {
        public IEnumerable<UserBoard> GetUsers(Board board);
        public IEnumerable<UserBoard> GetUserBoards(User user);
        public UserBoard AssignUser(UserBoard userBoard);
        public void UnAssignUser(UserBoard userBoard);
    }
}
