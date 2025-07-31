import Handlebars from 'handlebars';
import templateReserveInfo from './ReserveInfo.hbs?raw';
import { getRouteMain } from '@/app/router/constants/routes.ts';
import { Link } from '@/shared/ui/Link';
import { Text } from '@/shared/ui/Text';
import { cn } from '@/shared/lib/cn/cn';
import cls from './ReserveInfo.module.scss';

interface ReserveInfoProps {
  title: string;
  text: string;
  className?: string;
}

export class ReserveInfo {
  public props: ReserveInfoProps;
  private readonly template: HandlebarsTemplateDelegate;
  private readonly link: Link;
  private readonly text: Text;
  private readonly title: Text;

  constructor(props: ReserveInfoProps) {
    this.props = { ...props };
    this.template = Handlebars.compile(templateReserveInfo);

    this.link = new Link({
      text: 'Назад к чатам',
      href: getRouteMain(),
    });

    this.title = new Text({
      tag: 'h1',
      text: this.props.title,
      fontWeight: 'normal',
      size: 'sizeXXL',
    });

    this.text = new Text({
      tag: 'p',
      text: this.props.text,
      fontWeight: 'normal',
      size: 'sizeXL',
    });
  }

  registerPartial() {
    Handlebars.registerPartial('ReserveInfo', templateReserveInfo);
    this.link.registerPartial();
    this.text.registerPartial();
    this.title.registerPartial();
  }

  render(): string {
    const classes = cn(cls.reserveInfo, [this.props.className]);

    return this.template({
      classes,
      classInfo: cls.info,
      title: this.title.render(),
      text: this.text.render(),
      link: this.link.render(),
    });
  }
}
