"use client";
import { useState } from "react";
export default function Project({ projects = [], unavailable = false }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? projects : projects.slice(0, 4);
  return (
    <section
      id="work"
      className="work-section container section-space"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / SELECTED WORK</p>
          <h2 id="work-title">Ideas, made tangible.</h2>
        </div>
        <p>
          A selection of web projects.
          <br />
          Built to learn. Made to be used.
        </p>
      </div>
      {projects.length ? (
        <div className="project-grid" id="project-list">
          {visible.map((project, index) => (
            <article className="project-card" key={project._id}>
              <a
                className={"project-visual project-tone-" + (index % 4)}
                href={project.website || project.repo}
                target="_blank"
                rel="noreferrer"
                aria-label={"Explore " + project.name}
              >
                {project.img ? (
                  <img
                    src={project.img}
                    alt={project.name + " interface"}
                    loading="lazy"
                    width="800"
                    height="550"
                  />
                ) : (
                  <span className="project-placeholder">{project.name}</span>
                )}
                <span className="project-open" aria-hidden="true">
                  ↗
                </span>
              </a>
              <div className="project-heading">
                <h3>{project.name}</h3>
                <span className="project-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              {project.description && (
                <p className="project-description">{project.description}</p>
              )}
              <div className="project-bottom">
                <div className="project-tags">
                  {(project.tags || []).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={"Live site for " + project.name}
                    >
                      Live ↗
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={"Source code for " + project.name}
                    >
                      Code ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>
            {unavailable
              ? "Projects couldn’t be loaded right now."
              : "New projects are on the way."}
          </p>
          <a
            className="text-link"
            href="https://github.com/Ram0O7"
            target="_blank"
            rel="noreferrer"
          >
            Explore my GitHub ↗
          </a>
        </div>
      )}
      {projects.length > 4 && (
        <div className="section-bottom">
          <span>
            {expanded ? projects.length : 4} of {projects.length} projects
          </span>
          <button
            className="button button-outline"
            aria-expanded={expanded}
            aria-controls="project-list"
            onClick={() => {
              setExpanded(!expanded);
              if (expanded) document.getElementById("work")?.scrollIntoView();
            }}
          >
            {expanded ? "Show less −" : "View all projects +"}
          </button>
        </div>
      )}
    </section>
  );
}
