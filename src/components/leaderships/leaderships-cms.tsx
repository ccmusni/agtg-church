"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { HiOutlinePlus } from "react-icons/hi";

import { ILeadership, ILeadershipTitle } from "Leadership";
import Loading from "@/components/ui/loading";
import CustomCard from "../custom-card";
import {
  fetchLeaderships,
  addUpdateLeadership,
  deleteLeadership,
  fetchLeadershipTitles,
} from "@/services/leaderships.service";
import LeadershipItem from "./leadership-item";
import LeadershipItemAddEditModal from "./leadership-item-add-edit-modal";

export type TLeadershipOnSaveProps = {
  id?: number;
  name: string;
  details: string;
  leadership_title_id: string | number;
  oldFileName?: string;
};

export default function LeadershipsCms() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [leaderships, setLeaderships] = useState<ILeadership[]>();
  const [leadershipTitles, setLeadershipTitles] =
    useState<ILeadershipTitle[]>();
  const [file, setFile] = useState<File>();
  const [imgPreviewUrlSrc, setImgPreviewUrlSrc] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const fetchStaticLeaderships = async () => {
    const { data, error } = await fetchLeaderships();

    if (error) {
      setFetchError("Could not fetch the Leaderships");
      setLeaderships(null);
      console.log(error);
    }

    if (data?.length) {
      const fetchedLeaderships: ILeadership[] = data.map((d) => ({
        ...d,
        honorific: d["leadership_titles"]?.["honorific"] as string,
      }));

      setLeaderships(fetchedLeaderships);
      setFetchError(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!leaderships?.length && !isLoading) {
      fetchStaticLeaderships();
    }
  }, [leaderships]);

  const fetchStaticLeadershipTitles = async () => {
    const { data, error } = await fetchLeadershipTitles();

    if (error) {
      setFetchError("Could not fetch the LeadershipTitles");
      setLeadershipTitles(null);
    }

    if (data?.length) {
      setLeadershipTitles(data);
      setFetchError(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!leadershipTitles?.length && !isLoading) {
      setIsLoading(true);
      fetchStaticLeadershipTitles();
    }
  }, [leadershipTitles]);

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const newFile = e.target.files[0];

    setFile(newFile);
    setImgPreviewUrlSrc(URL.createObjectURL(newFile));
  };

  const handleSave = async ({
    id,
    name,
    details,
    leadership_title_id,
    oldFileName,
  }: TLeadershipOnSaveProps) => {
    setIsLoading(true);

    const { error } = await addUpdateLeadership(
      id,
      name,
      details,
      leadership_title_id,
      oldFileName,
      file
    );

    if (!error) {
      setImgPreviewUrlSrc("");
      fetchStaticLeaderships();
    }
  };

  const handleDelete = (id: number) => {
    setIsLoading(true);

    const status = deleteLeadership(id);

    status.finally(() => {
      fetchStaticLeaderships();
    });
  };

  return (
    <>
      {fetchError && <p>{fetchError}</p>}
      {isLoading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
        <CustomCard customClassName="mb-4">
          <Button
            color="gray"
            className="h-full w-full border-0"
            onClick={() => setOpenModal(true)}
          >
            <HiOutlinePlus className="h-full w-full text-5xl" />
          </Button>
        </CustomCard>
        {!!leaderships?.length &&
          leaderships.map((leadership) => (
            <LeadershipItem
              key={leadership.id}
              leadership={leadership}
              leadershipTitles={leadershipTitles}
              admin
              imgPreviewUrlSrc={imgPreviewUrlSrc}
              imgSize={{ height: 360, width: "100%" }}
              horizontalCard={false}
              onUploadImage={handleUploadImage}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          ))}
      </div>
      {openModal && (
        <LeadershipItemAddEditModal
          leadershipTitles={leadershipTitles}
          imgSrc={imgPreviewUrlSrc}
          open={openModal}
          onUploadImage={handleUploadImage}
          onSave={({ name, details, leadership_title_id }) => {
            handleSave({ name, details, leadership_title_id });
            setOpenModal(false);
          }}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}
