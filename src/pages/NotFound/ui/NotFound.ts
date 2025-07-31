import Handlebars from 'handlebars';
import templateNotFound from './NotFound.hbs?raw';
import { ReserveInfo } from '@/widgets/ReserveInfo';
import cls from './NotFound.module.scss';

export class NotFound {
  private readonly template: HandlebarsTemplateDelegate;
  private content: ReserveInfo;

  constructor() {
    this.template = Handlebars.compile(templateNotFound);

    this.content = new ReserveInfo({
      title: '404',
      text: 'Не туда попали',
    });
  }

  registerPartial() {
    this.content.registerPartial();
    Handlebars.registerPartial('NotFound', templateNotFound);
  }

  render(): string {
    return this.template({
      classes: cls.notFound,
      content: this.content.render(),
    });
  }
}
