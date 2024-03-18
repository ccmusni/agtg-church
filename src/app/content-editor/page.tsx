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
import LeadershipsCms from "@/components/leaderships/leaderships-cms";
import ArticlesCms from "@/components/articles/articles-cms";

export const metadata = {
  title: "Content Editor - AGTG Church",
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
          <AccordionTitle>Leaderships</AccordionTitle>
          <AccordionContent>
            <LeadershipsCms />
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle>Life at Church</AccordionTitle>
          <AccordionContent>
            <ArticlesCms />
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
