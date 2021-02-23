import {Component, OnInit, Inject, Input, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectBookmarks, selectBookmarksGroups, selectBookmarksByGroup } from '../../app.state';
import { Bookmark, DeleteBookmark, CreateBookmark, LoadBookmarkInit, EditBookmark, RestoreBookmarks } from '../state';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Dialog Create Bookmark
 */
@Component({
  selector: 'app-bookmark-create-dialog',
  templateUrl: './bookmark.create-dialog.html'
})
export class DialogCreateBookmarkComponent {

  isEditMode = false;
  name = '';
  url = '';
  group = '';

  constructor( public dialogRef: MatDialogRef<DialogCreateBookmarkComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.name = data.bookMarkData.name;
    this.url = data.bookMarkData.url;
    this.group = data.bookMarkData.group;
    this.isEditMode = data.isEditMode;
  }

  onSave(): void {
    const bookmarkData = new BookmarkData();
    bookmarkData.id = this.data.bookMarkData.id || Date.now().toString();
    bookmarkData.name = this.name;
    bookmarkData.url = this.url;
    bookmarkData.group = this.group;
    this.dialogRef.close(bookmarkData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}

export class DialogData {
  public bookMarkData: BookmarkData;
  isEditMode = false;

  constructor(isEditMode: boolean, bookmarkData: BookmarkData) {
    this.isEditMode = isEditMode;
    if (!isEditMode) {
      this.bookMarkData = new BookmarkData();
    } else {
      this.bookMarkData = bookmarkData;
    }
  }
}

export class BookmarkData implements Bookmark {
  id = '';
  name = '';
  url = '';
  group = '';
}
