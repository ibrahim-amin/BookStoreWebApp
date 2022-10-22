import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from  '@angular/common/http';
import { AllBooksComponent } from './all-books/all-books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login/user-login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guard/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HttpErrorInterceptorService } from './Intercepator/http-error-interceptor.service';
import { ToastrModule } from 'ngx-toastr';



export function tokenGetter() {
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    AllBooksComponent,
    AddBookComponent,
    UserLoginComponent,
    NavbarComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44325"],
        disallowedRoutes: []
      }
    }),


  ],
  providers: [
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi:true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
