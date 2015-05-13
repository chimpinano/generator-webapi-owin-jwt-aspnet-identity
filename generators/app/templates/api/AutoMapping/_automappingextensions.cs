using AutoMapper;
using System;
using System.Linq.Expressions;

namespace <%= applicationName %>.API.AutoMapping
{
    public static class AutoMappingExtensions
    {
        public static IMappingExpression<TSource, TDest> Ignore<TSource, TDest>(
            this IMappingExpression<TSource, TDest> expression,
            Expression<Func<TDest, object>> memberToIgnore)
        {
            return expression.ForMember(memberToIgnore, opt => opt.Ignore());
        }

        public static IMappingExpression<TSource, TDest> IgnoreAll<TSource, TDest>(
           this IMappingExpression<TSource, TDest> expression)
        {
            expression.ForAllMembers(opt => opt.Ignore());
            return expression;
        }

        public static ConfigurationStore LoadProfiles(this ConfigurationStore store)
        {
            store.AddProfile<UserProfile>();
            store.AddProfile<NewUserProfile>();
            return store;
        }
    }
}