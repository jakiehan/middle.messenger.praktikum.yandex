import { Validator } from '../validator/validator';

export const sendFormData = (e: FormDataEvent) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  let isFormValid = true;

  formData.forEach((value, key) => {
    const { isValid, error } = Validator.validate(key, value.toString());

    Validator.setFieldError(key, error ?? '');

    if (!isValid) {
      isFormValid = false;
    }
  });

  if (isFormValid) {
    console.log('Данные формы:', Object.fromEntries(formData));
  }
};
