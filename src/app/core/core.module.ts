import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { VerticalLayoutComponent } from "./components/vertical-layout/vertical-layout.component";
import { AppRoutingModule } from "../app-routing.module";
import { LayoutService } from "./services/layout.service";
import { LoaderService } from "./services/loader.service";
import { UsersService } from "./services/users.service";
import { SharedModule } from "../shared/shared.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CoreHttpInterceptor } from "./interceptors/http.interceptor";
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationsService } from "./services/notifications.service";

@NgModule({
  declarations: [
    LoaderComponent,
    VerticalLayoutComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    LoaderComponent,
    VerticalLayoutComponent,
    NotificationsComponent,
  ],
  providers: [
    LayoutService,
    LoaderService,
    UsersService,
    NotificationsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CoreHttpInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule {
}
