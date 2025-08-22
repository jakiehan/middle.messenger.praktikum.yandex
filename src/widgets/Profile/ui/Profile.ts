import templateProfile from './Profile.hbs?raw';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { FormProfile } from '@/shared/ui/FormProfile';
import { Component } from '@/shared/lib';
import { cn } from '@/shared/lib/cn/cn';
import cls from './Profile.module.scss';

interface ProfileProps {
  className?: string;
}

export class Profile extends Component {
  constructor(props: ProfileProps) {
    super({
      ...props,
      className: cn(cls.profile, [props.className]),
      avatar: new Avatar({
        size: 'sizeL',
        src: 'https://images.unsplash.com/photo-1649000313856-7360316a546c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Аватар',
      }),
      userName: new Text({
        tag: 'h3',
        size: 'sizeL',
        fontWeight: 'bold',
        text: 'Михаил',
      }),
      profileForm: new FormProfile({
        name: 'profileForm',
      }),
    });
  }

  render() {
    return this.compile(templateProfile, {
      classAvatarName: cls.wrapper,
    });
  }
}
