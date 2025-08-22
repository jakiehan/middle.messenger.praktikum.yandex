import templateLink from './Link.hbs?raw';
import { Component } from '../../../lib';
import { cn } from '../../../lib';
import cls from './Link.module.scss';

interface LinkProps {
  text: string;
  href: string;
  className?: string;
}

export class Link extends Component {
  constructor(props: LinkProps) {
    super({ ...props, className: cn(cls.link, [props.className]) });
  }

  render() {
    return this.compile(templateLink, { ...this.props });
  }
}
