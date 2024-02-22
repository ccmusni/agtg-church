import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";

import { IBranch } from "Branch";

import BranchesTemplate from "@images/branches-template.jpg";

export default function BranchList({ branches }: { branches: IBranch[] }) {
  const [tab, setTab] = useState<number>(1);
  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <>
      <div
        className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:pb-12"
        data-aos="fade-right"
      >
        {/* Tabs buttons */}
        <div className="mb-8 md:mb-0">
          {branches.map((branch) => (
            <a
              className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                tab !== branch.id
                  ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                  : "bg-gray-200 border-transparent"
              }`}
              href="#0"
              onClick={(e) => {
                e.preventDefault();
                setTab(branch.id);
              }}
            >
              <div>
                <div className="font-bold leading-snug tracking-tight mb-1">
                  {branch.name}
                </div>
                <div className="text-gray-600">{branch.address}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
      {/* Tabs items */}
      <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
        <div className="transition-all">
          <div
            className="relative flex flex-col text-center lg:text-right"
            data-aos="zoom-y-out"
            ref={tabs}
          >
            {branches?.length &&
              branches.map((branch) => (
                <Transition
                  show={tab === branch.id}
                  appear={true}
                  className="w-full"
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterFrom="opacity-0 translate-y-16"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in-out duration-300 transform absolute"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-16"
                  beforeEnter={() => heightFix()}
                  unmount={false}
                >
                  <div className="relative inline-flex flex-col">
                    <Image
                      className="md:max-w-none mx-auto rounded"
                      src={BranchesTemplate}
                      width={500}
                      alt="Church Image"
                    />
                  </div>
                </Transition>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
