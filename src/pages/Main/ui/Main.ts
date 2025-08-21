import templateMain from './Main.hbs?raw';
import { Text } from '@/shared/ui/Text';
import { Component } from '@/shared/lib';
import { CONTAINER_ID } from '../constants/constanst';
import cls from './Main.module.scss';

export class Main extends Component {
  constructor() {
    super({
      className: cls.main,
      text: new Text({
        tag: 'p',
        text: 'Выберите чат чтобы отправить сообщение',
        size: 'sizeM',
        fontWeight: 'normal',
        className: cls.text,
      }),
    });
  }

  render() {
    return this.compile(templateMain, {
      chatId: CONTAINER_ID.CHAT,
    });
  }
}
