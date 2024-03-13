using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ParcelDeliveryTrackingAPI.AuthModels;
using ParcelDeliveryTrackingAPI.Dto;
using ParcelDeliveryTrackingAPI.Helpers;
using ParcelDeliveryTrackingAPI.Interfaces;
using ParcelDeliveryTrackingAPI.Models;

namespace ParcelDeliveryTrackingAPI.Repositories
{
    public class ParcelRepository : IParcel
    {
        private readonly ParcelDeliveryTrackingDBContext _parcelContext;
        

        public ParcelRepository(ParcelDeliveryTrackingDBContext parcelContext)
        {
            _parcelContext = parcelContext;
           
        }

        public Parcel CreateNewParcel(ParcelCreateDto parcelDto)
        {
            var newParcel = new Parcel()
            {
                SenderId = parcelDto.SenderId,
                ReceiverId = parcelDto.ReceiverId,
                Weight = parcelDto.Weight,
                ParcelStatus = parcelDto.ParcelStatus,
                ScheduledDeliveryDate = parcelDto.ScheduledDeliveryDate != null ? parcelDto.ScheduledDeliveryDate.Value.AddHours(12) : DateTime.Now.AddDays(7).Date.AddHours(12), // Handle null
                AdditionalNotes = parcelDto.AdditionalNotes
            };

            _parcelContext.Parcels.Add(newParcel);
            _parcelContext.SaveChanges();

            return newParcel;
        }

        public bool DeleteRow(int id)
        {
            bool flag = false;
            var parcelToDelete = _parcelContext.Parcels
                   .Find(id);

            if (parcelToDelete != null)
            {
                _parcelContext.Parcels.Remove(parcelToDelete);
                _parcelContext.SaveChanges();
                flag = true;
            }

            return flag;
         
        }

        public virtual List<ParcelDto> GetAllParcelByStatus(string status)
        {
            var lowercaseStatus = status.ToLower();

            var parcelsByStatus =  _parcelContext.Parcels
                .Where(p => p.ParcelStatus.ToLower() == lowercaseStatus)
                .Select(parcel => new ParcelDto
                {
                    ParcelId = parcel.ParcelId,
                    SenderId = parcel.SenderId,
                    ReceiverId = parcel.ReceiverId,
                    Weight = parcel.Weight,
                    ParcelStatus = parcel.ParcelStatus,
                    ScheduledDeliveryDate = parcel.ScheduledDeliveryDate,
                    AdditionalNotes = parcel.AdditionalNotes
                })
                .ToList();

            if (parcelsByStatus.Count() == 0)
            {
                return null;
            }

            return parcelsByStatus;
        }

        public virtual List<ParcelDetailedDto> GetDetailedParcelByStatus(string status)
        {
            List<ParcelDetailedDto> allDetailedParcel = new List<ParcelDetailedDto>();
            var lowercaseStatus = status.ToLower();
            // Parcel Sender Receiver Participant Address

            var detailedParcelsByStatus =
               (from Parcels in _parcelContext.Parcels
                join Sender in _parcelContext.Senders
                on Parcels.SenderId equals Sender.SenderId
                join Receiver in _parcelContext.Receivers
                on Parcels.ReceiverId equals Receiver.ReceiverId
                join ParcelParticipantSender in _parcelContext.ParcelParticipants
                on Sender.ParticipantId equals ParcelParticipantSender.ParticipantId
                join ParcelParticipantReceiver in _parcelContext.ParcelParticipants
                on Receiver.ParticipantId equals ParcelParticipantReceiver.ParticipantId
                join AddressSender in _parcelContext.Addresses
                on ParcelParticipantSender.AddressId equals AddressSender.AddressId
                join AddressReceiver in _parcelContext.Addresses
                on ParcelParticipantReceiver.AddressId equals AddressReceiver.AddressId
                where (Parcels.ParcelStatus.ToLower() == lowercaseStatus)
                orderby Parcels.ParcelId
                select new
                {
                    ParcelId = Parcels.ParcelId,
                    Weight = Parcels.Weight,
                    ParcelStatus = Parcels.ParcelStatus,
                    ScheduledDeliveryDate = Parcels.ScheduledDeliveryDate,
                    AdditionalNotes = Parcels.AdditionalNotes,

                    SenderName = ParcelParticipantSender.ParticipantName,
                    SenderPhoneNumber = ParcelParticipantSender.PhoneNumber,
                    SenderEmail = ParcelParticipantSender.EmailAddress,


                    ReceiverName = ParcelParticipantReceiver.ParticipantName,
                    ReceiverPhoneNumber = ParcelParticipantReceiver.PhoneNumber,
                    ReceiverEmail = ParcelParticipantReceiver.EmailAddress,

                    SenderAddressLine = AddressSender.AddressLine,
                    SenderAddreddSuburb = AddressSender.Suburb,
                    SenderAddressCity = AddressSender.City,
                    SenderAddressPostalCode = AddressSender.PostalCode,


                    ReceiverAddressLine = AddressReceiver.AddressLine,
                    ReceiverAddressSuburb = AddressReceiver.Suburb,
                    ReceiverAddressCity = AddressReceiver.City,
                    ReceiverAddressPostalCode = AddressReceiver.PostalCode
                }).ToList();
            

            foreach (var prcl in detailedParcelsByStatus)
            {
                allDetailedParcel.Add(new ParcelDetailedDto()
                {
                    ParcelId = prcl.ParcelId,
                    Weight = prcl.Weight,
                    ParcelStatus = prcl.ParcelStatus, 
                    ScheduledDeliveryDate = prcl.ScheduledDeliveryDate,
                    AdditionalNotes = prcl.AdditionalNotes,

                    SenderParticipantName = prcl.SenderName, 
                    SenderPhoneNumber = prcl.SenderPhoneNumber,
                    SenderEmailAddress = prcl.SenderEmail,

                    ReceiverParticipantName = prcl.ReceiverName,
                    ReceiverPhoneNumber = prcl.ReceiverPhoneNumber,
                    ReceiverEmailAddress= prcl.ReceiverEmail,

                    SenderAddressLine = prcl.SenderAddressLine,
                    SenderSuburb = prcl.SenderAddreddSuburb,
                    SenderCity = prcl.SenderAddressCity,
                    SenderPostalCode = prcl.SenderAddressPostalCode,


                    ReceiverAddressLine = prcl.ReceiverAddressLine,
                    ReceiverSuburb = prcl.ReceiverAddressSuburb,
                    ReceiverCity = prcl.ReceiverAddressCity,
                    ReceiverPostalCode = prcl.ReceiverAddressPostalCode

                });
            }

            return allDetailedParcel;
        }

