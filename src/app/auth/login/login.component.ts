import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { UserService } from 'src/app/services/user.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn?: ElementRef;

  public formSubmitted = false;

  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) {

    this.loginForm = this.fb.group({
      email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });

  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "90874399204-qpdpobsf1t50rqigjlng71q504kvhpbt.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    // console.log("Encoded JWT ID token: " + response.credential);
    this.userService.loginWithGoogle(response.credential)
      .subscribe(resp => {
        this.ngZone.run(()=>{
          this.router.navigateByUrl('/');
        })
      });
  }

  login() {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value)
      .subscribe(resp => {
        
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/');

      }, (err) => 
        Swal.fire('Error', err.error.msg, 'error')
      );
  }

  invalidField(field: string): boolean {

    if (this.loginForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
