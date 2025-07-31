import Handlebars from 'handlebars';
import templateRegistration from './Registration.hbs?raw';
import { getRouteLogin } from '@/app/router/constants/routes.ts';
import { FormAuth } from '@/shared/ui/FormAuth';
import { Input } from '@/shared/ui/Input';
import cls from './Registration.module.scss';

export class Registration {
  private readonly template: HandlebarsTemplateDelegate;
  private content: FormAuth;

  constructor() {
    this.template = Handlebars.compile(templateRegistration);

    this.content = new FormAuth({
      name: 'registration',
      buttonText: 'Зарегистрироваться',
      linkText: 'Войти',
      linkHref: getRouteLogin(),
      title: 'Регистрация',
      onSubmit: () => console.log('submit'),
      children: [
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
    });
  }

  registerPartial() {
    Handlebars.registerPartial('Registration', templateRegistration);
    this.content.registerPartial();
  }

  render(): string {
    return this.template({
      classes: cls.registration,
      content: this.content.render(),
    });
  }

  destroy() {
    this.content?.destroy();
  }

  mount() {
    this.content?.mount();
  }
}
