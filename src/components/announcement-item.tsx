import Image from "next/image";

import { IAnnouncement } from "Announcement";
import AnnouncementTemplatePhoto from "@images/announcement-template.jpg";

export default function AnnouncementItem({
  announcement,
}: {
  announcement: IAnnouncement;
}) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Image className="rounded-t-lg" src={AnnouncementTemplatePhoto} alt="" />
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {announcement.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {announcement.details}
        </p>
      </div>
    </div>
  );
}
