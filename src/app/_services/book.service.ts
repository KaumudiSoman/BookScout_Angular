import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: any[] = [];
  private query: string = '';

  setBooks(books: any[]) {
    this.books = books;
  }

  getBooks(): any[] {
    return this.books;
  }

  setQuery(query: string) {
    this.query = query;
  }

  getQuery(): string {
    return this.query;
  }
}
