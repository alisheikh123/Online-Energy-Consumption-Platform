using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineEnergyUtilityPlateformAPI.DBModels.Model;
using Microsoft.AspNetCore.Authorization;
using OnlineEnergyUtilityPlateformAPI.Context;

namespace OnlineEnergyUtilityPlateformAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class UserDeviceMappingTblsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserDeviceMappingTblsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UserDeviceMappingTbls
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDeviceMappingTbl>>> GetUserDeviceMappingTbls()
        {
            return await _context.UserDeviceMappingTbls.ToListAsync();
        }

        // GET: api/UserDeviceMappingTbls/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDeviceMappingTbl>> GetUserDeviceMappingTbl(int id)
        {
            var userDeviceMappingTbl = await _context.UserDeviceMappingTbls.FindAsync(id);

            if (userDeviceMappingTbl == null)
            {
                return NotFound();
            }

            return userDeviceMappingTbl;
        }

        // PUT: api/UserDeviceMappingTbls/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserDeviceMappingTbl(int id, UserDeviceMappingTbl userDeviceMappingTbl)
        {
            if (id != userDeviceMappingTbl.Id)
            {
                return BadRequest();
            }

            _context.Entry(userDeviceMappingTbl).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserDeviceMappingTblExists(id))
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

        // POST: api/UserDeviceMappingTbls
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserDeviceMappingTbl>> PostUserDeviceMappingTbl([FromBody]UserDeviceMappingTbl userDeviceMappingTbl)
        {
            //userDeviceMappingTbl.AssigningDate.AddMonths(-1);
            _context.UserDeviceMappingTbls.Add(userDeviceMappingTbl);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserDeviceMappingTbl", new { id = userDeviceMappingTbl.Id }, userDeviceMappingTbl);
        }

        // DELETE: api/UserDeviceMappingTbls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserDeviceMappingTbl(int id)
        {
            var userDeviceMappingTbl = await _context.UserDeviceMappingTbls.FindAsync(id);
            if (userDeviceMappingTbl == null)
            {
                return NotFound();
            }

            _context.UserDeviceMappingTbls.Remove(userDeviceMappingTbl);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserDeviceMappingTblExists(int id)
        {
            return _context.UserDeviceMappingTbls.Any(e => e.Id == id);
        }
    }
}
