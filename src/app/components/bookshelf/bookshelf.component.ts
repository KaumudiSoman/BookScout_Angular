import { Component } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Book } from 'src/app/_models/BookDataModels';
import { AuthService } from 'src/app/_services/auth.service';
import { BookshelfService } from 'src/app/_services/bookshelf.service';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.css']
})
export class BookshelfComponent {
  books: Book[] = [];
  paginatedData: any[] = [];
  itemsPerPage: number = 10;
  totalItems: number = 0;
  
  userId: string = '';

  constructor(private bookshelfService: BookshelfService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.userId = user?.uid!;
      this.getBookShelf();
    });
    
  }

  getBookShelf() {
    this.bookshelfService.getBookshelf(this.userId).subscribe({
      next: response => {
        this.books = JSON.parse(JSON.stringify(response));
        this.totalItems = this.books.length;
        this.pageChanged({page: 1, itemsPerPage: this.itemsPerPage});
      }
    })
  }

  deleteFromBookShelf(id: string) {
    this.bookshelfService.deleteFromBookshelf(id, this.userId).subscribe({
      next: () => this.getBookShelf()
    })
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedData = this.books.slice(startItem, endItem);
  }
}
