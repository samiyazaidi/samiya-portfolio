import { motion } from "framer-motion";
import type { Company } from "../../data/companies";

export function CompanyCard({ company }: { company: Company }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="flex min-h-14 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-surface px-5 py-3 shadow-sm"
    >
      {company.logo ? (
        <img
          src={company.logo}
          alt={company.logoAlt ?? company.name}
          loading="lazy"
          className="max-h-8 max-w-36 object-contain"
        />
      ) : (
        <span className="font-display text-lg font-medium text-dark-primary">
          {company.name}
        </span>
      )}
    </motion.div>
  );
}
