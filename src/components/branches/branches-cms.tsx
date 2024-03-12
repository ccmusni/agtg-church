"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { HiOutlinePlus } from "react-icons/hi";

import { IBranch } from "Branch";
import Loading from "@/components/ui/loading";
import CustomCard from "../custom-card";
import {
  fetchbranches,
  addUpdateBranch,
  deleteBranch,
} from "@/services/branches.service";
import BranchItem from "./branch-item";
import BranchItemAddEditModal from "./branches-item-add-edit-modal";

export type TBranchOnSaveProps = {
  id?: number;
  name: string;
  address: string;
  oldFileName?: string;
};

export default function BranchesCms() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [branches, setBranches] = useState<IBranch[]>();
  const [file, setFile] = useState<File>();
  const [imgPreviewUrlSrc, setImgPreviewUrlSrc] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const fetchStaticBranches = async () => {
    const { data, error } = await fetchbranches();

    if (error) {
      setFetchError("Could not fetch the Branches");
      setBranches(null);
    }

    if (data?.length) {
      const fetchedBranches: IBranch[] = data;

      setBranches(fetchedBranches);
      setFetchError(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!branches?.length && !isLoading) {
      setIsLoading(true);
      fetchStaticBranches();
    }
  }, [branches]);

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const newFile = e.target.files[0];

    setFile(newFile);
    setImgPreviewUrlSrc(URL.createObjectURL(newFile));
  };

  const handleSave = async ({
    id,
    name,
    address,
    oldFileName,
  }: TBranchOnSaveProps) => {
    setIsLoading(true);

    const { error } = await addUpdateBranch(
      id,
      name,
      address,
      oldFileName,
      file
    );

    if (!error) {
      setImgPreviewUrlSrc("");
      fetchStaticBranches();
    }
  };

  const handleDelete = (id: number) => {
    setIsLoading(true);

    const status = deleteBranch(id);

    status.finally(() => {
      fetchStaticBranches();
    });
  };

  return (
    <>
      {fetchError && <p>{fetchError}</p>}
      {isLoading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
        <CustomCard>
          <Button
            color="gray"
            className="h-full w-full border-0"
            onClick={() => setOpenModal(true)}
          >
            <HiOutlinePlus className="h-full w-full text-5xl" />
          </Button>
        </CustomCard>
        {!!branches?.length &&
          branches.map((branch) => (
            <BranchItem
              key={branch.id}
              branch={branch}
              admin
              imgPreviewUrlSrc={imgPreviewUrlSrc}
              onUploadImage={handleUploadImage}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          ))}
      </div>
      {openModal && (
        <BranchItemAddEditModal
          imgSrc={imgPreviewUrlSrc}
          open={openModal}
          onUploadImage={handleUploadImage}
          onSave={({ name, address }) => {
            handleSave({ name, address });
            setOpenModal(false);
          }}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}
