import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ParcelCreateVm } from 'src/app/Shared/Models/parcel-delivery-vm';
import { CrudService } from 'src/app/Shared/Services/crud.service';

@Component({
  selector: 'app-adm-parcel-add-new',
  templateUrl: './adm-parcel-add-new.component.html',
  styleUrls: ['./adm-parcel-add-new.component.css']
})
export class AdmParcelAddNewComponent {

  completed: boolean = false;
  parcelform: ParcelCreateVm = this.service.sampleParcelCreate;

  constructor(private service: CrudService, private router: Router) { }

  onSubmit(form: NgForm) {

    console.log(form.value);

    this.service
      .addNewParcel(form.value)
      .subscribe((data) => {
        this.completed = true;

        setTimeout(() => {
          console.log("Wait for 1 second");
          alert("Parcel has been added successfully.");
          this.router.navigate(['/prcl']);
        }, 1000);

      });
  }
}
