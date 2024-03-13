import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthContainerComponent } from './Auth/auth-container/auth-container.component';
import { AdmDeliveriesListComponent } from './Admin/Deliveries/adm-deliveries-list/adm-deliveries-list.component';
import { AdmDeliveriesAddNewComponent } from './Admin/Deliveries/adm-deliveries-add-new/adm-deliveries-add-new.component';
import { AdmDeliveriesUpdateComponent } from './Admin/Deliveries/adm-deliveries-update/adm-deliveries-update.component';
import { LandingPageComponent } from './Landing/landing-page/landing-page.component';
import { AdmDeliveriesDeleteComponent } from './Admin/Deliveries/adm-deliveries-delete/adm-deliveries-delete.component';
import { AdmDeliveriesDetailsComponent } from './Admin/Deliveries/adm-deliveries-details/adm-deliveries-details.component';
import { UserDetailsComponent } from './UserProfile/user-details/user-details.component';
import { AdmParcelsListComponent } from './Admin/Parcels/adm-parcels-list/adm-parcels-list.component';
import { AdmParcelAddNewComponent } from './Admin/Parcels/adm-parcel-add-new/adm-parcel-add-new.component';
import { AdmParcelsDeleteComponent } from './Admin/Parcels/adm-parcels-delete/adm-parcels-delete.component';
import { AdmParcelsDetailsComponent } from './Admin/Parcels/adm-parcels-details/adm-parcels-details.component';
import { AdmParcelsUpdateComponent } from './Admin/Parcels/adm-parcels-update/adm-parcels-update.component';
import { AdmPersonnelListComponent } from './Admin/Personnel/adm-personnel-list/adm-personnel-list.component';
import { AdmPersonnelDetailsComponent } from './Admin/Personnel/adm-personnel-details/adm-personnel-details.component';

const routes: Routes = [
  {path: 'home', component: LandingPageComponent},
  {path: 'login', component: AuthContainerComponent},

  {path: 'profile', component: UserDetailsComponent},

  // deliveries
  {path: 'dlv', component: AdmDeliveriesListComponent},
  {path: 'dlv/create', component: AdmDeliveriesAddNewComponent},
  {path: 'dlv/details/:id', component: AdmDeliveriesDetailsComponent},
  {path: 'dlv/update/:id', component: AdmDeliveriesUpdateComponent},
  {path: 'dlv/delete/:id', component: AdmDeliveriesDeleteComponent},


  // parcels
  {path: 'prcl', component: AdmParcelsListComponent},
  {path: 'prcl/create', component: AdmParcelAddNewComponent},
  {path: 'prcl/details/:id', component: AdmParcelsDetailsComponent},
  {path: 'prcl/update/:id', component: AdmParcelsUpdateComponent},
  {path: 'prcl/delete/:id', component: AdmParcelsDeleteComponent},

// Personnel
  {path: 'psl', component: AdmPersonnelListComponent },
  {path: 'psl/details/:id', component: AdmPersonnelDetailsComponent},


  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
