using ReactSample.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace ReactSample.Services.Interfaces
{
    public interface IUserService
    {
        void AddUser(UserDto userDto);
        UserDto GetUserByLogin(string login);
        UserDto GetUserById(string login);
        bool IsUsernameUniq(string username);
    }
}
