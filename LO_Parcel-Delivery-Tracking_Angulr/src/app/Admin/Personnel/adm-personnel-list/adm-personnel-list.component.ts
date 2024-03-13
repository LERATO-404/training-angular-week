import { Component } from '@angular/core';
import { Personnel } from 'src/app/Shared/Models/parcel-delivery-vm';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { CrudService } from 'src/app/Shared/Services/crud.service';

@Component({
  selector: 'app-adm-personnel-list',
  templateUrl: './adm-personnel-list.component.html',
  styleUrls: ['./adm-personnel-list.component.css']
})
export class AdmPersonnelListComponent {


  selectedFilter: string = 'availability';
  selectedAvailability: string = '';
  selectedDriver: string = '';



  adminHeaderLinks = [
    { url: '/dlv', text: 'Deliveries' },
    { url: '/prcl', text: 'Parcels' },
    { url: '/psl', text: 'Personnel' },
    { url: '/profile', text: 'Profile' }
  ];
  allPersonnel: Personnel[] | undefined;

  constructor(private service: CrudService, private auth: AuthService) {}

  ngOnInit(): void {

    if(this.auth.isAdmin() == true){
      this.service.getAllPersonnel().subscribe((data) =>{
        console.log(data)
        this.allPersonnel = data
      });
    }
  }

  filterPersonnel() {
    if(this.selectedAvailability == ''){
      this.service.getAllPersonnel().subscribe((data) =>{
        this.allPersonnel = data
      });
  }
  this.service.getAllPersonnelByAvailability(this.selectedAvailability).subscribe((personnel) => {
    this.allPersonnel = personnel;
  });
  }
}
