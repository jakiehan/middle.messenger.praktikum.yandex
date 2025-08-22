import templateBadge from './Badge.hbs?raw';
import { Component } from '@/shared/lib';
import { cn } from '../../../lib';
import cls from './Badge.module.scss';

interface BadgeProps {
  value: string | number;
  className?: string;
}

export class Badge extends Component {
  constructor(props: BadgeProps) {
    super({
      ...props,
      className: cn(cls.badge, [props.className]),
    });
  }

  render() {
    return this.compile(templateBadge, {
      ...this._props,
    });
  }
}
