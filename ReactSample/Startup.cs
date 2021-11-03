using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ReactSample.Hubs;
using ReactSample.Services;
using ReactSample.Services.Interfaces;
using ReactSample.Services.Infrastructure;
using ReactSample.DataAccess.Interfaces;
using ReactSample.DataAccess.Infrastructure;
using AutoMapper;
using ReactSample.Services.Helpers;
using ReactSample.Interfaces;
using ReactSample.Helpers;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;

namespace ReactSample
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllersWithViews();
            services.AddSignalR();
            services.AddCors(options =>
            {
                options.AddPolicy("ClientPermission", policy =>
                {
                    policy.AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins("https://localhost:5001")
                        .AllowCredentials();
                });
            });

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.ConfigureServicesDependencies();

            var mappingConfig = new MapperConfiguration(mc =>
            {
                var profile = new MappingProfile();
                profile.ConfigureServiceMapping();
                mc.AddProfile(profile);
            });

            var mapper = mappingConfig.CreateMapper();

            services.AddSingleton(mapper);

            var jwtSecretKey = Configuration.GetValue<string>("JWTSecretKey");
            var jwtLifespan = Configuration.GetValue<int>("JWTLifespan");

            var serviceProvider = services.BuildServiceProvider();
            var userService = serviceProvider.GetService<IUserService>();

            services.AddSingleton<IAuthService>(
                new AuthService(jwtSecretKey, jwtLifespan, userService)
            );

            services.AddTransient<IBoardService, BoardService>();
            services.AddTransient<IListService, ListService>();
            services.AddTransient<ICardService, CardService>();
            services.AddTransient<IImageService, ImageService>();

            var tokenValidatingParameters = new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromMinutes(5)
            };

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = "JwtBearer";
                options.DefaultChallengeScheme = "JwtBearer";
            })
                .AddJwtBearer("JwtBearer", jwtBearerOptions =>
                {
                    jwtBearerOptions.TokenValidationParameters = tokenValidatingParameters;
                });
            }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseCors("ClientPermission");
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                
                endpoints.MapHub<ChatHub>("/chat");
            });


            

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
