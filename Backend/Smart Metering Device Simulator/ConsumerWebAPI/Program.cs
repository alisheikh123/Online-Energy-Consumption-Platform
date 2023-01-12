using ConsumerWebAPI.Controllers;
using ConsumerWebAPI.Extention;
using ConsumerWebAPI.HubConfig;
using Microsoft.AspNetCore.Cors.Infrastructure;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors();
builder.Services.AddSwaggerGen();
var corsBuilder = new CorsPolicyBuilder();
corsBuilder.AllowAnyHeader();
corsBuilder.AllowAnyMethod();
corsBuilder.AllowAnyOrigin(); // For anyone access.
corsBuilder.WithOrigins("http://localhost:4200"); // for a specific url. Don't add a forward slash on the end!
corsBuilder.WithOrigins("https://172.29.208.1:84");
corsBuilder.WithOrigins("http://172.29.208.1:87");
corsBuilder.WithOrigins("http://ouepfrontend.applewoodofficial.com")
                     .SetIsOriginAllowedToAllowWildcardSubdomains()
                .AllowAnyHeader()
                .AllowAnyMethod();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorePolicy", corsBuilder.Build());
});
builder.Services.AddMvc();
builder.Services.AddSignalR();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Consumer Web API ");
        //c.RoutePrefix = string.Empty;
    });
}
app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) // allow any origin
    .AllowCredentials());
//app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("CorePolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChartHub>("/chart");
app.Run();
