import templateAuthorization from './Authorization.hbs?raw';
import { Component } from '@/shared/lib';
import { FormAuth } from '@/shared/ui/FormAuth';
import { Input } from '@/shared/ui/Input';
import { getRouteRegistration } from '@/app/router/constants/routes';
import { sendFormData } from '@/shared/lib';
import cls from './Authorization.module.scss';

export class Authorization extends Component {
  constructor() {
    super({
      className: cls.authorization,
      content: new FormAuth({
        name: 'authorization',
        buttonText: 'Войти',
        linkText: 'Нет аккаунта?',
        linkHref: getRouteRegistration(),
        title: 'Вход',
        onSubmit: sendFormData,
        fields: [
          new Input({ name: 'login', label: 'Логин' }),
          new Input({
            name: 'password',
            label: 'Пароль',
            type: 'password',
          }),
        ],
      }),
    });
  }

  render() {
    return this.compile(templateAuthorization, {
      ...this.props,
    });
  }
}
