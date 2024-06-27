import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  sharedVariable: number=-1;

  constructor() { }
}
