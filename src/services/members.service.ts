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
  nickname: string,
  contact_number: string,
  role_id: string | number
) => {
  const fields = {
    last_name,
    first_name,
    middle_name,
    nickname,
    contact_number,
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
