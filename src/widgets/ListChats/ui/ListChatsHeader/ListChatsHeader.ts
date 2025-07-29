import Handlebars from 'handlebars';
import templateListChatsHeader from './ListChatsHeader.hbs?raw';
import { getRouteProfile } from '@/app/router/constants/routes.ts';
import { Link } from '@/shared/ui/Link';
import { FormSearch } from '@/shared/ui/FormSearch';
import { cn } from '@/shared/lib/cn/cn';
import cls from './ListChatsHeader.module.scss';

interface ListChatsHeaderProps {
  className?: string;
}

export class ListChatsHeader {
  public props: ListChatsHeaderProps;
  private readonly template: HandlebarsTemplateDelegate;
  private readonly link: Link;
  private readonly formSearch: FormSearch;

  constructor(props: ListChatsHeaderProps) {
    this.props = { ...props };
    this.template = Handlebars.compile(templateListChatsHeader);

    this.link = new Link({
      text: 'Профиль >',
      href: getRouteProfile('5678'),
      className: cls.link,
    });

    this.formSearch = new FormSearch({
      name: 'formSearch',
      placeholder: 'Поиск',
    });
  }

  registerPartial() {
    this.link.registerPartial();
    this.formSearch.registerPartial();
    Handlebars.registerPartial('ListChatsHeader', templateListChatsHeader);
  }

  render() {
    const classes = cn(cls.listChatsHeader, [this.props.className]);

    return this.template({
      classes,
      formSearch: this.formSearch.render(),
      link: this.link.render(),
    });
  }
}
