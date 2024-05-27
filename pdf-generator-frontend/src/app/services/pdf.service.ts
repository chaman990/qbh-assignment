import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from './constants';
import { map } from 'rxjs';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

constructor(
  private readonly http: HttpClient
) { }

private apiUrl = config.apiUrl
generatePdf(user: User){
  return this.http.get(`${this.apiUrl}/pdf?user=${JSON.stringify(user)}`, { responseType: 'blob' }).pipe(
    map(
      (res) => {
          return new Blob([res], { type: 'application/pdf' })
      }
  ));
}

}
