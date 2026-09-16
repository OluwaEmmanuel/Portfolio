export type ProjectCategory =
  | 'UI/UX'
  | 'GRAPHIC DESIGN'
  | 'BRANDING'
  | 'SOCIAL MEDIA'
  | 'WEB DESIGN'
  | 'MOBILE APP';

export interface ProjectScreen {
  title: string;
  description: string;
  imageUrl: string;
  tag?: string;
}

export interface DesignTokenColor {
  name: string;
  hex: string;
  usage: string;
}

export interface DesignTokenTypography {
  role: string;
  family: string;
  size: string;
  weight: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryTags: ProjectCategory[];
  year: string;
  client: string;
  role: string;
  timeline: string;
  tools: string[];
  team: string;
  coverImage: string;
  summary: string;
  description: string;
  liveUrl?: string;
  figmaUrl?: string;
  isFeatured?: boolean;
  projectType: 'ui_ux' | 'graphic_design';

  // UI/UX Specific Case Study Fields
  challenge?: string;
  objectives?: string[];
  targetUsers?: {
    persona: string;
    description: string;
    needs: string[];
  }[];
  researchInsights?: {
    title: string;
    description: string;
    stat?: string;
  }[];
  painPoints?: {
    id: string;
    title: string;
    description: string;
  }[];
  userFlowSteps?: {
    step: string;
    action: string;
    outcome: string;
  }[];
  wireframeSummary?: string;
  wireframeImages?: string[];
  designSystem?: {
    overview: string;
    colors: DesignTokenColor[];
    typography: DesignTokenTypography[];
    componentsSummary: string;
  };
  keyScreens?: ProjectScreen[];
  prototypeSummary?: string;
  prototypeEmbedUrl?: string;
  outcomes?: {
    highlight: string;
    description: string;
    isMetric?: boolean;
  }[];
  lessonsLearned?: string[];

  // Graphic Design Specific Case Study Fields
  brandOverview?: string;
  creativeBrief?: string;
  visualDirection?: string;
  moodboardSummary?: string;
  moodboardImages?: string[];
  logoDevelopment?: {
    concept: string;
    gridConcept: string;
    variations: string[];
  };
  brandApplications?: {
    title: string;
    description: string;
    imageUrl: string;
    category: 'Stationery' | 'Packaging' | 'Digital' | 'Social' | 'Merchandise' | 'Signage';
  }[];
  campaignDeliverables?: {
    format: string;
    description: string;
    imageUrl: string;
  }[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  description: string;
  activities: string[];
  deliverable: string;
}

export interface ToolItem {
  name: string;
  category: 'Design' | 'UI/UX' | 'Prototyping' | 'Code' | 'Collaboration';
  icon: string;
  proficiency: string;
  description: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  location: string;
  type: 'full-time' | 'contract' | 'freelance';
  description: string;
  achievements: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  projectRelation: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budgetRange?: string;
  message: string;
}
