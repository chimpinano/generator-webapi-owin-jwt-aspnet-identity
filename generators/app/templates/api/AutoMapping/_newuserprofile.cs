using <%= applicationName %>.API.Authentication;
using <%= applicationName %>.API.Models;
using AutoMapper;

namespace <%= applicationName %>.API.AutoMapping
{
    public class NewUserProfile : Profile
    {
        protected override void Configure()
        {
            CreateMap<NewUserModel, User>()
                .IgnoreAll()
                .ForMember(m => m.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(m => m.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(m => m.Email, opt => opt.MapFrom(src => src.EmailAddress))
                .ForMember(m => m.UserName, opt => opt.MapFrom(src => src.EmailAddress));
        }
    }
}