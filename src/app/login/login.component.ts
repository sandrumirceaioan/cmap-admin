import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submit: boolean = false;
  formChange: Subscription;
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formChange = this.loginForm.valueChanges.subscribe((something) => {
      this.submit = (this.loginForm.controls.username.value && this.loginForm.controls.username.valid && this.loginForm.controls.password.value) ? true : false;
    });
  }

  login() {
    let params = { username: this.loginForm.controls.username.value, password: this.loginForm.controls.password.value };
    this.authService.login(params).subscribe(
      (result) => {
        this.router.navigate(['/']);
        this.toastr.success(`Welcome ${result.firstName}!`);
      },
      (error) => {
        this.toastr.error(error.error);
        this.router.navigate(['/login']);
      }
    );
  }

}
