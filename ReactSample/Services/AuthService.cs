using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptoHelper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ReactSample.AuthModels;
using ReactSample.Interfaces;
using System.Text;
using ReactSample.Services.Interfaces;

namespace ReactSample.Services
{
    public class AuthService : IAuthService
    {
        private string jwtSecret;
        private int jwtLifespan;
        private readonly IUserService _userService;

        public AuthService(string jwtSecret, int jwtLifespan, IUserService userService)
        {
            this.jwtSecret = jwtSecret;
            this.jwtLifespan = jwtLifespan;
            _userService = userService;
        }

        public AuthData GetAuthData(string id)
        {
            var expirationTime = DateTime.UtcNow.AddSeconds(jwtLifespan);
            var user = _userService.GetUserById(id);

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.Login),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(JwtRegisteredClaimNames.Nbf, new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString()),
                new Claim(JwtRegisteredClaimNames.Exp, new DateTimeOffset(DateTime.Now.AddDays(2)).ToUnixTimeSeconds().ToString())
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var jwtPayload = new JwtPayload(claims);

            var jwtHeader = new JwtHeader(signingCredentials);
            var token = new JwtSecurityToken(jwtHeader, jwtPayload);

            var tokenHandler = new JwtSecurityTokenHandler();
            var accessToken = tokenHandler.WriteToken(token);

            var authData = new AuthData
            {
                Token = accessToken,
                Login = user.Login
            };

            return authData;
        }

        public string HashPassword(string password)
        {
            return Crypto.HashPassword(password);
        }

        public bool VerifyPassword(string actualPassword, string hashedPassword)
        {
            return Crypto.VerifyHashedPassword(hashedPassword, actualPassword);
        }
    }
}
