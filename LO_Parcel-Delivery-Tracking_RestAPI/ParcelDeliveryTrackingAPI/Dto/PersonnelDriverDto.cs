namespace ParcelDeliveryTrackingAPI.Dto
{
    public class PersonnelDriverDto
    {
        public int PersonnelId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? UserName { get; set; }
    }
}
