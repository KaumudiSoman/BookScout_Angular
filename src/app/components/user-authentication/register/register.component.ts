import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { UtilService } from 'src/app/_services/util.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});
  radioOptions = [
    {label: "Male", value: "Male"},
    {label: "Female", value: "Female"},
    {label: "Other", value: "Other"},
  ]

  selectOptions = [
    { value: '', label: 'Select marital status', isDisabled: true },
    { value: 'unmarried', label: 'Unmarried', isDisabled: false },
    { value: 'married', label: 'Married', isDisabled: false }
  ];

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      // userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      // maritalStatus: ['', Validators.required],
      // contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      // checkBox: [false, this.checkBoxValidation()],
      // gender: ['', Validators.required]
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
    this.authService.register(String(formValue.email), String(formValue.password)).subscribe({
      next: () => {this.router.navigateByUrl('login')},
      error: err => {alert(err.message)}
    })
  }

  goBack() {
    this.router.navigateByUrl('');
  }
}
