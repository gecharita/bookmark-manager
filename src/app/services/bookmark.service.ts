import { Injectable } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Bookmark, Bookmarks} from '../bookmark/state';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class BookmarkService {

  private REST_API_SERVER = 'http://localhost:8900/api/bookmarks/';

  constructor(private httpClient: HttpClient) {}


  private dummyBookmarks: Bookmarks = {
      bookmarks: [
          {id: '1000', name: 'avaloq', url: 'www.avaloq.com/en/home', group: 'general'},
          {id: '1001', name: 'PRODYNA', url: 'www.prodyna.com', group: 'work'},
      ]
  };

  getDummyBookmarks(): Observable<Bookmarks>{
      console.log('SERVICE getDummyBookmarks');
      return new Observable(observer => {
          setTimeout(() => {
              console.log('SERVICE getDummyBookmarks Done waiting');
              observer.next(this.dummyBookmarks);
              observer.complete();
          }, 3000);
      });
  }

  getBookmarks(): Observable<Bookmark[]>{
    return this.httpClient.get<Bookmark[]>(this.REST_API_SERVER);
  }

  deleteBookmarks(id: string): Observable<boolean>{
    return this.httpClient.delete<boolean>(this.REST_API_SERVER + id);
  }

}
