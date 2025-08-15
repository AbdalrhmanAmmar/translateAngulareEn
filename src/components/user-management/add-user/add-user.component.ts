import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ButtonDirective,
  CardComponent,
  ColComponent,
  FormModule,
  RowComponent,
} from '@coreui/angular-pro';
import { IconDirective } from '@coreui/icons-angular';
import { cilEnvelopeOpen, cilLockLocked, cilPen, cilSave, cilShieldAlt, cilUser } from '@coreui/icons';
import { UsersService } from '../../../core/services/modules-services/users.service';
import { NotificationService } from '../../../core/services/helper-services/notification.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-user',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    RowComponent,
    ColComponent,
    FormModule,
    ButtonDirective,
    IconDirective,
    TranslateModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);

  icons = {
    cilPen,
    cilUser,
    cilEnvelopeOpen,
    cilLockLocked,
    cilShieldAlt,
    cilSave
  };

  form: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    userName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    role: [null, Validators.required]
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { confirmPassword, ...userData } = this.form.value;
    
    this.usersService.addUser(userData).subscribe({
      next: () => {
        NotificationService.fireNotification('تم إضافة المستخدم بنجاح');
        this.form.reset();
      },
      error: (err) => {
        console.error('Error adding user:', err);
      }
    });
  }
}