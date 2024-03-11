import supabase from "@/utils/supabase";

export const fetchMembers = async () => {
  return await supabase
    .from("ya-members")
    .select(
      `
  *,
  roles (
    description
  )
`
    )
    .order("id", { ascending: true });
};

export const addUpdateMember = async (
  id: number,
  last_name: string,
  first_name: string,
  middle_name: string,
  contact_number: string,
  nickname: string,
  role_id: number
) => {
  const fields = {
    last_name,
    first_name,
    middle_name,
    contact_number,
    nickname,
    role_id,
  };
  return id
    ? await supabase
        .from("ya-members")
        .update({ ...fields })
        .eq("id", id)
    : await supabase.from("ya-members").insert({ ...fields });
};

export const deleteMember = async (id: number) => {
  return await supabase.from("ya-members").delete().eq("id", id);
};
