// export type ProjectPreview = "energy" | "mobile" | "drive" | "iot" | "chatwave";
// export type ProjectLinkKind = "website" | "app-store" | "github" | "demo";

// export interface ProjectLink {
//   label: string;
//   kind: ProjectLinkKind;
//   /** Add a real public HTTPS URL when ready. Private admin URLs should not be added. */
//   href: string | null;
// }

// export interface ProjectScreenshot {
//   /** Example: /projects/iot/reseller-overview.webp (stored in public/projects/iot/) */
//   src: string;
//   alt: string;
//   caption: string;
//   group?: string;
// }

// export interface ProjectSection {
//   title: string;
//   body?: string;
//   bullets?: string[];
// }

// export interface Project {
//   id: string;
//   slug: string;
//   title: string;
//   category: string;
//   description: string;
//   stack: string[];
//   preview: ProjectPreview;
//   featured?: boolean;
//   role?: string;
//   overview: string;
//   links: ProjectLink[];
//   screenshots: ProjectScreenshot[];
//   sections: ProjectSection[];
// }

// /**
//  * Keep public links and case-study navigation separate. An absent link is intentional;
//  * do not expose internal admin/login URLs in this list.
//  */
// export const projects: Project[] = [
//   {
//     id: "iot",
//     slug: "iot-dashboards",
//     title: "IoT Dashboards",
//     category: "CONNECTED OPERATIONS",
//     description:
//       "A family of connected-device dashboards, including a reseller platform built from scratch, shared APIs, regional instances, and a floor-plan device view.",
//     stack: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS"],
//     preview: "iot",
//     featured: true,
//     role: "Built the main reseller dashboard from scratch and worked across related dashboard variants and delivery workflows.",
//     overview:
//       "This work covered multiple operational dashboards rather than a single interface. The main reseller dashboard and the company's original dashboard used a shared backend, while their frontends served different audiences and workflows. Several reseller instances reused the same foundations, with regional or feature-specific variations.",
//     links: [],
//     screenshots: [],
//     sections: [
//       {
//         title: "Dashboard family",
//         body:
//           "The main work centered on the reseller dashboard, with related company and regional dashboards built around overlapping operational data and APIs.",
//         bullets: [
//           "Built the main reseller dashboard from scratch.",
//           "Worked with a company dashboard and multiple reseller instances, including variants that shared the same backend.",
//           "Supported region-specific versions and versions with additional functionality."
//         ]
//       },
//       {
//         title: "Device visualization",
//         body:
//           "One variant used a substantially different interface to plot devices directly on a building or floor-plan image, helping users understand device placement in context."
//       },
//       {
//         title: "Architecture",
//         body:
//           "The main dashboard family used React, Node.js, Express, MySQL, and Tailwind CSS. The reseller and company dashboards shared backend services, while separate frontend instances presented the workflows and regional configurations they needed. A related dashboard had a different frontend and backend, and a PHP-based dashboard was also part of the wider group of systems; the PHP work was more limited."
//       },
//       {
//         title: "Development and delivery",
//         body:
//           "GitHub and a CI/CD pipeline were set up for the dashboard work. FileZilla was also used for subsequent server-side file updates. These are part of the delivery workflow rather than the core application stack."
//       }
//     ]
//   },
//   {
//     id: "az-energy-website",
//     slug: "az-energy-website-admin",
//     title: "AZ Energy Website & Admin Panel",
//     category: "SUSTAINABLE ENERGY PLATFORM",
//     description:
//       "A public-facing energy website and its integrated admin panel, managed as one connected project.",
//     stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Tailwind CSS"],
//     preview: "energy",
//     role: "Full-stack development across the website, admin experience, API, database, and deployment workflow.",
//     overview:
//       "The public website and admin panel belong to the same integrated deployment, so they are presented together as one project rather than as separate portfolio entries.",
//     links: [
//       { label: "Visit website", kind: "website", href: null }
//     ],
//     screenshots: [],
//     sections: [
//       {
//         title: "Website and admin",
//         body:
//           "The project combines the public-facing website with its supporting admin experience. The admin panel belongs to the integrated product; it should be shown with screenshots where useful rather than exposing private credentials or internal access URLs."
//       },
//       {
//         title: "Architecture and stack",
//         body:
//           "The frontend uses Next.js and Tailwind CSS. The backend uses NestJS with PostgreSQL and Prisma. The website and API are deployed through Vercel and Railway, respectively."
//       },
//       {
//         title: "Delivery",
//         body:
//           "GitHub-based CI/CD is part of the delivery workflow. Add screenshots of the live website and selected admin screens when they are ready."
//       }
//     ]
//   },
//   {
//     id: "mantis",
//     slug: "mantis-app-admin",
//     title: "Mantis App & Admin Panel",
//     category: "MOBILE PRODUCT & ADMIN",
//     description:
//       "A production mobile app distributed through the Apple App Store, supported by a NestJS backend and a private web admin panel.",
//     stack: ["React Native", "Expo EAS", "NestJS", "MongoDB", "Firebase"],
//     preview: "mobile",
//     role: "Mobile app, backend integration, push notifications, and supporting admin panel development.",
//     overview:
//       "Mantis is presented as one complete product: the public mobile app, its API and notification services, and the private admin panel used by the company.",
//     links: [
//       { label: "View on the App Store", kind: "app-store", href: "https://apps.apple.com/iq/app/mantis-gents-salon/id6761405280" }
//     ],
//     screenshots: [],
//     sections: [
//       {
//         title: "Mobile application",
//         body:
//           "Built with React Native and Expo. Expo EAS was used for app builds and release workflows. The public App Store listing can be linked here when the exact URL is supplied."
//       },
//       {
//         title: "Backend and notifications",
//         body:
//           "The backend uses NestJS and MongoDB. Firebase is used for notification functionality."
//       },
//       {
//         title: "Private admin panel",
//         body:
//           "The company-facing admin panel uses React, Next.js, and Tailwind CSS and is deployed through cPanel. Because it is a private company system, do not link its login or sign-up page publicly. Present selected, sanitized screenshots in this case study instead."
//       }
//     ]
//   },
//   {
//     id: "drive-hub",
//     slug: "drive-hub-app-website",
//     title: "Drive Hub App & Website",
//     category: "CAR RENTAL PLATFORM",
//     description:
//       "A car-rental experience spanning a React Native mobile app and a website backed by shared services and data.",
//     stack: ["React Native", "Expo", "Next.js", "Node.js", "MongoDB"],
//     preview: "drive",
//     role: "Mobile app and web experience development with shared backend/API integration.",
//     overview:
//       "Drive Hub combines a mobile app and website. They use the same backend and database, sharing some APIs while retaining separate endpoints where each platform needs different behavior.",
//     links: [
//       { label: "Visit website", kind: "website", href: null },
//       { label: "View mobile app", kind: "app-store", href: null }
//     ],
//     screenshots: [],
//     sections: [
//       {
//         title: "Mobile app and website",
//         body:
//           "The mobile application uses React Native and Expo. The website uses Next.js. Both connect to the same backend platform, with a mix of shared and platform-specific API endpoints."
//       },
//       {
//         title: "Backend and data",
//         body:
//           "Node.js and Express provide backend services, with MongoDB as the database. Add the public website and mobile app store URLs to the action links once the final URLs are available."
//       }
//     ]
//   },
//   {
//     id: "chatwave",
//     slug: "chatwave",
//     title: "Chatwave",
//     category: "COLLEGE PROJECT",
//     description:
//       "A college web project built with React, Next.js, and PostgreSQL.",
//     stack: ["React", "Next.js", "PostgreSQL"],
//     preview: "chatwave",
//     role: "Academic project.",
//     overview:
//       "Chatwave is a college project. Its case study can stay concise, with a public repository link and screenshots if available.",
//     links: [
//       { label: "View source on GitHub", kind: "github", href: null }
//     ],
//     screenshots: [],
//     sections: [
//       {
//         title: "Implementation",
//         body:
//           "The project uses React and Next.js for the web experience and PostgreSQL for data storage. Add the public GitHub repository URL when ready."
//       }
//     ]
//   }
// ];

