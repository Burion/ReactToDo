using Microsoft.Extensions.DependencyInjection;
using ReactSample.DataAccess;
using ReactSample.DataAccess.Infrastructure;
using ReactSample.DataAccess.Interfaces;
using ReactSample.Services.Infrastructure;
using ReactSample.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactSample.Services.Helpers
{
    public static class ServicesConfiguration
    {
        public static void ConfigureServicesDependencies(this IServiceCollection collection)
        {
            collection.AddTransient<ChattyContext, ChattyContext>();
            collection.AddTransient<IDbAccesserUser, DbAccesserEFUsers>();
            collection.AddTransient<IUserService, UserService>();

            collection.AddTransient<IDbAccesserBoard, DbAccesserBoard>();
            collection.AddTransient<IDbAccesserBoardUser, DbAccesserBoardUser>();

            collection.AddTransient<IDbAccesserList, DbAccesserList>();
            collection.AddTransient<IDbAccesserCard, DbAccesserCard>();
            collection.AddTransient<IDbAccesserImage, DbAccesserImage>();
        }
    }
}
