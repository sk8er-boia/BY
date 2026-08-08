/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, BoardPost, DashboardStats, PlacementRecord, Candidate, ClientContact } from './types';

export const MOCK_STATS: DashboardStats = {
  newProjects: 3,
  ongoingProjects: 12,
  recommendedCandidates: 20,
  interviewStages: 8,
};

export const MOCK_CANDIDATES: Candidate[] = [
  { id: 'c1', name: '홍길동', currentCompany: '테크스타', currentRole: 'Backend Dev', projectId: '1', status: 'interview_1', updatedAt: '2026-08-05' },
  { id: 'c2', name: '성춘향', currentCompany: '에이아이랩', currentRole: 'AI Engineer', projectId: '1', status: 'recommended', updatedAt: '2026-08-06' },
  { id: 'c3', name: '이몽룡', currentCompany: '커머스원', currentRole: 'Senior Backend', projectId: '1', status: 'negotiation', updatedAt: '2026-08-07' },
  { id: 'c4', name: '심청', currentCompany: '뷰티풀', currentRole: 'Marketing Lead', projectId: '2', status: 'accepted', updatedAt: '2026-08-04' },
  { id: 'c5', name: '장화', currentCompany: '패션홀릭', currentRole: 'Brand Manager', projectId: '2', status: 'interview_final', updatedAt: '2026-08-06' },
  { id: 'c6', name: '홍련', currentCompany: '트렌디', currentRole: 'PR Specialist', projectId: '2', status: 'onboarding', updatedAt: '2026-08-08' },
  { id: 'c7', name: '임꺽정', currentCompany: '데이터웍스', currentRole: 'PM', projectId: '3', status: 'recommended', updatedAt: '2026-08-01' },
];

export const MY_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Senior Backend Engineer',
    client: 'FinTech Innovation',
    status: 'ongoing',
    priority: 'high',
    candidateCount: 5,
    industry: 'IT/Software',
    department: 'Development',
    recruiterId: 'me',
    deadline: '2026-09-10',
    estimatedRevenue: 25000000,
  },
  {
    id: '2',
    title: 'Marketing Director',
    client: 'Global Retail Co.',
    status: 'interview',
    priority: 'medium',
    candidateCount: 3,
    industry: 'Consumer Goods',
    department: 'Marketing',
    recruiterId: 'me',
    deadline: '2026-09-10',
    estimatedRevenue: 35000000,
  },
  {
    id: '3',
    title: 'Product Manager (AI)',
    client: 'Tech Giant',
    status: 'new',
    priority: 'high',
    candidateCount: 0,
    industry: 'IT/Software',
    department: 'Product',
    recruiterId: 'me',
    deadline: '2026-09-10',
    estimatedRevenue: 20000000,
  },
];

export const ALL_PROJECTS: Project[] = [
  ...MY_PROJECTS,
  {
    id: '4',
    title: 'CFO',
    client: 'Manufacturing Lead',
    status: 'ongoing',
    priority: 'medium',
    candidateCount: 2,
    industry: 'Manufacturing',
    department: 'Finance',
    recruiterId: 'other1',
    estimatedRevenue: 50000000,
  },
  {
    id: '5',
    title: 'Sales Manager',
    client: 'Cloud Solutions',
    status: 'closing',
    priority: 'high',
    candidateCount: 12,
    industry: 'Cloud/Saas',
    department: 'Sales',
    recruiterId: 'other2',
    deadline: '2026-09-10',
    estimatedRevenue: 15000000,
  },
  {
    id: '6',
    title: 'HR Business Partner',
    client: 'Pharma Group',
    status: 'ongoing',
    priority: 'low',
    candidateCount: 4,
    industry: 'Bio/Pharma',
    department: 'HR',
    recruiterId: 'other3',
    estimatedRevenue: 18000000,
  },
];

export const REVENUE_TIMELINE_MONTHLY = [
  { name: '1월', value: 31500000 },
  { name: '2월', value: 36400000 },
  { name: '3월', value: 33600000 },
  { name: '4월', value: 42700000 },
  { name: '5월', value: 38500000 },
  { name: '6월', value: 46900000 },
  { name: '7월', value: 50400000 },
  { name: '8월', value: 59500000 },
];

export const REVENUE_TIMELINE_QUARTERLY = [
  { name: '2025 Q4', value: 84000000 },
  { name: '2026 Q1', value: 101500000 },
  { name: '2026 Q2', value: 128100000 },
  { name: '2026 Q3', value: 147000000 },
];

export const PLACEMENT_HISTORY: PlacementRecord[] = [
  {
    id: 'h1',
    candidateName: '이강인',
    projectName: 'Global Operations Director',
    clientName: 'Logistics Pro',
    placementDate: '2026-07-15',
    fee: 45000000,
    status: 'guarantee_period',
  },
  {
    id: 'h2',
    candidateName: '김민재',
    projectName: 'Senior Solution Architect',
    clientName: 'Cloud Systems',
    placementDate: '2026-06-20',
    fee: 32000000,
    status: 'completed',
  },
  {
    id: 'h3',
    candidateName: '손흥민',
    projectName: 'VP of Engineering',
    clientName: 'FinTech Hub',
    placementDate: '2026-05-10',
    fee: 65000000,
    status: 'completed',
  },
];

export const CLIENT_CONTACTS: ClientContact[] = [
  {
    id: 'ct1',
    clientName: '테크스타',
    contactName: '이부장',
    position: '인사팀장',
    lastContactDate: '2026-08-01',
    history: '신규 백엔드 포지션 니즈 확인 및 미팅 조율 완료',
    status: 'active',
  },
  {
    id: 'ct2',
    clientName: '에이아이랩',
    contactName: '박이사',
    position: 'CTO',
    lastContactDate: '2026-07-28',
    history: '기존 추천 후보자 인터뷰 피드백 수령 및 다음 단계 논의',
    status: 'follow_up',
  },
  {
    id: 'ct3',
    clientName: '커머스원',
    contactName: '최대리',
    position: '채용담당자',
    lastContactDate: '2026-07-15',
    history: '프로젝트 홀드 상태 확인, 8월 중 재개 예정',
    status: 'idle',
  },
];

export const BOARD_POSTS: BoardPost[] = [
  {
    id: 'b1',
    title: 'AI 스타트업 CTO 포지션 추천 부탁드립니다',
    content: '현재 시리즈 B 단계의 유망한 AI 스타트업에서 CTO님을 모시고 있습니다. 기술적 깊이와 조직 관리 경험이 풍부하신 분 추천 부탁드립니다.',
    author: '장재혁 상무',
    date: '2026-08-07',
    projectId: '3',
    revenueSplit: '7:3',
    urgency: 'urgent',
    deadline: '2026-09-10',
  },
  {
    id: 'b2',
    title: '글로벌 소비재 기업 마케팅 팀장급 공유',
    content: '연봉 협의 범위가 넓고 복지가 매우 좋은 편입니다. 관련 경력자 있으시면 공유 부탁드려요.',
    author: '이영희 컨설턴트',
    date: '2026-08-08',
    projectId: '2',
    revenueSplit: '5:5',
    urgency: 'normal',
    deadline: '2026-09-10',
  },
];
