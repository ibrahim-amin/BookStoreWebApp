import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { HttpErrorInterceptorService } from '../Intercepator/http-error-interceptor.service';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  base_url=environment.baseUrl;
constructor(private http:HttpClient,private jwtHelper: JwtHelperService,private router:Router) { }
 handleError(error: HttpErrorResponse) {
  if(error.status ===401){
    alert('Un Authorized from Handler');
  }

   if(error.status === 403) {
    //alert('forfidden from Handler');
 this.router.navigate(["/forbidden"], { queryParams: { returnUrl: this.router.url }});
    return "Forbidden";

  }

  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    //console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    //console.error(
      //`Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return 'error'
  //return throwError(() => new Error('Something bad happened; please try again later.'));
}
private handleForbidden = (error: HttpErrorResponse) => {
  this.router.navigate(["/forbidden"], { queryParams: { returnUrl: this.router.url }});
  return "Forbidden";
}

  GetAllBooks():Observable<Book[]>{
    return this.http.get<Book[]>(this.base_url+'/books/GetAllBooks/');

  }
  AddBook(book:Book):Observable<Book>{
    return this.http.post<Book>(this.base_url+'/books/AddBook/',book);
    // var data:any= this.http.post<Book>(this.base_url+'/books/AddBook/',book) .pipe(
    //   catchError(this.handleError)
    // );

    //  return data;
  }
}
