/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PEFirm } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, ChevronRight, LayoutGrid } from 'lucide-react';

export function PEMap({ data }: { data: PEFirm[] }) {
  const [selectedPE, setSelectedPE] = useState<PEFirm | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">PE Map</h2>
          <p className="text-slate-500 text-sm">국내 주요 PE별 포트폴리오 현황</p>
        </div>
        <LayoutGrid className="text-slate-300" size={24} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((pe) => (
          <motion.button
            key={pe.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPE(pe)}
            className={`relative overflow-hidden p-6 rounded-3xl border transition-all text-left ${
              selectedPE?.id === pe.id 
                ? 'bg-slate-900 border-slate-900 text-white shadow-xl ring-4 ring-slate-100' 
                : 'bg-white border-slate-100 text-slate-900 hover:border-blue-200 shadow-sm'
            }`}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <span className={`text-[10px] font-black uppercase tracking-widest mb-1 block ${
                  selectedPE?.id === pe.id ? 'text-slate-400' : 'text-blue-500'
                }`}>
                  Private Equity
                </span>
                <h3 className="text-lg font-black tracking-tight">{pe.name}</h3>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <span className="text-xs font-bold opacity-60">Portfolio: {pe.portfolio.length}</span>
                <ChevronRight size={16} className={selectedPE?.id === pe.id ? 'text-blue-400' : 'text-slate-300'} />
              </div>
            </div>
            
            {/* Visual scale indicator */}
            <div 
              className="absolute bottom-0 right-0 h-1 bg-blue-500 transition-all duration-500" 
              style={{ width: `${(pe.size / 150) * 100}%` }}
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedPE ? (
          <motion.div
            key={selectedPE.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-50 rounded-3xl p-8 border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400">
                <Building2 size={20} />
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-900">{selectedPE.name} Portfolio</h4>
                <p className="text-slate-500 text-xs font-medium">현재 투자 중인 주요 기업</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {selectedPE.portfolio.map((company) => (
                <motion.button
                  key={company.id}
                  whileHover={{ y: -2, backgroundColor: '#fff' }}
                  className="p-4 rounded-2xl bg-white/50 border border-slate-200 text-slate-700 text-sm font-bold shadow-sm hover:shadow-md transition-all text-left flex items-center justify-between group"
                >
                  <span>{company.name}</span>
                  <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={12} className="text-slate-400" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="h-40 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl">
            <p className="text-slate-400 text-sm font-medium italic">PE 블록을 클릭하여 포트폴리오를 확인하세요.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
