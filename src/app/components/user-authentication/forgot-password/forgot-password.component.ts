import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm : FormGroup = new FormGroup({}); 

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.forgotPasswordForm = this.fb.group ({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  forgotPassword() {
    const email = String(this.forgotPasswordForm.value.email);
    this.authService.forgotPassword(email).subscribe({
      next: () => {this.router.navigateByUrl('verify-email')},
      error: err => {alert(err.message)}
    })
  }
}
