import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {registerResponse} from "../model/user.entity";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.serverBasePath;

  constructor(private http: HttpClient) { }

  getUsers() {
    const url=`${this.baseUrl}/user`;
    return this.http.get<registerResponse[]>(url);
  }
  postUser(user: registerResponse) {
    const url=`${this.baseUrl}/user`;
    return this.http.post<registerResponse>(url, user);
  }
  createUser(body: any){
    return this.http.post(`${this.baseUrl}/user`, body);
  }
}
