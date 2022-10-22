import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AllBooksComponent } from './all-books/all-books.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  {path:'books',component: AllBooksComponent},
  {path:'addbook',component: AddBookComponent,canActivate: [AuthGuard,AdminGuard]},
  {path:'login',component: UserLoginComponent},
  { path: 'forbidden', component: ForbiddenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
