import { Component, OnInit, Inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectBookmarks, selectBookmarksGroups, selectBookmarksByGroup } from '../app.state';
import { Bookmark, DeleteBookmark, CreateBookmark, LoadBookmarkInit, EditBookmark, RestoreBookmarks } from './state';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {

  bookmarks$: Observable<Bookmark[]>;
  groups$: Observable<string[]>;

  displayedColumns: string[] = ['Name', 'URL', 'Group', 'Actions'];

  isEditMode = false;

  selectedGroup: string;

  constructor(private store: Store<AppState>, public dialog: MatDialog, private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer, private snackBar: MatSnackBar) {
    matIconRegistry.addSvgIcon(
      `avaloq-logo`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/avaloq-logo.svg')
    );
   }

  ngOnInit() {
    this.groups$ = this.store.pipe(select(selectBookmarksGroups));
    this.selectGroup('All');
    this.loadBookmarks();
  }

  selectGroup(group: string) {
    this.selectedGroup = group;
    if (group === 'All') {
      this.bookmarks$ = this.store.pipe(select(selectBookmarks));
    } else {
      this.bookmarks$ = this.store.pipe(select(selectBookmarksByGroup(group)));
    }
  }

  createBookmark(bookmark: Bookmark) {
    this.store.dispatch(new CreateBookmark(bookmark));
    this.showNotification();
  }

  editBookmark(bookmark: Bookmark) {
    this.store.dispatch(new EditBookmark(bookmark));
    this.showNotification();
  }


  deleteBookmark(bookmark: Bookmark) {
    this.store.dispatch(new DeleteBookmark(bookmark));
    this.showNotification();
  }

  loadBookmarks() {
    this.store.dispatch(new LoadBookmarkInit(null));
  }

  showNotification() {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 1000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }


  openDialog(editMode: boolean = false, bookmark?: BookmarkData ): void {
    const dialogData = new DialogData(editMode, bookmark);

    const dialogRef = this.dialog.open(DialogCreateBookmarkComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        if (editMode) {
          this.editBookmark(data);
        } else {
          this.createBookmark(data.bookMarkData);
        }
      }
    });
  }
}


/**
 * Dialog Create Bookmark
 */
@Component({
  selector: 'app-bookmark-create-dialog',
  templateUrl: './bookmark.create-dialog.html',
})
export class DialogCreateBookmarkComponent {

  isEditMode = false;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateBookmarkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.isEditMode = data.isEditMode;
    }

  onCancel(): void {
    this.dialogRef.close();
  }

}

export class DialogData {
  bookMarkData: BookmarkData;
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
  name: '';
  url: '';
  group: '';
}


@Component({
  selector: 'app-notification',
  templateUrl: '../bookmark/bookmark.notification.html',
  styleUrls: ['../bookmark/bookmark.component.scss'],
})
export class NotificationComponent {}
