import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { catchError, of, retryWhen,concatMap, throwError, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor{
  constructor(private router:Router, private toaster:ToastrService) { }
  intercept (request: HttpRequest<any>, next: HttpHandler){
   // console.log('Http Request Started');

    return next.handle(request).pipe(
          retryWhen(error =>

            this.retryRequest(error,1)),
                catchError((error:HttpErrorResponse)=>{
                let errorMessage= this.handleError(error);
                // console.log(errorMessage);
                  //this._toaster.error(errorMessage);
                 // alert(errorMessage);
                  this.toaster.error(errorMessage);
                  return throwError(errorMessage);
                })
              );

                }

  handleError(error : HttpErrorResponse): string{
      let errorMessage='';
      if(error.error instanceof ErrorEvent){
        errorMessage = error.error.message;
      }
      else if (error.status===401){
        return errorMessage='Invalid Username or Password';
      }

      else if(error.status === 403) {
        return this.handleForbidden(error);
      }

      else if(error.status !==0){
        errorMessage= error.error;
      }

      else{
        errorMessage="Unknow Error Occured";
      }

      return errorMessage;
  }

  retryRequest(error:Observable<unknown>,retrycount:number):Observable<unknown>{

    return error.pipe(
      concatMap((checkErr:HttpErrorResponse,count:number)=>{
        if(checkErr.status===0 && count<retrycount){
          return of(checkErr);
        }
        return throwError(checkErr);
    })
    )


  }

  private handleForbidden = (error: HttpErrorResponse) => {
    this.router.navigate(["/forbidden"], { queryParams: { returnUrl: this.router.url }});
    return "Forbidden";
  }

}
