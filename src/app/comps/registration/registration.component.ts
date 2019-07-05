import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  newRegistrationForm: FormGroup;
  step2 = false;
  step1 = false;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  showeForm: boolean = false;

  ngOnInit() {
    this.newRegistrationForm = this.formBuilder.group({
      ID: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      password2: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', Validators.required],
      street: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    }, {
        validator: MustMatch('password', 'password2')
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.newRegistrationForm.controls;
  }

  checkFieldValidation() {
    const controlers = this.newRegistrationForm.value;
    if (controlers.ID === "" ||
      controlers.username === "" ||
      controlers.password === "" ||
      controlers.password2 === "" ||
      (controlers.password !== controlers.password2) ||
      ((this.newRegistrationForm.controls.username.errors || {}).email)) {
      return true;
    }
    return false;
  }

  showNextForm() {
    this.step1 = true;

    const ID = this.newRegistrationForm.value.ID;

    // 1. ID does not exist in system
    this.userService.checkIfUserAlreadyExist(ID).subscribe(data => {
      if (data.code === 200) {
        // user does not exist

        // 2. all required fields are not filled and email is valid
        if (this.checkFieldValidation()) {
          alert('all required fields should be filled');
          return;
        }
        this.showeForm = true;
      } else {
        // user exist
        alert('this user already exist in the system');
        return;
      }
    });
  }

  sendForm() {
    this.step2 = true;
    // stop here if form is invalid
    if (this.newRegistrationForm.invalid) {
      return;
    }
    this.userService.addNewUser(this.newRegistrationForm.value).subscribe(data => {
      if (data.Erorr) {
        alert(data.Erorr);
      } else {
        localStorage.setItem('userInfo', JSON.stringify(data)); //נשמר היוזר על מפתח יוזראינפו בלוקאלסטוראג
        this.userService.userInfoEE.emit(data);
        this.router.navigate(['/']);
      }
    });
  }

}
