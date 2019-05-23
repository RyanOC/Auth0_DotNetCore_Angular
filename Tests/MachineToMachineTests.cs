using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RestSharp;
using System.IO;
using Xunit;

namespace Tests
{
    public class MachineToMachineTests
    {
        readonly IConfiguration _config;

        public MachineToMachineTests()
        {
            var builder = new ConfigurationBuilder()
             .SetBasePath(Directory.GetCurrentDirectory())
             .AddJsonFile("appsettings.test.json", optional: false, reloadOnChange: true);
            _config = builder.Build();
        }

        [Fact]
        [Trait("Category", "Integration")]
        public void Should_Get_Access_Token()
        {
            // https://auth0.com/docs/flows/guides/client-credentials/call-api-client-credentials
            // remember to create a Machine to Machine application and use its clientId and clientSecret values

            var client = new RestClient($"{_config["Auth0:client"]}/token");
            var request = new RestRequest(Method.POST);
            request.AddHeader("content-type", "application/x-www-form-urlencoded");
            request.AddParameter("application/x-www-form-urlencoded", $"grant_type=client_credentials&client_id={_config["Auth0:clientId"]}&client_secret={_config["Auth0:clientSecret"]}&audience={_config["Auth0:audience"]}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);

            var auth0Token = JsonConvert.DeserializeObject<Auth0Token>(response.Content);
        }
    }

    public class Auth0Token
    {
        public string access_token { get; set; }
        public string scope { get; set; }
        public int expires_in { get; set; }
        public string token_type { get; set; }
    }
}
