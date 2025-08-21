import templateRegistration from './Registration.hbs?raw';
import { getRouteLogin } from '@/app/router/constants/routes';
import { FormAuth } from '@/shared/ui/FormAuth';
import { Input } from '@/shared/ui/Input';
import { Component } from '@/shared/lib';
import { sendFormData } from '@/shared/lib';
import cls from './Registration.module.scss';

export class Registration extends Component {
  constructor() {
    super({
      className: cls.registration,
      content: new FormAuth({
        name: 'registration',
        buttonText: 'Зарегистрироваться',
        linkText: 'Войти',
        linkHref: getRouteLogin(),
        title: 'Регистрация',
        onSubmit: sendFormData,
        fields: [
          new Input({ name: 'email', label: 'Почта', type: 'email' }),
          new Input({
            name: 'login',
            label: 'Логин',
          }),
          new Input({
            name: 'first_name',
            label: 'Имя',
          }),
          new Input({
            name: 'second_name',
            label: 'Фамилия',
          }),
          new Input({
            name: 'phone',
            label: 'Телефон',
          }),
          new Input({
            name: 'password',
            label: 'Пароль',
            type: 'password',
          }),
          new Input({
            name: 'password_repeat',
            label: 'Пароль (еще раз)',
            type: 'password',
          }),
        ],
      }),
    });
  }

  render() {
    return this.compile(templateRegistration);
  }
}
