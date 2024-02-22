"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { IMember } from "Member";

import Hero from "@components/hero";
import Loading from "@/components/ui/loading";
import MemberTableRow from "@components/member-table-row";

export default function Members() {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [members, setMembers] = useState<IMember[]>();

  const supabase = createClientComponentClient();

  const fetchMembers = async () => {
    const { data, error } = await supabase.from("ya-members").select(`
      *,
      roles (
        description
      )
    `);

    if (error) {
      setFetchError("Could not fetch the YA members");
      setMembers(null);
      console.log(error);
    }

    if (data?.length) {
      const fetchedMembers: IMember[] = data.map((d) => ({
        id: d["id"],
        name: `${d["first_name"]} ${
          d["middle_name"] ? Array.from(d["middle_name"])[0] + ". " : ""
        }${d["last_name"]}` as string,
        nickname: d["nickname"] as string,
        role: d["roles"]["description"] as string,
        contact_number: d["contact_number"] as string,
      }));
      setMembers(fetchedMembers);
      setIsLoading(false);
      setFetchError(null);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

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
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        NAME
                      </th>
                      <th scope="col" className="px-6 py-3">
                        NICKNAME
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ROLE
                      </th>
                      <th scope="col" className="px-6 py-3">
                        CONTACT NUMBER
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {members?.length &&
                      members.map((member) => (
                        <MemberTableRow key={member?.id} member={member} />
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
