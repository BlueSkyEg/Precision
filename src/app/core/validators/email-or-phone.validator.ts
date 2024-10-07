import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function EmailOrPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Email regex
    const emailRegex = /^[\w._-]+@([\w-]+\.)+[\w-]{2,4}$/;

    const phoneRegex = /^01[0125][0-9]{8}$/;

    if (value) {
      const isEmail = emailRegex.test(value);
      const isPhone = phoneRegex.test(value);

      if (!isEmail && !isPhone) {
        return { pattern: 'Please enter a valid email or phone number.' };
      }
    }

    return null;
  };
}
