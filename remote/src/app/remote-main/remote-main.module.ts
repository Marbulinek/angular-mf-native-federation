import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from './service';
import { HttpClientModule } from '@angular/common/http';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  /// This module is entrypoint for remote application - we need to include there everything
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [DataService]
})
export class RemoteMainModule { }
