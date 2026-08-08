/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Building2, MapPin, Upload, Plus, X, CheckCircle2 } from 'lucide-react';

export function ProjectCreation() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">프로젝트 생성</h2>
          <p className="text-slate-500 font-medium">새로운 채용 프로젝트를 등록하고 JD를 관리하세요.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client & Basic Info */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Building2 size={18} />
            </div>
            <h3 className="text-lg font-black text-slate-900">기본 정보</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider">고객사 명</label>
              <input 
                type="text" 
                placeholder="예: 브레이브모바일" 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider">프로젝트 명</label>
              <input 
                type="text" 
                placeholder="예: Backend Engineer 채용" 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider">근무지</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="예: 서울특별시 강남구" 
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider">예상 매출액 (KRW)</label>
              <input 
                type="number" 
                placeholder="예: 20,000,000" 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Project Manager (PM)</label>
              <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium">
                <option value="">PM 선택</option>
                <option value="pm1">장재혁 상무</option>
                <option value="pm2">이순신 컨설턴트</option>
                <option value="pm3">이산 컨설턴트</option>
                <option value="pm4">정약용 컨설턴트</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Research Manager (RM)</label>
              <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium">
                <option value="">RM 선택</option>
                <option value="rm1">장재혁 상무</option>
                <option value="rm2">이순신 컨설턴트</option>
                <option value="rm3">이산 컨설턴트</option>
                <option value="rm4">정약용 컨설턴트</option>
              </select>
            </div>
          </div>
        </div>

        {/* JD Details */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <FileText size={18} />
            </div>
            <h3 className="text-lg font-black text-slate-900">Job Description (JD)</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider">주요 업무 (Key Responsibilities)</label>
              <textarea 
                rows={4} 
                placeholder="해당 포지션의 주요 역할을 상세히 기재해 주세요." 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider">자격 요건 (Requirements)</label>
              <textarea 
                rows={4} 
                placeholder="필수적으로 갖추어야 할 자격을 기재해 주세요." 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-wider">우대 사항 (Preferences)</label>
              <textarea 
                rows={3} 
                placeholder="추가적으로 우대되는 역량을 기재해 주세요." 
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Upload size={18} />
              </div>
              <h3 className="text-lg font-black text-slate-900">파일 첨부</h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Only PDF, DOCX</span>
          </div>
          
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-blue-300 transition-all group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-300 group-hover:text-blue-500 group-hover:scale-110 transition-all mb-4">
              <Upload size={24} />
            </div>
            <p className="text-sm font-bold text-slate-600">JD PDF 파일을 드래그하거나 클릭하여 업로드하세요</p>
            <p className="text-xs text-slate-400 mt-1">최대 20MB까지 업로드 가능</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <button type="button" className="px-8 py-4 rounded-2xl text-sm font-black text-slate-500 hover:bg-slate-100 transition-all">취소</button>
          <button 
            type="submit" 
            className="px-10 py-4 rounded-2xl text-sm font-black text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center gap-2"
          >
            {submitted ? <CheckCircle2 size={18} /> : <Plus size={18} />}
            {submitted ? '생성 완료!' : '프로젝트 생성하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
