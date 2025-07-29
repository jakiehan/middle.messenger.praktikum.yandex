import Handlebars from 'handlebars';
import templateAvatar from './Avatar.hbs?raw';
import { cn } from '../../../lib/cn/cn.ts';
import cls from './Avatar.module.scss';

type Size = 'sizeS' | 'sizeM' | 'sizeL';

interface AvatarProps {
  src: string;
  alt: string;
  size?: Size;
  className?: string;
}

export class Avatar {
  public props: AvatarProps;
  private readonly template: HandlebarsTemplateDelegate;

  constructor(props: AvatarProps) {
    this.props = { ...props };
    this.template = Handlebars.compile(templateAvatar);
  }

  registerPartial() {
    Handlebars.registerPartial('Avatar', templateAvatar);
  }

  render() {
    const classes = cn(cls.avatar, [
      this.props?.size ? cls[this.props.size] : cls.sizeM,
      this.props.className,
    ]);

    return this.template({
      classes,
      src: this.props.src,
      alt: this.props.alt,
    });
  }
}
