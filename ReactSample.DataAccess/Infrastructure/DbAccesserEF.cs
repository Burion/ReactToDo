using ReactSample.DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using ReactSample.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace ReactSample.DataAccess.Infrastructure
{
    public class DbAccesserEF<T> : IDbAccesser<T>, IDisposable where T : class
    {
        readonly ChattyContext _context;

        public DbAccesserEF(ChattyContext context)
        {
            _context = context;
            _context.Database.EnsureCreated();
        }

        public void AddItem(T item)
        {
            _context.Set<T>().Add(item);
            _context.SaveChanges();
        }

        public void DeleteItem(T item)
        {
            _context.Set<T>().Remove(item);
            _context.SaveChanges();
        }

        public T GetItem(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().SingleOrDefault(predicate);
        }

        public IEnumerable<T> GetItems(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().Where(predicate);
        }

        public IEnumerable<T> GetItems()
        {
            return _context.Set<T>().ToList();
        }

        public IEnumerable<T> GetItemsAsNoTracking()
        {
            return _context.Set<T>().AsNoTracking().ToList();
        }

        public void EditItem(T item)
        {
            _context.Update(item);
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
