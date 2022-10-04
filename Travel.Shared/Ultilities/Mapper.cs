using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travel.Context.Models;
using Travel.Shared.ViewModels.Travel;

namespace Travel.Shared.Ultilities
{
    public static class Mapper
    {
        private static IMapper _mapper;
        public static void RegisterMappings()
        {
            var mapperConfiguration = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Role, RoleViewModel>()
                          .ForMember(dto => dto.Id, opt => opt.MapFrom(src => src.Id))
                          .ForMember(dto => dto.Name, opt => opt.MapFrom(src => src.Name))
                          .ForMember(dto => dto.Description, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.Description) ? "" : src.Description));
                cfg.CreateMap<Employee, EmployeeViewModel>()
                         .ForMember(dto => dto.Id, opt => opt.MapFrom(src => src.Id))
                         .ForMember(dto => dto.Name, opt => opt.MapFrom(src => src.Name))
                         .ForMember(dto => dto.Birthday, opt => opt.MapFrom(src => src.Birthday))
                         .ForMember(dto => dto.CreateDate, opt => opt.MapFrom(src => src.CreateDate))
                         .ForMember(dto => dto.Email, opt => opt.MapFrom(src => src.Email))
                         .ForMember(dto => dto.Image, opt => opt.MapFrom(src => src.Image))
                         .ForMember(dto => dto.IsActive, opt => opt.MapFrom(src => src.IsActive))
                         .ForMember(dto => dto.IsDelete, opt => opt.MapFrom(src => src.IsDelete))
                         .ForMember(dto => dto.ModifyBy, opt => opt.MapFrom(src => src.ModifyBy))
                         .ForMember(dto => dto.ModifyDate, opt => opt.MapFrom(src => src.ModifyDate))
                         .ForMember(dto => dto.Phone, opt => opt.MapFrom(src => src.Phone))
                         .ForMember(dto => dto.RoleDescription, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.Role.Description) ? "" : src.Role.Description))
                         .ForMember(dto => dto.RoleId, opt => opt.MapFrom(src => src.RoleId))
                         .ForMember(dto => dto.RoleName, opt => opt.MapFrom(src => src.Role.Name));
            });
            _mapper = mapperConfiguration.CreateMapper();
        }
        public static RoleViewModel MapRole(Role data)
        {
            return _mapper.Map<Role, RoleViewModel>(data);
        }
        public static EmployeeViewModel MapEmployee(Employee data)
        {
            return _mapper.Map<Employee, EmployeeViewModel>(data);
        }
    }
}
