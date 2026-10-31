export interface ProfessionalLink {
  id: string;
  label: string;
  value: string;
  href: string | null;
}

export const links = {
  cv: `${import.meta.env.BASE_URL}Samiya-Zaidi-CV.pdf` as string | null,
  professional: [
    { id: "github", label: "GitHub", value: "", href: "https://github.com/samiyazaidi" },
    { id: "linkedin", label: "LinkedIn", value: "", href: "https://www.linkedin.com/in/samiyazaidi116" },
    { id: "email", label: "Email", value: "samiya20n@gmail.com", href: "mailto:samiya20n@gmail.com" },
    { id: "phone", label: "Phone", value: "8791630128", href: "tel:8791630128" },
  ] satisfies ProfessionalLink[],
};
