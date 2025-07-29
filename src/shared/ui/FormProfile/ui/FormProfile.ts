import Handlebars from 'handlebars';
import templateFormProfile from './FormProfile.hbs?raw';
import { Input } from '../../Input';
import { cn } from '../../../lib/cn/cn.ts';
import cls from './FormProfile.module.scss';

interface FormProfileProps {
  name: string;
  className?: string;
}

export class FormProfile {
  public props: FormProfileProps;
  private readonly template: HandlebarsTemplateDelegate;
  private readonly children: Input[];

  constructor(props: FormProfileProps) {
    this.props = { ...props };
    this.template = Handlebars.compile(templateFormProfile);

    this.children = [
      new Input({
        name: 'email',
        label: 'Почта',
        type: 'email',
        variant: 'secondary',
        value: 'pochta@yandex.ru',
      }),
      new Input({
        name: 'login',
        label: 'Логин',
        type: 'text',
        variant: 'secondary',
        value: 'ivanivanov',
      }),
      new Input({
        name: 'first_name',
        label: 'Имя',
        type: 'text',
        variant: 'secondary',
        value: 'Михаил',
      }),
      new Input({
        name: 'second_name',
        label: 'Фамилия',
        type: 'text',
        variant: 'secondary',
        value: 'Олейник',
      }),
      new Input({
        name: 'display_name',
        label: 'Имя в чате',
        type: 'text',
        variant: 'secondary',
        value: 'Михаил',
      }),
      new Input({
        name: 'phone',
        label: 'Телефон',
        type: 'text',
        variant: 'secondary',
        value: '+7 (909) 967 30 30',
      }),
    ];
  }

  registerPartial() {
    Handlebars.registerPartial('FormProfile', templateFormProfile);

    this.children.forEach((input) => input.registerPartial());
  }

  render() {
    const classes = cn(cls.formProfile, [this.props.className]);

    return this.template({
      classes,
      classFormList: cls.formList,
      name: this.props.name,
      inputs: this.children.map((input) => input.render()),
    });
  }
}
