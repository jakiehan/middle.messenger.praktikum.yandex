import Handlebars from 'handlebars';
import templateError from './Error.hbs?raw';
import { ReserveInfo } from '@/widgets/ReserveInfo';
import cls from './Error.module.scss';

export class Error {
  private readonly template: HandlebarsTemplateDelegate;
  private content: ReserveInfo;

  constructor() {
    this.template = Handlebars.compile(templateError);

    this.content = new ReserveInfo({
      title: '500',
      text: 'Мы уже фиксим',
    });
  }

  registerPartial() {
    this.content.registerPartial();
    Handlebars.registerPartial('Error', templateError);
  }

  render(): string {
    return this.template({
      classes: cls.error,
      content: this.content.render(),
    });
  }
}
