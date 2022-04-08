using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.NetworkInformation;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using API.Data;
using API.MiddleWare;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration) //Constructor , injects classes so it can be used within the classes
        {                                           
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        private readonly string _policyName = "CorsPolicy";
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors();
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            });
            services.AddDbContext<StoreContext>(opt => {
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });


            // services.AddCors(options => {
            //         options.AddPolicy(_policyName,
            //         builder =>
            //         {
            //             builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
            //         });
            //  });


            // services.AddCors(options => {
            //     options.AddDefaultPolicy(builder => {
            //         builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
            //     });
            // });   

            // services.AddCors(opt => {
            //    opt.AddPolicy(name: _policyName, builder => {
            //        builder.WithOrigins("http://localhost:3000")
            //        .AllowAnyHeader()
            //        .AllowAnyMethod();
            //    });
            // });
    
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseMiddleware(typeof(ExceptionMiddleware)); 
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
            }

         app.UseHttpsRedirection();

            app.UseRouting();

            // app.UseForwardedHeaders(new ForwardedHeadersOptions {
            //     ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            // });

            // app.UseCors(_policyName);
            app.UseCors(opt => {

                opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
            });

            app.UseAuthorization();

                app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
