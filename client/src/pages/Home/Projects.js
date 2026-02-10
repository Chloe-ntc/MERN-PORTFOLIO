import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';
function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);

  if (!portfolioData) return null; // Wait for API data

  const { projects } = portfolioData;

  return (
    <div>
      <SectionTitle title="Projects" />
      <div className="flex py-10 gap-10 sm:flex-col">
        {/* Project list */}
        <div className="flex flex-col gap-5 border-l-2 border-[#dd167ccc] w-1/4 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedItemIndex(index)}
              className="cursor-pointer"
            >
              <h1
                className={
                  "text-xl px-5 " +
                  (selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#e0709efe] py-3 sm:w-full"
                    : "text-white")
                }
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="flex flex-1 items-center justify-center sm:my-5">
          <img
            src={projects[selectedItemIndex].image || "/placeholder.png"}
            alt={projects[selectedItemIndex].title}
            className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col flex-1 gap-5 sm:mt-5">
          <h1 className="text-secondary text-2xl font-semibold">
            {projects[selectedItemIndex].title}
          </h1>
          <p className="text-white text-lg">
            {projects[selectedItemIndex].description}
          </p>
        </div>
      </div>

    </div>
  )
}

export default Projects