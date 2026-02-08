import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';
function Projects() {
   const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);

  if (!portfolioData) return null; // Wait for API data

  const {projects } = portfolioData;
 
  return (
    <div>
        <SectionTitle title="Projects"/>
         <div className="flex py-10 gap-10 sm:flex-col">
                <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-2/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
                  {projects.map((projects, index) => (
                    <div
                      onClick={() => {
                        setSelectedItemIndex(index);
                      }}
                      className="cursor-pointer"
                    >
                      <h1
                        className={
                          "text-xl px-5 " +
                          (selectedItemIndex === index
                            ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3 sm:w-full"
                            : "text-white")
                        }
                      >
                        {projects.title}
                      </h1>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-5">
                  <h1 className="text-secondary text-xl">
                    {projects[selectedItemIndex].title}
                  </h1>
                  <p className='text-white'>
                    {projects[selectedItemIndex].description}     
                  </p>
                  <p className="text-white">
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur.
                  </p>
                </div>
              </div>
    </div>
  )
}

export default Projects