// export function getProjectBySlug(slug: string | undefined): Project | undefined {
//   if (!slug) return undefined;
//   return projects.find((project) => project.slug === slug);
// }

export type ProjectPreview = "energy" | "mobile" | "drive" | "iot" | "chatwave";
export type ProjectLinkKind = "website" | "app-store" | "github" | "demo";

export interface ProjectLink {
  label: string;
  kind: ProjectLinkKind;
  /** Public HTTPS URL only. Keep private admin URLs out of this list. */
  href: string | null;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption: string;
  group?: string;
}

export interface ProjectSection {
  title: string;
  body?: string;
  bullets?: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  /** Extra copy shown when the card's + button is expanded. */
  expandedDescription: string;
  stack: string[];
  preview: ProjectPreview;
  /** First image is the main card cover. */
  coverImage: string;
  /** Optional second image shown as an inset preview (Drive Hub web + app). */
  secondaryCoverImage?: string;
  /** Local or public image shown if a live thumbnail cannot load. */
  fallbackImage?: string;
  featured?: boolean;
  role?: string;
  overview: string;
  links: ProjectLink[];
  screenshots: ProjectScreenshot[];
  sections: ProjectSection[];
}

/**
 * Live covers for the three existing public URLs are generated on demand from those
 * exact pages using thum.io. They are screenshots of the supplied public pages, not
 * invented product screenshots. If the thumbnail service is blocked, ProjectPreview
 * falls back to a designed SVG cover (and Mantis also has an official-site image fallback).
 *
 * IoT Dashboard and Chatwave covers are original visuals stored under public/projects/.
 * Link entries with href: null intentionally render as disabled icons until a public URL
 * is supplied. Do not expose private admin/login URLs.
 */
