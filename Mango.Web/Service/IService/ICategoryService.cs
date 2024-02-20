using Mango.Web.Models;

namespace Mango.Web.Service.IService
{
    public interface ICategoryService
    {
     
        Task<ResponseDto?> GetAllCategoriesAsync();
        Task<ResponseDto?> GetCategoryByIdAsync(int id);
        Task<ResponseDto?> CreateCategoriesAsync(CategoryDto categoryDto);
        Task<ResponseDto?> UpdateCategoriesAsync(CategoryDto categoryDto);
        Task<ResponseDto?> DeleteCategoriesAsync(int id);
    }
}
