"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import referToComponent from "@/utils/refer";
import Image from "next/image";
import { motion } from "framer-motion";
import { useThemeContext } from "@/context/ThemeContext";

const Project = () => {
  const { theme } = useThemeContext();
  const [load, setLoad] = useState(4);
  const [projects, setProjects] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("more");
  const projectLoadRef = useRef(null);

  const getAllProjects = async () => {
    try {
      // Fetch projects from API route (which has server-side token access)
      const response = await fetch('/api/projects', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        console.error('Failed to fetch projects:', response.statusText);
        setProjects([]);
        return;
      }
      
      const result = await response.json();
      if (result.success && result.data) {
        setProjects([...result.data]);
      } else {
        console.error('Invalid response format:', result);
        setProjects([]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const handleLoading = () => {
    setLoad((prev) => prev + 4);
    if (load >= projects.length - 4) setLoadingStatus("less");
    if (loadingStatus === "less") {
      setLoadingStatus("more");
      setLoad(4);
    }
    loadingStatus === "more"
      ? referToComponent("#latest_project", "start")
      : referToComponent("#project_container", "start");
  };

  return (
    <div id="project_container" className="py-8 lg:py-16">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal sm:font-semibold">
          Projects
        </h1>
        <Button url="/#contact" text="contact me" />
      </div>
      {projects.length < 1 ? (
        <p className={`text-3xl font-bold text-${theme}-txt text-center my-20`}>
          Loading...
        </p>
      ) : (
        <div className="projects uppercase py-8 lg:py-16 grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-x-8 sm:gap-y-16">
          {projects.map((project, index) => {
            const { name, img, tags, repo, website, _id } = project;
            return (
              index < load && (
                <div className="project flex flex-col gap-2" key={_id}>
                  <motion.div
                    initial={{ opacity: 0.4, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="project_img relative w-full h-64 sm:h-80"
                  >
                    <Image
                      className="object-cover"
                      src={img}
                      quality={60}
                      placeholder="blur"
                      blurDataURL="/images/backgroundEffect.jpg"
                      alt={name}
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>
                  <h1 className="text-xl lg:text-2xl font-semibold">{name}</h1>
                  <div className={`tags flex gap-2 text-${theme}-txt/70`}>
                    {tags.map((tag) => (
                      <h2
                        className={`text-sm text-${theme}-txt/70 font-normal`}
                        key={tag}
                      >
                        {tag}
                      </h2>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-2">
                    <Button text={"view project"} url={website} />
                    <Button text={"view code"} url={repo} />
                  </div>
                </div>
              )
            );
          })}
        </div>
      )}
      <div
        className="dropdown flex justify-center lg:justify-start"
        id="latest_project"
        ref={projectLoadRef}
      >
        <button
          className={`btn after:bg-${theme}-secondary-accent relative uppercase tracking-widest pb-1`}
          onClick={handleLoading}
        >{`show ${loadingStatus}...`}</button>
      </div>
    </div>
  );
};

export default React.memo(Project);