        public virtual List<ParcelDto> GetAllRows()
        {
            var parcelDto = _parcelContext.Parcels
                .Select(p => new ParcelDto
                { 
                    ParcelId= p.ParcelId,
                    SenderId= p.SenderId,
                    ReceiverId= p.ReceiverId,
                    Weight= p.Weight,
                    ParcelStatus= p.ParcelStatus,
                    ScheduledDeliveryDate= p.ScheduledDeliveryDate,
                    AdditionalNotes= p.AdditionalNotes,
                
                }
                ).ToList();
            return parcelDto;
        }

        public virtual List<ParcelDetailedDto> GetParcelDetails()
        {

            List<ParcelDetailedDto> allParcels = new List<ParcelDetailedDto>();

            //Query Syntax
            var detailedParcels =
            (from Parcels in _parcelContext.Parcels
             join Sender in _parcelContext.Senders
             on Parcels.SenderId equals Sender.SenderId
             join Receiver in _parcelContext.Receivers
             on Parcels.ReceiverId equals Receiver.ReceiverId
             join ParcelParticipantS in _parcelContext.ParcelParticipants
             on Sender.ParticipantId equals ParcelParticipantS.ParticipantId
             join ParcelParticipantR in _parcelContext.ParcelParticipants
             on Receiver.ParticipantId equals ParcelParticipantR.ParticipantId
             join AddressS in _parcelContext.Addresses
             on ParcelParticipantS.AddressId equals AddressS.AddressId
             join AddressR in _parcelContext.Addresses
             on ParcelParticipantR.AddressId equals AddressR.AddressId  
             orderby Parcels.ParcelId
             select new
             {
                
                 ParcelId = Parcels.ParcelId,
                 Weight = Parcels.Weight,
                 ParcelStatus = Parcels.ParcelStatus,
                 ScheduledDeliveryDate = Parcels.ScheduledDeliveryDate,
                 AdditionalNotes = Parcels.AdditionalNotes,

                 SenderId = Sender.SenderId,
                 ReceiverId = Receiver.ReceiverId,

                 SenderName = ParcelParticipantS.ParticipantName,
                 PhoneNumberS = ParcelParticipantS.PhoneNumber,
                 EmailS = ParcelParticipantS.EmailAddress,
                 

                 ReceiverName = ParcelParticipantR.ParticipantName,
                 PhoneNumberR = ParcelParticipantR.PhoneNumber,
                 EmailR = ParcelParticipantR.EmailAddress,

                 
                 AddressLineS = AddressS.AddressLine,
                 AddressCityS = AddressS.City, 
                 AddressSuburbS = AddressS.Suburb,
                 AddressPostalCodeS = AddressS.PostalCode,

                 AddressLineR = AddressR.AddressLine,
                 AddressCityR = AddressR.City,
                 AddressSuburbR = AddressR.Suburb,
                 AddressPostalCodeR = AddressR.PostalCode                
             }).ToList();

            foreach (var prcl in detailedParcels)
            {
                allParcels.Add(new ParcelDetailedDto()
                {
                    ParcelId = prcl.ParcelId,
                    Weight = prcl.Weight,
                    ParcelStatus = prcl.ParcelStatus,
                    ScheduledDeliveryDate = prcl.ScheduledDeliveryDate,
                    AdditionalNotes = prcl.AdditionalNotes,

                    SenderParticipantName = prcl.SenderName,
                    SenderPhoneNumber = prcl.PhoneNumberS,
                    SenderEmailAddress = prcl.EmailS,

                    ReceiverParticipantName = prcl.ReceiverName,
                    ReceiverPhoneNumber = prcl.PhoneNumberR,
                    ReceiverEmailAddress = prcl.EmailR,


                    SenderAddressLine = prcl.AddressLineS,
                    SenderCity = prcl.AddressCityS,
                    SenderSuburb = prcl.AddressSuburbS,
                    SenderPostalCode = prcl.AddressPostalCodeS,

                    ReceiverAddressLine = prcl.AddressLineR,
                    ReceiverCity = prcl.AddressCityR,
                    ReceiverSuburb = prcl.AddressSuburbR,
                    ReceiverPostalCode = prcl.AddressPostalCodeR,

                });
            }

            return allParcels;
        }

