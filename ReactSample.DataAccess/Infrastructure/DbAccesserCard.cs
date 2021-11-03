using ReactSample.DataAccess.Interfaces;
using ReactSample.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace ReactSample.DataAccess.Infrastructure
{
    public class DbAccesserCard : DbAccesserEF<Card>, IDbAccesserCard
    {
        readonly ChattyContext _context;
        public DbAccesserCard(ChattyContext context) : base(context)
        {
            _context = context;
        }

        public Card AddCard(Card card)
        {
            AddItem(card);

            return card;
        }

        public void DeleteCard(Card card)
        {
            var itemToDelete = GetItem(i => i.Id == card.Id);
            
            DeleteItem(itemToDelete);
        }

        public Card EditCard(Card card)
        {
            var itemToEdit = GetItem(i => i.Id == card.Id);

            itemToEdit.Name = card.Name;
            itemToEdit.ListId = card.ListId;
            itemToEdit.Description = card.Description;

            EditItem(itemToEdit);

            return itemToEdit;
        }

        public Card GetCard(Expression<Func<Card, bool>> predicate)
        {
            var card = GetItem(predicate);

            return card;
        }

        public IEnumerable<Card> GetCards(Expression<Func<Card, bool>> predicate)
        {
            var cards = GetItems(predicate);

            return cards;
        }

        public IEnumerable<Card> GetCards()
        {
            var cards = GetItems();

            return cards;
        }
    }
}
