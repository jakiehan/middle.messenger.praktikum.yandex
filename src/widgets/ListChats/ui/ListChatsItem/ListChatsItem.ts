import templateListChatsItem from './ListChatsItem.hbs?raw';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import { Badge } from '@/shared/ui/Badge';
import { Component } from '@/shared/lib';
import { getRouteChat } from '@/app/router/constants/routes';
import { router } from '@/app/router';
import { getParams } from '@/app/router/lib/parseRoute';
import { CONTAINER_ID } from '@/pages/Main/constants/constanst';
import { cn } from '@/shared/lib';
import cls from './ListChatsItem.module.scss';

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

export class ListChatsItem extends Component {
  constructor(props: ListChatsItemProps) {
    super({
      ...props,
      className: cn(cls.listChatsItem, [props.className]),
      onClick: () => this.handleClick(),
      avatar: new Avatar({
        size: 'sizeM',
        src: props.src,
        alt: props.alt,
      }),

      title: new Text({
        tag: 'p',
        text: props.title,
        fontWeight: 'bold',
        size: 'sizeM',
      }),

      date: new Text({
        tag: 'p',
        text: props.date,
        fontWeight: 'normal',
        size: 'sizeXS',
        className: cn(cls.date, [cls.text]),
      }),

      message: new Text({
        tag: 'p',
        text: props.message,
        fontWeight: 'normal',
        size: 'sizeS',
        lineClampCount: 2,
        beginning: props.hasLastMessageUser ? 'Вы:' : undefined,
        className: cls.text,
      }),

      badge: props.newMessageCount
        ? new Badge({
            value: props?.newMessageCount ?? '',
          })
        : null,
    });
  }

  public handleClick = () => {
    const chatId = String(this.props.id);

    const currentParams = getParams(
      window.location.pathname,
      getRouteChat(':id')
    );

    if (currentParams?.['id'] === chatId) return;

    router.navigate(getRouteChat(chatId));
  };

  render() {
    return this.compile(templateListChatsItem, {
      classRight: cls.right,
      classLeft: cls.left,
      id: CONTAINER_ID.LIST_CHAT_ITEM,
      dataId: this.props.id,
    });
  }
}
