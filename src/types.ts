/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  client: string;
  status: 'new' | 'ongoing' | 'closing' | 'interview';
  priority: 'high' | 'medium' | 'low';
  candidateCount: number;
  industry: string;
  department: string;
  deadline?: string;
  recruiterId: string;
  estimatedRevenue: number; // In Korean Won (KRW)
  revenueSplit?: string; // e.g. "8:2"
}

export interface ClientContact {
  id: string;
  clientName: string;
  contactName: string;
  position: string;
  lastContactDate: string;
  history: string;
  status: 'project_in_progress' | 'project_pending' | 'bd_in_progress' | 'idle';
}

export interface PlacementRecord {
  id: string;
  candidateName: string;
  projectName: string;
  clientName: string;
  placementDate: string;
  fee: number;
  status: 'completed' | 'guarantee_period';
}

export type CandidateStatus = 'recommended' | 'interview_1' | 'interview_final' | 'negotiation' | 'accepted' | 'onboarding';

export interface Candidate {
  id: string;
  name: string;
  currentCompany: string;
  currentRole: string;
  projectId: string;
  status: CandidateStatus;
  updatedAt: string;
  projectType: 'individual' | 'co_platform_1' | 'co_platform_2';
  collaborator?: string;
  estimatedRevenue?: number;
}

export interface BoardPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  projectId?: string;
  revenueSplit?: string;
  urgency?: 'normal' | 'urgent' | 'immediate';
  deadline?: string;
}

export interface CandidateSBPost {
  id: string;
  type: 'recommendation' | 'caution' | 'off_limit';
  name: string;
  company?: string;
  role?: string;
  content: string;
  author: string;
  date: string;
}

export interface DashboardStats {
  newProjects: number;
  ongoingProjects: number;
  recommendedCandidates: number;
  interviewStages: number;
}

export interface PortfolioCompany {
  id: string;
  name: string;
}

export interface PEFirm {
  id: string;
  name: string;
  size: number;
  portfolio: PortfolioCompany[];
}

export interface IndustryPlacement {
  id: string;
  industry: string;
  size: number;
  companies: { id: string; name: string; count: number }[];
}
