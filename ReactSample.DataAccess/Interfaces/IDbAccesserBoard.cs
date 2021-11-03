using ReactSample.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace ReactSample.DataAccess.Interfaces
{
    public interface IDbAccesserBoard
    {
        public Board GetBoard(Expression<Func<Board, bool>> predicate);
        public IEnumerable<Board> GetBoards(Expression<Func<Board, bool>> predicate);
        public IEnumerable<Board> GetBoards();
        public Board AddBoard(Board board);
        public Board EditBoard(Board board);
        public void DeleteBoard(Board board);
    }
}
