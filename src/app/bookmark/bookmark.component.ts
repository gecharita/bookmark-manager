import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectBookmarks, selectBookmarksGroupedbyGroup } from '../app.state';
import { Bookmarks, Bookmark, DeleteBookmark, CreateBookmark, LoadBookmarkInit } from './state';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {

  bookmarks$: Observable<Bookmarks>;
  // groupedBookmarks$: Observable<Map<string, Bookmark[]>>;
  displayedColumns: string[] = ['Name', 'URL', 'Group', 'Delete'];

  categories = ['General', 'Work', 'Personal'];

  newBookmark: Bookmark = emptyBookmark;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.bookmarks$ = this.store.pipe(select(selectBookmarks));
    // this.groupedBookmarks$ = this.store.pipe(select(selectBookmarksGroupedbyGroup));
    this.loadBookmarks();
  }

  createBookmark() {
    this.store.dispatch(new CreateBookmark({
      name: this.newBookmark.name,
      url: this.newBookmark.url,
      group: this.newBookmark.group,
    }));
  }

  deleteBookmark(bookmark: Bookmark) {
    this.store.dispatch(new DeleteBookmark(bookmark));
  }

  loadBookmarks(){
    this.store.dispatch(new LoadBookmarkInit(null));
  }
}


const emptyBookmark: Bookmark = {
  name: null,
  url: null,
  group: null,
}
