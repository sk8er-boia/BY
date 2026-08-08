/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LayoutDashboard, Users, MessageSquare, Briefcase, FileText, Bell, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: '내 대시보드', icon: LayoutDashboard },
    { id: 'company', label: '회사 프로젝트', icon: Briefcase },
    { id: 'board', label: 'SB 게시판', icon: MessageSquare },
    { id: 'candidates', label: '후보자 관리', icon: Users },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight text-blue-400">BRISK & YOUNG</h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Consultant Portal</p>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === item.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white cursor-pointer transition-colors">
          <LogOut size={20} />
          <span className="font-medium">로그아웃</span>
        </div>
      </div>
    </aside>
  );
}

export function MobileNav({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: '홈', icon: LayoutDashboard },
    { id: 'company', label: '프로젝트', icon: Briefcase },
    { id: 'board', label: '게시판', icon: MessageSquare },
    { id: 'quick', label: '메뉴', icon: Bell },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 flex justify-around items-center z-50">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center gap-1 p-2 ${
            activeTab === item.id ? 'text-blue-600' : 'text-slate-400'
          }`}
        >
          <item.icon size={20} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
