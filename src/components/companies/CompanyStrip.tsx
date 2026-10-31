import { companies } from "../../data/companies";
import { CompanyCard } from "./CompanyCard";

export function CompanyStrip() {
  return (
    <section
      aria-labelledby="company-title"
      className="border-y border-border/70 bg-primary py-4 sm:py-5"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 sm:px-8 md:flex-row md:items-center md:gap-8 lg:px-10">
        <h2
          id="company-title"
          className="max-w-48 shrink-0 font-display text-xl leading-tight text-dark-primary sm:text-2xl"
        >
          Companies I’ve worked with
        </h2>
        <div className="flex min-w-0 flex-1 flex-wrap gap-3">
          {companies.map((company) => (
            <CompanyCard key={company.name} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}
