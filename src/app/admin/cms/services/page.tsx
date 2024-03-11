"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { Button } from "flowbite-react";

import {
  addUpdateService,
  deleteService,
  fetchServices,
} from "@/services/services.service";

import { IService } from "Service";
import Loading from "@/components/ui/loading";
import CustomCard from "@/components/custom-card";
import ServiceItem from "@/components/services/service-item";
import ServiceItemAddEditModal from "@/components/services/service-item-add-edit-modal";

export type TServiceOnSaveProps = {
  id?: number;
  title: string;
  description: string;
};

export default function ServicesCms() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [services, setServices] = useState<IService[]>();
  const [openModal, setOpenModal] = useState(false);

  const fetchStaticServices = async () => {
    const { data, error } = await fetchServices();

    if (error) {
      setFetchError("Could not fetch the Services");
      setServices(null);
    }

    if (data?.length) {
      const fetchedServices: IService[] = data;

      setServices(fetchedServices);
      setIsLoading(false);
      setFetchError(null);
    }
  };

  useEffect(() => {
    if (!services?.length && !isLoading) {
      setIsLoading(true);
      fetchStaticServices();
    }
  }, [services]);

  const handleSave = async ({
    id,
    title,
    description,
  }: TServiceOnSaveProps) => {
    setIsLoading(true);

    const { error } = await addUpdateService(id, title, description);

    if (!error) {
      fetchStaticServices();
    }
  };

  const handleDelete = (id: number) => {
    setIsLoading(true);

    const status = deleteService(id);

    status.finally(() => {
      fetchStaticServices();
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <section className="relative pt-16">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-8 md:pt-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h2 mb-4">Services</h1>
          </div>

          {/* Section content */}
          <div className="pt-4 md:pt-8 pb-8 md:pb-16">
            {/* Content */}
            {fetchError && <p>{fetchError}</p>}
            <>
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
                {!!services?.length &&
                  services.map((service) => (
                    <ServiceItem
                      key={service.id}
                      service={service}
                      admin
                      onSave={handleSave}
                      onDelete={handleDelete}
                    />
                  ))}
              </div>
              {openModal && (
                <ServiceItemAddEditModal
                  open={openModal}
                  onSave={({ title, description }) => {
                    handleSave({ title, description });
                    handleCloseModal();
                  }}
                  onClose={handleCloseModal}
                />
              )}
            </>
          </div>
        </div>
      </div>
    </section>
  );
}
