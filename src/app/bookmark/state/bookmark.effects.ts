import { Actions, ofType, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators'
import { EBookmarkActions, LoadBookmarkInit, LoadBookmarkDone } from './bookmark.actions'
import { BookmarkService } from '../../services/bookmark.service';

@Injectable({providedIn: 'root'})
export class BookmarkEffects {

    constructor(private actions$: Actions, private bookmarkServie: BookmarkService){ }

    @Effect()
    public loadBookmarks$ = this.actions$.pipe(
        ofType(EBookmarkActions.LOAD_BOOKMARK_INIT),
        switchMap((action: LoadBookmarkInit) =>
            this.bookmarkServie.getDummyBookmarks().pipe(
                map(bookmarks => new LoadBookmarkDone(bookmarks))
            )
        )
    );
}
