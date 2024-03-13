import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Delivery, DeliveryStatusDto, PersonnelDriver } from 'src/app/Shared/Models/parcel-delivery-vm';
import { CrudService } from 'src/app/Shared/Services/crud.service';

@Component({
  selector: 'app-adm-deliveries-update',
  templateUrl: './adm-deliveries-update.component.html',
  styleUrls: ['./adm-deliveries-update.component.css']
})
export class AdmDeliveriesUpdateComponent implements OnInit {

  completed: boolean = false;
  dlvId: number | undefined;

  deliveryform: DeliveryStatusDto = this.service.sampleDeliveryUpdate;
  drivers: PersonnelDriver[] | undefined;
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

    //console.log(this.onDriverSelected(this.selectedDriverId));

    this.service
      .getDeliveryById(this.dlvId)
      .subscribe((data) => {
        this.deliveryform = data;
      });

    this.service
    .getAllPersonnel()
    .subscribe((data) =>
      {
        this.drivers = data
      });
  }

  onDriverSelected(driverId: number) {
    console.log('Selected driver ID:', driverId);
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    this.service
      .adminUpdateDeliveryDetails(form.value)
      .subscribe((data) => {
        this.completed = true;

        setTimeout(() => {
          console.log("Wait for 1 second");
          alert("Delivery ID " + form.value.deliveryId +" has been updated");
          this.router.navigate(['/dlv']);
        }, 1000);
      });
  }
}
