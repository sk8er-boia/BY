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
  status: 'active' | 'idle' | 'follow_up';
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

export interface DashboardStats {
  newProjects: number;
  ongoingProjects: number;
  recommendedCandidates: number;
  interviewStages: number;
}
