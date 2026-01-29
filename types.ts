
export interface Project {
  id: string;
  projectName: string;
  keywords: string;
  extendedTerms: string; 
  projectContent: string; 
  contractSigningDate: string;
  projectEndDate: string;
  contractAmount: number; // in 10,000 yuan
  constructionUnit: string;
  contactPerson: string;
  contactPhone: string;
}

export interface Talent {
  id: string;
  name: string;
  expertise: string;
  contactPhone: string;
  socialSecurityStatus: 'Updated' | 'Pending';
  lastUpdateDate: string;
  relatedProjects: string[];
}

export type ViewType = 'dashboard' | 'projects' | 'talent';

export interface ProjectFilters {
  name: string;
  minAmount: string;
  maxAmount: string;
  unit: string;
  dateFrom: string;
  dateTo: string;
}

export interface TalentFilters {
  name: string;
  expertise: string;
  status: 'All' | 'Updated' | 'Pending';
}
