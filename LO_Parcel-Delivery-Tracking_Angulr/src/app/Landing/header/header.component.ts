import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() links: { url: string, text: string }[] = [];
  @Input() isLoggedIn: boolean = false;

  constructor(private router: Router, private auth: AuthService) { }

  userlogout() {
    this.auth.logout();
    setTimeout(() => {
      console.log("Wait for 1 second");
      this.router.navigate(['/home']);
    }, 500);
  }



  login(){
    this.router.navigate(['/login']);
  }
}
