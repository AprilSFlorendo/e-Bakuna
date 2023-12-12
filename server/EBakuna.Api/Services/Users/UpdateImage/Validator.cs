using EBakuna.Api.Shared.Users.UpdateImage;
using FastEndpoints;
using FluentValidation;

namespace EBakuna.Api.Services.Users.UpdateImage;

public sealed class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Required field");
    }
}