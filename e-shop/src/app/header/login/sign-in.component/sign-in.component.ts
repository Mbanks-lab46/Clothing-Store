import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit{
  signInForm!: FormGroup;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {

  }

  ngOnInit(): void {
    this.signInForm = this._fb.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.signInForm.setErrors(null);
    const username = this.signInForm.controls['username'].value;
    const password = this.signInForm.controls['password'].value;
    console.log(username, password);
    this._authService.login(username, password).subscribe({
       next: () => {
        this._router.navigate(['/products']);
      },
        error: () => {
          this._authService.logout();
          this.signInForm.setErrors({ invalidLogin: true });
        }
      });
  }

}
