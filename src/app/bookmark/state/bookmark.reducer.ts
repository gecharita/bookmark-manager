import { BookmarkActions, EBookmarkActions } from './bookmark.actions';
import { Bookmarks, initialBookmarksState, Bookmark } from './bookmark.state';

export function bookmarkReducer(state = initialBookmarksState, action: BookmarkActions): Bookmarks {
    switch (action.type) {
        case EBookmarkActions.GET_BOOKMARKS: {
            console.log('REDUCER: ' + EBookmarkActions.GET_BOOKMARKS);
            return  {...state};
        }
        case EBookmarkActions.CREATE_BOOKMARK: {
            console.log('REDUCER: ' + EBookmarkActions.CREATE_BOOKMARK);
            return  { bookmarks: state.bookmarks.concat(action.payload)};
        }
        case EBookmarkActions.EDIT_BOOKMARK: {
          console.log('REDUCER: ' + EBookmarkActions.EDIT_BOOKMARK);
          const index = state.bookmarks.findIndex(b => b.id  === action.payload.id);
          const newBookmarks = state.bookmarks.filter(bookmark => bookmark.id !== action.payload.id)
                                              .concat(action.payload)
                                              .sort((bookmarkA, bookmarkB) => (bookmarkA.id > bookmarkB.id) ? 1 : -1);
          return  { bookmarks: newBookmarks};
        }
        case EBookmarkActions.DELETE_BOOKMARK: {
            console.log('REDUCER: ' + EBookmarkActions.DELETE_BOOKMARK);
            return  { bookmarks: state.bookmarks.filter(bookmark => bookmark !== action.payload)};
        }
        case EBookmarkActions.LOAD_BOOKMARK_DONE: {
            console.log('REDUCER: ' + EBookmarkActions.LOAD_BOOKMARK_DONE);
            return  { bookmarks: state.bookmarks.concat(action.payload.bookmarks)};
        }
        default: {
            console.log('REDUCER: Default');
            return {
                ...state
            };
        }
    }
}
