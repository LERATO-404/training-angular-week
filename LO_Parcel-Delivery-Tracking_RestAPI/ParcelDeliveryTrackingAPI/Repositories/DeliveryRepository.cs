﻿using Microsoft.EntityFrameworkCore;
using ParcelDeliveryTrackingAPI.Dto;
using ParcelDeliveryTrackingAPI.Interfaces;
using ParcelDeliveryTrackingAPI.Models;

namespace ParcelDeliveryTrackingAPI.Repositories
{
    public class DeliveryRepository : IDelivery
    {
        private readonly ParcelDeliveryTrackingDBContext _parcelContext;

        public DeliveryRepository(ParcelDeliveryTrackingDBContext context)
        {
            _parcelContext = context;

        }


       

        public virtual List<Delivery> GetAllDeliveriesByStatus(string status)
        {
            var lowercaseStatus = status.ToLower();

            var deliveryByStatus = _parcelContext.Deliveries
                    .Where(d => d.DeliveryStatus.ToLower() == lowercaseStatus)
                    .ToList();

            return deliveryByStatus;
        }

        public virtual List<DeliveryDto> GetDetailedDeliveriesByStatus(string status)
        {
            List<DeliveryDto> allDeliveries = new List<DeliveryDto>();
            var lowercaseStatus = status.ToLower();

          
            var detailedDeliveries =
            (from Deliveries in _parcelContext.Deliveries
             join Personnel in _parcelContext.Personnels
             on Deliveries.PersonnelId equals Personnel.PersonnelId
             join Parcel in _parcelContext.Parcels
             on Deliveries.ParcelId equals Parcel.ParcelId
             orderby Deliveries.PersonnelId, Deliveries.DeliveryId
             where (Deliveries.DeliveryStatus.ToLower() == lowercaseStatus)
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

            foreach (var dlv in detailedDeliveries)
            {
                allDeliveries.Add(new DeliveryDto()
                {
                    DeliveryId = dlv.DeliveryId,
                    DeliveryStatus = dlv.DeliveryStatus,
                    DeliveryDate = dlv.DeliveryDate,

                    PersonnelId = dlv.PersonnelId,
                    FirstName = dlv.FirstName,
                    LastName = dlv.LastName,

                    ParcelId = dlv.ParcelId,
                    ParcelStatus = dlv.ParcelStatus,
                    ScheduledDeliveryDate = dlv.ScheduledDeliveryDate,

                });
            }

            return allDeliveries;
        }

        public virtual List<Delivery> GetAllRows()
        {
            return _parcelContext.Deliveries.ToList();
        }

        public virtual List<DeliveryDto> GetDeliveryDetails()
        {
            
            List<DeliveryDto> allDeliveries = new List<DeliveryDto>();

            //Query Syntax
            var detailedDeliveries =
            (from Deliveries in _parcelContext.Deliveries
             join Personnel in _parcelContext.Personnels
             on Deliveries.PersonnelId equals Personnel.PersonnelId
             join Parcel in _parcelContext.Parcels
             on Deliveries.ParcelId equals Parcel.ParcelId
             orderby Deliveries.DeliveryId
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

            foreach (var drv in detailedDeliveries)
            {
                allDeliveries.Add(new DeliveryDto()
                {
                    DeliveryId = drv.DeliveryId,
                    DeliveryStatus = drv.DeliveryStatus,
                    DeliveryDate = drv.DeliveryDate,

                    PersonnelId = drv.PersonnelId,
                    FirstName = drv.FirstName,
                    LastName = drv.LastName,

                    ParcelId = drv.ParcelId,
                    ParcelStatus = drv.ParcelStatus,
                    ScheduledDeliveryDate = drv.ScheduledDeliveryDate,

                });
            }

            return allDeliveries;
        }

        public virtual List<DeliveryDto> GetDeliveriesForPersonnel(int personnelId)
        {
            List<DeliveryDto> personDeliveries = new List<DeliveryDto>();

            var personnelDeliveries =
                (from deliveries in _parcelContext.Deliveries
                 join personnel in _parcelContext.Personnels
                 on deliveries.PersonnelId equals personnel.PersonnelId
                 join parcels in _parcelContext.Parcels
                 on deliveries.ParcelId equals parcels.ParcelId
                 where (personnelId == deliveries.PersonnelId)
                 orderby parcels.ScheduledDeliveryDate
                 select new
                 {
                     DeliveryId = deliveries.DeliveryId,
                     PersonnelId = deliveries.PersonnelId,
                     PersonnelFirstName = personnel.FirstName,
                     PersonnelLastName = personnel.LastName,
                     ParcelId = deliveries.ParcelId,
                     ParcelStatus = parcels.ParcelStatus,
                     DeliveryStatus = deliveries.DeliveryStatus,
                     ScheduledDeliveryDate = parcels.ScheduledDeliveryDate,
                     DeliveryDate = deliveries.DeliveryDate,

                 }).ToList();

            
            foreach(var pd in personnelDeliveries)
            {
                personDeliveries.Add(new DeliveryDto()
                {
                    DeliveryId = pd.DeliveryId,
                    PersonnelId = pd.PersonnelId,
                    FirstName = pd.PersonnelFirstName,
                    LastName = pd.PersonnelLastName,
                    ParcelId = pd.ParcelId,
                    DeliveryStatus= pd.DeliveryStatus,
                    ParcelStatus = pd.ParcelStatus,
                    ScheduledDeliveryDate = pd.ScheduledDeliveryDate,
                    DeliveryDate = pd.DeliveryDate
                });
            }

            return personDeliveries;

        }

        public virtual Delivery GetRowById(int id)
        {
            var delivery = _parcelContext.Deliveries.FirstOrDefault(d => d.DeliveryId == id);

            if (delivery == null)
            {
                return null; // Return null if no personnel is found
            }

            return new Delivery
            {
                DeliveryId= delivery.DeliveryId,
                ParcelId= delivery.ParcelId,
                PersonnelId = delivery.PersonnelId,
                DeliveryStatus= delivery.DeliveryStatus,
                DeliveryDate= delivery.DeliveryDate

            };
        }


        public virtual Delivery UpdateDeliveryStatus(int id, DeliveryStatusDto deliveryDto)
        {
            var delivery =  _parcelContext.Deliveries.Find(id);

            if (delivery == null)
            {
                return null;
            }

            if (!string.IsNullOrEmpty(deliveryDto.DeliveryStatus))
            {
                delivery.PersonnelId = deliveryDto.PersonnelId;
                delivery.DeliveryStatus = deliveryDto.DeliveryStatus;

                // Check if the new status is "Completed" and update the DeliveryDate
                if (deliveryDto.DeliveryStatus == "Completed")
                {
                    delivery.DeliveryDate = DateTime.Now;
                }
                else
                {
                    delivery.DeliveryDate = null;
                }

                _parcelContext.SaveChanges();
            }

            var deliveryUpdated = new Delivery()
            {
                DeliveryStatus = deliveryDto.DeliveryStatus,
            };

            return deliveryUpdated;
        }

        public virtual (Delivery updatedItem, string message) UpdateRow(Delivery delivery)
        {
            Delivery deliveryUpdated = delivery;
            _parcelContext.Entry(deliveryUpdated).State = EntityState.Modified;
            _parcelContext.SaveChanges();
            return (deliveryUpdated, $"Delivery with ID {delivery.PersonnelId} has been successfully updated.");
        }

        // To test
        public virtual Delivery CreateNewDelivery(DeliveryCreateDto deliveryDto)
        {
            var newDelivery = new Delivery()
            {
                ParcelId = deliveryDto.ParcelId,
                PersonnelId = deliveryDto.PersonnelId,
                DeliveryStatus = deliveryDto.DeliveryStatus,
                DeliveryDate = deliveryDto.DeliveryDate != null ? deliveryDto.DeliveryDate.Value : DateTime.Now.AddDays(7).Date.AddHours(12), // Handle null

            };
            _parcelContext.Deliveries.Add(newDelivery);
            _parcelContext.SaveChanges();

            return newDelivery;
        }


        // To test
        public virtual bool DeleteRow(int id)
        {
            var deliveryToDelete = _parcelContext.Deliveries.Find(id);
            bool flag = false;
            if (deliveryToDelete != null)
            {
                _parcelContext.Deliveries.Remove(deliveryToDelete);
                _parcelContext.SaveChanges();
                flag = true;
            }
            return flag;
        }


    }
}
