//Parcels
export interface Parcel{
  parcelId: number;
  senderId: number;
  receiverId: number;
  weight: number;
  parcelStatus: string;
  scheduledDeliveryDate: Date;
  additionalNotes: string;
}

export interface ParcelCreateVm{
  senderId: number;
  receiverId: number;
  weight: number;
  parcelStatus: string;
  scheduledDeliveryDate: Date;
  additionalNotes: string;
}

export interface ParcelDetailed{
  parcelId: number;
  weight: number;
  parcelStatus: string;
  scheduledDeliveryDate: Date;
  additionalNotes: string;

  senderParticipantName: string;
  senderPhoneNumber: string;
  senderEmailAddress: string;

  receiverParticipantName: string;
  receiverPhoneNumber: string;
  receiverEmailAddress: string;

  senderAddressLine: string;
  senderCity: string;
  senderSuburb: string;
  senderPostalCode: string;

  receiverAddressLine: string;
  receiverCity: string;
  receiverSuburb: string;
  receiverPostalCode: string;

}

// Personel
export interface Personnel{
  personnelId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  availability: string;
  userName: string;
  deliveries: [Delivery]
}

export interface PersonnelDriver{
  personnelId: number;
  firstName: string;
  lastName: string;
  userName: string;
}


// Deliveries
export interface DetailedDelivery{
  deliveryId: number;
  deliveryStatus: string;
  deliveryDate: Date;
  personnelId:number;
  firstName: string;
  lastName: string;
  parcelId: number;
  parcelStatus: string;
  scheduledDeliveryDate: Date;

}

export interface Delivery{
  deliveryId: number;
  parcelId: number;
  personnelId: number;
  deliveryStatus: string;
  deliveryDate: Date;
}

export interface DeliveryCreateVm {
  parcelId:number;
  personnelId:number;
  deliveryStatus:string;
  deliveryDate: Date;
}

export interface DeliveryStatusVm {
  personnelId:number;
  deliveryStatus:string;
}

export interface DeliveryVm {
  deliveryId: number;
  deliveryStatus: string;
  deliveryDate: Date;

  personnelId:number;
  firstName: string;
  lastName: string;

  parcelId:number;
  parcelStatus: string;
  scheduledDeliveryDate: Date;

}

export interface DeliveryStatusDto{
  deliveryId: number;
  personnelId: number;
  deliveryStatus: string;
  deliveryDate: Date;
}
