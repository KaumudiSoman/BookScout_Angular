import { inject, Injectable, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, 
  Auth,
  UserCredential,
  user} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { User } from '../_models/BookDataModels';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<User | null | undefined>(undefined);

  constructor(private router: Router) { }

  register(email: string, password: string): Observable<UserCredential> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password);
    return from(promise);
  }

  login(email: string, password: string): Observable<UserCredential> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password);
    return from(promise);
  }

  forgotPassword(email: string): Observable<void> {
    const promise = sendPasswordResetEmail(this.firebaseAuth, email);
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    console.log('hello');
    return from(promise);
  }

  // login(email: string, password: string) {
  //   this.fireAuth.signInWithEmailAndPassword(email, password).then ((response) => {
  //     localStorage.setItem('token', JSON.stringify(response.user?.uid));
  //     this,this.router.navigateByUrl('home');
  //     console.log(JSON.stringify(response.user))

  //     if(response.user?.emailVerified) {
  //       this.router.navigateByUrl('home');
  //     }
  //     else {
  //       this.router.navigateByUrl('verify-email');
  //     }
  //   },
  //   err => {
  //     alert(err.message);
  //     this.router.navigateByUrl('login');
  //   })
  // }

  // register(email: string, password: string) {
  //   this.fireAuth.createUserWithEmailAndPassword(email, password).then ((response) => {
  //     alert('Registartion Successful');
  //     this,this.router.navigateByUrl('login');
  //     this.sendEmailForVerification(response.user);
  //   },
  //   err => {
  //     alert(err.message);
  //     this.router.navigateByUrl('register');
  //   })
  // }

  // logout() {
  //   this.fireAuth.signOut().then (() => {
  //     localStorage.removeItem('token');
  //     this,this.router.navigateByUrl('login');
  //   },
  //   err => {
  //     alert(err.message);
  //   })
  // }

  // forgotPassword(email: string) {
  //   this.fireAuth.sendPasswordResetEmail(email).then (() => {
  //     this.router.navigateByUrl('verify-email');
  //   },
  //   err => {
  //     alert(err.message);
  //   })
  // }

  // signInWithGoogle() {
  //   return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then((response) => {
  //     this.router.navigateByUrl('home');
  //     localStorage.setItem('token', JSON.stringify(response.user?.uid));
  //   }, 
  // err => {
  //   alert(err.message);
  // })
  // }

  // sendEmailForVerification(user: any) {
  //   user.sendEmailVerification().then ((response: any) => {
  //     this.router.navigateByUrl('verify-email');
  //   },
  //   (err: any) => {
  //     alert('Something went wrong. Cannot send mail to your email id.')
  //   })
  // }

  // login(email: string, password: string) {
  //   return signInWithEmailAndPassword(this.auth, email, password)
  //     .then((response) => {
  //       localStorage.setItem('token', JSON.stringify(response.user?.uid));
  //       if (response.user?.emailVerified) {
  //         this.router.navigateByUrl('home');
  //       } else {
  //         this.router.navigateByUrl('verify-email');
  //       }
  //     })
  //     .catch(err => {
  //       alert(err.message);
  //       this.router.navigateByUrl('login');
  //     });
  // }

  // register(email: string, password: string) {
  //   return createUserWithEmailAndPassword(this.auth, email, password)
  //     .then((response) => {
  //       alert('Registration Successful');
  //       this.router.navigateByUrl('login');
  //       this.sendEmailForVerification(response.user);
  //     })
  //     .catch(err => {
  //       alert(err.message);
  //       this.router.navigateByUrl('register');
  //     });
  // }

  // logout() {
    // return signOut(this.auth)
    //   .then(() => {
    //     localStorage.removeItem('token');
    //     this.router.navigateByUrl('login');
    //   })
    //   .catch(err => {
    //     alert(err.message);
    //   });
  // }

  // forgotPassword(email: string) {
  //   return sendPasswordResetEmail(this.auth, email)
  //     .then(() => {
  //       this.router.navigateByUrl('verify-email');
  //     })
  //     .catch(err => {
  //       alert(err.message);
  //     });
  // }

  // signInWithGoogle() {
  //   const provider = new GoogleAuthProvider();
  //   return signInWithPopup(this.auth, provider)
  //     .then((response) => {
  //       localStorage.setItem('token', JSON.stringify(response.user?.uid));
  //       this.router.navigateByUrl('home');
  //     })
  //     .catch(err => {
  //       alert(err.message);
  //     });
  // }

  // sendEmailForVerification(user: any) {
  //   return sendEmailVerification(user)
  //     .then(() => {
  //       this.router.navigateByUrl('verify-email');
  //     })
  //     .catch((err) => {
  //       alert('Something went wrong. Cannot send mail to your email id.');
  //     });
  // }

  // async login(email: string, password: string): Promise<void> {
  //   try {
  //     await signInWithEmailAndPassword(this.auth, email, password);
  //     console.log('User logged in successfully');
  //   } catch (error) {
  //     console.error('Login error:', error);
  //   }
  // }

  // async logout(): Promise<void> {
  //   try {
  //     await signOut(this.auth);
  //     localStorage.removeItem('token');
  //     this.router.navigate(['/login']);
  //     console.log('User logged out successfully');
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   }
  // }

  // async logout(): Promise<void> {
  //   try {
  //     await signOut(this.auth);
  //     console.log('User logged out successfully');
  //     // Redirect to login page or home page
  //     this.router.navigate(['/login']); // Adjust the route as needed
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   }
  // }

  // async register(email: string, password: string): Promise<void> {
    // try {
    //   await createUserWithEmailAndPassword(this.auth, email, password);
    //   console.log('User signed up successfully');
    // } catch (error) {
    //   console.error('Sign-up error:', error);
    // }
  // }

  // async forgotPassword(email: string): Promise<void> {
    // try {
    //   await sendPasswordResetEmail(this.auth, email);
    //   console.log('Password reset email sent');
    // } catch (error) {
    //   console.error('Password reset error:', error);
    // }
  // }
}
