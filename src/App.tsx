/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import { Sidebar, MobileNav } from './components/Navigation';
import { DetailedClientManagement, UrgentHighlights, QuickMenu, StatDashboard, AnalyticsDashboard, CompactDashboard, PlacementHistoryList, ClientManagementList } from './components/DashboardSections';
import { ProjectGrid, CollaborationBoard, MyProjectDashboardList } from './components/ProjectListings';
import { CandidateManagementView } from './components/CandidateManagement';
import { ProjectCreation } from './components/ProjectCreation';
import { PEMap } from './components/PEMap';
import { BYPlacement } from './components/BYPlacement';
import { MOCK_STATS, MY_PROJECTS, ALL_PROJECTS, BOARD_POSTS, CANDIDATE_SB_POSTS, PLACEMENT_HISTORY, MOCK_CANDIDATES, CLIENT_CONTACTS, PE_MAP_DATA, BY_PLACEMENT_DATA } from './data';
import { Bell, Search, User, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, CandidateSBPost } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [displayMode, setDisplayMode] = useState<'standard' | 'analytics' | 'compact'>('standard');
  const [myProjects, setMyProjects] = useState<Project[]>(MY_PROJECTS);
  const [isTourOpen, setIsTourOpen] = useState(false);

  const tourSteps = [
    {
      element: '#sidebar-nav',
      intro: '왼쪽 메뉴를 통해 대시보드, 프로젝트 관리 등 주요 페이지로 이동할 수 있습니다.',
      position: 'right'
    },
    {
      element: '[data-tour="dashboard-header"]',
      intro: '오늘의 요약 정보와 대시보드 보기 모드(기본/분석/목록)를 전환할 수 있습니다.',
      position: 'bottom'
    },
    {
      element: '[data-tour="quick-menu"]',
      intro: '인재풀 등록, 이력서 변환 등 자주 쓰는 도구들을 이곳에서 빠르게 실행하세요.',
      position: 'top'
    }
  ];

  const updatePriority = (id: string, priority: Project['priority']) => {
    setMyProjects(prev => prev.map(p => p.id === id ? { ...p, priority } : p));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      {/* Sidebar - Desktop */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 pb-24 md:pb-8 max-h-screen overflow-y-auto">
        <Steps
          enabled={isTourOpen}
          steps={tourSteps}
          initialStep={0}
          onExit={() => setIsTourOpen(false)}
          options={{
            doneLabel: '완료',
            nextLabel: '다음',
            prevLabel: '이전',
            exitOnOverlayClick: true,
            showStepNumbers: false,
          }}
        />
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 md:hidden">
             <h1 className="text-xl font-black text-blue-600 tracking-tighter">BRISK & YOUNG</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full w-96 border border-slate-200">
            <Search size={16} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="프로젝트, 고객사, 후보자 통합 검색..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsTourOpen(true)}
              className="px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors flex items-center gap-1.5 border border-blue-100"
            >
              <Zap size={14} className="fill-blue-600" />
              <span className="text-[11px] font-black uppercase tracking-wider">가이드 투어</span>
            </button>
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-900 leading-tight">장재혁 상무</p>
                <p className="text-[11px] font-semibold text-slate-600 mt-0.5 tracking-tight">기업가치창조(CVC)</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-200">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 max-w-7xl mx-auto space-y-10">
          <AnimatePresence mode="wait">
            {activeTab === 'create_project' && (
              <motion.div
                key="create_project"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ProjectCreation />
              </motion.div>
            )}

            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                {/* Dashboard Mode Switcher */}
                <div data-tour="dashboard-header" className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">안녕하세요, 장재혁 님!</h2>
                    <p className="text-slate-500 text-sm">오늘도 좋은 인재를 찾아볼까요? 화이팅하세요!</p>
                  </div>
                  <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    {[
                      { id: 'standard', label: '기본' },
                      { id: 'analytics', label: '분석' },
                      { id: 'compact', label: '목록' }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setDisplayMode(mode.id as any)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          displayMode === mode.id 
                            ? 'bg-slate-900 text-white shadow-md' 
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {displayMode === 'standard' && (
                  <div className="space-y-10">
                    <section>
                      <UrgentHighlights projects={ALL_PROJECTS} />
                    </section>
                    <section data-tour="quick-menu">
                      <QuickMenu />
                    </section>
                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800">내 프로젝트 현황</h2>
                      </div>
                      <StatDashboard stats={MOCK_STATS} />
                    </section>
                    <section>
                      <MyProjectDashboardList 
                        projects={myProjects} 
                        onUpdatePriority={updatePriority} 
                      />
                    </section>
                    <section>
                      <ProjectGrid projects={ALL_PROJECTS} title="주요 신규 프로젝트" />
                    </section>
                  </div>
                )}

                {displayMode === 'analytics' && (
                  <div className="space-y-10">
                    <section>
                      <StatDashboard stats={MOCK_STATS} />
                    </section>
                    <section>
                      <AnalyticsDashboard projects={ALL_PROJECTS} />
                    </section>
                    <section>
                      <DetailedClientManagement clients={CLIENT_CONTACTS} />
                    </section>
                  </div>
                )}

                {displayMode === 'compact' && (
                  <div className="space-y-10">
                    <section>
                      <PlacementHistoryList history={PLACEMENT_HISTORY} />
                    </section>
                    <section>
                      <ClientManagementList clients={CLIENT_CONTACTS} />
                    </section>
                    <section>
                      <CompactDashboard projects={myProjects} />
                    </section>
                    <section>
                      <QuickMenu />
                    </section>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'company' && (
              <motion.div
                key="company"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* 2. Company All Projects */}
                <ProjectGrid projects={ALL_PROJECTS} />
              </motion.div>
            )}

            {activeTab === 'pe_map' && (
              <motion.div
                key="pe_map"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <PEMap data={PE_MAP_DATA} />
              </motion.div>
            )}

            {activeTab === 'board' && (
              <motion.div
                key="board"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* 5. Collaboration Board */}
                <CollaborationBoard posts={BOARD_POSTS} projects={ALL_PROJECTS} candidatePosts={CANDIDATE_SB_POSTS} />
              </motion.div>
            )}

            {activeTab === 'candidates' && (
              <motion.div
                key="candidates"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <CandidateManagementView 
                  projects={myProjects} 
                  candidates={MOCK_CANDIDATES} 
                />
              </motion.div>
            )}

            {activeTab === 'placement' && (
              <motion.div
                key="placement"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <BYPlacement data={BY_PLACEMENT_DATA} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <footer className="pt-12 pb-8 border-t border-slate-200 mt-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-black text-slate-900 tracking-tighter">BRISK & YOUNG ASSOCIATES</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  © 2026 BRISK & YOUNG ASSOCIATES. ALL RIGHTS RESERVED.
                </p>
              </div>
              <div className="flex items-center gap-8">
                <a href="#" className="text-[11px] font-black text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-wider">이용약관</a>
                <a href="#" className="text-[11px] font-black text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-wider underline decoration-2 underline-offset-4 decoration-blue-100">개인정보처리방침</a>
                <a href="#" className="text-[11px] font-black text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-wider">저작권 정책</a>
                <a href="#" className="text-[11px] font-black text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-wider">이메일무단수집거부</a>
              </div>
            </div>
            <div className="mt-8 text-[10px] font-medium text-slate-400 leading-relaxed max-w-3xl">
              본 시스템 내의 모든 정보는 Brisk & Young Associates의 소중한 자산이며, 무단 복제, 배포 및 상업적 이용을 금합니다. 
              사용자는 개인정보보호법 등 관련 법령을 준수해야 하며, 시스템 이용 시 발생하는 모든 데이터는 보안 가이드라인에 따라 관리됩니다.
            </div>
          </footer>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
