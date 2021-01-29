import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';

const apiUrl = 'https://my-money-2-backend.herokuapp.com/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
    urlImage: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  constructor(private http: HttpClient) {}

  postUser(user: User) {
    return this.http.post(
       `${apiUrl}` + '/register',
      user,
      this.noAuthHeader
    );
  }

  login(authCredentials) {
    return this.http.post(
       `${apiUrl}` + '/authenticate',
      authCredentials,
      this.noAuthHeader
    );
  }

  getUserProfile() {
    return this.http.get( `${apiUrl}` + '/userProfile');
  }

  getUser(id: string) {
    return this.http.get( `${apiUrl}` + '/' + id);
  }

  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }

  adicionarFoto(imagem:FormData):Observable<any> {
    return this.http.post(`${apiUrl}` + '/usuarios/imagem',imagem,{
    });
  }
}
