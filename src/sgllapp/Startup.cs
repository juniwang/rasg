using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using sgllapp.Controllers;
using sgllapp.Data;

namespace sgllapp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public IContainer ApplicationContainer
        {
            get;
            private set;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // replace the default IControllerActivator.
            // IServiceCollection.AddControllersAsServices enables DI for controllers but doesn't support property injection. 
            // It only resolves constructor paramters by default. While ServiceBasedControllerActivator will enable us to use a
            // 3rd party DI(autofac in our case) service provider to resolve the controller instance with property injection.
            services.Add(ServiceDescriptor.Transient<IControllerActivator, ServiceBasedControllerActivator>());
            services.AddCors()
                .AddMvc();

            // Create the container builder.
            var builder = new ContainerBuilder();
            RegisterServices(builder);
            RegisterWebConponents(builder);

            // Note that Populate is basically a foreach to add things
            // into Autofac that are in the collection. If you register
            // things in Autofac BEFORE Populate then the stuff in the
            // ServiceCollection can override those things; if you register
            // AFTER Populate those registrations can override things
            // in the ServiceCollection. Mix and match as needed.
            builder.Populate(services);

            ApplicationContainer = builder.Build();
            return new AutofacServiceProvider(this.ApplicationContainer);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }

        void RegisterServices(ContainerBuilder buidler)
        {
            buidler.RegisterType<DefaultHealth>().As<IHealth>().PropertiesAutowired();
            buidler.RegisterType<DataStore>();
            buidler.RegisterType<RedAtomRefresh>();
        }

        void RegisterWebConponents(ContainerBuilder builder)
        {
            // controllers
            // The extension method builder.RegisterApiControllers(typeof(Startup).Assembly) doesn't work since it only registers implementation of 
            // System.Web.Http.Controllers.IHttpController. Which means it actually doesn't support AspNetCore.
            // And IServiceCollection.AddControllersAsServices enables DI but doesn't support property injection.
            // so we have to replace default IControllerActivator and register controllers by our own.
            builder.RegisterAssemblyTypes(typeof(Startup).Assembly).Where(t => typeof(Controller).IsAssignableFrom(t)).PropertiesAutowired();
        }
    }
}
