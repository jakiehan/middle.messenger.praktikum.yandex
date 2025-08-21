import ChatLayoutTemplate from './ChatLayout.hbs?raw';
import { Component } from '@/shared/lib';
import { ListChats } from '@/widgets/ListChats';
import cls from './ChatLayout.module.scss';

interface ChatLayoutProps {
  content: Component;
}

export class ChatLayout extends Component {
  constructor(props: ChatLayoutProps) {
    super({
      className: cls.chatLayout,
      sidebar: new ListChats(),
      content: props.content,
    });
  }

  render() {
    return this.compile(ChatLayoutTemplate, this.props);
  }

  protected componentDidMount(): void {
    if (this._children.content) {
      this.setSlot('content', this.children.content as Component);
    }
  }
}
