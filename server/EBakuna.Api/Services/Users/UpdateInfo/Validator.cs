﻿using EBakuna.Api.Shared.Users.UpdateInfo;
using FastEndpoints;
using FluentValidation;

namespace EBakuna.Api.Services.Users.UpdateInfo;

public sealed class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Id is required");
        RuleFor(x => x.FirstName)
            .NotEmpty()
            .WithMessage("First name is required")
            .MinimumLength(2)
            .WithMessage("First name is too short");

        RuleFor(x => x.LastName)
            .NotEmpty()
            .WithMessage("Last name is required")
            .MinimumLength(2)
            .WithMessage("Last name is too short");
    }
}