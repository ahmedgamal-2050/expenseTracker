import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { icons, LucideAngularModule } from 'lucide-angular';
import { AppNavigation } from '../../constants/app-navigation.constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bottom-navbar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.scss',
})
export class BottomNavbarComponent {
  translate = inject(TranslateService);
  menu = signal([
    {
      id: 1,
      icon: icons.LayoutDashboard,
      link: ['/' + AppNavigation.dashboard, AppNavigation.home],
    },
    {
      id: 2,
      icon: icons.ChartColumnIncreasing,
    },
    {
      id: 3,
      icon: icons.Plus,
      link: [
        '/' + AppNavigation.dashboard,
        AppNavigation.expenses,
        AppNavigation.add,
      ],
    },
    {
      id: 4,
      icon: icons.CreditCard,
    },
    {
      id: 5,
      icon: icons.User,
    },
  ]);
}
