﻿using Mango.Web.Models;
using Mango.Web.Service.IService;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Mango.Web.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }


        public async Task<IActionResult> CategoryIndex()
        {
            List<CategoryDto>? list = new();

            ResponseDto? response = await _categoryService.GetAllCategoriesAsync();

            if (response != null && response.IsSuccess)
            {
                list= JsonConvert.DeserializeObject<List<CategoryDto>>(Convert.ToString(response.Result));
            }
            else
            {
                TempData["error"] = response?.Message;
            }

            return View(list);
        }

        public async Task<IActionResult> CategoryCreate()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CategoryCreate(CategoryDto model)
        {
            if (ModelState.IsValid)
            {
                ResponseDto? response = await _categoryService.CreateCategoriesAsync(model);

                if (response != null && response.IsSuccess)
                {
                    TempData["success"] = "Category created successfully";
                    return RedirectToAction(nameof(CategoryIndex));
                }
                else
                {
                    TempData["error"] = response?.Message;
                }
            }
            return View(model);
        }

        public async Task<IActionResult> CategoryDelete(int categoryId)
        {
			ResponseDto? response = await _categoryService.GetCategoryByIdAsync(categoryId);

			if (response != null && response.IsSuccess)
			{
                CategoryDto? model= JsonConvert.DeserializeObject<CategoryDto>(Convert.ToString(response.Result));
                return View(model);
			}
            else
            {
                TempData["error"] = response?.Message;
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> CategoryDelete(CategoryDto categoryDto)
        {
            ResponseDto? response = await _categoryService.DeleteCategoriesAsync(categoryDto.CategoryId);

            if (response != null && response.IsSuccess)
            {
                TempData["success"] = "Category deleted successfully";
                return RedirectToAction(nameof(CategoryIndex));
            }
            else
            {
                TempData["error"] = response?.Message;
            }
            return View(categoryDto);
        }

        public async Task<IActionResult> CategoryEdit(int categoryId)
        {
            ResponseDto? response = await _categoryService.GetCategoryByIdAsync(categoryId);

            if (response != null && response.IsSuccess)
            {
                CategoryDto? model = JsonConvert.DeserializeObject<CategoryDto>(Convert.ToString(response.Result));
                return View(model);
            }
            else
            {
                TempData["error"] = response?.Message;
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> CategoryEdit(CategoryDto categoryDto)
        {
            if (ModelState.IsValid)
            {
                ResponseDto? response = await _categoryService.UpdateCategoriesAsync(categoryDto);

                if (response != null && response.IsSuccess)
                {
                    TempData["success"] = "Category updated successfully";
                    return RedirectToAction(nameof(CategoryIndex));
                }
                else
                {
                    TempData["error"] = response?.Message;
                }
            }
            return View(categoryDto);
        }

    }
}
