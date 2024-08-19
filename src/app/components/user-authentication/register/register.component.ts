import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    })
  }

  checkBoxValidation(): ValidatorFn {
    return (control: AbstractControl) => {
      console.log(control.value)
      return control.value ? null : {notChecked : true}
    }
  }

  markCheckboxTouched() {
    const checkBoxControl = this.registerForm.get('checkBox');
    if (checkBoxControl) {
      checkBoxControl.markAsTouched();
    }
  }

  register() {
    const formValue = this.registerForm.value;
    
    // this.authService.register(String(formValue.email), String(formValue.password));
    this.authService.register(String(formValue.email), String(formValue.password), String(formValue.userName)).subscribe({
      next: () => {this.router.navigateByUrl('')},
      error: err => {this.toastrService.error(err.message)}
    })
  }

  goBack() {
    this.router.navigateByUrl('');
  }
}
