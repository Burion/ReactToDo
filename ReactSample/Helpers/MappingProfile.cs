using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ReactSample.Services.Dtos;
using ReactSample.ViewModels;

namespace ReactSample.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<BoardViewModel, BoardDto>();
            CreateMap<ListViewModel, ListDto>();
            CreateMap<CardViewModel, CardDto>();
        }
    }
}
