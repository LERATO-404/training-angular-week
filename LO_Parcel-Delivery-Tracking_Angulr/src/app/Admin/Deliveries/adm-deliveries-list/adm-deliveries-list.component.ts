import { Component, OnInit } from '@angular/core';
import { Delivery, DetailedDelivery } from 'src/app/Shared/Models/parcel-delivery-vm';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { CrudService } from 'src/app/Shared/Services/crud.service';

@Component({
  selector: 'app-adm-deliveries-list',
  templateUrl: './adm-deliveries-list.component.html',
  styleUrls: ['./adm-deliveries-list.component.css']
})
export class AdmDeliveriesListComponent implements OnInit {

  selectedFilter: 'status' | 'driver' = 'status';
  selectedStatus: string = '';
  selectedDriver: string = '';


  adminHeaderLinks = [
    { url: '/dlv', text: 'Deliveries' },
    { url: '/prcl', text: 'Parcels' },
    { url: '/psl', text: 'Personnel' },
    { url: '/profile', text: 'Profile' }
  ];
  allDeliveries: DetailedDelivery[] | undefined;

  constructor(private service: CrudService, private auth: AuthService) {}

  ngOnInit(): void {

    if(this.auth.isAdmin() == true){
      this.service.getAllDeliveries().subscribe((data) =>{
        this.allDeliveries = data
      });
    }

  }

  filterDeliveries() {
    if (this.selectedFilter === 'status') {
      if(this.selectedStatus == ''){
          this.service.getAllDeliveries().subscribe((data) =>{
            this.allDeliveries = data
          });
      }
      this.service.getDeliveriesByStatus(this.selectedStatus).subscribe((deliveries) => {
        this.allDeliveries = deliveries;
      });
    } else if (this.selectedFilter === 'driver') {
      // Make a service call to filter by driver's full name
      // Example: this.deliveryService.getDeliveriesByDriver(this.selectedDriver).subscribe((deliveries) => { /* Update the list */ });
    }
  }


  adminLogOut(){
    this.auth.logout();
  }

}
