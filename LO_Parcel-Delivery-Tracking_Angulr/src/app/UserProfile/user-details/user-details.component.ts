import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'src/app/Shared/Models/user-profile';
import { CrudService } from 'src/app/Shared/Services/crud.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  completed: boolean = false;
  userDetailsForm: UserProfile = this.service.sampleUserProfile;

  constructor(private service: CrudService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.service
      .getUserProfile()
      .subscribe((data) => {
        this.userDetailsForm = data;
      });
  }

}
