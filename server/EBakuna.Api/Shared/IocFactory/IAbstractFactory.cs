﻿namespace EBakuna.Api.Shared.IocFactory;

public interface IAbstractFactory<out T>
{
    T Create();
}