import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {

    this.registerForm = this.fb.group({
      name: ['Test Fernando', [Validators.required, Validators.minLength(2)]],
      email: ['test@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
      password2: ['123456', Validators.required],
      terms: [true, [Validators.required, Validators.requiredTrue]]
    }, {
      validators: this.samePasswords('password', 'password2')
    });

  }

  createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.invalid);

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.createUser(this.registerForm.value)
      .subscribe(resp => {
        console.log(resp);
      }, (err) => 
        Swal.fire('Error', err.error.msg, 'error')
      );
  }

  invalidField(field: string): boolean {

    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  // invalidPasswords(): boolean {
  //   const pass1 = this.registerForm.get('password')?.value;
  //   const pass2 = this.registerForm.get('password2')?.value;
    
  //   if ((pass1 !== pass2) && this.formSubmitted) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  samePasswords(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ notSame: true });
      }
    }
  }
}
