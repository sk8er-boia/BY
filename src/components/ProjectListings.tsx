/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Filter, Search, MessageCircle, Share2, MoreVertical, Calendar, Building2, ChevronDown, CheckCircle2, AlertTriangle, Users2, User } from 'lucide-react';
import { Project, BoardPost, CandidateSBPost } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export function ProjectGrid({ projects, title = "회사 모든 프로젝트" }: { projects: Project[], title?: string }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="프로젝트, 고객사 검색..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((p) => (
          <motion.div 
            layout
            key={p.id} 
            className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
          >
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  p.priority === 'high' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  {p.industry}
                </span>
                <button className="text-slate-300 hover:text-slate-500">
                  <MoreVertical size={18} />
                </button>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{p.title}</h3>
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                <Building2 size={14} />
                <span>{p.client}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[10px] font-medium border border-slate-100">{p.department}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                  p.status === 'new' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  p.status === 'ongoing' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                  p.status === 'interview' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                  'bg-red-50 text-red-600 border-red-100'
                }`}>
                  {p.status === 'new' ? '신규' : p.status === 'ongoing' ? '진행중' : p.status === 'interview' ? '인터뷰' : '마감임박'}
                </span>
              </div>
            </div>
            <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-blue-600">
                  +{p.candidateCount}
                </div>
              </div>
              <button className="text-blue-600 font-bold text-xs hover:underline">상세보기</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function MyProjectDashboardList({ 
  projects, 
  onUpdatePriority 
}: { 
  projects: Project[], 
  onUpdatePriority: (id: string, priority: Project['priority']) => void 
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">내 진행 프로젝트 상세</h2>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> 마감임박</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> 긴급추천</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> 추가추천 필요</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((p) => {
          const isClosing = p.status === 'closing' || (p.deadline && new Date(p.deadline).getTime() - new Date().getTime() < 86400000 * 7);
          const needsMore = p.candidateCount < 5;
          const isUrgent = p.priority === 'high';

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-5 flex flex-col lg:flex-row lg:items-center gap-6"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                  {isClosing && <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-100">마감임박</span>}
                  {isUrgent && <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-100">긴급추천</span>}
                  {needsMore && <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">추가추천 필요</span>}
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Building2 size={14} /> {p.client}</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> {p.deadline || 'ASAP'}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 lg:border-l lg:pl-6 border-slate-100">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">추천 현황</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${p.candidateCount >= 5 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                        style={{ width: `${Math.min((p.candidateCount / 10) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-slate-700">{p.candidateCount}명</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 min-w-[120px]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">우선순위 설정</span>
                  <div className="relative group/select">
                    <select 
                      value={p.priority}
                      onChange={(e) => onUpdatePriority(p.id, e.target.value as any)}
                      className={`appearance-none w-full pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        p.priority === 'high' ? 'bg-red-50 text-red-600 border-red-200' :
                        p.priority === 'medium' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                        'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      <option value="high">높음 (High)</option>
                      <option value="medium">중간 (Medium)</option>
                      <option value="low">낮음 (Low)</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <Users2 size={18} />
                  </button>
                  <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-800 transition-all">
                    상세관리
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function CollaborationBoard({ posts, projects, candidatePosts }: { posts: BoardPost[], projects: Project[], candidatePosts: CandidateSBPost[] }) {
  const [activeBoard, setActiveBoard] = useState<'project' | 'candidate'>('project');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-800">SB 게시판 (Share & Board)</h2>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveBoard('project')}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeBoard === 'project' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              프로젝트 SB
            </button>
            <button 
              onClick={() => setActiveBoard('candidate')}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeBoard === 'candidate' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              후보자 SB
            </button>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-blue-100 hover:bg-blue-700 transition-all ml-2">글쓰기</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="wait">
          {activeBoard === 'project' && (
            <motion.div
              key="project-board"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {posts.map((post) => {
                const project = projects.find(p => p.id === post.projectId);
                const revenue = project?.estimatedRevenue || 0;
                const split = post.revenueSplit || "N/A";
                
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row"
                  >
                    {/* Left Stripe for Urgency */}
                    <div className={`w-full md:w-2 ${
                      post.urgency === 'immediate' ? 'bg-red-500' :
                      post.urgency === 'urgent' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}></div>

                    <div className="flex-1 p-6">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${
                            post.urgency === 'immediate' ? 'bg-red-50 text-red-600 border border-red-100' :
                            post.urgency === 'urgent' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                            'bg-blue-50 text-blue-600 border border-blue-100'
                          }`}>
                            {post.urgency === 'immediate' ? '즉시 대응' : post.urgency === 'urgent' ? '긴급 요청' : '공유 요청'}
                          </span>
                          <h3 className="text-xl font-black text-slate-900 tracking-tight">{post.title}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <span className="text-slate-400">매출 비중:</span>
                          <span className={`px-3 py-1 rounded-full ${
                            split === '8:2' ? 'bg-blue-900 text-white' :
                            split === '7:3' ? 'bg-indigo-600 text-white' :
                            split === '6:4' ? 'bg-purple-600 text-white' :
                            'bg-slate-900 text-white'
                          } shadow-sm`}>
                            {split}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="col-span-2">
                          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100 italic">
                            "{post.content}"
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-bold border-b border-slate-100 pb-2">
                            <span className="text-slate-400">예상 매출</span>
                            <span className="text-blue-600">₩{(revenue / 10000).toLocaleString()}만</span>
                          </div>
                          <div className="flex items-center justify-between text-xs font-bold border-b border-slate-100 pb-2">
                            <span className="text-slate-400">제출 기한</span>
                            <span className="text-red-500">{post.deadline || 'ASAP'}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs font-bold border-b border-slate-100 pb-2">
                            <span className="text-slate-400">고객사</span>
                            <span className="text-slate-700">{project?.client || '미지정'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                            <User size={16} className="text-slate-400" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">{post.author}</p>
                            <p className="text-[10px] text-slate-400">{post.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
                            <MessageCircle size={14} /> 12
                          </button>
                          <button className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
                            <Share2 size={14} /> 공유
                          </button>
                          <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all ml-2">
                            후보자 추천하기
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {activeBoard === 'candidate' && (
            <motion.div
              key="candidate-board"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {candidatePosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row"
                >
                  <div className={`w-full md:w-2 ${
                    post.type === 'recommendation' ? 'bg-emerald-500' :
                    post.type === 'caution' ? 'bg-red-500' : 'bg-purple-500'
                  }`}></div>

                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${
                          post.type === 'recommendation' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          post.type === 'caution' ? 'bg-red-50 text-red-600 border border-red-100' :
                          'bg-purple-50 text-purple-600 border border-purple-100'
                        }`}>
                          {post.type === 'recommendation' ? '추천 희망' : post.type === 'caution' ? '주의 요망' : '오프 리미트'}
                        </span>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">{post.name} {post.role && <span className="text-slate-400 text-sm font-medium ml-2">{post.role}</span>}</h3>
                      </div>
                      {post.company && (
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                          <Building2 size={12} /> {post.company}
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100 italic">
                        "{post.content}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                          <User size={16} className="text-slate-400" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{post.author}</p>
                          <p className="text-[10px] text-slate-400">{post.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
                          <MessageCircle size={14} /> 3
                        </button>
                        <button className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
                          <Share2 size={14} /> 공유
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
