using ReactSample.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace ReactSample.DataAccess.Interfaces
{
    public interface IDbAccesserCard
    {
        public Card GetCard(Expression<Func<Card, bool>> predicate);
        public IEnumerable<Card> GetCards(Expression<Func<Card, bool>> predicate);
        public IEnumerable<Card> GetCards();
        public Card AddCard(Card card);
        public Card EditCard(Card card);
        public void DeleteCard(Card card);
    }
}
