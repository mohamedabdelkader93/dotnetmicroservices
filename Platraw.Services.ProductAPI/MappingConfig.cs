﻿using AutoMapper;
using Platraw.Services.ProductAPI.Models;
using Platraw.Services.ProductAPI.Models.Dto;

namespace Platraw.Services.ProductAPI
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<ProductDto, Product>().ReverseMap();
                config.CreateMap<CategoryDto, Category>().ReverseMap();

            });
            return mappingConfig;
        }
    }
}
