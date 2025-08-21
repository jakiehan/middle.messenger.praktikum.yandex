import templateReserveInfo from './ReserveInfo.hbs?raw';
import { Component } from '@/shared/lib';
import { getRouteMain } from '@/app/router/constants/routes';
import { Link } from '@/shared/ui/Link';
import { Text } from '@/shared/ui/Text';
import { cn } from '@/shared/lib';
import cls from './ReserveInfo.module.scss';

interface ReserveInfoProps {
  title: string;
  text: string;
  className?: string;
}

export class ReserveInfo extends Component {
  constructor(props: ReserveInfoProps) {
    super({
      ...props,
      className: cn(cls.reserveInfo, [props.className]),
      title: new Text({
        tag: 'h1',
        text: props.title,
        fontWeight: 'normal',
        size: 'sizeXXL',
      }),
      text: new Text({
        tag: 'p',
        text: props.text,
        fontWeight: 'normal',
        size: 'sizeXL',
      }),
      link: new Link({
        text: 'Назад к чатам',
        href: getRouteMain(),
      }),
    });
  }

  render() {
    return this.compile(templateReserveInfo, {
      classInfo: cls.info,
    });
  }
}
