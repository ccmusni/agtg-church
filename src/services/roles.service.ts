import supabase from "@/utils/supabase";

export const fetchRoles = async () => {
  return await supabase
    .from("roles")
    .select(`id, name, description`)
    .order("id", { ascending: false });
};

export const addUpdateRole = async (
  id: number,
  name: string,
  description: string
) => {
  const fields = {
    name,
    description,
  };
  return id
    ? await supabase
        .from("roles")
        .update({ ...fields })
        .eq("id", id)
    : await supabase.from("roles").insert({ ...fields });
};

export const deleteRole = async (id: number) => {
  return await supabase.from("roles").delete().eq("id", id);
};
