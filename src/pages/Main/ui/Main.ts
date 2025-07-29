import Handlebars from 'handlebars';
import templateMain from './Main.hbs?raw';
import { router } from '@/app/router';
import { getRouteChat, getRouteMain } from '@/app/router/constants/routes.ts';
import { getRouteByPath } from '@/app/router/lib/parseRoute.ts';
import { ListChats } from '@/widgets/ListChats';
import { Chat } from '@/widgets/Chat';
import { Text } from '@/shared/ui/Text';
import { CONTAINER_ID } from '../constants/constanst.ts';
import cls from './Main.module.scss';

export class Main {
  private readonly template: HandlebarsTemplateDelegate;
  private activeChatId: string | undefined;
  private listChats: ListChats;
  private chat: Chat | null;
  private text: Text;

  constructor() {
    this.template = Handlebars.compile(templateMain);

    this.listChats = new ListChats({
      onChatSelect: (chatId: string) => {
        if (this.activeChatId === chatId) {
          router.navigate(getRouteMain(), false);
          this.activeChatId = undefined;
          this.renderChat(null);
          return;
        }

        router.navigate(getRouteChat(chatId), false);
        this.renderChat(chatId);
        this.activeChatId = chatId;
      },
    });

    this.chat = new Chat({});

    this.text = new Text({
      tag: 'p',
      size: 'sizeS',
      fontWeight: 'normal',
      text: 'Выберите чат чтобы отправить сообщение',
      className: cls.emptyText,
    });

    window.addEventListener('popstate', () => {
      const { params: chatId } = getRouteByPath(window.location.pathname) ?? {};

      this.renderChat(chatId?.['id'] ?? null);
    });
  }

  registerPartial() {
    Handlebars.registerPartial('Main', templateMain);
  }

  render() {
    const { params: chatId } = getRouteByPath(window.location.pathname) ?? {};

    this.chat = chatId?.['id'] ? new Chat({ chatId: chatId['id'] }) : null;

    return this.template({
      classes: cls.main,
      classListChats: cls.listChats,
      classEmptyChat: cls.emptyChat,
      chatId: CONTAINER_ID.CHAT,
      listChatId: CONTAINER_ID.LIST_CHATS_CONTAINER,
      listChats: this.listChats.render(),
      chat: this.chat?.render(),
      text: this.text.render(),
    });
  }

  private renderChat(chatId: string | null) {
    const container = document.querySelector(`#${CONTAINER_ID.CHAT}`);
    if (!container) return;

    if (chatId) {
      this.chat = new Chat({ chatId });
      container.innerHTML = this.chat.render();
    } else {
      container.innerHTML = '';
      this.chat = null;
    }
  }

  mount() {
    this.listChats.mount();
  }

  destroy() {
    this.listChats.destroy();
  }
}
