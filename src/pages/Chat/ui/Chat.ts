import templateChat from './Chat.hbs?raw';
import cls from './Chat.module.scss';
import { Component } from '@/shared/lib';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import { cn } from '@/shared/lib/cn/cn';
import { FormMessage } from '@/shared/ui/FormMessage';
import { sendFormData } from '@/shared/lib';
import type { ComponentProps } from '@/shared/lib/Component/Component';

interface ChatProps extends ComponentProps {
  id?: string;
}

export class Chat extends Component<ChatProps> {
  constructor(props: ChatProps) {
    super({
      ...props,
      className: cls.chat,
      chat: new Text({
        tag: 'h3',
        text: props.id ? `Чат #${props.id}` : 'Выберите чат',
        size: 'sizeXL',
        fontWeight: 'normal',
      }),
      name: new Text({
        tag: 'p',
        text: 'Наиля',
        size: 'sizeS',
        fontWeight: 'bold',
      }),
      avatar: new Avatar({
        size: 'sizeS',
        src: 'https://images.unsplash.com/photo-1652726692250-45965ba38a70?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Аватар',
      }),
      formMessage: new FormMessage({
        placeholder: 'Сообщение',
        name: 'formMessage',
        onSubmit: sendFormData,
      }),
    });
  }

  render() {
    return this.compile(templateChat, {
      classHeader: cls.chatHeader,
      classContent: cls.chatContent,
      classFooter: cls.chatFooter,
      classInfo: cls.info,
      classAttach: cn(cls.icon, [cls.attach]),
      classGroup: cn(cls.icon, [cls.group]),
    });
  }

  protected componentDidUpdate(oldProps: ChatProps, newProps: ChatProps) {
    return oldProps?.id !== newProps?.id;
  }
}
