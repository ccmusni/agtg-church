import supabase from "@/utils/supabase";

export const fetchLeaderships = async () => {
  return await supabase
    .from("leaderships")
    .select(
      `id, name, details,
    leadership_titles (
      honorific
    )`
    )
    .order("id", { ascending: true });
};

export const addUpdateLeadership = async (
  id: number,
  name: string,
  details: string
) => {
  return id
    ? await supabase.from("leaderships").update({ name, details }).eq("id", id)
    : await supabase.from("leaderships").insert({ name, details }).select("id");
};

export const deleteLeadership = async (id: number) => {
  return await supabase.from("leaderships").delete().eq("id", id);
};
