import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public username$: Observable<string> = this.usernameSubject.asObservable();

  constructor() {}

  login(username: string): void {
    this.isAuthenticatedSubject.next(true);
    this.usernameSubject.next(username);
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.usernameSubject.next("");
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getUsername(): string {
    return this.usernameSubject.value;
  }
}
