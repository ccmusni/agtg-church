import supabase from "@/utils/supabase";

export const fetchLeaderships = async () => {
  return await supabase
    .from("leaderships")
    .select(
      `id, name, details, leadership_title_id, img_file_name,
    leadership_titles (
      honorific
    )`
    )
    .order("id", { ascending: true });
};

export const fetchLeadershipTitles = async () => {
  return await supabase
    .from("leadership_titles")
    .select(`id, honorific, title`)
    .order("id", { ascending: true });
};

export const addUpdateLeadership = async (
  id: number,
  name: string,
  details: string,
  leadership_title_id: string | number,
  oldFileName: string,
  file: File
) => {
  const newFileName = !!file ? `${file?.name.replace(/\s/g, "")}` : oldFileName;

  const { data, error } = id
    ? await supabase
        .from("leaderships")
        .update({
          name,
          details,
          leadership_title_id,
          img_file_name: newFileName,
        })
        .eq("id", id)
    : await supabase
        .from("leaderships")
        .insert({
          name,
          details,
          leadership_title_id,
          img_file_name: newFileName,
        })
        .select("id");

  const newId = id || data[0].id;

  if (!error) {
    return await addUpdateImage(newId, oldFileName, newFileName, file);
  } else {
    return { error };
  }
};

export const deleteLeadership = async (id: number) => {
  return await supabase.from("leaderships").delete().eq("id", id);
};

export const fetchImage = async (id: number) => {
  return await supabase.storage.from("images").list(`leaderships/${id}/`, {
    sortBy: { column: "name" },
  });
};

export const deleteImage = async (id: number, fileName: string) => {
  return !fileName
    ? { error: null }
    : await supabase.storage
        .from("images")
        .remove([`leaderships/${id}/${fileName}`]);
};

export const addUpdateImage = async (
  id: number,
  oldFileName: string,
  newFileName: string,
  file: File
) => {
  const error = id ? (await deleteImage(id, oldFileName)).error : "";

  return !!error
    ? error
    : await supabase.storage
        .from("images")
        .upload(`leaderships/${id}/${newFileName}`, file);
};
