declare module 'Announcement' {

  interface IAnnouncement {
    id: number,
    title: string;
    details?: string;
    img_file_name: string;
  }
}