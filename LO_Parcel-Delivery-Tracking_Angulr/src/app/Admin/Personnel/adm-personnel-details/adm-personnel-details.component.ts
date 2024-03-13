import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Personnel } from 'src/app/Shared/Models/parcel-delivery-vm';
import { CrudService } from 'src/app/Shared/Services/crud.service';

@Component({
  selector: 'app-adm-personnel-details',
  templateUrl: './adm-personnel-details.component.html',
  styleUrls: ['./adm-personnel-details.component.css']
})
export class AdmPersonnelDetailsComponent {

  completed: boolean = false;
  pslId: number | undefined;
  personnelForm: Personnel = this.service.samplePersonnel;

  constructor(private service: CrudService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.pslId = Number(id);

    this.service
      .getPersonnelById(this.pslId)
      .subscribe((data) => {
        this.personnelForm = data;
      });
  }
}
