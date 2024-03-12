declare module "Member" {
  interface IMember {
    id: number;
    name: string;
    last_name?: string;
    first_name?: string;
    middle_name?: string;
    nickname?: string;
    contact_number: string;
    role_id?: string | number;
    role: string;
  }
}
