"use client";

import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { HiUserAdd } from "react-icons/hi";

import Hero from "@components/hero";
import Loading from "@/components/ui/loading";
import PopupModal from "@/components/popup-modal";

import { IMember } from "Member";
import { IRole } from "Role";
import {
  addUpdateMember,
  deleteMember,
  fetchMembers,
} from "@/services/members.service";
import { fetchRoles } from "@/services/roles.service";

import MembersTable from "./members-table";
import MemberItemAddEditModal, {
  TMemberOnSaveProps,
} from "./member-item-add-edit-modal";

export default function Members() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>("");
  const [members, setMembers] = useState<IMember[]>();
  const [roles, setRoles] = useState<IRole[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number>();

  const fetchStaticMembers = async () => {
    const { data, error } = await fetchMembers();

    if (error) {
      setFetchError("Could not fetch the YA members");
      setMembers(null);
    }

    if (data?.length) {
      const fetchedMembers: IMember[] = data.map((d) => ({
        ...d,
        name: `${d["first_name"]} ${
          d["middle_name"] ? Array.from(d["middle_name"])[0] + ". " : ""
        }${d["last_name"]}` as string,
        role: d["roles"]?.["description"] as string,
      }));

      setMembers(fetchedMembers);
      setIsLoading(false);
      setFetchError(null);
    }
  };

  useEffect(() => {
    if (!members?.length && !isLoading) {
      setIsLoading(true);
      fetchStaticMembers();
    }
  }, [members]);

  const fetchStaticRoles = async () => {
    const { data, error } = await fetchRoles();

    if (error) {
      setFetchError("Could not fetch the Roles");
      setRoles(null);
    }

    if (data?.length) {
      setRoles(data);
      setFetchError(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!roles?.length && !isLoading) {
      setIsLoading(true);
      fetchStaticRoles();
    }
  }, [roles]);

  const handleSave = async ({
    id,
    last_name,
    first_name,
    middle_name,
    nickname,
    contact_number,
    role_id,
  }: TMemberOnSaveProps) => {
    setIsLoading(true);
    setFetchError("");

    const { error } = await addUpdateMember(
      id,
      last_name,
      first_name,
      middle_name,
      nickname,
      contact_number,
      role_id
    );

    if (!error) {
      fetchStaticMembers();
    } else {
      setFetchError(error.message);
    }

    setIsLoading(false);
  };

  const handleConfirmDelete = (id: number) => {
    setOpenConfirmationModal(true);
    setSelectedMemberId(id);
  };

  const handleDelete = () => {
    setIsLoading(true);

    const status = deleteMember(selectedMemberId);

    status.finally(() => {
      fetchStaticMembers();
    });
  };

  return (
    <>
      <Hero />
      <section className="relative">
        <div
          className="absolute inset-0 bg-gray-100 pointer-events-none mb-16"
          aria-hidden="true"
        ></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-4 md:pt-8 pb-12 md:pb-24">
            <div className="relative overflow-x-auto">
              {fetchError && <p>{fetchError}</p>}

              {isLoading ? (
                <Loading />
              ) : (
                <div className="flex flex-col">
                  <div className="flex justify-between	">
                    <p className="text-lg font-bold">Young Adult Members</p>
                    <Button onClick={() => setOpenModal(true)}>
                      <HiUserAdd className="mr-2 h-5 w-5" />
                      Add
                    </Button>
                  </div>
                  <MembersTable
                    members={members}
                    roles={roles}
                    onSave={handleSave}
                    onDelete={handleConfirmDelete}
                  />
                </div>
              )}
              {openModal && (
                <MemberItemAddEditModal
                  open={openModal}
                  roles={roles}
                  onSave={handleSave}
                  onClose={() => setOpenModal(false)}
                />
              )}
              {openConfirmationModal && (
                <PopupModal
                  open={openConfirmationModal}
                  message="Are you sure you want to delete this member?"
                  onSubmit={handleDelete}
                  submitColor="failure"
                  onClose={() => setOpenConfirmationModal(false)}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
