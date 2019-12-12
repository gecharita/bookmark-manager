# Bookmark Manager

## Screenshots

#### Overview
![Alt text](./src/assets/screenshots/b1-all.png?raw=true "Overview")
#### Overview Edit mode
![Alt text](./src/assets/screenshots/b2-all-edit.png?raw=true "Overview Edit mode")
#### Tooltips
![Alt text](./src/assets/screenshots/b3.png?raw=true "Tooltip Groups")
![Alt text](./src/assets/screenshots/b4.png?raw=true "Tooltip Actions")
![Alt text](./src/assets/screenshots/b5.png?raw=true "Tooltip Create")
#### Dialogs
![Alt text](./src/assets/screenshots/b6.png?raw=true "Dialog Create")
![Alt text](./src/assets/screenshots/b7.png?raw=true "Dialog Edit")


## How to run the application

- Checkout/Download github repository https://github.com/gecharita/bookmark-manager
- Go to the root folder and run: 
```sh
npm install
ng serve
```

 - Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Functionality

The user can:
1. add bookmarks.
1. edit bookmarks.
1. delete bookmarks.
1. specify an existing or new group for a bookmark.
1. delete a group by deleting all its bookmarks ('All' group cannot be deleted).
1. view all bookmarks
1. view the bookmarks grouped by a group.
1. open a new tab with the url of the bookmark by clicking to the URL cell of the row.
 
---
## Description of the solution

### Folder structure & files
![Alt text](./src/assets/screenshots/b-folder-structure.png?raw=true "Dialog Edit")



- **src/app/bookmark/state**: contains all the components that implement Redux inspired NgRx pattern for managing the state of the bookmark.

- **src/app/app.state.ts**: contains the state (store) of the whole application (currently only bookmark's).

- **src/app/services/bookmark.service.ts**: contains a mock service that returns some predefined bookmarks.

### NgRx Actions
- **GET_BOOKMARKS** = '[Bookmark] Get Bookmarks',
- **CREATE_BOOKMARK**= '[Bookmark] Create Bookmark',
- **EDIT_BOOKMARK**= '[Bookmark] Edit Bookmark',
- **DELETE_BOOKMARK** = '[Bookmark] Delete Bookmark',
- **LOAD_BOOKMARK_INIT** = '[Bookmark] Load Bookmark init',
- **LOAD_BOOKMARK_DONE** = '[Bookmark] Load Bookmark done',
- **RESTORE_BOOKMARKS** = '[Bookmark] Restore Bookmarks to current state'

### NgRx Reducers
The reducer "listens" to the following actions, apart from the default one:

- **GET_BOOKMARKS**: returns the state with all bookmarks
- **CREATE_BOOKMARK**: adds the new bookmark to the state and returns the updated state
- **EDIT_BOOKMARK**: replaces the edited bookmark to the state and returns the updated state
- **LOAD_BOOKMARK_DONE**:  adds the new bookmarks that were created by **bookmark.service.ts -> getDummyBookmarks()** to the state and returns the updated state
- **RESTORE_BOOKMARKS**: it is not handled by the reducer, so the default case is executed. It was used in order to return the existing state after the action call, if needed.

### NgRx Effects

- **loadBookmarks**: It is triggered by **LOAD_BOOKMARK_INIT** actions & it calls **LOAD_BOOKMARK_DONE**.
> As there is no error handling, the postfix _DONE was used instead of _SUCCESS for the LOAD_BOOKMARK_DONE action

### NgRx Selectors 
- **selectBookmarks**: returns an observable with all bookmarks
- **selectBookmarksByGroup**: returns an observable with the bookmarks of the group that was passed as a parameter.
- **selectBookmarksGroups**: returns an observable with all the groups & **'All'** group added by default

### NgRx States
- **interfaces**: Bookmarks, Bookmark
- **initialStates**: initialBookmarksState, that contains 2 bookmarks

## Initial data
As a showcase initial data are loaded with 2 ways in parallel:
- from **src/app/bookmark/state/bookmark.state.ts** -> initialBookmarksState that is passed as initial state in the reducer.
- by calling **LOAD_BOOKMARK_INIT** action in **src/app/bookmark/bookmark.component.ts** -> ngOnInit(). That action triggers an effect and a dummy service is called after some seconds.
> That is the only case that an effect is being called. In all other cases state modified directly in the reducer.
