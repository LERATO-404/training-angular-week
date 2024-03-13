import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Parcel } from 'src/app/Shared/Models/parcel-delivery-vm';
import { CrudService } from 'src/app/Shared/Services/crud.service';

@Component({
  selector: 'app-adm-parcels-details',
  templateUrl: './adm-parcels-details.component.html',
  styleUrls: ['./adm-parcels-details.component.css']
})
export class AdmParcelsDetailsComponent {

  completed: boolean = false;
  prclId: number | undefined;
  parcelDetailsForm: Parcel = this.service.sampleParcel;

  parcel: Parcel | undefined;

  constructor(private service: CrudService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.prclId = Number(id);

    this.service
      .getParcelById(this.prclId)
      .subscribe((data) => {
        this.parcelDetailsForm = data;
      });
  }
}
