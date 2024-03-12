import supabase from "@/utils/supabase";

export const fetchbranches = async () => {
  return await supabase
    .from("branches")
    .select(`id, name, address, img_file_name`)
    .order("id", { ascending: true });
};

export const addUpdateBranch = async (
  id: number,
  name: string,
  address: string,
  oldFileName: string,
  file: File
) => {
  const newFileName = !!file ? `${file?.name.replace(/\s/g, "")}` : oldFileName;

  const { data, error } = id
    ? await supabase
        .from("branches")
        .update({ name, address, img_file_name: newFileName })
        .eq("id", id)
    : await supabase
        .from("branches")
        .insert({ name, address, img_file_name: newFileName })
        .select("id");

  const newId = id || data[0].id;

  if (!error) {
    return await addUpdateImage(newId, oldFileName, newFileName, file);
  } else {
    return { error };
  }
};

export const deleteBranch = async (id: number) => {
  return await supabase.from("branches").delete().eq("id", id);
};

export const fetchImage = async (id: number) => {
  return await supabase.storage.from("images").list(`branches/${id}/`, {
    sortBy: { column: "name" },
  });
};

export const deleteImage = async (id: number, fileName: string) => {
  return !fileName
    ? { error: null }
    : await supabase.storage
        .from("images")
        .remove([`branches/${id}/${fileName}`]);
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
        .upload(`branches/${id}/${newFileName}`, file);
};
