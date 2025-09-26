import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppStorage } from '../../constants/app-storage.constants';
import { AppNavigation } from '../../constants/app-navigation.constants';
import { icons, LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-top-navbar',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss',
})
export class TopNavbarComponent {
  private router = inject(Router);
  private translate = inject(TranslateService);

  private language = signal<string>(
    localStorage.getItem(AppStorage.language) ?? 'en'
  );
  private theme = signal<string>(
    localStorage.getItem(AppStorage.theme) ?? 'light'
  );

  currentLanguage = computed(() => this.language());
  isDarkTheme = computed(() => this.theme() === 'dark');

  globeIcon = icons.Globe;
  moonIcon = icons.Moon;
  sunIcon = icons.Sun;
  menuIcon = icons.Menu;
  logOutIcon = icons.LogOut;
  closeIcon = icons.X;
  menuOpen = signal<boolean>(false);

  constructor() {
    effect(() => {
      const lang = this.language();
      this.translate.use(lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem(AppStorage.language, lang);
    });

    effect(() => {
      const appliedDark = this.theme() === 'dark';
      document.documentElement.classList.toggle('dark', appliedDark);
      localStorage.setItem(AppStorage.theme, appliedDark ? 'dark' : 'light');
    });

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => this.menuOpen.set(false));
  }

  toggleLanguage() {
    this.language.set(this.language() === 'en' ? 'ar' : 'en');
  }

  toggleTheme() {
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  logout() {
    localStorage.removeItem(AppStorage.token);
    localStorage.removeItem(AppStorage.user);
    this.router.navigate([AppNavigation.auth, AppNavigation.login], {
      queryParams: { target: location.pathname },
    });
  }

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }
}
