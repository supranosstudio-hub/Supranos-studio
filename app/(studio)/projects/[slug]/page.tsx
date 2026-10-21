import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StickerView from "@/components/studio/StickerView";
import {
  STUDIO_PROJECTS,
  STUDIO_TITLE,
  projectHref,
  type StudioProject,
} from "@/content/studio";

const MINI_ROTATIONS = [-6, 5, -3, 6, -4];

const ARROW_LEFT = (
  <svg
    className="ar-l"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 12H5" />
    <path d="m11 6-6 6 6 6" />
  </svg>
);
const ARROW_RIGHT = (
  <svg
    className="ar-r"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);
const ARROW_OUT = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7" />
    <path d="M8.5 7H17v8.5" />
  </svg>
);

const pages = STUDIO_PROJECTS.filter((p) => !p.route);

export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = pages.find((p) => p.slug === slug);
  return {
    title: project
      ? `${project.name} · ${STUDIO_TITLE}`
      : `Not found · ${STUDIO_TITLE}`,
    description: project?.line,
  };
}

function ProjectCta({ project }: { project: StudioProject }) {
  if (!project.url) {
    return (
      <span className="btn off" aria-disabled="true">
        Link coming soon
      </span>
    );
  }
  return (
    <a
      className="btn"
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      Visit {project.name} {ARROW_OUT}
    </a>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = STUDIO_PROJECTS.find((p) => p.slug === slug && !p.route);
  if (!project) notFound();

  const index = STUDIO_PROJECTS.indexOf(project);
  const next = STUDIO_PROJECTS[(index + 1) % STUDIO_PROJECTS.length];
  const others = STUDIO_PROJECTS.filter((p) => p !== project);

  return (
    <>
      <article className="proj view fade">
        <div className="proj-stage">
          <StickerView
            project={project}
            link={false}
            showTag={false}
            peel={false}
          />
        </div>
        <div className="proj-copy">
          <h1 className="stext shine" data-text={project.name}>
            {project.name}
          </h1>
          <p className="proj-line">{project.line}</p>
          <p className="proj-about">{project.about}</p>
          <dl className="proj-facts">
            {project.facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          <ul className="proj-points">
            {project.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
          <ProjectCta project={project} />
        </div>
      </article>
      <nav className="proj-nav" aria-label="More projects">
        <Link className="navlink" href="/">
          {ARROW_LEFT}All stickers
        </Link>
        <div className="minis">
          {others.map((p, j) => (
            <StickerView
              key={p.key}
              project={p}
              mini
              showTag={false}
              peel={false}
              rot={MINI_ROTATIONS[j % MINI_ROTATIONS.length]}
            />
          ))}
        </div>
        <Link className="navlink next" href={projectHref(next)}>
          Next: {next.name} {ARROW_RIGHT}
        </Link>
      </nav>
    </>
  );
}
