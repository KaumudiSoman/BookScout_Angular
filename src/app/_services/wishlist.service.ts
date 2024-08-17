import { inject, Injectable } from '@angular/core';
import { Book } from '../_models/BookDataModels';
import { from, map, Observable } from 'rxjs';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  firestore = inject(Firestore);
  wishlistCollection = collection(this.firestore, 'wishlist');

  getWishlist(userId: string): Observable<Book[]> {
    return collectionData(collection(this.firestore, `wishlist_${userId}`), {idField: 'id',}) as Observable<Book[]>;
  }

  addToWishlist(book: Book, userId: string): Observable<string> {
    const addBook = {bookId: book.bookId, 
      title: book.title, 
      subtitle: book.subtitle, 
      author: book.author, 
      publisher: book.publisher, 
      thumbnail: book.thumbnail
    };
    const promise = addDoc(collection(this.firestore, `wishlist_${userId}`), addBook).then((response) => response.id);
    return from(promise);
  }

  deleteFromWishlist(id: string, userId: string): Observable<void> {
    const docRef = doc(this.firestore, `wishlist_${userId}/` + id);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}
