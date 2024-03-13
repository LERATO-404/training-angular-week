using log4net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParcelDeliveryTrackingAPI.AuthModels;
using ParcelDeliveryTrackingAPI.Dto;
using ParcelDeliveryTrackingAPI.Helpers;
using ParcelDeliveryTrackingAPI.Models;
using ParcelDeliveryTrackingAPI.Repositories;

namespace ParcelDeliveryTrackingAPI.Controllers
{
    [Route("drv")]
    [ApiController]
    [Authorize]
    public class DriverDeliveriesController : ControllerBase
    {

        private static readonly ILog logger = LogManager.GetLogger("DriverDeliveriesController");

        private readonly ParcelDeliveryTrackingDBContext _parcelContext;
        private readonly IdentityHelper _identityHelper;

        private UserManager<ApplicationUser> _userManager;
        private readonly AuthenticationContext _authContext;
        private readonly RoleManager<IdentityRole> _roleManager;

        public DriverDeliveriesController(ParcelDeliveryTrackingDBContext parcelContext,
            UserManager<ApplicationUser> userManager,
            AuthenticationContext authContext, RoleManager<IdentityRole> roleManager)
        {
            _parcelContext = parcelContext;
            _userManager = userManager;
            _authContext = authContext;
            _roleManager = roleManager;

            _identityHelper = new IdentityHelper(userManager, authContext, roleManager);
        }

        [Route("MyDeliveries")]
        // GET: /drv/MyDeliveries
        [HttpGet]
        [EnableCors("AllowOrigin")]
        public async Task<IActionResult> GetMyDeliveries()
        {
            logger.Info("DriverDeliveriesController - GET:  /drv/MyDeliveries");

            List<DeliveryDto> driverDelivery = new List<DeliveryDto>();

            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            string UserName = user.UserName;

            bool userAuthorisation = await _identityHelper.IsUserInRole(userId, "Driver");

            if (userAuthorisation)
            {
                try
                {
                    var drivers = _parcelContext.Personnels.Where(x => x.UserName == UserName);

                    if (drivers == null)
                    {
                        logger.Warn("DriverDeliveriesController - GET:  /drv/MyDeliveries - Not Found / invalid driver/personnel, logged in UserName: " + UserName);
                        return NotFound();
                    }
                    else
                    {
                        int id = drivers.First().PersonnelId;
                        DriverDeliveriesRepository prod = new DriverDeliveriesRepository(_parcelContext);
                        driverDelivery = prod.GetDriverDeliveries(id).ToList();

                        return Ok(new { driverDelivery });
                    }
                }
                catch (Exception e)
                {
                    logger.Error("DriverDeliveriesController - GET:   /drv/MyDeliveries - Not Found / invalid driver/personnel, logged in UserName: " + UserName + ".  Exception: " + e);

                    return BadRequest(new { message = "Not Found." });
                }


            }
            else
            {
                return BadRequest(new { message = "Not Authorised." });
            }
        }

        [EnableCors("AllowOrigin")]
        // GET: /btr/brkTrades/5
        [HttpGet("drvDeliveries/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            logger.Info("DriverDeliveriesController - GET:  drv/drvDeliveries/" + id);

            List<DeliveryDto> driverDeliveries = new List<DeliveryDto>();

            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            string UserName = user.UserName;

            if (!string.IsNullOrEmpty(UserName))
            {
                DriverDeliveriesRepository prod = new DriverDeliveriesRepository(_parcelContext);
                driverDeliveries = prod.GetDriverDeliveries(id).ToList();

                return Ok(driverDeliveries);
            }
            else
            {
                logger.Warn("DriverDeliveriesController - GET:  drv/drvDeliveries/" + id + "logged in User: " + user);

                return BadRequest(new { message = "Not Authorised." });
            }
        }

    }
}
