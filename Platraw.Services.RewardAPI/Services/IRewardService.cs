using Platraw.Services.RewardAPI.Message;

namespace Platraw.Services.RewardAPI.Services
{
    public interface IRewardService
    {
        Task UpdateRewards(RewardsMessage rewardsMessage);
    }
}
