import supabase from "@/utils/supabase";

export const fetchArticles = async () => {
  return await supabase
    .from("articles")
    .select(`id, title, details, read_more_url, img_file_name`)
    .order("id", { ascending: true });
};

export const addUpdateArticle = async (
  id: number,
  title: string,
  details: string,
  leadership_title_id: string | number,
  oldFileName: string,
  file: File
) => {
  const newFileName = !!file ? `${file?.name.replace(/\s/g, "")}` : oldFileName;

  const { data, error } = id
    ? await supabase
        .from("articles")
        .update({
          title,
          details,
          leadership_title_id,
          img_file_name: newFileName,
        })
        .eq("id", id)
    : await supabase
        .from("articles")
        .insert({
          title,
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

export const deleteArticle = async (id: number) => {
  return await supabase.from("articles").delete().eq("id", id);
};

export const fetchImage = async (id: number) => {
  return await supabase.storage.from("images").list(`articles/${id}/`, {
    sortBy: { column: "title" },
  });
};

export const deleteImage = async (id: number, fileName: string) => {
  return !fileName
    ? { error: null }
    : await supabase.storage
        .from("images")
        .remove([`articles/${id}/${fileName}`]);
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
        .upload(`articles/${id}/${newFileName}`, file);
};
