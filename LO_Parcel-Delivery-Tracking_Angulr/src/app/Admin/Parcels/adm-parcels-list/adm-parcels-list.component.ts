import { Component } from '@angular/core';
import { Parcel, ParcelDetailed } from 'src/app/Shared/Models/parcel-delivery-vm';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { CrudService } from 'src/app/Shared/Services/crud.service';

@Component({
  selector: 'app-adm-parcels-list',
  templateUrl: './adm-parcels-list.component.html',
  styleUrls: ['./adm-parcels-list.component.css']
})
export class AdmParcelsListComponent {

  selectedFilter: string = 'status';
  selectedStatus: string = '';
  selectedDriver: string = '';

  adminHeaderLinks = [
    { url: '/dlv', text: 'Deliveries' },
    { url: '/prcl', text: 'Parcels' },
    { url: '/psl', text: 'Personnel' },
    { url: '/profile', text: 'Profile' }
  ];
  //allParcels: Parcel[] | undefined;
  allParcelDetails: ParcelDetailed[] | undefined;

  constructor(private service: CrudService, private auth: AuthService) {}

  ngOnInit(): void {

    if(this.auth.isAdmin() == true){
      this.service.getDetailedParcels().subscribe((data) =>{
        console.log(data)
        this.allParcelDetails = data
      });
    }
  }

  filterParcels() {
    if(this.selectedStatus == ''){
      this.service.getDetailedParcels().subscribe((data) =>{
        console.log(data)
        this.allParcelDetails = data
      });
    }
    this.service.getDetailedParcelsByStatus(this.selectedStatus).subscribe((parcels) => {
      this.allParcelDetails = parcels;
    });
  }
}
