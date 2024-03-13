namespace ParcelDeliveryTrackingAPI.Dto
{
    public class ParcelDetailedDto
    {
        // parcel
        public int ParcelId { get; set; }
        public double Weight { get; set; }
        public string? ParcelStatus { get; set; }
        public DateTime? ScheduledDeliveryDate { get; set; }
        public string? AdditionalNotes { get; set; }


        // parcel participant
        //Sender
        public string? SenderParticipantName { get; set; }
        public string SenderPhoneNumber { get; set; } = null!;
        public string? SenderEmailAddress { get; set; }

        // Receiver
        public string? ReceiverParticipantName { get; set; }
        public string ReceiverPhoneNumber { get; set; } = null!;
        public string? ReceiverEmailAddress { get; set; }


        // address
        // address Sender
        public string SenderAddressLine { get; set; } = null!;
        public string SenderCity { get; set; } = null!;
        public string? SenderSuburb { get; set; }
        public string SenderPostalCode { get; set; } = null!;

        // address Receiver
        public string ReceiverAddressLine { get; set; } = null!;
        public string ReceiverCity { get; set; } = null!;
        public string? ReceiverSuburb { get; set; }
        public string ReceiverPostalCode { get; set; } = null!;

    }
}
