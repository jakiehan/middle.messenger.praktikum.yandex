import templateText from './Text.hbs?raw';
import { Component } from '../../../lib';
import { cn } from '../../../lib';
import cls from './Text.module.scss';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
type Size = 'sizeXS' | 'sizeS' | 'sizeM' | 'sizeL' | 'sizeXL' | 'sizeXXL';

interface TextProps {
  tag: Tag;
  size: Size;
  text: string;
  fontWeight: 'bold' | 'normal';
  beginning?: string;
  lineClampCount?: number;
  className?: string;
}

export class Text extends Component {
  constructor(props: TextProps) {
    super({
      ...props,
      className: cn(cls.text, [
        cls[props.fontWeight],
        cls[props.size],
        props.className,
      ]),
    });
  }

  render() {
    return this.compile(templateText, {
      classBeginning: cls.beginning,
      ...this.props,
    });
  }
}