const pageThumbnail = (url: string) =>
  `https://image.thum.io/get/width/1400/crop/780/noanimate/${url}`;

const AZ_ENERGY_URL = "https://azenergystudio.com/";
const MANTIS_APP_URL = "https://apps.apple.com/iq/app/mantis-gents-salon/id6761405280";
const DRIVE_HUB_URL = "https://thedrivehub.com/";
const DRIVE_HUB_APP_URL = "https://apps.apple.com/iq/iphone/search?term=thedrivehub";
const NOOR_AL_FIKR_URL = "https://nooralfikr.com/";
const CME_URL = "https://cme.qa/";
const CALIBRIX_URL =
  "https://dashboard.enggenv.com/calib_cert/#/login";

export const projects: Project[] = [
 
  {
    id: "mantis",
    slug: "mantis-app-admin",
    title: "Mantis Gents Salon App & Admin",
    category: "MOBILE PRODUCT & ADMIN",
    description:
      "A digital platform for an Abu Dhabi-based gents salon, bringing its services, offers and packages to customers through a mobile app.",
   expandedDescription:
  "The mobile app allows customers to explore the salon, discover its services and browse available offers and packages. Its connected admin panel gives the salon a dynamic way to manage the information and offerings displayed in the app, update content and send notifications directly to customers.",
    stack: ["React Native", "Expo EAS", "NestJS", "MongoDB", "Firebase", "Next.js", "Tailwind CSS"],
    preview: "mobile",
    coverImage: "/samiya-portfolio/projects/mantis-gents-salon.webp",
    role: "Mobile app, backend integration, push notifications, and supporting admin panel development.",
   overview:
  "A complete digital solution for an operating gents salon in Abu Dhabi, combining a customer-facing mobile application with a centralized management system. The app keeps customers informed about the salon and its offerings, while the admin panel allows the business to maintain and update its digital presence independently.",
    links: [{ label: "View Mantis on the App Store", kind: "app-store", href: MANTIS_APP_URL }],
    screenshots: [],
   sections: [
  {
    title: "Customer mobile experience",
    body:
      "Customers can explore salon information, discover available services and view offers and packages through a dedicated mobile application."
  },
  {
    title: "Dynamic content management",
    body:
      "The connected admin panel allows the salon team to manage the information and offerings displayed in the application, keeping content up to date without requiring app updates for routine changes."
  },
  {
    title: "Customer notifications",
    body:
      "The management system also supports sending notifications to customers, helping the salon communicate updates, offers and important announcements."
  }
]
  },
    {
    id: "az-energy-website",
    slug: "az-energy-website-admin",
    title: "AZ Energy Website & Admin Panel",
    category: "SUSTAINABLE ENERGY PLATFORM",
    description:
  "A dynamic company website with a dedicated admin panel that allows the team to manage and update its online presence independently.",
    expandedDescription:
  "The website presents the company's identity, information and offerings through a polished public-facing experience. Its connected admin panel gives the company control over its website content, allowing the team to make updates and manage its online presence independently without relying on developers for routine changes.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Tailwind CSS"],
    preview: "energy",
    coverImage: "/samiya-portfolio/projects/az-energy-studio.webp",
    featured: true,
    role: "Full-stack development across the website, admin experience, API, database, and deployment workflow.",
    overview:
  "A complete website and content-management solution designed to give AZ Energy Studio control over its digital presence. The public website and admin panel work together as one connected product, with a management experience that allows the company to maintain its website on its own.",
    links: [{ label: "Visit AZ Energy Studio", kind: "website", href: AZ_ENERGY_URL }],
    screenshots: [],
   sections: [
  {
    title: "Dynamic company website",
    body:
      "A public-facing website that communicates the company's identity, expertise and offerings through a responsive and modern digital experience."
  },
  {
    title: "Independent content management",
    body:
      "The integrated admin panel allows the company team to manage website information and make content updates independently, without needing developer involvement for routine changes."
  },
  {
    title: "Full-stack implementation",
    body:
      "The frontend is built with Next.js and Tailwind CSS, supported by a NestJS backend, PostgreSQL database and Prisma ORM. The website and backend are deployed through Vercel and Railway."
  }
]
  },
  {
    id: "drive-hub",
    slug: "drive-hub-app-website",
    title: "Drive Hub App & Website",
    category: "CAR RENTAL PLATFORM",
   description:
  "A UAE-based car rental platform that allows customers to explore and rent vehicles through a website and dedicated mobile application.",
    expandedDescription:
  "Drive Hub brings its car rental service to customers through both a mobile application and a website. Customers can explore available vehicles and access the rental service digitally, with Stripe integrated to handle online payments. Both platforms connect to a shared backend and database.",
    stack: [
  "React Native",
  "Expo",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "Stripe"
],
    preview: "drive",
    coverImage: pageThumbnail(DRIVE_HUB_URL),
    featured: true,
    role: "Mobile app and web experience development with shared backend/API integration.",
    overview:
  "A digital car rental platform operating in the UAE, offering customers a convenient way to access vehicle rental services through web and mobile applications. The platform brings the customer experience, rental workflows and integrated online payments together across both channels.",
    links: [
      { label: "Visit The Drive Hub website", kind: "website", href: DRIVE_HUB_URL },
      { label: "View The Drive Hub on the App Store", kind: "app-store", href: DRIVE_HUB_APP_URL }
    ],
    screenshots: [],
   sections: [
  {
    title: "Car rental experience",
    body:
      "A digital platform that allows customers in the UAE to explore available cars and access rental services through an easy-to-use online experience."
  },
  {
    title: "Website and mobile application",
    body:
      "The service is available through a Next.js website and a React Native mobile application built with Expo, providing customers with access across devices."
  },
  {
    title: "Integrated online payments",
    body:
      "Stripe payment integration enables customers to make online payments as part of the rental experience."
  },
  {
    title: "Shared backend architecture",
    body:
      "Both platforms connect to a Node.js and Express backend with MongoDB, sharing core services and data while supporting platform-specific API requirements."
  }
]
  },
   {
    id: "iot",
    slug: "iot-dashboards",
    title: "IoT Dashboards",
    category: "CONNECTED OPERATIONS",
    description:
    "An IoT monitoring and management platform for live environmental data, device control, reporting and customizable reseller dashboards.",
   expandedDescription:
  "The platform allows users to monitor connected environmental devices, view live readings from weather monitoring systems, flow meters and other equipment, and analyse data through interactive charts. Users can also download reports in PDF and CSV formats. Its reseller system includes customizable dashboards that can be branded and configured before being assigned to individual resellers, while a dedicated Super Admin panel manages users, devices, parameters and their display sequence." ,
    stack: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS"],
    preview: "iot",
    coverImage: "/samiya-portfolio/projects/iot-dashboard.webp",
    featured: true,
    role: "Main reseller dashboard development, related frontend variants, and delivery workflow.",
    overview:
  "A connected-device monitoring ecosystem designed to make IoT data accessible, organized and actionable. It combines live environmental monitoring, historical data visualization, report exports, reseller-specific dashboard customization and centralized administration into a flexible platform.",
    links: [{ label: "Dashboard website (link not public yet)", kind: "website", href: null }],
    screenshots: [],
    sections: [
  {
    title: "Live device monitoring",
    body:
      "Users can monitor connected environmental devices and access live readings from equipment such as weather monitoring systems, flow meters and other sensors."
  },
  {
    title: "Data visualization and reporting",
    body:
      "Interactive charts help users understand device readings and data trends. Reports can also be downloaded in PDF and CSV formats for analysis and record keeping."
  },
  {
    title: "Customizable reseller dashboards",
    body:
      "A dedicated customization experience in the admin panel allows administrators to configure a reseller dashboard before handing it over. They can personalize its layout, colors, logo and reseller details to match the individual reseller's identity."
  },
  {
    title: "Super Admin management",
    body:
      "The centralized Super Admin panel provides control over users, devices and parameters across the platform. Administrators can also reorder parameters through a simple drag-and-drop interface, allowing the updated sequence to be reflected in the stored configuration."
  }
],
  },

  {
    id: "chatwave",
    slug: "chatwave",
    title: "Chatwave",
    category: "COLLEGE PROJECT",
   description:
  "An internal college communication platform connecting teachers and students through messaging, groups and shared academic resources.",
   expandedDescription:
  "Chatwave was designed to bring college communication into one dedicated platform. Teachers and students can chat, create groups, share study materials and access relevant student details without having to exchange personal phone numbers or rely on private messaging applications for university communication.",
    stack: ["React", "Next.js", "PostgreSQL"],
    preview: "chatwave",
    coverImage: "/samiya-portfolio/projects/chatwave.webp",
    role: "Academic project.",
    overview:
  "An internal communication platform designed around the needs of a college community. Chatwave brings teachers and students together in one shared digital environment, making academic communication and resource sharing easier while reducing the need to exchange personal contact numbers or use external private messaging apps.",
    links: [{ label: "GitHub repository (URL to be added)", kind: "github", href: "https://github.com/samiyazaidi/chatwave" }],
    screenshots: [],
   sections: [
  {
    title: "Centralized college communication",
    body:
      "A shared platform where teachers and students can connect and communicate without depending on personal phone numbers or separate private messaging applications."
  },
  {
    title: "Direct messaging and groups",
    body:
      "Users can chat with one another and create groups for classes or academic discussions, making it easier to communicate with multiple students in one place."
  },
  {
    title: "Academic resource sharing",
    body:
      "Groups provide a convenient way for teachers and students to share study materials and other learning resources within their college community."
  },
  {
    title: "Student information",
    body:
      "Teachers can access relevant details about their students within the same platform, bringing communication and student-related information into one environment."
  }
]
  },
  
