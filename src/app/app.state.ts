import { ActionReducerMap } from '@ngrx/store';
import * as bookmarkStore from './bookmark/state';
import { createSelector } from '@ngrx/store';

export interface AppState {
    bookmarks: bookmarkStore.Bookmarks;
}

export const initialState: AppState = {
    bookmarks: bookmarkStore.initialBookmarksState
};

export const reducers: ActionReducerMap<AppState> = {
    bookmarks: bookmarkStore.bookmarkReducer
};

export const effects: Array<any> = [
    bookmarkStore.BookmarkEffects
];

export const selectBookmarks = (appState: AppState) => appState.bookmarks.bookmarks;

export const selectBookmarksGroups = createSelector(
    selectBookmarks, (bookmarks: bookmarkStore.Bookmark[]) => {
        const groups = Object.keys(groupBy(bookmarks, 'group'));
        return ['All'].concat(groups);
    }
);

export const selectBookmarksByGroup = (group: string) => createSelector(
  selectBookmarks, (bookmarks: bookmarkStore.Bookmark[]) => {
      return bookmarks.filter(b => b.group === group);
  }
);

function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }


