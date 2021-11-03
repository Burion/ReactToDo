using ReactSample.DataAccess.Interfaces;
using ReactSample.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace ReactSample.DataAccess.Infrastructure
{
    public class DbAccesserBoard : DbAccesserEF<Board>, IDbAccesserBoard
    {
        readonly ChattyContext _context;
        public DbAccesserBoard(ChattyContext context) : base(context)
        {
            _context = context;
        }

        public Board AddBoard(Board board)
        {
            AddItem(board);
            return board;
        }

        public void DeleteBoard(Board board)
        {
            var boardToDelete = GetItem(i => i.Id == board.Id);
            
            DeleteItem(boardToDelete);
        }

        public Board EditBoard(Board board)
        {
            var boardToEdit = GetItem(i => i.Id == board.Id);

            boardToEdit.Name = board.Name;
            boardToEdit.ImageId = board.ImageId;

            EditItem(boardToEdit);

            return board;
        }

        public Board GetBoard(Expression<Func<Board, bool>> predicate)
        {
            return GetItem(predicate);
        }

        public IEnumerable<Board> GetBoards(Expression<Func<Board, bool>> predicate)
        {
            return GetItems(predicate);
        }

        public IEnumerable<Board> GetBoards()
        {
            return GetItems();
        }
    }
}
