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
    [AllowAnonymous]
    [ApiController]
    public class DeviceTblsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DeviceTblsController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet("GetDevices/{userId}")]
        public EntityResponseModel<DeviceTbl> GetDeviceTbls(Guid? userId)
        {
            var response = new EntityResponseModel<DeviceTbl>();
            if (userId!=null)
            {
                List<DeviceTbl> objList = new List<DeviceTbl>();
                var getDeviceIds = _context.UserDeviceMappingTbls.Where(x => x.UserId == userId).Select(x => x.DeviceId).ToList();
                foreach (var item in getDeviceIds)
                {
                    var deviceDetail = _context.DeviceTbls.Where(x => x.id == item).FirstOrDefault();
                    objList.Add(deviceDetail);
                }
                response.Data = objList;
                response.StatusCode = HttpStatusCode.OK.ToString();
            }
            response.StatusCode = HttpStatusCode.BadRequest.ToString();

            return response;
        }


        [HttpGet("GetDevicesDesktop/{userId}")]
        public List<DeviceTbl> GetDevicesDesktop(Guid? userId)
        {

            List<DeviceTbl> objList = new List<DeviceTbl>();
            var response = new List<DeviceTbl>();
            if (userId != null)
            {
                var getDeviceIds = _context.UserDeviceMappingTbls.Where(x => x.UserId == userId).Select(x => x.DeviceId).ToList();
                foreach (var item in getDeviceIds)
                {
                    var deviceDetail = _context.DeviceTbls.Where(x => x.id == item).FirstOrDefault();
                    objList.Add(deviceDetail);
                }
            }
            response = objList;
            return response;
        }
        // GET: api/DeviceTbls
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeviceTbl>>> GetDeviceTbls()
        {
            return await _context.DeviceTbls.ToListAsync();
        }

        // GET: api/DeviceTbls/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DeviceTbl>> GetDeviceTbl(int id)
        {
            var deviceTbl = await _context.DeviceTbls.FindAsync(id);

            if (deviceTbl == null)
            {
                return NotFound();
            }

            return deviceTbl;
        }

        // PUT: api/DeviceTbls/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("updateDevice")]
        public async Task<IActionResult> PutDeviceTbl(DeviceTbl deviceTbl)
        {
            deviceTbl.UpdateDate = DateTime.Now.ToString();
            _context.Entry(deviceTbl).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeviceTblExists(deviceTbl.id))
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

        // POST: api/DeviceTbls
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DeviceTbl>> PostDeviceTbl(DeviceTbl deviceTbl)
        {
            _context.DeviceTbls.Add(deviceTbl);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDeviceTbl", new { id = deviceTbl.id }, deviceTbl);
        }

        // DELETE: api/DeviceTbls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeviceTbl(int id)
        {
            var deviceTbl = await _context.DeviceTbls.FindAsync(id);
            if (deviceTbl == null)
            {
                return NotFound();
            }

            _context.DeviceTbls.Remove(deviceTbl);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DeviceTblExists(int id)
        {
            return _context.DeviceTbls.Any(e => e.id == id);
        }
    }
}
