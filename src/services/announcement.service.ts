import supabase from "@/utils/supabase";

export const fetchAnnouncements = async () => {
  return await supabase
    .from("announcements")
    .select(`id, title, details, img_file_name`)
    .order("id", { ascending: true });
};

export const addUpdateAnnouncement = async (
  id: number,
  title: string,
  details: string,
  oldFileName: string,
  file: File
) => {
  const newFileName = !!file ? `${file?.name.replace(/\s/g, "")}` : oldFileName;

  const { data, error } = id ? await supabase
    .from("announcements")
    .update({ title, details, img_file_name: newFileName })
    .eq("id", id) : await supabase
      .from("announcements")
      .insert({ title, details, img_file_name: newFileName }).select('id');

  const newId = id || data[0].id

  if (!error) {
    return await addUpdateImage(newId, oldFileName, newFileName, file);
  } else {
    return { error };
  }
};

export const deleteAnnouncement = async (
  id: number,
) => {
  return await supabase
    .from('announcements')
    .delete()
    .eq('id', id)
};

export const fetchImage = async (id: number) => {
  return await supabase.storage.from("images").list(`announcements/${id}/`, {
    sortBy: { column: "name" },
  });
};

export const deleteImage = async (id: number, fileName: string) => {
  return !fileName
    ? { error: null }
    : await supabase.storage
      .from("images")
      .remove([`announcements/${id}/${fileName}`]);
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
      .upload(`announcements/${id}/${newFileName}`, file);
};
