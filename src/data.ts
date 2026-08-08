/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, BoardPost, DashboardStats, PlacementRecord, Candidate, ClientContact, PEFirm, IndustryPlacement } from './types';

export const MOCK_STATS: DashboardStats = {
  newProjects: 3,
  ongoingProjects: 12,
  recommendedCandidates: 20,
  interviewStages: 8,
};

export const MOCK_CANDIDATES: Candidate[] = [
  { id: 'c1', name: '홍길동', currentCompany: '테크스타', currentRole: 'Backend Dev', projectId: '1', status: 'interview_1', updatedAt: '2026-08-05', projectType: 'individual', estimatedRevenue: 15000000 },
  { id: 'c2', name: '성춘향', currentCompany: '에이아이랩', currentRole: 'AI Engineer', projectId: '1', status: 'recommended', updatedAt: '2026-08-06', projectType: 'co_platform_1', collaborator: '이순신', estimatedRevenue: 20000000 },
  { id: 'c3', name: '이몽룡', currentCompany: '커머스원', currentRole: 'Senior Backend', projectId: '1', status: 'negotiation', updatedAt: '2026-08-07', projectType: 'co_platform_2', collaborator: '이산', estimatedRevenue: 25000000 },
  { id: 'c4', name: '심청', currentCompany: '뷰티풀', currentRole: 'Marketing Lead', projectId: '2', status: 'accepted', updatedAt: '2026-08-04', projectType: 'individual', estimatedRevenue: 12000000 },
  { id: 'c5', name: '장화', currentCompany: '패션홀릭', currentRole: 'Brand Manager', projectId: '2', status: 'interview_final', updatedAt: '2026-08-06', projectType: 'co_platform_1', collaborator: '정약용', estimatedRevenue: 18000000 },
  { id: 'c6', name: '홍련', currentCompany: '트렌디', currentRole: 'PR Specialist', projectId: '2', status: 'onboarding', updatedAt: '2026-08-08', projectType: 'co_platform_2', collaborator: '이순신', estimatedRevenue: 14000000 },
  { id: 'c7', name: '임꺽정', currentCompany: '데이터웍스', currentRole: 'PM', projectId: '3', status: 'recommended', updatedAt: '2026-08-01', projectType: 'individual', estimatedRevenue: 16000000 },
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
    history: '신규 백엔드 포지션 니즈 확인 및 JD 수령 완료. 8월 중순 면접 진행 예정.',
    status: 'project_in_progress',
  },
  {
    id: 'ct2',
    clientName: '에이아이랩',
    contactName: '박이사',
    position: 'CTO',
    lastContactDate: '2026-07-28',
    history: '시리즈 B 펀딩 성공 후 AI 엔지니어 조직 확장 논의 중. 계약서 검토 단계.',
    status: 'project_pending',
  },
  {
    id: 'ct3',
    clientName: '커머스원',
    contactName: '최대리',
    position: '채용담당자',
    lastContactDate: '2026-07-15',
    history: '이커머스 운영 총괄 포지션에 대한 헤드헌팅 제안 진행 중. 경쟁사 조사 완료.',
    status: 'bd_in_progress',
  },
  {
    id: 'ct4',
    clientName: '물류프로',
    contactName: '김상무',
    position: 'COO',
    lastContactDate: '2026-08-05',
    history: '물류 센터 자동화 전문가 추천 요청 수령. 후보자 롱리스트 작성 중.',
    status: 'project_in_progress',
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

export const PE_MAP_DATA: PEFirm[] = [
  {
    id: 'pe1',
    name: '아크앤파트너스',
    size: 100,
    portfolio: [
      { id: 'pc1', name: '브레이브모바일' },
      { id: 'pc2', name: '팀스파르타' },
      { id: 'pc3', name: '창신' },
    ]
  },
  {
    id: 'pe2',
    name: '앵커',
    size: 80,
    portfolio: [
      { id: 'pc4', name: '국제전기' },
      { id: 'pc5', name: '솔리티' },
    ]
  },
  {
    id: 'pe3',
    name: 'MBK 파트너스',
    size: 150,
    portfolio: [
      { id: 'pc6', name: '홈플러스' },
      { id: 'pc7', name: '롯데카드' },
    ]
  },
  {
    id: 'pe4',
    name: '한앤컴퍼니',
    size: 120,
    portfolio: [
      { id: 'pc8', name: '남양유업' },
      { id: 'pc9', name: 'SKC 코오롱PI' },
    ]
  }
];

export const BY_PLACEMENT_DATA: IndustryPlacement[] = [
  {
    id: 'ind1',
    industry: 'IT/Software',
    size: 200,
    companies: [
      { id: 'c1', name: '테크스타', count: 12 },
      { id: 'c2', name: '에이아이랩', count: 8 },
      { id: 'c3', name: '핀테크허브', count: 15 },
    ]
  },
  {
    id: 'ind2',
    industry: 'Finance',
    size: 150,
    companies: [
      { id: 'c4', name: '미래에셋', count: 5 },
      { id: 'c5', name: '한국투자', count: 7 },
    ]
  },
  {
    id: 'ind3',
    industry: 'Bio/Pharma',
    size: 100,
    companies: [
      { id: 'c6', name: '삼성바이오', count: 4 },
      { id: 'c7', name: '셀트리온', count: 6 },
    ]
  }
];
