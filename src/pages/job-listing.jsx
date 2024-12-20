import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import { JobCard } from '@/components/job-card';
import { getJobs } from '@/api/apiJobs';
import { getCompanies } from '@/api/apiCompanies';
import { State } from "country-state-city";
import { useFetch } from "@/hooks/use-fetch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [company_id, setCompany_id] = useState('');

  const { isLoaded } = useUser();

  const { fn: fnJobs, data: jobs, loading: loadingJobs } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const { fn: fncompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fncompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search-query');
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setCompany_id('');
    setLocation('');
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={'100%'} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col px-4 sm:px-8 lg:px-16 py-8">
      {/* Title */}
      <h1 className="gradient-title font-extrabold text-4xl sm:text-6xl text-center mb-8">
        Latest Jobs
      </h1>

      {/* Filters and Search */}
      <div className="w-full flex flex-col sm:flex-row items-center gap-4 mb-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-1 items-center border border-gray-600 rounded bg-gray-800">
          <Input
            type="text"
            placeholder="Search Jobs by Title..."
            name="search-query"
            className="flex-1 px-4 py-2 text-white bg-transparent outline-none"
          />
          <Button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-r">
            Search
          </Button>
        </form>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Location Filter */}
          <Select value={location} onValueChange={(value) => setLocation(value)} className="w-full sm:w-48">
            <SelectTrigger className="bg-gray-800 text-white">
              <SelectValue placeholder="Filter by Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {State.getStatesOfCountry("IN").map(({ name }) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Company Filter */}
          <Select value={company_id} onValueChange={(value) => setCompany_id(value)} className="w-full sm:w-48">
            <SelectTrigger className="bg-gray-800 text-white">
              <SelectValue placeholder="Filter by Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {companies?.map(({ name, id }) => (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      {/* Job Listings */}
      {loadingJobs ? (
        <BarLoader className="mt-4" width={'100%'} color="#36d7b7" />
      ) : jobs?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} savedInit={job?.saved?.length > 0} />
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-center mt-8">
          No Jobs Found 🥲
        </div>
      )}
    </div>
  );
};
