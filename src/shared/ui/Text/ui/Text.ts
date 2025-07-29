import Handlebars from 'handlebars';
import templateText from './Text.hbs?raw';
import { cn } from '../../../lib/cn/cn.ts';
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

export class Text {
  public props: TextProps;
  private readonly template: HandlebarsTemplateDelegate;

  constructor(props: TextProps) {
    this.props = { ...props };
    this.template = Handlebars.compile(templateText);
  }

  registerPartial() {
    Handlebars.registerPartial('Text', templateText);
  }

  render() {
    const classes = cn(cls.text, [
      cls[this.props.fontWeight],
      cls[this.props.size],
      this.props.className,
    ]);

    return this.template({
      classes,
      classBeginning: cls.beginning,
      ...this.props,
    });
  }
}
