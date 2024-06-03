using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    
    public DbSet<Class> Classes { get; set; }

    public DbSet<Student> Students { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Class>()
            .HasMany(c => c.Students)
            .WithOne(e => e.Class)
            .HasForeignKey(e => e.ClassId);

        base.OnModelCreating(modelBuilder);
    }
}
