using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactSample.AuthModels;
using ReactSample.Interfaces;
using ReactSample.Services.Dtos;
using ReactSample.Services.Interfaces;
using ReactSample.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactSample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;
        
        public AuthController(IAuthService authService, IUserService userService)
        {
            _authService = authService;
            _userService = userService;
        }

        [HttpPost("register")] 
        public ActionResult<AuthData> Post([FromBody] RegisterViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var usernameUniq = _userService.IsUsernameUniq(model.Login);
            if (!usernameUniq) return BadRequest(new { username = "user with this email already exists" });

            var id = Guid.NewGuid().ToString();
            var user = new UserDto
            {
                Id = id,
                Login = model.Login,
                Password = _authService.HashPassword(model.Password)
            };
            _userService.AddUser(user);

            return _authService.GetAuthData(id);
        }

        [HttpPost("login")]
        public ActionResult<AuthData> Post([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = _userService.GetUserByLogin(model.Login);

            if (user == null)
            {
                return BadRequest(new { email = "no user with this email" });
            }

            var passwordValid = _authService.VerifyPassword(model.Password, user.Password);

            if (!passwordValid)
            {
                return BadRequest(new { password = "invalid password" });
            }
            
            var loggedUser = _authService.GetAuthData(user.Id);
            Response.Cookies.Append("jwt", loggedUser.Token);

            return loggedUser;
        }

        [HttpPost("logout")]
        public ActionResult<AuthData> Post()
        {
            Response.Cookies.Delete("jwt");

            return Ok();
        }
    }
}
