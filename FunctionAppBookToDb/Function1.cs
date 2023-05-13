using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace FunctionAppBookToDb
{
    public static class Function1
    {
        [FunctionName("Function1")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function,"post", Route = null)] HttpRequest req,
            [Sql("dbo.Books","sqlConnectionString")]IAsyncCollector<Book>books,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

           // string name = req.Query["name"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            Book b = JsonConvert.DeserializeObject<Book>(requestBody);

            await books.AddAsync(b);
            await books.FlushAsync();


            return new OkObjectResult("New Book Successfully Added");
        }
    }
}
