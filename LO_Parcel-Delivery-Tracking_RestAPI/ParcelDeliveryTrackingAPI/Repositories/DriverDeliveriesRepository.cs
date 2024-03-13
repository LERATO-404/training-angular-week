using Microsoft.EntityFrameworkCore;
using ParcelDeliveryTrackingAPI.Dto;
using ParcelDeliveryTrackingAPI.Models;

namespace ParcelDeliveryTrackingAPI.Repositories
{
    public class DriverDeliveriesRepository
    {

        private readonly ParcelDeliveryTrackingDBContext _parcelContext;

        public DriverDeliveriesRepository(ParcelDeliveryTrackingDBContext context)
        {
            _parcelContext = context;

        }


        public virtual List<DeliveryDto> GetDriverDeliveries(int driverId)
        {
            int paramId = driverId;
            List<DeliveryDto> drvDeliveries = new List<DeliveryDto>();

            //Query Syntax
            var driverDeliveries =
            (from Deliveries in _parcelContext.Deliveries
                 join Personnel in _parcelContext.Personnels
                 on Deliveries.PersonnelId equals Personnel.PersonnelId
                 join Parcel in _parcelContext.Parcels
                 on Deliveries.ParcelId equals Parcel.ParcelId
                 where ((paramId == 0 && Deliveries.PersonnelId == Personnel.PersonnelId) || (Deliveries.PersonnelId == paramId))
                 orderby Deliveries.PersonnelId, Deliveries.DeliveryId
                 select new
                 {
                     DeliveryId = Deliveries.DeliveryId,
                     DeliveryStatus = Deliveries.DeliveryStatus,
                     DeliveryDate = Deliveries.DeliveryDate,

                     PersonnelId = Personnel.PersonnelId,
                     FirstName = Personnel.FirstName,
                     LastName = Personnel.LastName,

                     ParcelId = Parcel.ParcelId,
                     ParcelStatus = Parcel.ParcelStatus,
                     ScheduledDeliveryDate = Parcel.ScheduledDeliveryDate,
                 }).ToList();

            foreach (var drv in driverDeliveries)
            {
                drvDeliveries.Add(new DeliveryDto()
                {
                    DeliveryId = drv.DeliveryId,
                    DeliveryStatus = drv.DeliveryStatus,
                    DeliveryDate = drv.DeliveryDate,

                    PersonnelId = drv.PersonnelId,
                    FirstName = drv.FirstName,
                    LastName = drv.LastName,

                    ParcelId = drv.ParcelId,
                    ParcelStatus = drv.ParcelStatus,
                    ScheduledDeliveryDate= drv.ScheduledDeliveryDate,
                   
                });
            }

            return drvDeliveries;
        }
    }
}
