declare module 'Member' {

  interface IMember {
    id: number,
    name: string;
    nickname?: string;
    contact_number: string;
    role: string;
  }
}