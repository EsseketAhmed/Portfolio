import { useState } from 'react'
import { motion } from 'motion/react'
import { imgSrc, imgSrcSet } from '../../lib/imageUrl'
import type { Project } from '../../types/sanity'

interface Props {
  projects: Project[]
  title?: string
  filterable?: boolean
}

const projectFilters = [
  { id: 'identity', label: 'Visual Identity', categories: ['Visual Identity'] },
  { id: 'advertising', label: 'Advertising', categories: ['Advertising'] },
  { id: 'creative', label: 'Creative Direction', categories: ['Creative Direction'] },
  { id: 'storytelling', label: 'Digital Storytelling', categories: ['Digital Storytelling'] },
] as const

type ProjectFilter = typeof projectFilters[number]['id']

export default function ProjectsGrid({
  projects,
  title = 'MY LATEST PROJECTS',
  filterable = false,
}: Props) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter | null>(null)
  const selectedFilter = projectFilters.find(filter => filter.id === activeFilter)
  const visibleProjects = selectedFilter
    ? projects.filter(project => selectedFilter.categories.some(category => category === project.category))
    : projects

  return (
    <section className="projects-section" id="projects" aria-label={title}>
      <div className="projects-section__header">
        <span className="section-label">Selected Work</span>
        <h2 className="projects-section__title">{title}</h2>
        {filterable && (
          <div className="projects-filters">
            <p className="projects-filters__label">Browse by discipline</p>
            <div className="projects-filters__options" role="group" aria-label="Filter projects by type">
              {projectFilters.map(filter => {
                const count = projects.filter(project =>
                  filter.categories.some(category => category === project.category),
                ).length

                return (
                  <button
                    key={filter.id}
                    type="button"
                    className={`projects-filters__option${activeFilter === filter.id ? ' is-active' : ''}`}
                    aria-pressed={activeFilter === filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    <span>{filter.label}</span>
                    <span className="projects-filters__count" aria-label={`${count} projects`}>
                      {count.toString().padStart(2, '0')}
                    </span>
                  </button>
                )
              })}
            </div>
            {activeFilter && (
              <button
                type="button"
                className="projects-filters__reset"
                onClick={() => setActiveFilter(null)}
              >
                Show all work
              </button>
            )}
          </div>
        )}
      </div>

      {visibleProjects.length === 0 ? (
        <div className="projects-empty">
          <p>{projects.length === 0 ? 'Projects coming soon.' : 'No projects in this category yet.'}</p>
        </div>
      ) : (
        <div className="projects-grid">
          {visibleProjects.map((project, i) => {
            const slug = project.slug?.current || project.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || project._id

            return (
              <motion.article
                key={project._id}
                className="project-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                <a
                  href={`/projects/${slug}`}
                  className="project-card__link"
                  aria-label={`View project: ${project.title}`}
                >
                <div className="project-card__image">
                  <img
                    src={imgSrc(project.coverImage, 800)}
                    srcSet={imgSrcSet(project.coverImage)}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="project-card__overlay">
                    <span className="project-card__cta">View Project →</span>
                  </div>
                </div>

                <div className="project-card__info">
                  <h3 className="project-card__name">{project.title}</h3>
                  <div className="project-card__meta">
                    <span>{project.client}</span>
                    <span className="project-card__dot" aria-hidden="true" />
                    <span>{project.year}</span>
                    {project.category && (
                      <>
                        <span className="project-card__dot" aria-hidden="true" />
                        <span>{project.category}</span>
                      </>
                    )}
                  </div>
                </div>
              </a>
            </motion.article>
          )
          })}

        </div>
      )}

      {!filterable && <div className="projects-section__footer">
        <a href="/projects" className="btn-secondary">
          View All Work
        </a>
      </div>}
    </section>
  )
}
