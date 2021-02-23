export interface Bookmark {
    id: string;
    name: string;
    url: string;
    group: string;
}

export interface Bookmarks {
    bookmarks: Bookmark[];
}

export const initialBookmarksState: Bookmarks = {
    bookmarks: [
    //     {id: '1111', name: 'google', url: 'www.google.com', group: 'general'},
    //     {id: '1112', name: 'dzone', url: 'www.dzone.com', group: 'work'},
    ]
};
