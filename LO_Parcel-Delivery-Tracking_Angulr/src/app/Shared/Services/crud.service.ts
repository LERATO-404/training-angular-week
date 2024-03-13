import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/global-constants';
import { Delivery, DeliveryCreateVm, DeliveryStatusDto, DeliveryStatusVm, DeliveryVm, DetailedDelivery, Parcel, ParcelCreateVm, ParcelDetailed, Personnel, PersonnelDriver } from '../Models/parcel-delivery-vm';
import { Observable } from 'rxjs';
import { UserProfile } from '../Models/user-profile';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private _baseurl: string = GlobalConstants._RestBaseURL;

  constructor(private http: HttpClient, private auth: AuthService) {}

  // User Profile Sample Data
  sampleUserProfile: UserProfile = {
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    userRoles: []

  }

  // Parcels Sample Data
  sampleParcelCreate: ParcelCreateVm = {
    senderId: 0,
    receiverId: 0,
    weight: 0,
    parcelStatus: '',
    scheduledDeliveryDate: new Date,
    additionalNotes: ''
  }

  sampleParcel: Parcel = {
    parcelId: 0,
    senderId: 0,
    receiverId: 0,
    weight: 0,
    parcelStatus: '',
    scheduledDeliveryDate: new Date,
    additionalNotes: ''
  }

  // Delivery Sample Data
  sampleDelivery: DeliveryCreateVm = {
    parcelId: 0,
    personnelId: 0,
    deliveryStatus: '',
    deliveryDate: new Date
  }

  sampleDeliveryCreate: Delivery = {
    deliveryId: 0,
    parcelId: 0,
    personnelId: 0,
    deliveryStatus: '',
    deliveryDate: new Date
  }

  sampleDeliveryUpdate: DeliveryStatusDto = {
    deliveryId: 0,
    personnelId: 0,
    deliveryStatus: '',
    deliveryDate: new Date()
  }

  // Personnel
  samplePersonnel: Personnel = {
  personnelId: 0,
  firstName: '',
  lastName: '',
  phoneNumber: '',
  emailAddress: '',
  availability: '',
  userName: '',
  deliveries: [this.sampleDeliveryCreate]
  }

  sampleDriver: PersonnelDriver ={
    personnelId: 0,
    firstName: '',
    lastName: '',
    userName: '',
  }


  // User Profile
  getUserProfile(): Observable<UserProfile>{
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};


    return this.http.get<UserProfile>(this._baseurl + '/api/UserProfile', options);
  }

// Deliveries
  getAllDeliveries(): Observable<DetailedDelivery[]> {
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};
    return this.http.get<DetailedDelivery[]>(this._baseurl + '/api/Deliveries/Detailed', options);
  }

  adminAddNewDelivery(newDelivery: DeliveryCreateVm) {
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};
    return this.http.post(this._baseurl + '/api/Deliveries', newDelivery, options);
  }

  adminUpdateDeliveryDetails(updateDelivery: DeliveryStatusDto): Observable<DeliveryStatusDto> {
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};
    return this.http.put<DeliveryStatusDto>(this._baseurl + '/api/Deliveries/' + updateDelivery.deliveryId , updateDelivery, options);
  }

  adminDeleteDelivery(id: number) {
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};
    return this.http.delete(this._baseurl + '/api/Deliveries/' + id, options);
  }


  getDeliveryById(id: number): Observable<Delivery> {
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};
    return this.http.get<Delivery>(this._baseurl + '/api/Deliveries/' + id, options);
  }

  getDeliveriesByStatus(status: string){
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};
    return this.http.get<DetailedDelivery[]>(this._baseurl+'/api/Deliveries/Detailed/Status/'+status, options);
  }


  // ######################################################################
  // Personnel
  getAllPersonnel(): Observable<Personnel[]> {
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};

  return this.http.get<Personnel[]>(this._baseurl + '/api/Personnel', options);
  }


  getAllPersonnelByAvailability(availability: string): Observable<Personnel[]>{
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};

  return this.http.get<Personnel[]>(this._baseurl + '/api/Personnel/Availability/'+availability, options);
  }


  getPersonnelById(id: number): Observable<Personnel> {
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};
    return this.http.get<Personnel>(this._baseurl + '/api/Personnel/' + id, options);
  }

  getAllDrivers():Observable<PersonnelDriver>{
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};
    return this.http.get<PersonnelDriver>(this._baseurl+'/api/Personnel/Drivers',options)
  }

  //######################################################################
  // Parcels
  getParcelById(id: number): Observable<Parcel> {
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};
    return this.http.get<Parcel>(this._baseurl + '/api/Parcels/' + id, options);
  }

  getAllParcels(): Observable<Parcel[]> {
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};

  return this.http.get<Parcel[]>(this._baseurl + '/api/Parcels', options);
  }

  getDetailedParcels(): Observable<ParcelDetailed[]>{
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};

  return this.http.get<ParcelDetailed[]>(this._baseurl + '/api/Parcels/Detailed', options);
  }

  getParcelsByStatus(status: string){
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};

    return this.http.get<Parcel[]>(this._baseurl+'/api/Parcels/Status/'+status, options);
  }


  getDetailedParcelsByStatus(status: string){
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};

    return this.http.get<ParcelDetailed[]>(this._baseurl+'/api/Parcels/Detailed/Status/'+status, options);
  }

  addNewParcel(newParcel: ParcelCreateVm) {
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};
    return this.http.post(this._baseurl + '/api/Parcels', newParcel, options);
  }

  updateParcelsDetails(updateParcel: Parcel): Observable<Parcel> {
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};
    return this.http.put<Parcel>(this._baseurl + '/api/Parcels/' + updateParcel.parcelId , updateParcel, options);
  }

  adminDeleteParcel(id: number) {
    const userToken = this.auth.getUserToken();
    if(!userToken){
      console.log('User is not authorized');
    }

    const headers = new HttpHeaders({
      Authorization : `Bearer ${userToken}`
    });
    const options = {headers: headers};
    return this.http.delete(this._baseurl + '/api/Parcels/' + id, options);
  }
}
