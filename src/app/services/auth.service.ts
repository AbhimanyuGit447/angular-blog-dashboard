import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn : BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoggedInGuard : boolean = false;

  constructor(private authService : AngularFireAuth, private toastr : ToastrService, private router : Router) {

    const user = localStorage.getItem('user');
    if (user) {
      this.loggedIn.next(true); // Set BehaviorSubject based on local storage
    }

  }

  login(email : any, password : any){
    this.authService.signInWithEmailAndPassword(email,password).then(logRef => {
      this.toastr.success('Logeed In Successfully');
      this.loadUser();
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      this.router.navigate(['/'])
    }).catch(error => {
      this.toastr.warning(error);
    })
  }

  loadUser() {
    this.authService.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedIn.next(true); // Update BehaviorSubject only if user exists
      } else {
        localStorage.removeItem('user');
        this.loggedIn.next(false);
      }
    })
  }

  logout(){
    this.authService.signOut().then(() => {
      this.toastr.success('User Logged Out Successfully');
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard =false;
      this.router.navigate(['/login']);
    })
  }

  isLoggedIn(){
    return this.loggedIn.asObservable();
  }


}
