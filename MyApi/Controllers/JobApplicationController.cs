using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.Data;
using MyApi.Models;

namespace MyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobApplicationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public JobApplicationController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/job
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetJobs()
        {
            return await _context.JobApplication.ToListAsync();
        }


        // POST: api/job
        [HttpPost]
        public async Task<ActionResult<JobApplication>> PostJobs(JobApplication job)
        {
            _context.JobApplication.Add(job);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetJobs), new { id = job.Id }, job);
        }

        // PUT: api/job/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<JobApplication>> PutJob(int id, JobApplication job)
        {
            if (id != job.Id)
            {
                return BadRequest("Job ID mismatch.");
            }

            // Check if the job exists in the database
            var existingJob = await _context.JobApplication.FindAsync(id);
            if (existingJob == null)
            {
                return NotFound();
            }

            // Update the properties of the existing job
            existingJob.Company = job.Company;
            existingJob.Position = job.Position;
            existingJob.Status = job.Status;
            existingJob.ApplicationDate = job.ApplicationDate;

            // Save the changes to the database
            await _context.SaveChangesAsync();

            // Return the updated job application
            return NoContent();
        }





    }
}
