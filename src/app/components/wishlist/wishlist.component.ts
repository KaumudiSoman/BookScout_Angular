import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Book } from 'src/app/_models/BookDataModels';
import { AuthService } from 'src/app/_services/auth.service';
import { WishlistService } from 'src/app/_services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  books: Book[] = [];
  paginatedData: any[] = [];
  itemsPerPage: number = 10;
  totalItems: number = 0;

  userId: string = '';

  constructor(private wishlistService: WishlistService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.userId = user?.uid!;
      this.getWishList();
    });
  }

  getWishList() {
    this.wishlistService.getWishlist(this.userId).subscribe({
      next: response => {
        this.books = JSON.parse(JSON.stringify(response));
        this.totalItems = this.books.length;
        this.pageChanged({page: 1, itemsPerPage: this.itemsPerPage});
      }
    })
  }

  deleteFromWishlist(id: string) {
    this.wishlistService.deleteFromWishlist(id, this.userId).subscribe({
      next: () => this.getWishList()
    })
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedData = this.books.slice(startItem, endItem);
  }
}
