using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateApplicationDataBase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "JobApplication",
                newName: "Status");

            migrationBuilder.AddColumn<DateTime>(
                name: "ApplicationDate",
                table: "JobApplication",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Company",
                table: "JobApplication",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Position",
                table: "JobApplication",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApplicationDate",
                table: "JobApplication");

            migrationBuilder.DropColumn(
                name: "Company",
                table: "JobApplication");

            migrationBuilder.DropColumn(
                name: "Position",
                table: "JobApplication");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "JobApplication",
                newName: "Name");
        }
    }
}
