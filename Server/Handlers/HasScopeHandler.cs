using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Handlers
{
    public class HasScopeHandler : AuthorizationHandler<HasScopeRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasScopeRequirement requirement)
        {
            // *** First check for scopes ***

            //var v = context.User.FindFirst(c => c.Type == "scope" && c.Issuer == requirement.Issuer);

            // Split the scopes string into an array
            var scopes = context.User.FindFirst(c => c.Type == "scope" && c.Issuer == requirement.Issuer).Value.Split(' ');
                
            // Succeed if the scope array contains the required scope
            if (scopes.Any(s => s == requirement.Scope))
                 context.Succeed(requirement);
                   
            // *** if no scope, check for permissions ***

            // Get the users permissions
            var permissions = context.User.FindAll(p => p.Type == "permissions" && p.Issuer == requirement.Issuer);

            // Succeed if the permissions collection contains the required scope
            if (permissions.Any(s => s.Value == requirement.Scope))
            {
                context.Succeed(requirement);
            }          

            return Task.CompletedTask;
        }
    }
}
