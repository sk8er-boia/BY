/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AlertCircle, Clock, TrendingUp, Users, FileText, MessageSquare, ExternalLink, Zap, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';
import { PlacementRecord, Project, DashboardStats } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, ComposedChart, LabelList } from 'recharts';
import { REVENUE_TIMELINE_MONTHLY, REVENUE_TIMELINE_QUARTERLY } from '../data';

export function UrgentHighlights({ projects }: { projects: Project[] }) {
  const urgent = projects.filter(p => p.priority === 'high' || p.status === 'closing');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Zap size={20} className="text-amber-500 fill-amber-500" />
        <h2 className="text-lg font-bold text-slate-800">우선순위 및 긴급 채용</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {urgent.map((project, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={project.id}
            className="relative group bg-white p-4 rounded-xl border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                project.status === 'closing' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {project.status === 'closing' ? '마감임박' : '긴급추천'}
              </span>
              <Clock size={14} className="text-slate-400" />
            </div>
            <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{project.title}</h3>
            <p className="text-xs text-slate-500 mt-1">{project.client}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1 text-slate-400">
                <Users size={12} />
                <span className="text-[10px] font-medium">추천 {project.candidateCount}명</span>
              </div>
              <div className="text-[10px] text-red-500 font-bold">
                {project.deadline ? `${project.deadline} 마감` : 'ASAP'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function QuickMenu() {
  const actions = [
    { label: '인재풀 등록', icon: UserPlus, color: 'bg-amber-50 text-amber-600 hover:bg-amber-100' },
    { label: '이력서 변환', icon: FileText, color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
    { label: 'Brisk & Young 메시지', icon: MessageSquare, color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
    { label: '채용공고 접속', icon: ExternalLink, color: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action, idx) => (
        <button
          key={idx}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${action.color}`}
        >
          <action.icon size={18} />
          {action.label}
        </button>
      ))}
    </div>
  );
}

export function StatDashboard({ stats }: { stats: DashboardStats }) {
  const items = [
    { label: '신규 프로젝트', value: stats.newProjects, icon: AlertCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: '진행 중 프로젝트', value: stats.ongoingProjects, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: '추천 후보자수', value: stats.recommendedCandidates, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: '인터뷰 진행 단계', value: stats.interviewStages, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{item.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:scale-105 transition-transform origin-left">{item.value}</h3>
            </div>
            <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
              <item.icon size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const PIE_COLORS = ['#3b82f6', '#6366f1', '#a855f7', '#ec4899'];

export function AnalyticsDashboard({ projects }: { projects: Project[] }) {
  const [timeView, setTimeView] = useState<'monthly' | 'quarterly'>('monthly');
  const industryData = projects.reduce((acc: any[], p) => {
    const existing = acc.find(item => item.name === p.industry);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: p.industry, value: 1 });
    }
    return acc;
  }, []);

  const statusData = [
    { name: '신규', value: projects.filter(p => p.status === 'new').length },
    { name: '진행중', value: projects.filter(p => p.status === 'ongoing').length },
    { name: '인터뷰', value: projects.filter(p => p.status === 'interview').length },
    { name: '마감임박', value: projects.filter(p => p.status === 'closing').length },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">산업군별 프로젝트 분포</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={industryData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fontWeight: 500, fill: '#64748b' }}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">단계별 프로젝트 현황</h3>
        <div className="h-64 flex items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={8}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pr-8 space-y-2">
            {statusData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[idx] }}></div>
                <span className="text-xs font-medium text-slate-600">{item.name}</span>
                <span className="text-xs font-bold text-slate-900 ml-auto">{item.value}건</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Projection Timeline */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm col-span-1 lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">매출 타임라인 모델링 (누적 및 소계)</h3>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setTimeView('monthly')}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${timeView === 'monthly' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                월별
              </button>
              <button 
                onClick={() => setTimeView('quarterly')}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${timeView === 'quarterly' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                분기별
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-[10px] font-bold text-slate-500">누적액</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-slate-200"></div>
              <span className="text-[10px] font-bold text-slate-500">기간소계</span>
            </div>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart 
              data={(timeView === 'monthly' ? REVENUE_TIMELINE_MONTHLY : REVENUE_TIMELINE_QUARTERLY).reduce((acc: any[], curr, idx) => {
                const prevCumulative = idx > 0 ? acc[idx-1].cumulative : 0;
                acc.push({
                  ...curr,
                  cumulative: prevCumulative + curr.value,
                  subtotal: curr.value
                });
                return acc;
              }, [])}
            >
              <defs>
                <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 500, fill: '#64748b' }}
                tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(val: number, name: string) => [
                  `₩${val.toLocaleString()}`, 
                  name === 'cumulative' ? '누적 매출' : '기간 소계'
                ]}
              />
              <Bar dataKey="subtotal" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={timeView === 'monthly' ? 30 : 60}>
                <LabelList 
                  dataKey="subtotal" 
                  position="top" 
                  formatter={(val: number) => `₩${(val / 10000).toLocaleString()}만`}
                  style={{ fontSize: '9px', fontWeight: 'bold', fill: '#64748b' }}
                />
              </Bar>
              <Area 
                type="monotone" 
                dataKey="cumulative" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorCumulative)" 
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Projection */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm col-span-1 lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">프로젝트별 예상 매출 (추정액)</h3>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">전체 합계</p>
            <p className="text-lg font-black text-blue-600">
              ₩{projects.reduce((sum, p) => sum + (p.estimatedRevenue || 0), 0).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projects} margin={{ bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="title" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 500, fill: '#64748b' }}
                interval={0}
                angle={-15}
                textAnchor="end"
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 500, fill: '#64748b' }}
                tickFormatter={(val) => `₩${(val / 1000000).toFixed(0)}M`}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(val: number) => [`₩${val.toLocaleString()}`, '예상 매출']}
              />
              <Bar dataKey="estimatedRevenue" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40}>
                {projects.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function CompactDashboard({ projects }: { projects: Project[] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">프로젝트명</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">고객사</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">상태</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">추천수</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-blue-50/30 transition-colors cursor-pointer group">
              <td className="px-6 py-4">
                <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600">{p.title}</p>
                <p className="text-[10px] text-slate-400">{p.industry}</p>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">{p.client}</td>
              <td className="px-6 py-4">
                 <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                  p.status === 'new' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  p.status === 'ongoing' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                  p.status === 'interview' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                  'bg-red-50 text-red-600 border-red-100'
                }`}>
                  {p.status === 'new' ? '신규' : p.status === 'ongoing' ? '진행중' : p.status === 'interview' ? '인터뷰' : '마감'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">{p.candidateCount}명</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PlacementHistoryList({ history }: { history: PlacementRecord[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">성사 히스토리 (Placement History)</h2>
        <span className="text-xs text-slate-400 font-medium">최근 1년 기준</span>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">성사 후보자</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">프로젝트 / 고객사</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">성사일</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">매출(Fee)</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {history.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                      {record.candidateName[0]}
                    </div>
                    <span className="text-sm font-bold text-slate-900">{record.candidateName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-800">{record.projectName}</p>
                  <p className="text-[10px] text-slate-400">{record.clientName}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{record.placementDate}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">₩{(record.fee / 10000).toLocaleString()}만</td>
                <td className="px-6 py-4 text-right">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    record.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {record.status === 'completed' ? '정산완료' : '보증기간'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { ClientContact } from '../types';
import { Phone, Mail, History } from 'lucide-react';

export function ClientManagementList({ clients }: { clients: ClientContact[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">고객사 및 컨택 포인트 관리</h2>
        <button className="text-blue-600 text-xs font-bold hover:underline">고객사 추가</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div key={client.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-900">{client.clientName}</h3>
                <p className="text-xs text-slate-500 font-medium">{client.contactName} {client.position}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                client.status === 'active' ? 'bg-emerald-100 text-emerald-600' :
                client.status === 'follow_up' ? 'bg-amber-100 text-amber-600' :
                'bg-slate-100 text-slate-500'
              }`}>
                {client.status === 'active' ? '활발' : client.status === 'follow_up' ? '팔로업' : '휴면'}
              </span>
            </div>
            
            <div className="bg-slate-50 p-3 rounded-xl mb-4">
              <div className="flex items-center gap-2 mb-1">
                <History size={12} className="text-slate-400" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">최근 컨택 히스토리</span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {client.history}
              </p>
              <p className="text-[9px] text-slate-400 mt-2 font-medium">최종 일자: {client.lastContactDate}</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all">
                <Phone size={12} />
                연락하기
              </button>
              <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all">
                <Mail size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

