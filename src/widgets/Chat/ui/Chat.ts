import Handlebars from 'handlebars';
import templateChat from './Chat.hbs?raw';
import { cn } from '@/shared/lib/cn/cn';
import cls from './Chat.module.scss';

interface ChatProps {
  chatId?: string;
  className?: string;
}

export class Chat {
  public props: ChatProps;
  private readonly template: HandlebarsTemplateDelegate;

  constructor(props: ChatProps) {
    this.props = props;
    this.template = Handlebars.compile(templateChat);
  }

  registerPartial() {
    Handlebars.registerPartial('Chat', templateChat);
  }

  render() {
    const classes = cn(cls.chat, [this.props.className]);

    const chat = `Это чат с id - ${this.props.chatId}`;

    return this.template({
      classes,
      chat,
    });
  }
}
