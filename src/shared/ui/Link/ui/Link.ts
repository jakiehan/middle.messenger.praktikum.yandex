import Handlebars from 'handlebars';
import templateLink from './Link.hbs?raw';
import { cn } from '../../../lib/cn/cn.ts';
import cls from './Link.module.scss';

interface LinkProps {
  text: string;
  href: string;
  className?: string;
}

export class Link {
  public props: LinkProps;
  private readonly template: HandlebarsTemplateDelegate;

  constructor(props: LinkProps) {
    this.props = { ...props };
    this.template = Handlebars.compile(templateLink);
  }

  registerPartial() {
    Handlebars.registerPartial('Link', templateLink);
  }

  render() {
    const classes = cn(cls.link, [this.props.className]);

    return this.template({
      ...this.props,
      classes,
    });
  }
}
