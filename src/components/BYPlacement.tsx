/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { IndustryPlacement } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, ChevronRight, TrendingUp } from 'lucide-react';

export function BYPlacement({ data }: { data: IndustryPlacement[] }) {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryPlacement | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">BY Placement</h2>
          <p className="text-slate-500 text-sm">산업별 / 기업별 채용 성과 분석</p>
        </div>
        <TrendingUp className="text-slate-300" size={24} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((ind) => (
          <motion.button
            key={ind.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedIndustry(ind)}
            className={`p-6 rounded-3xl border transition-all text-left ${
              selectedIndustry?.id === ind.id 
                ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100' 
                : 'bg-white border-slate-100 text-slate-900 hover:border-blue-200 shadow-sm'
            }`}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <span className={`text-[10px] font-black uppercase tracking-widest mb-1 block ${
                  selectedIndustry?.id === ind.id ? 'text-blue-200' : 'text-blue-500'
                }`}>
                  Industry Category
                </span>
                <h3 className="text-lg font-black tracking-tight">{ind.industry}</h3>
              </div>
              <div className="mt-12 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold opacity-60 uppercase mb-1">Total Placements</p>
                  <p className="text-2xl font-black">{ind.companies.reduce((sum, c) => sum + c.count, 0)}</p>
                </div>
                <div className={`p-2 rounded-xl ${selectedIndustry?.id === ind.id ? 'bg-blue-500' : 'bg-slate-50'}`}>
                  <ChevronRight size={16} className={selectedIndustry?.id === ind.id ? 'text-white' : 'text-slate-400'} />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedIndustry ? (
          <motion.div
            key={selectedIndustry.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900">{selectedIndustry.industry} Details</h4>
                  <p className="text-slate-500 text-xs font-medium">기업별 배치 성공 건수</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Growth</p>
                <p className="text-sm font-black text-emerald-500">+12.4%</p>
              </div>
            </div>

            <div className="space-y-3">
              {selectedIndustry.companies.map((company) => (
                <div 
                  key={company.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm font-bold text-slate-700">{company.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-32 bg-slate-200 rounded-full overflow-hidden hidden md:block">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(company.count / 20) * 100}%` }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                    <span className="text-sm font-black text-slate-900 w-8 text-right">{company.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="h-40 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/30">
            <p className="text-slate-400 text-sm font-medium italic">산업 카테고리를 선택하여 상세 데이터를 확인하세요.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
