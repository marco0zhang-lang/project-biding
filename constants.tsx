
import React from 'react';
import { Project, Talent } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    projectName: 'Smart City Infrastructure Phase I',
    keywords: 'IoT, Traffic Management, 5G',
    extendedTerms: 'Autonomous Vehicles, Edge Computing, Urban Planning',
    projectContent: 'Deployment of 500 smart sensors across the central business district to monitor real-time traffic flow and optimize signal timing.',
    contractSigningDate: '2023-10-15',
    projectEndDate: '2025-12-31',
    contractAmount: 1250,
    constructionUnit: 'Zhongshan Construction Group',
    contactPerson: 'Zhang Wei',
    contactPhone: '138-0013-8000'
  },
  {
    id: '2',
    projectName: 'Green Valley Water Reclamation',
    keywords: 'Sustainability, Water Treatment, Solar',
    extendedTerms: 'Recycled Water, Carbon Neutrality, Membrane Bio-reactor',
    projectContent: 'Construction of a state-of-the-art water purification facility powered by an on-site 2MW solar farm.',
    contractSigningDate: '2024-01-20',
    projectEndDate: '2026-06-30',
    contractAmount: 4800,
    constructionUnit: 'EcoBuild Solutions Ltd.',
    contactPerson: 'Li Na',
    contactPhone: '139-1122-3344'
  }
];

export const MOCK_TALENTS: Talent[] = [
  {
    id: 't1',
    name: 'Dr. Wang Qiang',
    expertise: 'Structural Engineering, Seismic Design',
    contactPhone: '135-4455-6677',
    socialSecurityStatus: 'Updated',
    lastUpdateDate: '2024-05-01',
    relatedProjects: ['Smart City Infrastructure Phase I']
  },
  {
    id: 't2',
    name: 'Chen Mei',
    expertise: 'Environmental Impact Assessment',
    contactPhone: '137-9988-7766',
    socialSecurityStatus: 'Pending',
    lastUpdateDate: '2024-04-15',
    relatedProjects: ['Green Valley Water Reclamation']
  }
];

export const Icons = {
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  ),
  Project: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
  ),
  Talent: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
  ),
  Sparkles: () => (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
  ),
  Check: () => (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
  ),
  Alert: () => (
    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  )
};
