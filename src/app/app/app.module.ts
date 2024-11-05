import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomCurrencyPipe } from '../custom-currency.pipe';

@NgModule({
  declarations: [CustomCurrencyPipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
})
export class AppModule {}
