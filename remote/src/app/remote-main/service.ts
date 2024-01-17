import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AddressModel } from "./model";
import { Observable, map } from "rxjs";

@Injectable()
export class DataService{

    constructor(private http: HttpClient) {        
    }

    getAddressModel():Observable<AddressModel[]>{
        return this.http.get<AddressModel[]>('https://jsonplaceholder.typicode.com/users').pipe(
            map(addr => addr.slice(0,5))
        );
    }
}