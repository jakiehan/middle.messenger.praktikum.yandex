import templateFormSearch from './FormMessage.hbs?raw';
import { Component } from '@/shared/lib';
import { Input } from '../../Input';
import { Button } from '@/shared/ui/Button';
import { cn } from '../../../lib';
import cls from './FormMessage.module.scss';

interface FormMessageProps {
  name: string;
  placeholder?: string;
  className?: string;
  onSubmit?: (e: FormDataEvent) => void;
}

export class FormMessage extends Component {
  constructor(props: FormMessageProps) {
    super({
      ...props,
      className: cn(cls.formMessage, [props.className]),
      input: new Input({
        name: 'message',
        placeholder: props.placeholder,
        classNames: { input: cls.input },
      }),
      buttonSend: new Button({
        id: 'sendButton',
        text: '→',
        type: 'submit',
        className: cls.btn,
      }),
    });
  }

  render() {
    return this.compile(templateFormSearch, {
      name: this.props.name,
      placeholder: this.props.placeholder,
    });
  }
}
