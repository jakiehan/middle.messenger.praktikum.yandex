import templateFormProfile from './FormProfile.hbs?raw';
import { Component } from '../../../lib';
import { Input } from '../../Input';
import { cn } from '../../../lib';
import cls from './FormProfile.module.scss';

interface FormProfileProps {
  name: string;
  className?: string;
}

export class FormProfile extends Component {
  constructor(props: FormProfileProps) {
    super({
      ...props,
      className: cn(cls.formProfile, [props.className]),
      children: [
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
      ],
    });
  }

  render() {
    return this.compile(templateFormProfile, {
      classFormList: cls.formList,
      name: this._props.name,
    });
  }
}
