import templateError from './Error.hbs?raw';
import { ReserveInfo } from '@/widgets/ReserveInfo';
import { Component } from '@/shared/lib';
import cls from './Error.module.scss';

export class Error extends Component {
  constructor() {
    super({
      className: cls.error,
      content: new ReserveInfo({ title: '500', text: 'Мы уже фиксим' }),
    });
  }

  render() {
    return this.compile(templateError);
  }
}
