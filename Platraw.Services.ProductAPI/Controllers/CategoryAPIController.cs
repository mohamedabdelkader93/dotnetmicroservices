using AutoMapper;
using Platraw.Services.ProductAPI.Data;
using Platraw.Services.ProductAPI.Models;
using Platraw.Services.ProductAPI.Models.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Platraw.Services.CategoryAPI.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryAPIController : ControllerBase
    {
        private readonly AppDbContext _db;
        private ResponseDto _response;
        private IMapper _mapper;

        public CategoryAPIController(AppDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
            _response = new ResponseDto();
        }

        [HttpGet]
        public ResponseDto Get()
        {
            try
            {
                IEnumerable<Category> objList = _db.Categories.ToList();
                _response.Result = _mapper.Map<IEnumerable<CategoryDto>>(objList);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpGet]
        [Route("{id:int}")]
        public ResponseDto Get(int id)
        {
            try
            {
                Category obj = _db.Categories.First(u=>u.CategoryId==id);
                _response.Result = _mapper.Map<CategoryDto>(obj);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

       [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public ResponseDto Post(CategoryDto CategoryDto)
        {
            try
            {
                Category category = _mapper.Map<Category>(CategoryDto);
                _db.Categories.Add(category);
                _db.SaveChanges();

                if (CategoryDto.Image != null)
                {
                   
                    string fileName = category.CategoryId + Path.GetExtension(CategoryDto.Image.FileName);
                    string filePath = @"wwwroot\CategoryImages\" + fileName;

                    //I have added the if condition to remove the any image with same name if that exist in the folder by any change
                        var directoryLocation = Path.Combine(Directory.GetCurrentDirectory(), filePath);
                        FileInfo file = new FileInfo(directoryLocation);
                        if (file.Exists)
                        {
                            file.Delete();
                        }

                    var filePathDirectory = Path.Combine(Directory.GetCurrentDirectory(), filePath);
                    using (var fileStream = new FileStream(filePathDirectory, FileMode.Create))
                    {
                        CategoryDto.Image.CopyTo(fileStream);
                    }
                    var baseUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.Value}{HttpContext.Request.PathBase.Value}";
                    category.ImageUrl = baseUrl+ "/CategoryImages/" + fileName;
                    category.ImageLocalPath = filePath;
                }
                else
                {
                    category.ImageUrl = "https://placehold.co/600x400";
                }
                _db.Categories.Update(category);
                _db.SaveChanges();
                _response.Result = _mapper.Map<CategoryDto>(category);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }


        [HttpPut]
        [Authorize(Roles = "ADMIN")]
        public ResponseDto Put(CategoryDto CategoryDto)
        {
            try
            {
                Category category = _mapper.Map<Category>(CategoryDto);

                if (CategoryDto.Image != null)
                {
                    if (!string.IsNullOrEmpty(category.ImageLocalPath))
                    {
                        var oldFilePathDirectory = Path.Combine(Directory.GetCurrentDirectory(), category.ImageLocalPath);
                        FileInfo file = new FileInfo(oldFilePathDirectory);
                        if (file.Exists)
                        {
                            file.Delete();
                        }
                    }

                    string fileName = category.CategoryId + Path.GetExtension(CategoryDto.Image.FileName);
                    string filePath = @"wwwroot\ProductImages\" + fileName;
                    var filePathDirectory = Path.Combine(Directory.GetCurrentDirectory(), filePath);
                    using (var fileStream = new FileStream(filePathDirectory, FileMode.Create))
                    {
                        CategoryDto.Image.CopyTo(fileStream);
                    }
                    var baseUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.Value}{HttpContext.Request.PathBase.Value}";
                    category.ImageUrl = baseUrl + "/CategoryImages/" + fileName;
                    category.ImageLocalPath = filePath;
                }


                _db.Categories.Update(category);
                _db.SaveChanges();

                _response.Result = _mapper.Map<CategoryDto>(category);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "ADMIN")]
        public ResponseDto Delete(int id)
        {
            try
            {
                Category obj = _db.Categories.First(u=>u.CategoryId==id);
                if (!string.IsNullOrEmpty(obj.ImageLocalPath))
                {
                    var oldFilePathDirectory = Path.Combine(Directory.GetCurrentDirectory(), obj.ImageLocalPath);
                    FileInfo file = new FileInfo(oldFilePathDirectory);
                    if (file.Exists)
                    {
                        file.Delete();
                    }
                }
                _db.Categories.Remove(obj);
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }
    }
}
