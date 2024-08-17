import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResources } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  registerUserToLocalStorage(user: any) {
    const usersArrayStr = localStorage.getItem('registerFormArray');
    let usersArray = usersArrayStr ? JSON.parse(usersArrayStr) : [];
    usersArray.push(user);
    localStorage.setItem('registerFormArray', JSON.stringify(usersArray));
  }

  searchBooks(query: string) {
    return this.http.get(APIResources.baseUrl + APIResources.q + query + APIResources.projection + APIResources.maxResults);
  }

  getBook(id: string) {
    return this.http.get(APIResources.baseUrl + '/' + id)
  }

  isLoggedIn() {
    const loggedInStr: string | null = localStorage.getItem('token');
    if(loggedInStr) {
      return true;
    }
    return false;
  }
}
