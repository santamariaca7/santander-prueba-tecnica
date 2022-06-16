import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GetErrorPipe } from './pipes/get-error.pipe';
import { AlertComponent } from "./components/alert/alert.component";
import { SlicePipe } from './pipes/slice.pipe';


@NgModule({
  declarations: [
    GetErrorPipe,
    AlertComponent,
    SlicePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GetErrorPipe,
    AlertComponent,
    SlicePipe
  ]
})
export class SharedModule {
}
