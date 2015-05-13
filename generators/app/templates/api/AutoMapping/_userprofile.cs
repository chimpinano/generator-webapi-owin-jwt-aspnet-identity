using <%= applicationName %>.API.Authentication;
using <%= applicationName %>.API.Models;
using AutoMapper;

namespace <%= applicationName %>.API.AutoMapping
{
    public class UserProfile : Profile
    {
        protected override void Configure()
        {
            CreateMap<User, UserModel>()
                .ForMember(m => m.EmailAddress, opt => opt.MapFrom(src => src.Email));

            CreateMap<UserModel, User>()
                .ForMember(m => m.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(m => m.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(m => m.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(m => m.Email, opt => opt.MapFrom(src => src.EmailAddress))
                .ForMember(m => m.UserName, opt => opt.MapFrom(src => src.EmailAddress));
        }
    }
}