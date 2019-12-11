import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookmarks } from '../bookmark/state';

@Injectable({providedIn: 'root'})
export class BookmarkService {

    private bookmarks: Bookmarks = {
        bookmarks: [
            {name: 'dummy1', url: 'www.dummy1.com', group: 'general'},
            {name: 'dummy2', url: 'www.dummy2.com', group: 'work'},
        ]
    }

    getDummyBookmarks(): Observable<Bookmarks>{
        console.log('SERVICE getDummyBookmarks');
        return Observable.create(observer =>{
            setTimeout(() => {
                console.log('SERVICE getDummyBookmarks Done waiting');
                observer.next(this.bookmarks);
                observer.complete();
            }, 3000);
        });
    }
}
