import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressModel } from '../model';
import { DataService } from '../service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  addresses$: Observable<AddressModel[]>;
  btnValue: string = '';
  constructor(
    private dataService: DataService
  ) {
    this.addresses$  = this.dataService.getAddressModel();
  }

  printValue(): void{
    this.btnValue = 'Printed text by button v1.0';
  }
}
