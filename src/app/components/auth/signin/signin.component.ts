import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ApiService} from '../../../shared/services/api-service.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  public signInForm: FormGroup;
  error: any = null;
  formErrors: { email: string, password: string } = { email: '', password: '' };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private dataService: DataService,
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  handleSubmit(): void {
    if (this.signInForm.invalid) {
      this.validateAllFormFields();
      return;
    }

    const { email, password } = this.signInForm.value;
    this.apiService.post('/auth/login', { email, password })
      .subscribe(
        (response: any) => {
          this.error = null;
          this.dataService.user$.next(response.user);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        },
        (error: any) => {
          this.error = 'Invalid credentials';
        }
      );
  }

  validateAllFormFields(): void {
    Object.keys(this.signInForm.controls).forEach(field => {
      const control :any = this.signInForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  isFieldInvalid(field: string): boolean {
    const control :any = this.signInForm.get(field);
    return control.invalid && (control.dirty || control.touched);
  }
}
