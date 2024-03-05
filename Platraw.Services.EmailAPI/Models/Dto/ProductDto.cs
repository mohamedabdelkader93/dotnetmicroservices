﻿using System.ComponentModel.DataAnnotations;

namespace Platraw.Services.EmailAPI.Models.Dto
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public string ImageUrl { get; set; }
        public int Count { get; set; } = 1;
    }
}
