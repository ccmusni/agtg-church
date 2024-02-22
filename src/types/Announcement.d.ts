declare module 'Announcement' {

  interface IAnnouncement {
    id: number,
    title: string;
    details?: string;
    image?: Blob;
  }
}