import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Delivery } from 'src/app/Shared/Models/parcel-delivery-vm';
import { CrudService } from 'src/app/Shared/Services/crud.service';

@Component({
  selector: 'app-adm-deliveries-delete',
  templateUrl: './adm-deliveries-delete.component.html',
  styleUrls: ['./adm-deliveries-delete.component.css']
})
export class AdmDeliveriesDeleteComponent {

  completed: boolean = false;
  dlvId: number | undefined;
  deliveryform: Delivery = this.service.sampleDeliveryCreate;

  constructor(private service: CrudService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.dlvId = Number(id);

    this.service
      .getDeliveryById(this.dlvId)
      .subscribe((data) => {
        this.deliveryform = data;
      });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(form.value.deliveryId);

    this.service
      .adminDeleteDelivery(form.value.deliveryId)
      .subscribe((data) => {
        this.completed = true;

        setTimeout(() => {
          console.log("Wait for 1 second");
          alert("Delivery ID " + form.value.deliveryId +" has been deleted");
          this.router.navigate(['/dlv']);
        }, 1000);

      });
  }


}
