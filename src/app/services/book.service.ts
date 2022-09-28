import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  base_url=environment.baseUrl;

  constructor(private http:HttpClient) { }

  GetAllBooks():Observable<Book[]>{
    return this.http.get<Book[]>(this.base_url+'/books/GetAllBooks/');

  }
  AddBook(book:Book):Observable<Book>{
    return this.http.post<Book>(this.base_url+'/books/AddBook/',book);

  }
}
