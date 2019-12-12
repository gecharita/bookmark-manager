import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookmarks } from '../bookmark/state';

@Injectable({providedIn: 'root'})
export class BookmarkService {

    private bookmarks: Bookmarks = {
        bookmarks: [
            {name: 'avaloq', url: 'www.avaloq.com/en/home', group: 'general'},
            {name: 'PRODYNA', url: 'www.prodyna.com', group: 'work'},
        ]
    }

    getDummyBookmarks(): Observable<Bookmarks>{
        console.log('SERVICE getDummyBookmarks');
        return new Observable(observer => {
            setTimeout(() => {
                console.log('SERVICE getDummyBookmarks Done waiting');
                observer.next(this.bookmarks);
                observer.complete();
            }, 3000);
        });
    }
}
