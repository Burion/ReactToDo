using ReactSample.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace ReactSample.DataAccess.Interfaces
{
    public interface IDbAccesserUser
    {
        void AddUser(User user);
        void DeleteUser(User user);
        User GetUser(Expression<Func<User, bool>> predicate);
        IEnumerable<User> GetUsers(Expression<Func<User, bool>> predicate);
        IEnumerable<User> GetUsers();
        void EditUsers(User item);
    }
}
