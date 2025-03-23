# Job Tracker App

This is a basic full-stack application that includes a **RESTful API** built with **ASP.NET Core 8**, **SQLite**, and **Entity Framework**, 
along with a **client-side React TypeScript** application using **Redux**.

## Folder Structure

- **MyApi**: The folder containing the ASP.NET Core 8 API project.
- **job-tracker-app**: The folder containing the React TypeScript client app.

## Prerequisites

Before you begin, ensure that you have the following installed on your machine:

- **.NET SDK** (version 8 or higher) for running the backend API.
- **Node.js** (LTS version) and **npm** for running the client-side React app.
- **SQLite** for the database.
- VSCode or any similar IDE

## Navigate to the folder from Repo
 cd MyApi

### 1. Install the Required .NET Packages

1. Check if dotnet is installed (same code for both Mac or Windows):
  dotnet --version

  Windows:
    winget install --id Microsoft.DotNet.SDK.8 -e --source winget
  
  Mac:
    brew install --cask dotnet-sdk
    
2. Then install following packages:
  dotnet add package Microsoft.EntityFrameworkCore.Sqlite
  dotnet add package Microsoft.EntityFrameworkCore.Tools

3. Check if EntityFramework is installed:
  ef --version
Then run to create migration and create databae
dotnet ef migrations add InitialCreate
dotnet ef database update

### 2. Run the API
  dotnet run

api is on port 8484
This is the swagger.

https://localhost:8484/swagger/index.html

### . Run the Client App

1. Navigate to Client App
   cd ..
   cd job-app-tracker
   
2. Install packages
   npm install
   
4. Run the app
   npm start

client is on 3000 port 
http://localhost:3000/





  

