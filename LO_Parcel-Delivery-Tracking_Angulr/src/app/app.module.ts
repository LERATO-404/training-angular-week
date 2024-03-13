import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './Auth/user-login/user-login.component';
import { UserRegistrationComponent } from './Auth/user-registration/user-registration.component';
import { AuthContainerComponent } from './Auth/auth-container/auth-container.component';
import { AdmDeliveriesListComponent } from './Admin/Deliveries/adm-deliveries-list/adm-deliveries-list.component';
import { AdmDeliveriesDetailsComponent } from './Admin/Deliveries/adm-deliveries-details/adm-deliveries-details.component';
import { AdmDeliveriesAddNewComponent } from './Admin/Deliveries/adm-deliveries-add-new/adm-deliveries-add-new.component';
import { AdmDeliveriesUpdateComponent } from './Admin/Deliveries/adm-deliveries-update/adm-deliveries-update.component';
import { AdmDeliveriesDeleteComponent } from './Admin/Deliveries/adm-deliveries-delete/adm-deliveries-delete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './Landing/landing-page/landing-page.component';
import { HeaderComponent } from './Landing/header/header.component';
import { FooterComponent } from './Landing/footer/footer.component';
import { UserDetailsComponent } from './UserProfile/user-details/user-details.component';
import { AdmParcelsListComponent } from './Admin/Parcels/adm-parcels-list/adm-parcels-list.component';
import { AdmParcelsDeleteComponent } from './Admin/Parcels/adm-parcels-delete/adm-parcels-delete.component';
import { AdmParcelAddNewComponent } from './Admin/Parcels/adm-parcel-add-new/adm-parcel-add-new.component';
import { AdmParcelsDetailsComponent } from './Admin/Parcels/adm-parcels-details/adm-parcels-details.component';
import { AdmParcelsUpdateComponent } from './Admin/Parcels/adm-parcels-update/adm-parcels-update.component';
import { AdmPersonnelListComponent } from './Admin/Personnel/adm-personnel-list/adm-personnel-list.component';
import { AdmPersonnelDetailsComponent } from './Admin/Personnel/adm-personnel-details/adm-personnel-details.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    AuthContainerComponent,
    AdmDeliveriesListComponent,
    AdmDeliveriesDetailsComponent,
    AdmDeliveriesAddNewComponent,
    AdmDeliveriesUpdateComponent,
    AdmDeliveriesDeleteComponent,
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    UserDetailsComponent,
    AdmParcelsListComponent,
    AdmParcelsDeleteComponent,
    AdmParcelAddNewComponent,
    AdmParcelsDetailsComponent,
    AdmParcelsUpdateComponent,
    AdmPersonnelListComponent,
    AdmPersonnelDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
