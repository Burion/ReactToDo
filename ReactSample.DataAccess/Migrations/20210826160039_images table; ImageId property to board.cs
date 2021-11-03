using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactSample.DataAccess.Migrations
{
    public partial class imagestableImageIdpropertytoboard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageId",
                table: "Boards",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Boards");
        }
    }
}
