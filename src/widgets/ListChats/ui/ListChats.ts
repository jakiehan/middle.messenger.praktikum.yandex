import templateListChats from './ListChats.hbs?raw';
import { ListChatsHeader } from './ListChatsHeader/ListChatsHeader';
import { ListChatsItem } from './ListChatsItem/ListChatsItem';
import { listChats } from '@/widgets/ListChats/lib/mock';
import { CONTAINER_ID } from '@/pages/Main/constants/constanst';
import { Component } from '@/shared/lib';
import { cn } from '@/shared/lib';
import cls from './ListChats.module.scss';

interface ListChatsProps {
  className?: string;
}

export class ListChats extends Component {
  constructor(props?: ListChatsProps) {
    super({
      ...props,
      className: cn(cls.listChats, [props?.className]),
      header: new ListChatsHeader({}),
      list: listChats.map(
        (item) => new ListChatsItem({ ...item, className: cls.item })
      ),
    });
  }

  render() {
    return this.compile(templateListChats, {
      classList: cls.list,
      id: CONTAINER_ID.LIST_CHATS,
    });
  }
}
