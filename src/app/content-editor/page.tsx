import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";
import PageWrapper from "@/components/page-wrapper";
import AnnouncementsCms from "@/components/announcements/announcements-cms";
import ServicesCms from "@/components/services/services-cms";
import BranchesCms from "@/components/branches/branches-cms";

export const metadata = {
  title: "Content Management System - AGTG Church",
  description: "Christian Church",
};

export default function ContentManagementSystem() {
  return (
    <PageWrapper>
      <Accordion collapseAll className="mb-8">
        <AccordionPanel>
          <AccordionTitle>Branches</AccordionTitle>
          <AccordionContent>
            <BranchesCms />
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle>Announcements</AccordionTitle>
          <AccordionContent>
            <AnnouncementsCms />
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle>Services</AccordionTitle>
          <AccordionContent>
            <ServicesCms />
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </PageWrapper>
  );
}
