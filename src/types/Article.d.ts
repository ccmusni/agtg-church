declare module "Article" {
  interface IArticle {
    id: number;
    title: string;
    details?: string;
    read_more_url?: string;
    img_file_name?: string;
  }
}
