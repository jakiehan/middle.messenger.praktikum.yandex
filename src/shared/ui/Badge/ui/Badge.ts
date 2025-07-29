import Handlebars from 'handlebars';
import templateBadge from './Badge.hbs?raw';
import { cn } from '../../../lib/cn/cn.ts';
import cls from './Badge.module.scss';

interface BadgeProps {
  value: string | number;
  className?: string;
}

export class Badge {
  public props: BadgeProps;
  private readonly template: HandlebarsTemplateDelegate;

  constructor(props: BadgeProps) {
    this.props = { ...props };
    this.template = Handlebars.compile(templateBadge);
  }

  registerPartial() {
    Handlebars.registerPartial('Badge', templateBadge);
  }

  render() {
    const classes = cn(cls.badge, [this.props.className]);

    return this.template({
      ...this.props,
      classes,
    });
  }
}
