import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Parcel } from 'src/app/Shared/Models/parcel-delivery-vm';
import { CrudService } from 'src/app/Shared/Services/crud.service';

@Component({
  selector: 'app-adm-parcels-update',
  templateUrl: './adm-parcels-update.component.html',
  styleUrls: ['./adm-parcels-update.component.css']
})
export class AdmParcelsUpdateComponent {

  completed: boolean = false;
  prclId: number | undefined;
  parcelform: Parcel = this.service.sampleParcel;

  constructor(private service: CrudService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.prclId = Number(id);

    this.service
      .getParcelById(this.prclId)
      .subscribe((data) => {
        this.parcelform = data;
      });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    this.service
      .updateParcelsDetails(form.value)
      .subscribe((data) => {
        this.completed = true;

        setTimeout(() => {
          console.log("Wait for 1 second");
          alert("Parcel ID " + form.value.parcelId +" has been updated");
          this.router.navigate(['/prcl']);
        }, 1000);
      });
  }
}
