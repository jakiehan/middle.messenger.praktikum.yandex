import Handlebars from 'handlebars';
import templateListChatsItem from './ListChatsItem.hbs?raw';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import { Badge } from '@/shared/ui/Badge';
import { cn } from '@/shared/lib/cn/cn';
import cls from './ListChatsItem.module.scss';
import { CONTAINER_ID } from '@/pages/Main/constants/constanst.ts';

interface ListChatsItemProps {
  id: number;
  src: string;
  alt: string;
  title: string;
  message: string;
  date: string;
  hasLastMessageUser?: boolean;
  newMessageCount?: number;
  className?: string;
}

export class ListChatsItem {
  public props: ListChatsItemProps;
  private readonly template: HandlebarsTemplateDelegate;
  private readonly avatar: Avatar;
  private readonly message: Text;
  private readonly title: Text;
  private readonly date: Text;
  private readonly badge: Badge;

  constructor(props: ListChatsItemProps) {
    this.props = { ...props };
    this.template = Handlebars.compile(templateListChatsItem);

    this.avatar = new Avatar({
      size: 'sizeM',
      src: this.props.src,
      alt: this.props.alt,
    });

    this.title = new Text({
      tag: 'p',
      text: this.props.title,
      fontWeight: 'bold',
      size: 'sizeM',
    });

    this.date = new Text({
      tag: 'p',
      text: this.props.date,
      fontWeight: 'normal',
      size: 'sizeXS',
      className: cn(cls.date, [cls.text]),
    });

    this.message = new Text({
      tag: 'p',
      text: this.props.message,
      fontWeight: 'normal',
      size: 'sizeS',
      lineClampCount: 2,
      beginning: this.props.hasLastMessageUser ? 'Вы:' : undefined,
      className: cls.text,
    });

    this.badge = new Badge({
      value: this.props?.newMessageCount ?? '',
    });
  }

  registerPartial() {
    this.avatar.registerPartial();
    this.message.registerPartial();
    this.title.registerPartial();
    this.date.registerPartial();
    this.badge.registerPartial();
    Handlebars.registerPartial('ListChatsItem', templateListChatsItem);
  }

  render() {
    const classes = cn(cls.listChatsItem, [this.props.className]);

    return this.template({
      classes,
      classRight: cls.right,
      classLeft: cls.left,
      id: CONTAINER_ID.LIST_CHAT_ITEM,
      dataId: this.props.id,
      avatar: this.avatar.render(),
      title: this.title.render(),
      message: this.message.render(),
      date: this.date.render(),
      badge: this.props.newMessageCount ? this.badge.render() : null,
    });
  }
}
