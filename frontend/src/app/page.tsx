"use client";
import JobsList from "@/components/JobsList";
import { SharedCarousel } from "@/components/shared/carousel/carousel";
import { FilterProvider } from "@/contexts/FilterProvider";
import dynamic from "next/dynamic";

const NoSsrJobFilters = dynamic(() => import("../components/JobFilters"), {
  ssr: false,
});
export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <SharedCarousel />
      <FilterProvider>
        <div className="flex flex-col-reverse md:flex-row mx-4 gap-4 md:px-12">
          <JobsList />
          <NoSsrJobFilters />
        </div>
      </FilterProvider>
    </main>
  );
}
