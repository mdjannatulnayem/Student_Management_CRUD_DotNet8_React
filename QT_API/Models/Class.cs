using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class Class
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }
    
    public DateTime CreatedDate { get; set; }
    public DateTime ModificationDate { get; set; }


    [JsonIgnore] //Ignore the navigation property during JSON serialization
    public ICollection<Student> Students { get; set; }
}