        public ParcelDto GetRowById(int id)
        {
            ParcelDto parcelDto = new ParcelDto();
            var parcel = _parcelContext.Parcels.FirstOrDefault(p => p.ParcelId == id);

            if (parcel == null)
            {
                return null;
            }
            parcelDto.ParcelId = parcel.ParcelId;
            parcelDto.SenderId = parcel.SenderId;
            parcelDto.ReceiverId = parcel.ReceiverId;
            parcelDto.Weight = parcel.Weight;
            parcelDto.ParcelStatus = parcel.ParcelStatus;
            parcelDto.ScheduledDeliveryDate = parcel.ScheduledDeliveryDate;
            parcelDto.AdditionalNotes = parcel.AdditionalNotes;

            return parcelDto;
        }

        public List<ParcelDto> GetSenderParcels(int senderId)
        {
            var parcel =  _parcelContext.Parcels
                    .Where(p => p.SenderId == senderId)
                    .Select(parcel => new ParcelDto
                    {
                        ParcelId = parcel.ParcelId,
                        SenderId = parcel.SenderId,
                        ReceiverId = parcel.ReceiverId,
                        Weight = parcel.Weight,
                        ParcelStatus = parcel.ParcelStatus,
                        ScheduledDeliveryDate = parcel.ScheduledDeliveryDate,
                        AdditionalNotes = parcel.AdditionalNotes
                    })
                    .ToList();

            if(parcel.Count == 0)
            {
                return null;
            }

            return parcel;
        }

        public Parcel UpdateParcelInformation(int id, ParcelDto parcelDto)
        {
            var parcel = _parcelContext.Parcels.Find(id);

            if (parcel == null)
            {
                return null;
            }
            parcel.ParcelId = parcelDto.ParcelId;
            parcel.SenderId = parcelDto.SenderId;
            parcel.ReceiverId = parcelDto.ReceiverId;
            parcel.Weight = parcelDto.Weight;
            parcel.ParcelStatus = parcelDto.ParcelStatus;
            parcel.ScheduledDeliveryDate = parcelDto.ScheduledDeliveryDate;
            parcel.AdditionalNotes = parcelDto.AdditionalNotes;


            _parcelContext.SaveChanges();

            var parcelUpdated = new Parcel()
            {
                ParcelId = parcel.ParcelId,
                SenderId = parcel.SenderId,
                ReceiverId= parcel.ReceiverId,
                Weight = parcel.Weight,
                ParcelStatus= parcel.ParcelStatus,
                ScheduledDeliveryDate= parcel.ScheduledDeliveryDate,
                AdditionalNotes= parcel.AdditionalNotes
            };

            return parcelUpdated;
        }

        public (ParcelDto updatedItem, string message) UpdateRow(ParcelDto parcelDto)
        {
            
            var parcel = _parcelContext.Parcels.Find(parcelDto.ParcelId);

            if(parcel == null)
            {
                return (null, $"Parcel with ID {parcel.ParcelId} was not found. Update failed.");
            }

            parcel.SenderId = parcelDto.SenderId;
            parcel.ReceiverId = parcelDto.ReceiverId;
            parcel.Weight = parcelDto.Weight;
            parcel.ParcelStatus = parcelDto.ParcelStatus;
            parcel.ScheduledDeliveryDate = parcelDto.ScheduledDeliveryDate;
            parcel.AdditionalNotes = parcelDto.AdditionalNotes;

            _parcelContext.SaveChanges();
    
            var updateParcel = new ParcelDto
            {
                ParcelId = parcelDto.ParcelId,
                SenderId = parcelDto.SenderId,
                ReceiverId = parcelDto.ReceiverId,
                Weight = parcelDto.Weight,
                ParcelStatus = parcelDto.ParcelStatus,
                ScheduledDeliveryDate = parcelDto.ScheduledDeliveryDate,
                AdditionalNotes = parcelDto.AdditionalNotes
            };
            return (updateParcel, $"Parcel Status with ID {parcel.ParcelId} has been successfully updated.");
        }
    }
}
