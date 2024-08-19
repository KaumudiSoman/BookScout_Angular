import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { UtilService } from 'src/app/_services/util.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(public authService: AuthService, private router: Router, private toastrService: ToastrService) { }

  logout() {
    this.authService.logout().subscribe({
      next: () => {this.router.navigateByUrl('')},
      error: err => {this.toastrService.error(err.message)}
    })
    // console.log('hello');
  }
}
