import { ActionReducerMap } from '@ngrx/store';
import * as bookmarkStore from './bookmark/state';
import { createSelector } from '@ngrx/store';

export interface AppState {
    bookmarks: bookmarkStore.Bookmarks;
}

export const initialState: AppState = {
    bookmarks: bookmarkStore.initialBookmarksState
}

export const reducers: ActionReducerMap<AppState> = {
    bookmarks: bookmarkStore.bookmarkReducer
}

export const effects: Array<any> = [
    bookmarkStore.BookmarkEffects
];

export const selectBookmarks = (appState: AppState) => appState.bookmarks;

export const selectBookmarksGroupedbyGroup = createSelector(
    selectBookmarks, (selectBookmarks: bookmarkStore.Bookmarks) => {
        const groupedBookemarkMap: Map<string, bookmarkStore.Bookmark[]> = groupBy(selectBookmarks.bookmarks, 'group');
        return groupedBookemarkMap;
    }
);

function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }


