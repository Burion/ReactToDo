using ReactSample.Services.Dtos;
using ReactSample.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using ReactSample.DataAccess;
using ReactSample.DataAccess.Interfaces;
using AutoMapper;
using ReactSample.DataAccess.Models;

namespace ReactSample.Services.Infrastructure
{
    public class UserService : IUserService
    {
        private readonly IDbAccesserUser _dbAccesserUser;
        private readonly IMapper _mapper;
        
        public UserService(IDbAccesserUser dbAccesserUser, IMapper mapper)
        {
            _dbAccesserUser = dbAccesserUser;
            _mapper = mapper;
        }

        public void AddUser(UserDto userDto)
        {
            var user = _mapper.Map<UserDto, User>(userDto);
            _dbAccesserUser.AddUser(user);
        }

        public UserDto GetUserByLogin(string login)
        {
            var user = _dbAccesserUser.GetUser(u => u.Login == login);

            if(user == null)
            {
                throw new Exception("User is not found");
            }

            var userDto = _mapper.Map<User, UserDto>(user);

            return userDto;
        }

        public UserDto GetUserById(string id)
        {
            var user = _dbAccesserUser.GetUser(u => u.Id == id);
            var userDto = _mapper.Map<User, UserDto>(user);

            return userDto;
        }

        public bool IsUsernameUniq(string username)
        {
            return true;
        }
    }
}
