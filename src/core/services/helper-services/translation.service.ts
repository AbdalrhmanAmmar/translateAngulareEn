import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly translate = inject(TranslateService);
  
  private currentLangSubject = new BehaviorSubject<string>('ar');
  public currentLang$ = this.currentLangSubject.asObservable();

  constructor() {
    const savedLang = localStorage.getItem('esnad-language') || 'ar';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLangSubject.next(lang);
    localStorage.setItem('esnad-language', lang);
    
    // Update document direction and language
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update body class for styling
    document.body.classList.remove('lang-ar', 'lang-en');
    document.body.classList.add(`lang-${lang}`);
  }

  getCurrentLanguage(): string {
    return this.currentLangSubject.value;
  }

  isRTL(): boolean {
    return this.getCurrentLanguage() === 'ar';
  }

  toggleLanguage(): void {
    const newLang = this.getCurrentLanguage() === 'ar' ? 'en' : 'ar';
    this.setLanguage(newLang);
  }

  instant(key: string, params?: any): string {
    return this.translate.instant(key, params);
  }
}