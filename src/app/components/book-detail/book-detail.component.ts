import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/_models/BookDataModels';
import { AuthService } from 'src/app/_services/auth.service';
import { BookshelfService } from 'src/app/_services/bookshelf.service';
import { UtilService } from 'src/app/_services/util.service';
import { WishlistService } from 'src/app/_services/wishlist.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  bookId: string = '';
  book: any;
  selectedBook: Book = {} as Book;

  userId: string = '';

  readMode: string = 'Read More';
  showFullContent: boolean = false;
  maxLength: number = 400;

  constructor(private route: ActivatedRoute, private utilService: UtilService, private wishlistService: WishlistService, 
    private bookshelfService: BookshelfService, private authService: AuthService) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.bookId = params.get('id') || '';
      });
      this.utilService.getBook(this.bookId).subscribe({
        next: response => {
          this.book = JSON.parse(JSON.stringify(response));
          console.log(this.book);
        }
      });
      this.authService.user$.subscribe((user) => {
        this.userId = user?.uid!;
      });
  }

  toggleContent() {
    this.showFullContent = !this.showFullContent;
    if(this.showFullContent) {
      this.readMode = 'Read Less';
    }
    else {
      this.readMode = 'Read More';
    }
  }

  addToWishlist() {
    this.selectedBook.bookId = this.book.id;
    this.selectedBook.title = this.book?.volumeInfo.title;
    this.selectedBook.subtitle = this.book?.searchInfo?.textSnippet || this.book?.volumeInfo?.subtitle || '';
    this.selectedBook.author = this.book?.volumeInfo?.authors?.[0] || '';
    this.selectedBook.publisher = this.book?.volumeInfo.publisher || '';
    this.selectedBook.thumbnail = this.book?.volumeInfo?.imageLinks?.thumbnail || this.book?.volumeInfo?.imageLinks?.smallThumbnail || '';
    console.log(this.selectedBook);
    this.wishlistService.addToWishlist(this.selectedBook, this.userId).subscribe({
      next: response => {
        alert('Successfully added to wishlist')
        console.log(response)
      }
    })
  }

  addToBookshelf() {
    this.selectedBook.bookId = this.book.id;
    this.selectedBook.title = this.book?.volumeInfo.title;
    this.selectedBook.subtitle = this.book?.searchInfo?.textSnippet || this.book?.volumeInfo?.subtitle || '';
    this.selectedBook.author = this.book?.volumeInfo?.authors?.[0] || '';
    this.selectedBook.publisher = this.book?.volumeInfo.publisher || '';
    this.selectedBook.thumbnail = this.book?.volumeInfo?.imageLinks?.thumbnail || this.book?.volumeInfo?.imageLinks?.smallThumbnail || '';
    console.log(this.selectedBook);
    this.bookshelfService.addToBookshelf(this.selectedBook, this.userId).subscribe({
      next: response => {
        alert('Successfully added to bookshelf')
        console.log(response)
      }
    })
  }
}
