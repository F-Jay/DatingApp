using API.Entities;

namespace API.Interfaces
{
    public interface ITokenService
    {
        // Desc >>> Interface Contract between itself and any class that implements it.
        string CreateToken(AppUser user);
    }
}