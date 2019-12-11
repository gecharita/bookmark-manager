import { Component, OnInit, Inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectBookmarks, selectBookmarksGroups, selectBookmarksByGroup } from '../app.state';
import { Bookmarks, Bookmark, DeleteBookmark, CreateBookmark, LoadBookmarkInit } from './state';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {

  bookmarks$: Observable<Bookmark[]>;
  groups$: Observable<string[]>;

  displayedColumns: string[] = ['Name', 'URL', 'Group', 'Delete'];

  isEditMode = false;

  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit() {
    this.bookmarks$ = this.store.pipe(select(selectBookmarks));

    this.groups$ = this.store.pipe(select(selectBookmarksGroups));

    this.loadBookmarks();
  }

  selectGroup(group: string) {
    if (group === 'All') {
      this.bookmarks$ = this.store.pipe(select(selectBookmarks));
    } else {
      this.bookmarks$ = this.store.pipe(select(selectBookmarksByGroup(group)));
    }
  }

  createBookmark(bookmark: Bookmark) {
    this.store.dispatch(new CreateBookmark(bookmark));
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
