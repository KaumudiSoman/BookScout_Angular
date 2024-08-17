import { inject, Injectable } from '@angular/core';
import { Book } from '../_models/BookDataModels';
import { from, map, Observable } from 'rxjs';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookshelfService {

  firestore = inject(Firestore);

  getBookshelf(userId: string): Observable<Book[]> {
    return collectionData(collection(this.firestore, `bookshelf_${userId}`), {idField: 'id',}) as Observable<Book[]>;
  }

  addToBookshelf(book: Book, userId: string): Observable<string> {
    const addBook = {bookId: book.bookId, 
      title: book.title, 
      subtitle: book.subtitle, 
      author: book.author, 
      publisher: book.publisher, 
      thumbnail: book.thumbnail
    };
    const promise = addDoc(collection(this.firestore, `bookshelf_${userId}`), addBook).then((response) => response.id);
    return from(promise);
  }

  deleteFromBookshelf(id: string, userId:string): Observable<void> {
    const docRef = doc(this.firestore, `bookshelf_${userId}/` + id);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}
