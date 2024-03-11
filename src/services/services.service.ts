import supabase from "@/utils/supabase";

export const fetchServices = async () => {
  return await supabase
    .from("services")
    .select(`id, title, description`)
    .order("id", { ascending: true });
};

export const addUpdateService = async (
  id: number,
  title: string,
  description: string
) => {
  return id
    ? await supabase
        .from("services")
        .update({ title, description })
        .eq("id", id)
    : await supabase
        .from("services")
        .insert({ title, description })
        .select("id");
};

export const deleteService = async (id: number) => {
  return await supabase.from("services").delete().eq("id", id);
};
