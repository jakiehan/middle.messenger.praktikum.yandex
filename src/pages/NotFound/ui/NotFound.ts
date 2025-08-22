import templateNotFound from './NotFound.hbs?raw';
import { ReserveInfo } from '@/widgets/ReserveInfo';
import { Component } from '@/shared/lib';
import cls from './NotFound.module.scss';

export class NotFound extends Component {
  constructor() {
    super({
      className: cls.notFound,
      content: new ReserveInfo({
        title: '404',
        text: 'Не туда попали',
      }),
    });
  }

  render() {
    return this.compile(templateNotFound, {});
  }
}
