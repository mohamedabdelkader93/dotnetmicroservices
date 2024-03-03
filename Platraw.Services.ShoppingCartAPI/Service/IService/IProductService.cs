using Platraw.Services.ShoppingCartAPI.Models.Dto;

namespace Platraw.Services.ShoppingCartAPI.Service.IService
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetProducts();
    }
}
