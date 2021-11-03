using ReactSample.DataAccess.Interfaces;
using ReactSample.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace ReactSample.DataAccess.Infrastructure
{
    public class DbAccesserEFUsers : DbAccesserEF<User>, IDbAccesserUser
    {
        public DbAccesserEFUsers(ChattyContext context) : base(context)
        {

        }

        public void AddUser(User user)
        {
            AddItem(user);
        }

        public void DeleteUser(User user)
        {
            throw new NotImplementedException();
        }

        public void EditUsers(User item)
        {
            throw new NotImplementedException();
        }

        public User GetUser(Expression<Func<User, bool>> predicate)
        {
            var user = GetItem(predicate);

            return user;

        }

        public IEnumerable<User> GetUsers()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> GetUsers(Expression<Func<User, bool>> predicate)
        {
            var users = GetItems(predicate);

            return users;
        }
    }
}
