import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MySharedServiceService {
  private myAppUrl: string = '';
  private prospectoId: number | null = null;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
  }

  setProspectoId(id: number) {
    this.prospectoId = id;
  }

  getProspectoId(): number | null {
    return this.prospectoId;
  }
}
