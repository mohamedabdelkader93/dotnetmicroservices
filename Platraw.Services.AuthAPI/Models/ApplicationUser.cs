using Microsoft.AspNetCore.Identity;

namespace Platraw.Services.AuthAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
    }
}
