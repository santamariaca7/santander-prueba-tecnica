import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { mockApiServices } from "./mock-api/api";
import { MockApiModule } from "./mock-api/lib";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    // Comment this line to disable the mock
    MockApiModule.forRoot(environment.mockApi ? mockApiServices : [])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
