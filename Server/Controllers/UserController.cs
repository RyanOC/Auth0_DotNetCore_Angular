using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Auth0.AuthenticationApi;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("public")]
        public IActionResult Public()
        {
            return Json(new
            {
                Message = "Hello from a public endpoint! You don't need to be authenticated to see this."
            });
        }

        [HttpGet]
        [Route("private")]
        [Authorize(Policy = "customer_get")]
        //[Authorize]
        public IActionResult Private()
        {
            return Json(new
            {
                Message = "Hello from a private endpoint! You need to be authenticated to see this."
            });
        }

        [HttpGet]
        [Route("private-scoped")]
        //[Authorize(Policy = "read:messages")]
        [Authorize(Policy = "customer_get")]
        public IActionResult Scoped()
        {
            var v = Json(User.Claims.Select(c =>
                new
                {
                    c.Type,
                    c.Value
                }));

            return Json(new
            {
                Message = "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
            });
        }

        [Authorize]
        [HttpGet]
        [Route("id")]
        public object UserId()
        {
            // The user's ID is available in the NameIdentifier claim
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            return new
            {
                UserId = userId
            };
        }

        [Authorize]
        [HttpGet]
        [Route("info")]
        public async Task<object> UserInformation()
        {
            // Retrieve the access_token claim which we saved in the OnTokenValidated event
            string accessToken = User.Claims.FirstOrDefault(c => c.Type == "access_token").Value;

            // If we have an access_token, then retrieve the user's information
            if (!string.IsNullOrEmpty(accessToken))
            {
                var apiClient = new AuthenticationApiClient(_configuration["auth0:domain"]);
                var userInfo = await apiClient.GetUserInfoAsync(accessToken);

                return userInfo;
            }

            return null;
        }
        /// <summary>
        /// This is a helper action. It allows you to easily view all the claims of the token
        /// </summary>
        /// <returns></returns>
        [HttpGet("claims")]
        public IActionResult Claims()
        {
            return Json(User.Claims.Select(c =>
                new
                {
                    c.Type,
                    c.Value
                }));
        }
    }
}
