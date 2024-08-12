import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userEmail : string | undefined;

  isLoggedIn$ : Observable<boolean> = new Observable();

   constructor(private authService : AuthService){

   }

  ngOnInit() {



  const user = localStorage.getItem('user');
    if (user) {
        this.userEmail = JSON.parse(user).email;
        console.log(this.userEmail);
    } else {
        console.log('User not found in localStorage');
    }

   this.isLoggedIn$ = this.authService.isLoggedIn();

  }

  onLogout(){
    this.authService.logout();
  }

}
