import templateFormAuth from './FormAuth.hbs?raw';
import { Link } from '../../Link';
import { Text } from '../../Text';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { Component } from '@/shared/lib';
import { cn } from '@/shared/lib';
import cls from './FormAuth.module.scss';

interface FormAuthProps {
  name: string;
  buttonText: string;
  linkText: string;
  linkHref: string;
  title: string;
  onSubmit: (e: FormDataEvent) => void;
  fields: Input[];
  className?: string;
}

export class FormAuth extends Component {
  constructor(props: FormAuthProps) {
    super({
      ...props,
      className: cn(cls.formAuth, [props.className]),
      title: new Text({
        tag: 'h3',
        text: props.title,
        fontWeight: 'normal',
        size: 'sizeXL',
      }),

      button: new Button({
        text: props.buttonText,
        type: 'submit',
        id: 'submitAuth',
      }),

      link: new Link({
        text: props.linkText,
        href: props.linkHref,
      }),
    });
  }

  render() {
    return this.compile(templateFormAuth, {
      controlsClass: cls.controls,
      ...this.props,
    });
  }
}
