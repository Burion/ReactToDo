using ReactSample.DataAccess.Interfaces;
using ReactSample.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace ReactSample.DataAccess.Infrastructure
{
    public class DbAccesserList : DbAccesserEF<List>, IDbAccesserList
    {
        readonly ChattyContext _context;
        public DbAccesserList(ChattyContext context) : base(context)
        {
            _context = context;
        }

        public List AddList(List list)
        {
            AddItem(list);

            return list;
        }

        public void DeleteList(List list)
        {
            var listToDelete = GetItem(i => i.Id == list.Id);

            DeleteItem(listToDelete);
        }

        public List EditList(List list)
        {
            var listToEdit = GetItem(i => i.Id == list.Id);
            listToEdit.Name = list.Name;

            EditItem(listToEdit);
            
            return listToEdit;
        }

        public List GetList(Expression<Func<List, bool>> predicate)
        {
            var listToReturn = GetItem(predicate);

            return listToReturn;
        }

        public IEnumerable<List> GetLists(Expression<Func<List, bool>> predicate)
        {
            var listsToReturn = GetItems(predicate);

            return listsToReturn;
        }

        public IEnumerable<List> GetLists()
        {
            var listsToReturn = GetItems();

            return listsToReturn;
        }
    }
}
