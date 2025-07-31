import Handlebars from 'handlebars';
import templateListChats from './ListChats.hbs?raw';
import { ListChatsHeader } from './ListChatsHeader/ListChatsHeader.ts';
import { ListChatsItem } from './ListChatsItem/ListChatsItem.ts';
import { listChats } from '@/widgets/ListChats/lib/mock.ts';
import { CONTAINER_ID } from '@/pages/Main/constants/constanst.ts';
import { cn } from '@/shared/lib/cn/cn';
import cls from './ListChats.module.scss';

interface ListChatsProps {
  onChatSelect: (chatId: string) => void;
  className?: string;
}

export class ListChats {
  public props: ListChatsProps;
  private readonly template: HandlebarsTemplateDelegate;
  private readonly header: ListChatsHeader;

  private clickContainer: Element | null = null;
  private clickHandler: ((e: Event) => void) | null = null;

  constructor(props: ListChatsProps) {
    this.props = { ...props };
    this.template = Handlebars.compile(templateListChats);

    this.header = new ListChatsHeader({});
  }

  registerPartial() {
    Handlebars.registerPartial('ListChats', templateListChats);
    this.header.registerPartial();
  }

  render(): string {
    const classes = cn(cls.listChats, [this.props.className]);

    return this.template({
      classes,
      classList: cls.list,
      header: this.header.render(),
      id: CONTAINER_ID.LIST_CHATS,
      list: listChats.map((item) =>
        new ListChatsItem({ ...item, className: cls.item }).render()
      ),
    });
  }

  mount() {
    const container = document.querySelector(`#${CONTAINER_ID.LIST_CHATS}`);
    if (!container) return;

    const handler = (e: Event) => {
      const target = (e.target as HTMLElement).closest(
        `#${CONTAINER_ID.LIST_CHAT_ITEM}`
      );

      if (target) {
        const id = target.getAttribute('data-id');

        if (id) {
          this.props.onChatSelect(id);
        }
      }
    };

    container.addEventListener('click', handler);

    this.clickContainer = container;
    this.clickHandler = handler;
  }

  destroy() {
    if (this.clickContainer && this.clickHandler) {
      this.clickContainer.removeEventListener('click', this.clickHandler);
    }

    this.clickContainer = null;
    this.clickHandler = null;
  }
}
