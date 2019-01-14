import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http/src/client';

@Injectable({
  providedIn: 'root'
})
export class ImportmenuexcelService {

  constructor(
    private http: Http
  ) { }

  addItem(item) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://192.168.0.111:7000/api/menuitem/add', item, { headers: headers }).pipe(map(res => res.json()));
  }
}
