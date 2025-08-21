import templateInput from './Input.hbs?raw';
import { Component } from '../../../lib';
import { Validator } from '../../../lib';
import type { ComponentProps } from '@/shared/lib';
import { cn } from '../../../lib';
import cls from './Input.module.scss';

type ClassNamesType = {
  label?: string;
  input?: string;
  span?: string;
};

interface InputProps extends ComponentProps {
  name: string;
  variant?: 'primary' | 'secondary';
  value?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  label?: string;
  classNames?: ClassNamesType;
  disabled?: boolean;
  error?: string | null;
}

export class Input extends Component<InputProps> {
  constructor(props: InputProps) {
    super({
      ...props,
      onFocusout: (e: FocusEvent) => {
        const { error } = Validator.validate(
          props.name,
          this.setInput(e).value
        );

        Validator.setFieldError(props.name, error ?? '');
      },
    });
  }

  private setInput(e: Event) {
    return e.target as HTMLInputElement;
  }

  render() {
    const isSecondary = this.props.variant === 'secondary';

    const labelClass = cn(cls.label, [this.props.classNames?.label ?? ''], {
      [cls.secondaryLabel]: isSecondary,
    });

    const inputClass = cn(cls.input, [this.props.classNames?.input], {
      [cls.secondaryInput]: isSecondary,
    });

    const spanClass = cn(cls.span, [this.props.classNames?.span], {
      [cls.secondarySpan]: isSecondary,
    });

    return this.compile(templateInput, {
      ...this.props,
      error: this.props.error,
      labelClass,
      inputClass,
      spanClass,
      errorClass: cls.error,
    });
  }
}
