import { inject, Injectable } from '@angular/core';
import { Book } from '../_models/BookDataModels';
import { from, map, Observable } from 'rxjs';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  firestore = inject(Firestore);
  wishlistCollection = collection(this.firestore, 'wishlist');

  getWishlist(): Observable<Book[]> {
    return collectionData(this.wishlistCollection, {idField: 'id',}) as Observable<Book[]>;
  }

  addToWishlist(book: Book): Observable<string> {
    const addBook = {bookId: book.bookId, 
      title: book.title, 
      subtitle: book.subtitle, 
      author: book.author, 
      publisher: book.publisher, 
      thumbnail: book.thumbnail
    };
    const promise = addDoc(this.wishlistCollection, addBook).then((response) => response.id);
    return from(promise);
  }

  deleteFromWishlist(id: string): Observable<void> {
    const docRef = doc(this.firestore, 'wishlist/' + id);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}