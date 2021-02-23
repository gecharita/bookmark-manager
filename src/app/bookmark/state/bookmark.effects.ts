import {Actions, ofType, Effect, createEffect} from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {switchMap, map, tap, toArray} from 'rxjs/operators';
import {EBookmarkActions, LoadBookmarkInit, LoadBookmarkDone, DeleteBookmark} from './bookmark.actions';
import { BookmarkService } from '../../services/bookmark.service';
import {bookmarkReducer} from './bookmark.reducer';

@Injectable({providedIn: 'root'})
export class BookmarkEffects {

    constructor(private actions$: Actions, private bookmarkService: BookmarkService){ }

    public loadBookmarks$ = createEffect(() =>
      this.actions$.pipe(
          ofType(EBookmarkActions.LOAD_BOOKMARK_INIT),
          switchMap((action: LoadBookmarkInit) =>
              this.bookmarkService.getBookmarks().pipe(
                  map(bookmarkArray => ({bookmarks: bookmarkArray})),
                  map(bookmarks => new LoadBookmarkDone(bookmarks))
              )
          )
      )
    );
}
