using Platraw.Web.Models;
using Platraw.Web.Service.IService;
using Platraw.Web.Utility;

namespace Platraw.Web.Service
{
    public class CategoryService : ICategoryService
    {
        private readonly IBaseService _baseService;
        public CategoryService(IBaseService baseService)
        {
            _baseService = baseService;
        }

        public async Task<ResponseDto?> CreateCategoriesAsync(CategoryDto categoryDto)
        {
            return await _baseService.SendAsync(new RequestDto()
            {
                ApiType = SD.ApiType.POST,
                Data=categoryDto,
                Url = SD.ProductAPIBase + "/api/category" ,
                ContentType = SD.ContentType.MultipartFormData
            });
        }

        public async Task<ResponseDto?> DeleteCategoriesAsync(int id)
        {
            return await _baseService.SendAsync(new RequestDto()
            {
                ApiType = SD.ApiType.DELETE,
                Url = SD.ProductAPIBase + "/api/category/" + id
            }); 
        }

        public async Task<ResponseDto?> GetAllCategoriesAsync()
        {
            return await _baseService.SendAsync(new RequestDto()
            {
                ApiType = SD.ApiType.GET,
                Url = SD.ProductAPIBase + "/api/category"
            });
        }

      

        public async Task<ResponseDto?> GetCategoryByIdAsync(int id)
        {
            return await _baseService.SendAsync(new RequestDto()
            {
                ApiType = SD.ApiType.GET,
                Url = SD.ProductAPIBase + "/api/category/" + id
            });
        }

        public async Task<ResponseDto?> UpdateCategoriesAsync(CategoryDto categoryDto)
        {
            return await _baseService.SendAsync(new RequestDto()
            {
                ApiType = SD.ApiType.PUT,
                Data = categoryDto,
                Url = SD.ProductAPIBase + "/api/category",
                ContentType = SD.ContentType.MultipartFormData
            });
        }
    }
}
