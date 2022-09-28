import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../model/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  constructor(private _fb:FormBuilder, private bookService:BookService) { }
 public bookForm:FormGroup;
 book= new Book();
 SubmitButton:boolean;

  ngOnInit(): void {
    this.CreatAddBookForm();
  }

  CreatAddBookForm(){
    this.bookForm = this._fb.group({
        title: ['' , Validators.required],
        description: ['' , Validators.required],

      })
    }

    onSubmit(){
      this.SubmitButton=true;
      if(this.bookForm.valid){
        this.BookMap();
         this.bookService.AddBook(this.book).subscribe(result=>{
              alert(`Book Added Succesfuly ${result}`)
            })

              console.log(this.bookForm);
         }
      else{
           alert("Please fill your form Correctlly");
      }
    }


    BookMap():void{
      this.book.title = this.bookForm.controls['title'].value;
      this.book.description = this.bookForm.controls['description'].value;
    }

}
