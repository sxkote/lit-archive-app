import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppView} from "./views/app/app.view";
import {MenuComponent} from './components/menu/menu.component';
import {RippleModule} from "primeng/ripple";
import {StyleClassModule} from "primeng/styleclass";
import {RouterLink, RouterOutlet} from "@angular/router";
import {HomeView} from './views/home/home.view';
import {ToastModule} from "primeng/toast";
import {RootRoutingModule} from "./root-routing.module";
import {MessageService} from "primeng/api";
import {GalleryView} from './views/gallery/gallery.view';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {PathContentComponent} from './components/path-content/path-content.component';
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule, TranslateStore} from "@ngx-translate/core";
import {APP_CONFIGURATION, ConfigurationService, LBoxSharedModule, MultiTranslateHttpLoader} from "lbox-shared";
import {ErrorInterceptor, JWT_INTERCEPT_URLS, JwtInterceptor, LBoxAuthModule} from "lbox-auth";
import {environment} from "../../environments/environment";
import { LoginView } from './views/login/login.view';
import {ImageLazyLoadingDirective} from "./directives/image-lazy-loading.directive";
import { ProfileView } from './views/profile/profile.view';
import { ItemCardComponent } from './components/item-card/item-card.component';

export function createTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/locale/', suffix: '.json' },
    { prefix: './assets/locale/lbox-shared/', suffix: '.json' },
    { prefix: './assets/locale/lbox-auth/', suffix: '.json' },
  ]);
}

export function configServiceFactory(configService: ConfigurationService) {
  return () => {
    configService.loadConfig();
  };
}

@NgModule({
  declarations: [
    AppView,
    MenuComponent,
    HomeView,
    GalleryView,
    PathContentComponent,
    LoginView,
    ImageLazyLoadingDirective,
    ProfileView,
    ItemCardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonModule,
    RippleModule,
    StyleClassModule,
    RouterLink,
    RouterOutlet,
    ToastModule,
    InputTextModule,
    FormsModule,
    CardModule,
    RootRoutingModule,
    TranslateModule.forChild({
      defaultLanguage: 'ru',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    LBoxSharedModule,
    LBoxAuthModule,
  ],
  providers: [
    MessageService,
    { provide: TranslateStore },
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigurationService],
      multi: true,
    },
    { provide: JWT_INTERCEPT_URLS, useValue: undefined },
    { provide: APP_CONFIGURATION, useValue: environment },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppView]
})
export class RootModule {
}
