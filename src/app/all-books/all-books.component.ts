import { Component, OnInit } from '@angular/core';

import { Ibook } from '../model/ibook';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit {
  books:Array<Ibook>=[];
  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.GetAllBooks();
  }



  GetAllBooks(){
    this.bookService.GetAllBooks().subscribe(res=>{
      this.books=res;
    })
  }




}
