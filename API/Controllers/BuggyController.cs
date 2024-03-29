using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }


        [HttpGet("auth")]
        public ActionResult<string> GetSecret(){
            return "secret text";
        }


        [HttpGet("not-found")]
        public ActionResult<AppUser> GeNotFound(){
            var thing = _context.Users.Find(-1); // Find Somehting that does not exist. (Not User Id = -1)

            if(thing == null) return NotFound();

            return Ok(thing);
        }


        [HttpGet("server-error")]
        public ActionResult<string> GetServerError(){
            var thing = _context.Users.Find(-1);

            var thingToReturn = thing.ToString(); // This will generate a Null Ref Exception.

            return thingToReturn;
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest(){
            return BadRequest();
        }
    }
}