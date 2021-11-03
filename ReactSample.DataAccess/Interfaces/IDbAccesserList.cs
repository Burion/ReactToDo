using ReactSample.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace ReactSample.DataAccess.Interfaces
{
    public interface IDbAccesserList
    {
        public List GetList(Expression<Func<List, bool>> predicate);
        public IEnumerable<List> GetLists(Expression<Func<List, bool>> predicate);
        public IEnumerable<List> GetLists();
        public List AddList(List list);
        public List EditList(List list);
        public void DeleteList(List list);
    }
}
