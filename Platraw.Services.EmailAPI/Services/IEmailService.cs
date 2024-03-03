using Platraw.Services.EmailAPI.Message;
using Platraw.Services.EmailAPI.Models.Dto;

namespace Platraw.Services.EmailAPI.Services
{
    public interface IEmailService
    {
        Task EmailCartAndLog(CartDto cartDto);
        Task RegisterUserEmailAndLog(string email);
        Task LogOrderPlaced(RewardsMessage rewardsDto);
    }
}
