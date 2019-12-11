import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectBookmarks, selectBookmarksGroupedbyGroup } from '../app.state';
import { Bookmarks, Bookmark, DeleteBookmark, CreateBookmark, LoadBookmarkInit } from './state';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


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

  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit() {
    this.bookmarks$ = this.store.pipe(select(selectBookmarks));
    // this.groupedBookmarks$ = this.store.pipe(select(selectBookmarksGroupedbyGroup));
    this.loadBookmarks();
  }

  createBookmark(bookmark: Bookmark) {
    this.store.dispatch(new CreateBookmark({
      name: bookmark.name,
      url: bookmark.url,
      group: bookmark.group,
    }));
  }

  deleteBookmark(bookmark: Bookmark) {
    this.store.dispatch(new DeleteBookmark(bookmark));
  }

  loadBookmarks() {
    this.store.dispatch(new LoadBookmarkInit(null));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateBookmarkComponent, {
      width: '400px',
      data: {name: '', url: '', group: ''}
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.createBookmark({name: data.name, group: data.group, url: data.url} );
      }
    });
  }
}

@Component({
  selector: 'app-bookmark-create-dialog',
  templateUrl: './bookmark.create-dialog.html',
})
export class DialogCreateBookmarkComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogCreateBookmarkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancel(): void {
    this.dialogRef.close();
  }

}

export class DialogData {
  name: string;
  url: string;
  group: string;
}
