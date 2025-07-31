import Handlebars from 'handlebars';
import templateAuthorization from './Authorization.hbs?raw';
import { router } from '@/app/router';
import { FormAuth } from '@/shared/ui/FormAuth';
import { Input } from '@/shared/ui/Input';
import {
  getRouteMain,
  getRouteRegistration,
} from '@/app/router/constants/routes.ts';
import cls from './Authorization.module.scss';

export class Authorization {
  private readonly template: HandlebarsTemplateDelegate;
  private content: FormAuth;

  constructor() {
    this.template = Handlebars.compile(templateAuthorization);

    this.content = new FormAuth({
      name: 'authorization',
      buttonText: 'Войти',
      linkText: 'Нет аккаунта?',
      linkHref: getRouteRegistration(),
      title: 'Вход',
      onSubmit: () => router.navigate(getRouteMain()),
      children: [
        new Input({ name: 'login', label: 'Логин' }),
        new Input({
          name: 'password',
          label: 'Пароль',
          type: 'password',
        }),
      ],
    });
  }

  registerPartial() {
    Handlebars.registerPartial('Authorization', templateAuthorization);
    this.content.registerPartial();
  }

  render(): string {
    return this.template({
      classes: cls.authorization,
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
