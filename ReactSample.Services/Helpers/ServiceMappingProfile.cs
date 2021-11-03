using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using ReactSample.DataAccess;
using ReactSample.DataAccess.Infrastructure;
using ReactSample.DataAccess.Interfaces;
using ReactSample.DataAccess.Models;
using ReactSample.Services.Dtos;
using ReactSample.Services.Infrastructure;
using ReactSample.Services.Interfaces;

namespace ReactSample.Services.Helpers
{
    public static class ServiceMappingProfile
    {
        public static void ConfigureServiceMapping(this Profile profile)
        {
            profile.CreateMap<UserDto, User>();
            profile.CreateMap<User, UserDto>();

            profile.CreateMap<ChattyContext, ChattyContext>();
            profile.CreateMap<IDbAccesserUser, DbAccesserEFUsers>();
            profile.CreateMap<IUserService, UserService>();

            profile.CreateMap<Board, BoardDto>();
            profile.CreateMap<BoardDto, Board>();

            profile.CreateMap<List, ListDto>();
            profile.CreateMap<ListDto, List>();

            profile.CreateMap<Card, CardDto>();
            profile.CreateMap<CardDto, Card>();

            profile.CreateMap<Image, ImageDto>();
            profile.CreateMap<ImageDto, Image>();


        }
    }
}
