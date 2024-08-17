import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookData } from 'src/app/_models/BookDataModels';
import { UtilService } from 'src/app/_services/util.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {
  searchBookForm: FormGroup = new FormGroup({});
  data: BookData = {} as BookData;
  paginatedData: any[] = [];
  itemsPerPage: number = 10;
  totalItems: number = 0;
  books: any[] = [];

  constructor(private fb: FormBuilder, private utilService: UtilService, private bookService: BookService) {}

  ngOnInit(): void {
    this.initializeForm();

    const savedBooks = this.bookService.getBooks();
    const savedQuery = this.bookService.getQuery();

    if (savedBooks.length) {
      this.books = savedBooks;
      this.searchBookForm.patchValue({ query: savedQuery });
      this.pageChanged({page: 1, itemsPerPage: this.itemsPerPage});
    }
  }

  initializeForm() {
    this.searchBookForm = this.fb.group ({
      query: ['', Validators.required]
    });
  }

  onSearch() {
    let formValue = this.searchBookForm.value;
    const query = this.createQuery(formValue.query.toString());

    this.bookService.setQuery(query);

    this.utilService.searchBooks(query).subscribe({
      next: response => {
        this.data = JSON.parse(JSON.stringify(response));
        this.books = this.data.items

        this.totalItems = this.books.length;

        this.pageChanged({page: 1, itemsPerPage: this.itemsPerPage});

        this.bookService.setBooks(this.books);
        console.log(this.books);
      }
    });
  }

  createQuery(searchString: string) {
    let query = searchString.toLowerCase();
    query = query.replace(/ /g, '+');
    return query;
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedData = this.books.slice(startItem, endItem);
  }
}