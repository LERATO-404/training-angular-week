using log4net;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ParcelDeliveryTrackingAPI.AuthModels;
using ParcelDeliveryTrackingAPI.Dto;
using ParcelDeliveryTrackingAPI.Helpers;
using ParcelDeliveryTrackingAPI.Interfaces;
using ParcelDeliveryTrackingAPI.Models;

namespace ParcelDeliveryTrackingAPI.Repositories
{
    public class PersonnelRepository : IPersonnel
    {
        private static readonly ILog logger = LogManager.GetLogger("PersonnelController");

        private readonly ParcelDeliveryTrackingDBContext _parcelContext;
        
        public PersonnelRepository(ParcelDeliveryTrackingDBContext context)
        {
            _parcelContext = context;
           
        }

        public virtual Personnel CreateNewPersonnel(PersonnelDto personnel)
        {
            
            var newPersonnel = new Personnel()
            {
                FirstName = personnel.FirstName,
                LastName = personnel.LastName,
                PhoneNumber = personnel.PhoneNumber,
                EmailAddress = personnel.EmailAddress,
                Availability = personnel.Availability != null ? personnel.Availability: "Off Duty",  
                UserName = personnel.UserName

            };

            _parcelContext.Personnels.Add(newPersonnel);
            _parcelContext.SaveChanges();
            return  newPersonnel;
            
        }

        public virtual List<Personnel> GetAllRows()
        {
            return _parcelContext.Personnels.ToList();
        }

        public virtual List<PersonnelDriverDto> GetDrivers(IEnumerable<string> username)
        {
            
            var drivers = _parcelContext.Personnels
                .Where(p => username.Contains(p.UserName))
                .Select(p => new PersonnelDriverDto
                {
                    PersonnelId = p.PersonnelId,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    UserName = p.UserName
                }).ToList();

            if (drivers == null)
            {
                return null; 
            }

            return drivers;

        }

        public virtual (Personnel updatedItem, string message) UpdateRow(Personnel personnel)
        {
            Personnel person = personnel;
            _parcelContext.Entry(person).State = EntityState.Modified;
            _parcelContext.SaveChanges();
            return (person, $"Personnel with ID {personnel.PersonnelId} has been successfully updated.");
        }

        public virtual bool DeleteRow(int id)
        {
            var personnelToDelete = _parcelContext.Personnels.Find(id);
            bool flag = false;
            if (personnelToDelete != null)
            {
                _parcelContext.Personnels.Remove(personnelToDelete);
                _parcelContext.SaveChanges();
                flag= true;
            }
            return flag;
        }

        


        public virtual Personnel GetPersonnelByFullName(string firstName, string lastName)
        {
            
            var  personnel =  _parcelContext.Personnels.FirstOrDefault(p => p.FirstName == firstName && p.LastName == lastName);

            if (personnel == null)
            {
                return null; // Return null if no personnel is found
            }

            return new Personnel
            {
                PersonnelId = personnel.PersonnelId,
                FirstName = personnel.FirstName,
                LastName = personnel.LastName,
                PhoneNumber = personnel.PhoneNumber,
                EmailAddress = personnel.EmailAddress,
                UserName = personnel.UserName,
                Availability = personnel.Availability
            };
            
        }

        public virtual Personnel GetRowById(int id)
        {
            var personnel =  _parcelContext.Personnels.FirstOrDefault(ps => ps.PersonnelId == id);

            if (personnel == null)
            {
                return null; // Return null if no personnel is found
            }

            return new Personnel
            {
                PersonnelId = personnel.PersonnelId,
                FirstName = personnel.FirstName,
                LastName = personnel.LastName,
                PhoneNumber = personnel.PhoneNumber,
                EmailAddress = personnel.EmailAddress,
                UserName = personnel.UserName,
                Availability = personnel.Availability
            };
        }

        public virtual bool PersonnelExists(int id)
        {
            return _parcelContext.Personnels.Any(ps => ps.PersonnelId == id);
        }

        public virtual List<Personnel> GetAllPersonnelByAvailability(string availability)
        {
            var lowercaseStatus = availability.ToLower();

            var personnelByAvailability = _parcelContext.Personnels
                .Where(p => p.Availability.ToLower() == lowercaseStatus)
                .ToList();

            if (personnelByAvailability.Count() == 0)
            {
                return null;
            }

            return personnelByAvailability;
        }

        public virtual List<Personnel> GetPersonnelByAvailability(string availability)
        {
            var personnelByAvailability = _parcelContext.Personnels
                        .Where(p => p.Availability == availability)
                        .ToList();

            return personnelByAvailability;
        }
    }
}