{
  id: "noor-al-fikr",
  slug: "noor-al-fikr-website",
  title: "Noor Al Fikr Website",
  category: "COMPANY WEBSITE · SAUDI ARABIA",
  description:
    "A responsive company website for a Saudi-based environmental solutions provider, showcasing its products, monitoring solutions and services through modern design and seamless navigation.",
  expandedDescription:
    "The website presents Noor Al Fikr's company profile, environmental monitoring products, engineering services and industry solutions. It also features integrated chat functionality, providing visitors with a convenient way to connect with the company.",
  stack: ["React"],
  preview: "energy",
  coverImage: pageThumbnail(NOOR_AL_FIKR_URL),
  role: "Frontend development, responsive UI implementation and chat integration.",
  overview:
    "A modern digital presence for Noor Al Fikr, bringing together its company information, environmental monitoring solutions, products and services in an accessible and responsive website.",
  links: [
    {
      label: "Visit Noor Al Fikr",
      kind: "website",
      href: NOOR_AL_FIKR_URL
    }
  ],
  screenshots: [],
  sections: [
    {
      title: "Company profile and solutions",
      body:
        "Presents the company's expertise in environmental monitoring, including air, water and weather monitoring equipment and connected solutions."
    },
    {
      title: "Products and services",
      body:
        "Showcases its monitoring products, engineering services, turnkey solutions, technical support and system integration capabilities."
    },
    {
      title: "Integrated chat experience",
      body:
        "Includes chat functionality to make it easier for website visitors to connect and communicate with the company."
    }
  ]
},
{
  id: "cme-website",
  slug: "cme-website",
  title: "CME Website",
  category: "COMPANY WEBSITE · QATAR",
  description:
    "A responsive website for a Qatar-based engineering and energy services company, featuring modern design, GSAP-powered animations and seamless navigation.",
  expandedDescription:
    "The website brings together CME's company profile, engineering capabilities, subsea and EPCI expertise, maintenance services and project experience through an engaging digital experience.",
  stack: ["React", "GSAP"],
  preview: "energy",
  coverImage: pageThumbnail(CME_URL),
  role: "Frontend development, responsive UI and GSAP animation implementation.",
  overview:
    "A modern company website designed to showcase CME's engineering, trading and energy services, highlighting its industry expertise, capabilities, achievements and commitment to delivering reliable engineering solutions.",
  links: [
    {
      label: "Visit CME Website",
      kind: "website",
      href: CME_URL
    }
  ],
  screenshots: [],
  sections: [
    {
      title: "Company profile and services",
      body:
        "Presents CME's engineering and energy services, including comprehensive engineering solutions, subsea and EPCI expertise, and maintenance and technical support."
    },
    {
      title: "Projects and capabilities",
      body:
        "Highlights the company's industry experience, engineering expertise, project achievements and work across offshore and onshore energy infrastructure."
    },
    {
      title: "Interactive user experience",
      body:
        "Features responsive layouts, smooth GSAP animations and intuitive navigation to create an engaging browsing experience."
    }
  ]
},
{
  id: "calibrix",
  slug: "calibrix-certificate-generation",
  title: "Calibrix – Certificate Generation System",
  category: "WEB APPLICATION",
  description:
    "A web-based certificate generation system that allows users to create personalized certificates with custom details and designs.",
  expandedDescription:
    "Calibrix provides a flexible certificate generation solution, allowing users to customize certificate details and generate professionally designed PDF certificates.",
  stack: ["React", "Express", "MySQL", "React-to-PDF"],
  preview: "iot",
  coverImage: pageThumbnail(CALIBRIX_URL),
  role: "Full-stack development, backend integration and PDF generation.",
  overview:
    "A certificate generation web application designed to simplify the creation of customized certificates. It combines a responsive React frontend with an Express backend and MySQL database, supporting personalized certificate creation and PDF output.",
  links: [
    {
      label: "Open Calibrix",
      kind: "demo",
      href: CALIBRIX_URL
    }
  ],
  screenshots: [],
  sections: [
    {
      title: "Custom certificate generation",
      body:
        "Allows users to generate certificates with personalized information and customized designs based on individual requirements."
    },
    {
      title: "PDF generation",
      body:
        "Uses React-to-PDF to convert certificate designs into downloadable PDF documents."
    },
    {
      title: "Full-stack implementation",
      body:
        "Built with React, Express and MySQL, providing an integrated frontend, backend and database solution."
    }
  ]
}

  
];

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  if (!slug) return undefined;
  return projects.find((project) => project.slug === slug);
}
