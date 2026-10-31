import { ArrowLeft, ArrowUpRight, ExternalLink, Image as ImageIcon } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getProjectBySlug } from "../../data/projects";
import { Chip } from "../ui/Chip";
import { ProjectPreview } from "./ProjectPreview";

function isPublicHttpsUrl(value: string | null): value is string {
  return typeof value === "string" && /^https:\/\/\S+$/i.test(value);
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/#projects" replace />;

  const availableLinks = project.links.filter((link) => isPublicHttpsUrl(link.href));

  return (
    <main className="min-h-screen bg-secondary text-text-primary">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-strong"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to projects
        </Link>

        <header className="mt-7 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.82fr)] md:items-center">
          <div>
            <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-accent-strong uppercase">
              <span className="h-px w-6 bg-accent" /> {project.category}
            </p>
            <h1 className="font-display text-4xl leading-tight tracking-tight text-text-primary sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
              {project.overview}
            </p>
            {project.role && (
              <p className="mt-4 text-sm leading-6 text-text-secondary">
                <span className="font-semibold text-text-primary">My contribution: </span>
                {project.role}
              </p>
            )}
            {availableLinks.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {availableLinks.map((link) => (
                  <a
                    key={`${link.kind}-${link.label}`}
                    href={link.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-primary transition hover:border-accent-strong hover:text-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
                  >
                    {link.label} <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-sm">
            <ProjectPreview project={project} />
          </div>
        </header>

        <section aria-labelledby="stack-heading" className="mt-8 border-y border-border/70 py-5">
          <h2 id="stack-heading" className="text-xs font-semibold tracking-[0.16em] text-text-secondary uppercase">
            Technology stack
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((name) => <Chip key={name} name={name} />)}
          </div>
        </section>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(250px,0.62fr)]">
          <section aria-labelledby="details-heading" className="min-w-0">
            <h2 id="details-heading" className="font-display text-2xl text-text-primary sm:text-3xl">
              Project details
            </h2>
            <div className="mt-5 space-y-7">
              {project.sections.map((section) => (
                <article key={section.title} className="border-b border-border/60 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-text-primary">{section.title}</h3>
                  {section.body && (
                    <p className="mt-2 text-sm leading-7 text-text-secondary">{section.body}</p>
                  )}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-3 space-y-2 pl-5 text-sm leading-6 text-text-secondary marker:text-accent-strong list-disc">
                      {section.bullets.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>

          <aside className="min-w-0">
            <h2 className="font-display text-2xl text-text-primary sm:text-3xl">Screenshots</h2>
            {project.screenshots.length > 0 ? (
              <div className="mt-5 space-y-4">
                {project.screenshots.map((shot) => (
                  <figure key={`${shot.src}-${shot.caption}`} className="overflow-hidden rounded-xl border border-border/70 bg-surface">
                    <img src={shot.src} alt={shot.alt} loading="lazy" className="block aspect-[4/3] w-full object-cover" />
                    <figcaption className="p-3 text-sm text-text-secondary">{shot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-border bg-surface/70 p-5">
                <ImageIcon size={22} className="text-accent-strong" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold text-text-primary">Screenshots can be added here</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Add approved screenshots under <code className="rounded bg-secondary px-1 py-0.5 text-xs">public/projects/{project.slug}/</code> and list them in this project's <code className="rounded bg-secondary px-1 py-0.5 text-xs">screenshots</code> array.
                </p>
              </div>
            )}

            {project.links.some((link) => link.kind === "github") && availableLinks.length === 0 && (
              <p className="mt-4 text-xs leading-5 text-text-secondary">
                The repository link will appear here once the public GitHub URL is configured.
              </p>
            )}
          </aside>
        </div>

        {availableLinks.length === 0 && (
          <p className="mt-8 flex items-start gap-2 rounded-xl border border-border/70 bg-surface/70 p-4 text-xs leading-5 text-text-secondary">
            <ExternalLink size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
            Public links are shown only when a verified URL is supplied. Private admin pages and internal company systems should be presented through approved screenshots, not exposed login URLs.
          </p>
        )}

        <div className="mt-10 border-t border-border/70 pt-6">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-accent-strong hover:text-text-primary">
            <ArrowLeft size={15} aria-hidden="true" /> All projects
          </Link>
        </div>
      </div>
    </main>
  );
}
