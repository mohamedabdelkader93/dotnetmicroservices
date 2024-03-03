using Platraw.Services.ShoppingCartAPI.Models.Dto;

namespace Platraw.Services.ShoppingCartAPI.Service.IService
{
    public interface ICouponService
    {
        Task<CouponDto> GetCoupon(string couponCode);
    }
}
