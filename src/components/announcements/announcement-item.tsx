import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";

import {
  Button,
  Modal,
  Label,
  TextInput,
  Checkbox,
  Textarea,
} from "flowbite-react";

import { IAnnouncement } from "Announcement";

const CDNURL =
  "https://yrrhmzptqtwwbvytrpjv.supabase.co/storage/v1/object/public/images/";

export default function AnnouncementItem({
  announcement,
  admin,
  onEdit,
}: {
  announcement: IAnnouncement;
  admin?: boolean;
  onEdit?: () => void;
}) {
  const [image, setImage] = useState<{ name: string }>();
  const [openModal, setOpenModal] = useState(false);

  const getImage = async () => {
    const { data, error } = await supabase.storage
      .from("images")
      .list(`announcements/${announcement.id}/`, {
        sortBy: { column: "name" },
      });

    if (data) {
      setImage(data[0]);
    } else if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="h-auto max-w-full"
        src={
          image
            ? `${CDNURL}announcements/${announcement.id}/${image?.name}`
            : "/images/announcement-template.jpg"
        }
        alt={image?.name}
      />

      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {announcement.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {announcement.details}
        </p>
        {admin && (
          <>
            <Button onClick={() => setOpenModal(true)}>Edit</Button>
            <Modal
              show={openModal}
              size="md"
              popup
              onClose={() => setOpenModal(false)}
            >
              <Modal.Header />
              <Modal.Body>
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Edit Announcement
                  </h3>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="title" value="Title" />
                    </div>
                    <TextInput
                      id="title"
                      placeholder="Title here..."
                      value={announcement.title}
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="details" value="Details" />
                    </div>
                    <Textarea
                      id="details"
                      placeholder="Details here..."
                      value={announcement.details}
                    />
                  </div>
                  <div className="w-full">
                    <Button>Save</Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}
