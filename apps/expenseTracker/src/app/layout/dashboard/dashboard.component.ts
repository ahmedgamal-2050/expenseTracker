import { Component, inject, signal } from '@angular/core';
import { TopNavbarComponent } from '../../common/components/top-navbar/top-navbar.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../common/components/sidebar/sidebar.component';
import { icons } from 'lucide-angular';
import { AppNavigation } from '../../common/constants/app-navigation.constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  imports: [TopNavbarComponent, RouterOutlet, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  translate = inject(TranslateService);
  dashboardMenu = signal([
    {
      name: this.translate.instant('sidebar_item_dashboard_label'),
      icon: icons.LayoutDashboard,
      link: [AppNavigation.dashboard, AppNavigation.home],
    },
    {
      name: this.translate.instant('sidebar_item_expenses_label'),
      icon: icons.CreditCard,
      link: [AppNavigation.dashboard, AppNavigation.expenses],
    },
  ]);
}
