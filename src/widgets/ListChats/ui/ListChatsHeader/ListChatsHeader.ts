import templateListChatsHeader from './ListChatsHeader.hbs?raw';
import { getRouteProfile } from '@/app/router/constants/routes';
import { Link } from '@/shared/ui/Link';
import { FormSearch } from '@/shared/ui/FormSearch';
import { Component } from '@/shared/lib';
import { cn } from '@/shared/lib';
import cls from './ListChatsHeader.module.scss';

interface ListChatsHeaderProps {
  className?: string;
}

export class ListChatsHeader extends Component {
  constructor(props: ListChatsHeaderProps) {
    super({
      ...props,
      className: cn(cls.listChatsHeader, [props.className]),
      link: new Link({
        text: 'Профиль >',
        href: getRouteProfile('5678'),
        className: cls.link,
      }),
      formSearch: new FormSearch({
        name: 'formSearch',
        placeholder: 'Поиск',
      }),
    });
  }

  render() {
    return this.compile(templateListChatsHeader);
  }
}
