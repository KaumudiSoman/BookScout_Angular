export interface BookData {
    kind: string,
    totalItems: number,
    items: any[]
}

export interface Book {
    id: string,
    bookId: string
    title: string,
    subtitle: string,
    author: string,
    publisher: string,
    thumbnail: string
}

export interface User {
    email: string,
    userName: string,
}