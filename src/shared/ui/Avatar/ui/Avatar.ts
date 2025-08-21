import templateAvatar from './Avatar.hbs?raw';
import { Component } from '../../../lib';
import { cn } from '../../../lib';
import cls from './Avatar.module.scss';

type Size = 'sizeS' | 'sizeM' | 'sizeL';

interface AvatarProps {
  src: string;
  alt: string;
  size?: Size;
  className?: string;
}

export class Avatar extends Component {
  constructor(props: AvatarProps) {
    super({
      ...props,
      className: cn(cls.avatar, [
        props?.size ? cls[props.size] : cls.sizeM,
        props.className,
      ]),
    });
  }

  render() {
    return this.compile(templateAvatar, {
      ...this.props,
    });
  }
}
