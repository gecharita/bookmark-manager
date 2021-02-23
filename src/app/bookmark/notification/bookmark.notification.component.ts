import {Component, OnInit, Inject, Input, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectBookmarks, selectBookmarksGroups, selectBookmarksByGroup } from '../../app.state';
import { Bookmark, DeleteBookmark, CreateBookmark, LoadBookmarkInit, EditBookmark, RestoreBookmarks } from '../state';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './bookmark.notification.html',
  styleUrls: ['../bookmark.component.scss'],
})
export class NotificationComponent {}
