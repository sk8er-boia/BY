/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Candidate, Project, CandidateStatus } from '../types';
import { motion } from 'motion/react';
import { User, ArrowRight, Clock, CheckCircle2, AlertCircle, FileSearch, MessageSquareText, Handshake, ShieldCheck, UserCheck, Users } from 'lucide-react';

const STATUS_CONFIG: Record<CandidateStatus, { label: string, icon: any, color: string, bg: string }> = {
  recommended: { label: '서류 추천', icon: FileSearch, color: 'text-blue-600', bg: 'bg-blue-50' },
  interview_1: { label: '1차 인터뷰', icon: MessageSquareText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  interview_final: { label: '최종 인터뷰', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  negotiation: { label: '처우 협의', icon: Handshake, color: 'text-amber-600', bg: 'bg-amber-50' },
  accepted: { label: '오퍼 수락', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  onboarding: { label: '입사 대기', icon: UserCheck, color: 'text-pink-600', bg: 'bg-pink-50' },
};

export function CandidateManagementView({ projects, candidates }: { projects: Project[], candidates: Candidate[] }) {
  const statuses: CandidateStatus[] = ['recommended', 'interview_1', 'interview_final', 'negotiation', 'accepted', 'onboarding'];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">후보자 프로세스 관리</h2>
          <p className="text-slate-500 text-sm">진행 중인 프로젝트별 후보자들의 단계를 한눈에 확인하세요.</p>
        </div>
      </div>

      <div className="space-y-8">
        {projects.map((project) => {
          const projectCandidates = candidates.filter(c => c.projectId === project.id);
          
          return (
            <div key={project.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-50 bg-slate-50/30">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                    <p className="text-xs text-slate-500 font-medium">{project.client} • {project.industry}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">총 후보자</p>
                      <p className="text-lg font-black text-slate-900">{projectCandidates.length}</p>
                    </div>
                    <div className="w-px h-8 bg-slate-200"></div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">인터뷰 중</p>
                      <p className="text-lg font-black text-blue-600">
                        {projectCandidates.filter(c => ['interview_1', 'interview_final'].includes(c.status)).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {statuses.map((status) => {
                    const statusCandidates = projectCandidates.filter(c => c.status === status);
                    const config = STATUS_CONFIG[status];
                    
                    return (
                      <div key={status} className="flex flex-col gap-3">
                        <div className={`flex items-center justify-between px-3 py-2 rounded-xl ${config.bg} ${config.color}`}>
                          <div className="flex items-center gap-2">
                            <config.icon size={14} />
                            <span className="text-[11px] font-bold">{config.label}</span>
                          </div>
                          <span className="text-xs font-black">{statusCandidates.length}</span>
                        </div>
                        
                        <div className="space-y-2 min-h-[100px] bg-slate-50/50 rounded-xl p-2 border border-dashed border-slate-200">
                          {statusCandidates.map((candidate) => (
                            <motion.div
                              layoutId={candidate.id}
                              key={candidate.id}
                              className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{candidate.name}</span>
                                <ArrowRight size={10} className="text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
                              </div>
                              <p className="text-[10px] text-slate-500 truncate mb-1">{candidate.currentCompany}</p>
                              
                              <div className="flex flex-wrap gap-1 mb-2">
                                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase border ${
                                  candidate.projectType === 'individual' ? 'bg-slate-50 text-slate-600 border-slate-200' :
                                  candidate.projectType === 'co_platform_1' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                  'bg-indigo-50 text-indigo-600 border-indigo-100'
                                }`}>
                                  {candidate.projectType === 'individual' ? '개별' : 
                                   candidate.projectType === 'co_platform_1' ? '공플1' : '공플2'}
                                </span>
                                {candidate.collaborator && (
                                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white border border-slate-900">
                                    {candidate.collaborator}
                                  </span>
                                )}
                              </div>

                              <div className="mt-2 pt-2 border-t border-slate-50 flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-black text-blue-600">₩{(candidate.estimatedRevenue || 0).toLocaleString()}</span>
                                  <span className="text-[8px] font-medium text-slate-400 uppercase">{candidate.updatedAt}</span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                          {statusCandidates.length === 0 && (
                            <div className="h-full flex items-center justify-center py-8">
                              <span className="text-[10px] font-medium text-slate-300 italic">없음</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
