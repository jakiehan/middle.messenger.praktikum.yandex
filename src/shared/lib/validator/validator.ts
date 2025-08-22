export type ValidationResult = {
  isValid: boolean;
  error: string | null;
};

export class Validator {
  static rules = {
    first_name: /^[A-ZА-Я][a-zа-я-]*$/,
    second_name: /^[A-ZА-Я][a-zа-я-]*$/,
    login: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    password_repeat: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    phone: /^\+?\d{10,15}$/,
    message: /^[^<>]{1,500}$/,
  };

  static messages = {
    first_name: 'Только буквы, первая заглавная, допустим -',
    second_name: 'Только буквы, первая заглавная, допустим -',
    login: '3-20 символов, латиница, может содержать цифры, допустимы - и _',
    email: 'Неверный формат email, обязательно должна быть «собака» (@)',
    password: 'От 8 до 40 символов, минимум 1 заглавная буква и цифра',
    password_repeat: 'От 8 до 40 символов, минимум 1 заглавная буква и цифра',
    phone: 'Телефон от 10 до 15 цифр, может начинаться с +',
    message: 'Недопустимые символы',
  };

  static validate(field: string, value: string): ValidationResult {
    const rule = this.rules[field as keyof typeof this.rules];
    if (!rule) {
      return { isValid: true, error: null };
    }

    if (rule && value === '') {
      return { isValid: false, error: 'Заполните это поле' };
    }

    const isValid = rule.test(value);
    return {
      isValid,
      error: isValid
        ? null
        : this.messages[field as keyof typeof this.messages],
    };
  }

  static setFieldError(name: string, error?: string) {
    const errorField = document.querySelector<HTMLSpanElement>(
      `#${name}-error-message`
    );
    if (!errorField) return;

    if (error) {
      errorField.textContent = error;
      errorField.classList.add('input-error');
    } else {
      errorField.textContent = '';
      errorField.classList.remove('input-error');
    }
  }
}
