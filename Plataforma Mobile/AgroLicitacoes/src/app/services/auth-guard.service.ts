import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    public authenticationService: AuthenticationService
      ) {}

  canActivate(): boolean {
    return this.authenticationService.isAuthenticated();
  }

}
