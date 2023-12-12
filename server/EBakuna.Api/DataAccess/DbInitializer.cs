using System.Reflection;
using EBakuna.Api.DataAccess.Users.Seed;
using MongoDB.Bson.Serialization.Conventions;
using MongoSharpen;

namespace EBakuna.Api.DataAccess;

public class DbInitializer(IRepositoryFactory repositoryFactory)
{
    public Task InitAsync()
    {
        var defaultConnection = "mongodb://localhost:8130";
        var connectionVariable = Environment.GetEnvironmentVariable("MONGO_CONNECTION");
        if (!string.IsNullOrWhiteSpace(connectionVariable)) defaultConnection = connectionVariable;

        DbFactory.DefaultConnection = defaultConnection;
        DbFactory.DefaultDatabase = "ebakuna-db";
        DbFactory.SetGlobalFilter<IDeleteOn>("{ deleted: false }", Assembly.GetAssembly(typeof(BaseDocument))!);
        DbFactory.AddConvention("ignore-extra-elements", new IgnoreExtraElementsConvention(true));

        return SeedDefaultUserAsync();
    }

    private Task SeedDefaultUserAsync()
    {
        var repo = repositoryFactory.Create<Repository>();
        return repo.ExecuteAsync();
    }
}