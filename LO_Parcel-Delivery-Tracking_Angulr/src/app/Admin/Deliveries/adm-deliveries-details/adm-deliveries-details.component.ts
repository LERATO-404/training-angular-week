import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Delivery, PersonnelDriver } from 'src/app/Shared/Models/parcel-delivery-vm';
import { CrudService } from 'src/app/Shared/Services/crud.service';

@Component({
  selector: 'app-adm-deliveries-details',
  templateUrl: './adm-deliveries-details.component.html',
  styleUrls: ['./adm-deliveries-details.component.css']
})
export class AdmDeliveriesDetailsComponent {

  completed: boolean = false;
  dlvId: number | undefined;
  deliveryDetailsForm: Delivery = this.service.sampleDeliveryCreate;
  drivers: PersonnelDriver[] = [];
  selectedDriver: PersonnelDriver | undefined;
  delivery: Delivery | undefined;
  selectedDriverId: number = 0;

  constructor(private service: CrudService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.dlvId = Number(id);


    // get the Id of the driver
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.selectedDriverId = id;
      }
    });

    console.log(this.onDriverSelected(this.selectedDriverId));

    this.service
      .getDeliveryById(this.dlvId)
      .subscribe((data) => {
        this.deliveryDetailsForm = data;
      });

  }

  onDriverSelected(driverId: number) {
    this.selectedDriver = this.drivers.find(driver => driver.personnelId === driverId);
  }


}
