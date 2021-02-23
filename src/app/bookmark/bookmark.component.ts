import {Component, OnInit, Inject, Input, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectBookmarks, selectBookmarksGroups, selectBookmarksByGroup } from '../app.state';
import { Bookmark, DeleteBookmark, CreateBookmark, LoadBookmarkInit, EditBookmark, RestoreBookmarks } from './state';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  BookmarkData,
  DialogCreateBookmarkComponent,
  DialogData
} from './create-dialog/bookmark.create-dialog.component';
import {NotificationComponent} from './notification/bookmark.notification.component';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          if (editMode) {
            this.editBookmark(data);
          } else {
            this.createBookmark(data);
          }
        }
      })
    );
  }
}
