
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api-service.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Router } from '@angular/router';
// import { StoreService } from '../../store/store.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public signUpForm: FormGroup;
  formErrors: any = {};
  error: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator // Add the custom validator to the form group
    });
    this.signUpForm.get('password').valueChanges.subscribe(() => {
      this.signUpForm.get('password2').updateValueAndValidity(); // Trigger validation for password2 control
    });
  
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password');
    const password2 = form.get('password2');
  
    if (password && password2 && password.value !== password2.value) {
      return { passwordMismatch: true };
    }
  
    return null;
  }
  
  handleSubmit(): void {
    if (this.signUpForm.invalid) {
      this.validateAllFormFields();
      return;
    }

    const user = this.signUpForm.value;
    this.apiService.post('/auth/register', user)
      .subscribe(
        (data) => {
          this.error = null;
          this.dataService.user$.next(data.user);
          localStorage.setItem('token', data.token);
          this.router.navigate(['/']);
        },
        (error) => {
          this.error = error;
        }
      );
  }

  validateAllFormFields(): void {
    Object.keys(this.signUpForm.controls).forEach((field) => {
      const control :any = this.signUpForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  errorClass(controlName: string): string {
    const control = this.signUpForm.get(controlName);
    return control && control.invalid && control.touched ? 'is-invalid' : '';
  }
}
