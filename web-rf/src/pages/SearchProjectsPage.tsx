import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Project } from '../common/types';
import ProjectCard from '../components/Projects/ProjectCard';

export default function SearchProjectsPage({ allProjects }: { allProjects: Project[] }) {
  // console.log(allProjects);
  const [filteredData, setFilteredData] = useState<Project[]>(allProjects);
  const [searchFilter, setSearchFilter] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [stackFilter, setStackFilter] = useState('');

  const unique = (list: string[]) => Array.from(new Set(list));
  function filterData() {
    console.log('> Filtering');
    setFilteredData(
      allProjects
        .filter((x: Project) =>
          x.project_name
            .toLowerCase()
            .includes(
              searchFilter === '' || searchFilter == undefined
                ? x.project_name.toLowerCase()
                : searchFilter.toLowerCase()
            )
        )
        .filter(
          (y: Project) =>
            y.area == (areaFilter === '' || areaFilter == undefined ? y.area : areaFilter)
        )
        .filter(
          (z: Project) =>
            z.status ==
            (statusFilter === '' || statusFilter == undefined ? z.status : statusFilter)
        )
        .filter(
          (a: Project) =>
            a.course ==
            (courseFilter === '' || courseFilter == undefined ? a.course : courseFilter)
        )
        .filter((b: Project) =>
          stackFilter === '' || stackFilter == undefined
            ? b
            : b.techs.includes(stackFilter)
        )
    );
  }
  return (
    <div>
      <p>Projects:</p>
      <p>Total of projects: {allProjects.length}</p>

      <Box>
        {/* Filters */}
        <Autocomplete
          options={unique(allProjects.map((project) => project.area))}
          renderInput={(params) => <TextField {...params} label="Filter by Area" />}
          onInputChange={(e, value) => setAreaFilter(value)}
        />
        <Autocomplete
          options={unique(allProjects.map((project) => project.course))}
          renderInput={(params) => <TextField {...params} label="Filter by Course" />}
          onInputChange={(e, value) => setCourseFilter(value)}
        />
        <Autocomplete
          options={unique(allProjects.map((project) => project.status))}
          renderInput={(params) => <TextField {...params} label="Filter by Status" />}
          onInputChange={(e, value) => setStatusFilter(value)}
        />
        <Autocomplete
          options={unique(
            allProjects
              .map((project) => {
                const projectTechs = project.techs.split(';');
                return projectTechs;
              })
              .flat(1)
          )}
          renderInput={(params) => <TextField {...params} label="Filter by Tech" />}
          onInputChange={(e, value) => {
            setStackFilter(value);
          }}
        />
        <TextField
          label="Search by name"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchFilter(e.target.value)
          }
        />
        <Button variant="contained" onClick={filterData}>
          Search
        </Button>
      </Box>
      <Box>
        {/* Filtered Data */}
        <p>Find {filteredData.length} projects</p>
        {filteredData.map((project, index) => {
          return <ProjectCard key={index} project={project} />;
        })}
      </Box>
    </div>
  );
}
