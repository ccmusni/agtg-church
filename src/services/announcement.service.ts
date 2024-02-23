import supabase from "@/utils/supabase";

export const fetchAnnouncements = async () => {
  return await supabase
    .from("announcements")
    .select(`id, title, details`);
};