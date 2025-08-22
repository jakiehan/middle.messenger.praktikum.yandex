import templateButton from './Button.hbs?raw';
import { Component } from '@/shared/lib';
import { cn } from '../../../lib';
import cls from './Button.module.scss';

interface ButtonProps {
  text: string;
  id: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export class Button extends Component {
  constructor(props: ButtonProps) {
    super({
      ...props,
      className: cn(cls.button, [props.className]),
      onClick: () => props?.onClick?.(),
    });
  }

  render() {
    return this.compile(templateButton, {
      ...this._props,
    });
  }
}
