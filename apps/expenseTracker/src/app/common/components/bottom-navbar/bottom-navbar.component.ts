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
      name: this.translate.instant('sidebar_item_dashboard_label'),
      icon: icons.LayoutDashboard,
      link: ['/' + AppNavigation.dashboard, AppNavigation.home],
    },
    {
      name: this.translate.instant('sidebar_item_expenses_label'),
      icon: icons.CreditCard,
      link: ['/' + AppNavigation.dashboard, AppNavigation.expenses],
    },
  ]);
}
