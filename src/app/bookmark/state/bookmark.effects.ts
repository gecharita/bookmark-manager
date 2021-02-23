import { Actions, ofType, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {switchMap, map, tap, toArray} from 'rxjs/operators';
import { EBookmarkActions, LoadBookmarkInit, LoadBookmarkDone } from './bookmark.actions';
import { BookmarkService } from '../../services/bookmark.service';
import {bookmarkReducer} from './bookmark.reducer';

@Injectable({providedIn: 'root'})
export class BookmarkEffects {

    constructor(private actions$: Actions, private bookmarkService: BookmarkService){ }

    @Effect()
    public loadBookmarks$ = this.actions$.pipe(
        ofType(EBookmarkActions.LOAD_BOOKMARK_INIT),
        switchMap((action: LoadBookmarkInit) =>
            this.bookmarkService.getBookmarks().pipe(
                map(bookmarkArray => ({bookmarks: bookmarkArray})),
                map(bookmarks => new LoadBookmarkDone(bookmarks))
            )
        )
    );
}
