using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ReactSample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatsController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public JsonResult Get()
        {
            return new JsonResult(new { Value = new string[] { "value1", "value2" } });
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            return new JsonResult(new { Value = "value" });
        }

        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [Authorize]
        [HttpGet]
        [Route("/test")]
        public IEnumerable<string> Test()
        {
            return new string[] { "hello" };
        }
    }
}
