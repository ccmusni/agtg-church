declare module "Leadership" {
  interface ILeadership {
    id: number;
    leadership_title_id: string | number;
    honorific: string;
    name: string;
    details?: string;
    img_file_name?: string;
  }

  interface ILeadershipTitle {
    id: number;
    honorific: string;
    title: string;
  }
}
