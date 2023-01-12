using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineEnergyUtilityPlateformAPI.DBModels.Model;
using Microsoft.AspNetCore.Authorization;
using OnlineEnergyUtilityPlateformAPI.DBModels.DTO;
using System.Net;
using OnlineEnergyUtilityPlateformAPI.Context;

namespace OnlineEnergyUtilityPlateformAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AfterMappingStoredHourEnergiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AfterMappingStoredHourEnergiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/AfterMappingStoredHourEnergies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AfterMappingStoredHourEnergy>>> GetAfterMappingStoredHourEnergy()
        {
            return await _context.AfterMappingStoredHourEnergy.ToListAsync();
        }

        // GET: api/AfterMappingStoredHourEnergies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AfterMappingStoredHourEnergy>> GetAfterMappingStoredHourEnergy(int id)
        {
            var afterMappingStoredHourEnergy = await _context.AfterMappingStoredHourEnergy.FindAsync(id);

            if (afterMappingStoredHourEnergy == null)
            {
                return NotFound();
            }

            return afterMappingStoredHourEnergy;
        }

        // PUT: api/AfterMappingStoredHourEnergies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAfterMappingStoredHourEnergy(int id, AfterMappingStoredHourEnergy afterMappingStoredHourEnergy)
        {
            if (id != afterMappingStoredHourEnergy.Id)
            {
                return BadRequest();
            }

            _context.Entry(afterMappingStoredHourEnergy).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AfterMappingStoredHourEnergyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AfterMappingStoredHourEnergies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AfterMappingStoredHourEnergy>> PostAfterMappingStoredHourEnergy(AfterMappingStoredHourEnergy afterMappingStoredHourEnergy)
        {
            afterMappingStoredHourEnergy.CreatedDate = DateTime.Now;
            _context.AfterMappingStoredHourEnergy.Add(afterMappingStoredHourEnergy);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAfterMappingStoredHourEnergy", new { id = afterMappingStoredHourEnergy.Id }, afterMappingStoredHourEnergy);
        }  
        [Route("ConsumerEngergyConsumption"),HttpPost]
        public async Task<IActionResult> ConsumerEngergyConsumption([FromBody] List<ConsumerEnergyDTO> model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }
            else
            {


                AfterMappingStoredHourEnergy obj = new AfterMappingStoredHourEnergy();
                foreach (var item in model)
                {
                    obj.Hours =obj.Hours+ Convert.ToDouble(item.Hours);
                    obj.EnergyConsumption = (Convert.ToDouble(obj.EnergyConsumption) + Convert.ToDouble(item.EnergyConsumption)).ToString();
                    obj.CreatedDate = item.currentDate;
                    obj.UserId = item.UserId;
                    obj.DeviceId = Convert.ToInt32(item.DeviceId);
                }
                _context.AfterMappingStoredHourEnergy.Add(obj);
                await _context.SaveChangesAsync();

            }


            return Ok();
        }
        [HttpGet("GenerateReport")]
        public EntityResponseModel<ReportDtoModel> GetReport(Guid? userId,string? deviceId,DateTime? creationDate)
        {
            var response = new EntityResponseModel<ReportDtoModel>();
            //var date = creationDate.Value.AddMonths(-1);
           var createdDate = _context.AfterMappingStoredHourEnergy.Where(x => x.UserId == userId && x.DeviceId == Convert.ToInt32(deviceId) && x.CreatedDate.Value.Date== creationDate).ToList();

           
                if (createdDate.Count>0)
                {
                        response.Data = createdDate;
                        response.StatusCode = "Ok";
                   
                   
                }
                else
                {
                    response.Message = "Data does not exist to the particullar date..";
                    response.StatusCode = HttpStatusCode.BadRequest.ToString();
                }
            
           
            return response;
        }

        // DELETE: api/AfterMappingStoredHourEnergies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAfterMappingStoredHourEnergy(int id)
        {
            var afterMappingStoredHourEnergy = await _context.AfterMappingStoredHourEnergy.FindAsync(id);
            if (afterMappingStoredHourEnergy == null)
            {
                return NotFound();
            }

            _context.AfterMappingStoredHourEnergy.Remove(afterMappingStoredHourEnergy);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AfterMappingStoredHourEnergyExists(int id)
        {
            return _context.AfterMappingStoredHourEnergy.Any(e => e.Id == id);
        }
    }
}
