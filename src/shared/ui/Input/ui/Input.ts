import Handlebars from 'handlebars';
import templateInput from './Input.hbs?raw';
import cls from './Input.module.scss';
import { cn } from '../../../lib/cn/cn.ts';

type classNameType = {
  label?: string;
  input?: string;
  span?: string;
};

interface InputProps {
  name: string;
  variant?: 'primary' | 'secondary';
  value?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  label?: string;
  className?: classNameType;
  disabled?: boolean;
}

export class Input {
  public props: InputProps;
  private readonly template: HandlebarsTemplateDelegate;

  constructor(props: InputProps) {
    this.props = { ...props };
    this.template = Handlebars.compile(templateInput);
  }

  registerPartial() {
    Handlebars.registerPartial('Input', templateInput);
  }

  render() {
    const isSecondary = this.props.variant === 'secondary';

    // Классы для элементов, с учетом variant и дополнительных классов из props
    const labelClass = cn(cls.label, [this.props.className?.label], {
      [cls.secondaryLabel]: isSecondary,
    });

    const inputClass = cn(cls.input, [this.props.className?.input], {
      [cls.secondaryInput]: isSecondary,
    });

    const spanClass = cn(cls.span, [this.props.className?.span], {
      [cls.secondarySpan]: isSecondary,
    });

    return this.template({
      ...this.props,
      labelClass,
      inputClass,
      spanClass,
    });
  }
}
