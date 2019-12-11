export interface Bookmark {
    name: string;
    url: string;
    group: string;
}

export interface Bookmarks {
    bookmarks: Bookmark[];
}

export const initialBookmarksState: Bookmarks = {
    bookmarks: [
        {name: 'google', url: 'www.google.com', group: 'general'},
        {name: 'dzone', url: 'www.dzone.com,', group: 'work'},
    ]
}
