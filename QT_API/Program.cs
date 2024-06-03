using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure CORS policy
builder.Services.AddCors(option =>
    option.AddPolicy("corspolicy", build => {
        build.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    }));

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();



// GET endpoint to get all classes
app.MapGet("/classes", async (AppDbContext dbContext) =>
{
    var classes = await dbContext.Classes.ToListAsync();
    return Results.Ok(classes);
})
.WithName("GetClasses")
.WithOpenApi();


// POST endpoint to add a new student
app.MapPost("/students", async ([FromBody] StudentDto studentDto, AppDbContext dbContext) =>
{
    // Check if the provided ClassId exists in the Classes table
    var existingClass = await dbContext.Classes.FindAsync(studentDto.ClassId);
    if (existingClass == null)
    {
        return Results.BadRequest($"Class with Id {studentDto.ClassId} does not exist.");
    }

    // Create a new Student object from the DTO
    var newStudent = new Student
    {
        Id = Guid.NewGuid(),
        Name = studentDto.Name,
        Gender = studentDto.Gender,
        DOB = studentDto.DOB,
        ClassId = studentDto.ClassId,
        CreatedDate = DateTime.UtcNow,
        ModificationDate = DateTime.UtcNow
    };

    // Add the new student to the database context
    dbContext.Students.Add(newStudent);
    
    // Save changes to the database
    await dbContext.SaveChangesAsync();

    // Return a response
    return Results.Created($"/students/{newStudent.Id}", newStudent);
})
.WithName("AddStudent")
.WithOpenApi();


// GET endpoint to retrieve all students
app.MapGet("/students", async (AppDbContext dbContext) =>
{
    // Retrieve all students from the database
    var students = await dbContext.Students.ToListAsync();

    // If there are no students in the database, return a 404 Not Found response
    if (students.Count == 0)
    {
        return Results.NotFound("No students found.");
    }

    // If students are found, return a 200 OK response with the list of students
    return Results.Ok(students);
})
.WithName("GetAllStudents")
.WithMetadata(new { Description = "Get all students." })
.WithOpenApi();


// GET endpoint to retrieve a particular student by GUID
app.MapGet("/students/{id}", async (Guid id, AppDbContext dbContext) =>
{
    // Find the student with the provided GUID
    var student = await dbContext.Students.FindAsync(id);

    // If the student doesn't exist, return a 404 Not Found response
    if (student == null)
    {
        return Results.NotFound($"Student with Id {id} does not exist.");
    }

    // If the student exists, return a 200 OK response with the student data
    return Results.Ok(student);
})
.WithName("GetStudent")
.WithMetadata(new { Description = "Get a particular student by their GUID." })
.WithOpenApi();


// PATCH endpoint to update a student's information by GUID
app.MapPatch("/students/{id}", async (Guid id, [FromBody] StudentDto updated, AppDbContext dbContext) =>
{
    // Find the student with the provided GUID
    var student = await dbContext.Students.FindAsync(id);

    // If the student doesn't exist, return a 404 Not Found response
    if (student == null)
    {
        return Results.NotFound($"Student with Id {id} does not exist.");
    }

    // Update the student's information with the provided data
    student.Name = !string.IsNullOrEmpty(updated.Name) ? updated.Name : student.Name;
    student.Gender = updated.Gender != 0 ? updated.Gender : student.Gender;
    student.DOB = updated.DOB != DateTime.MinValue ? updated.DOB : student.DOB;
    student.ClassId = updated.ClassId != 0 ? updated.ClassId : student.ClassId;
    student.ModificationDate = DateTime.UtcNow;

    /* Can be skipped if frontend designed responsibly

    // Check if the provided ClassId exists in the Classes table
    var existingClass = await dbContext.Classes.FindAsync(updated.ClassId);
    if (existingClass == null)
    {
        return Results.BadRequest($"Class with Id {updated.ClassId} does not exist.");
    }
    */

    // Save changes to the database
    await dbContext.SaveChangesAsync();

    // Return a 200 OK response with the updated student data
    return Results.Ok(student);
})
.WithName("UpdateStudent")
.WithMetadata(new { Description = "Update a particular student's information by their GUID." })
.WithOpenApi();



// DELETE endpoint to delete a student by GUID
app.MapDelete("/students/{id}", async (Guid id, AppDbContext dbContext) =>
{
    // Find the student with the provided GUID
    var student = await dbContext.Students.FindAsync(id);

    // If the student doesn't exist, return a 404 Not Found response
    if (student == null)
    {
        return Results.NotFound($"Student with Id {id} does not exist.");
    }

    // Remove the student from the database context
    dbContext.Students.Remove(student);
    
    // Save changes to the database
    await dbContext.SaveChangesAsync();

    // Return a 204 No Content response indicating successful deletion
    return Results.NoContent();
})
.WithName("DeleteStudent")
.WithMetadata(new { Description = "Delete a particular student by their GUID." })
.WithOpenApi();


app.UseCors("corspolicy");

app.Run();