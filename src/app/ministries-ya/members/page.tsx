"use client";

import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { HiUserAdd } from "react-icons/hi";

import Hero from "@components/hero";
import Loading from "@/components/ui/loading";

import { IMember } from "Member";
import { addUpdateMember, fetchMembers } from "@/services/members.service";

import MembersTable from "./members-table";
import MemberItemAddEditModal, {
  TMemberOnSaveProps,
} from "./member-item-add-edit-modal";

export default function Members() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [members, setMembers] = useState<IMember[]>();
  const [openModal, setOpenModal] = useState(false);

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
      1
    );

    if (!error) {
      fetchStaticMembers();
    } else {
      setFetchError(error.message);
    }

    setIsLoading(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
          <div className="pt-8 md:pt-16 pb-8 md:pb-32">
            <div className="relative overflow-x-auto">
              {fetchError && <p>{fetchError}</p>}

              {isLoading ? (
                <Loading />
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    style={{ width: 130, alignSelf: "flex-end" }}
                    onClick={() => setOpenModal(true)}
                  >
                    <HiUserAdd className="mr-2 h-5 w-5" />
                    Add User
                  </Button>
                  <MembersTable members={members} />
                </div>
              )}
              {openModal && (
                <MemberItemAddEditModal
                  open={openModal}
                  onSave={handleSave}
                  onClose={handleCloseModal}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
