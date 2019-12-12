import { Action } from '@ngrx/store';
import { Bookmark, Bookmarks } from './bookmark.state';

export enum EBookmarkActions {
    GET_BOOKMARKS = '[Bookmark] Get Bookmarks',
    CREATE_BOOKMARK= '[Bookmark] Create Bookmark',
    EDIT_BOOKMARK= '[Bookmark] Edit Bookmark',
    DELETE_BOOKMARK = '[Bookmark] Delete Bookmark',
    LOAD_BOOKMARK_INIT = '[Bookmark] Load Bookmark init',
    LOAD_BOOKMARK_DONE = '[Bookmark] Load Bookmark done',
    RESTORE_BOOKMARKS = '[Bookmark] Restore Bookmarks to current state'
}

export class GetBookmarks implements Action {
    readonly type = EBookmarkActions.GET_BOOKMARKS;

    constructor(public payload: any) {
        console.log('ACTION ' + EBookmarkActions.GET_BOOKMARKS);
    }
}

export class CreateBookmark implements Action {
    readonly type = EBookmarkActions.CREATE_BOOKMARK;

    constructor(public payload: Bookmark) {
        console.log('ACTION ' + EBookmarkActions.CREATE_BOOKMARK);
    }
}

export class EditBookmark implements Action {
  readonly type = EBookmarkActions.EDIT_BOOKMARK;

  constructor(public payload: Bookmark) {
      console.log('ACTION ' + EBookmarkActions.EDIT_BOOKMARK);
  }
}

export class DeleteBookmark implements Action {
    readonly type = EBookmarkActions.DELETE_BOOKMARK;

    constructor(public payload: Bookmark) {
        console.log('ACTION ' + EBookmarkActions.DELETE_BOOKMARK);
    }
}

export class LoadBookmarkInit implements Action {
    readonly type = EBookmarkActions.LOAD_BOOKMARK_INIT;

    constructor(public payload: any){
        console.log('ACTION ' + EBookmarkActions.LOAD_BOOKMARK_INIT);
    }
}

export class LoadBookmarkDone implements Action {
    readonly type = EBookmarkActions.LOAD_BOOKMARK_DONE;

    constructor(public payload: Bookmarks) {
        console.log('ACTION ' + EBookmarkActions.LOAD_BOOKMARK_DONE);
    }
}

export class RestoreBookmarks implements Action {
  readonly type = EBookmarkActions.RESTORE_BOOKMARKS;

  constructor(public payload: any) {
      console.log('ACTION ' + EBookmarkActions.RESTORE_BOOKMARKS);
  }
}

export type BookmarkActions = GetBookmarks | CreateBookmark | DeleteBookmark |
 LoadBookmarkInit | LoadBookmarkDone | EditBookmark | RestoreBookmarks;
