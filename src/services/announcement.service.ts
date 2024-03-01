import supabase from "@/utils/supabase";

export const fetchAnnouncements = async () => {
  return await supabase
    .from("announcements")
    .select(`id, title, details, img_file_name`)
    .order('id', { ascending: true });
};

export const updateAnnouncement = async (
  id: number,
  title: string,
  details: string,
  fileName: string
) => {
  return await supabase
    .from("announcements")
    .update({ title, details, img_file_name: fileName })
    .eq("id", id);
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

export const updateImage = async (id: number, oldImgFileName: string, newImgFileName: string, file: File) => {
  const { error } = await deleteImage(id, oldImgFileName);

  return !!error
    ? error
    : await supabase.storage
      .from("images")
      .upload(`announcements/${id}/${newImgFileName}`, file);
};
