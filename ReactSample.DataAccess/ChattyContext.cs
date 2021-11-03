using ReactSample.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Configuration;
using ReactSample.DataAccess.Models;

namespace ReactSample.DataAccess
{
    public class ChattyContext : DbContext
    {
        DbSet<User> Users { get; set; }
        DbSet<Board> Boards { get; set; }
        DbSet<UserBoard> UsersBoards { get; set; }
        DbSet<List> Lists { get; set; }
        DbSet<Card> Cards { get; set; }
        DbSet<Image> Images { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserBoard>().HasKey(ub => new { ub.UserId, ub.BoardId });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            var connectionString = ConfigurationManager.AppSettings.Get("connectionString") ?? "Server=localhost;Database=chatty;Trusted_Connection=True;";

            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
