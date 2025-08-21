import templateUserProfile from './UserProfile.hbs?raw';
import { Profile } from '@/widgets/Profile';
import { Button } from '@/shared/ui/Button';
import { Component } from '@/shared/lib';
import { router } from '@/app/router';
import { getRouteMain } from '@/app/router/constants/routes';
import cls from './UserProfile.module.scss';

export class UserProfile extends Component {
  constructor() {
    super({
      className: cls.userProfile,
      content: new Profile({}),
      buttonBack: new Button({
        id: 'backButton',
        text: '←',
        type: 'button',
        className: cls.backButton,
        onClick: () => router.navigate(getRouteMain()),
      }),
    });
  }

  render() {
    return this.compile(templateUserProfile, {
      classLeft: cls.left,
    });
  }
}
