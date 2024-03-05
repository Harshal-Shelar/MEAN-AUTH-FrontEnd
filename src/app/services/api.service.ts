import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const url = environment.crudApi;
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addUser(data:any): Observable<any> {
    return this.http.post(`${url}/add-user`, data);
  }

  deleteUser(id:any): Observable<any> {
    return this.http.delete(`${url}/userDelete/${id}`, httpOptions);
  }

  getUser(id:any): Observable<any> {
    return this.http.get(`${url}/userUpdate/${id}`, httpOptions);
  }

  editUser(id:any, data:any): Observable<any> {
    return this.http.put(`${url}/updateUser/${id}`, data);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${url}/user-list`);
  }
}
