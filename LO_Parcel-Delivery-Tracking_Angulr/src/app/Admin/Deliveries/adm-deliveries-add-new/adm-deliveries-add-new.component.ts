import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryCreateVm, PersonnelDriver } from 'src/app/Shared/Models/parcel-delivery-vm';
import { CrudService } from 'src/app/Shared/Services/crud.service';

@Component({
  selector: 'app-adm-deliveries-add-new',
  templateUrl: './adm-deliveries-add-new.component.html',
  styleUrls: ['./adm-deliveries-add-new.component.css']
})
export class AdmDeliveriesAddNewComponent implements OnInit {

  completed: boolean = false;
  deliveryform: DeliveryCreateVm = this.service.sampleDelivery;
  drivers: PersonnelDriver[] | undefined;

  constructor(private service: CrudService, private router: Router) { }


  ngOnInit(): void {
    this.service.getAllPersonnel().subscribe((data) =>
    {
      this.drivers = data
    });

  }

  onSubmit(form: NgForm) {

    console.log(form.value);

    this.service
      .adminAddNewDelivery(form.value)
      .subscribe((data) => {
        this.completed = true;


        setTimeout(() => {
          console.log("Wait for 1 second");
          alert("Delivery has been assigned to Personnel ID " + form.value.personnelId +" successfully.");
          this.router.navigate(['/dlv']);
        }, 1000);

      });
  }
}
