using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class Student
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public int Gender { get; set; }

    [Required]
    public DateTime DOB { get; set; }

    [ForeignKey("Class")]
    public int ClassId { get; set; }
    
    public DateTime CreatedDate { get; set; }
    public DateTime ModificationDate { get; set; }

    [JsonIgnore] //Ignore the navigation property during JSON serialization
    public Class Class { get; set; }
}
