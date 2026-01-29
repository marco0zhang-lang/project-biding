
import React, { useState, useMemo } from 'react';
import { Project, Talent, ViewType, ProjectFilters, TalentFilters } from './types';
import { MOCK_PROJECTS, MOCK_TALENTS, Icons } from './constants';
import { ProjectForm } from './components/ProjectForm';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Sidebar: React.FC<{ currentView: ViewType; setView: (v: ViewType) => void }> = ({ currentView, setView }) => (
  <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 hidden lg:block sticky top-0 h-screen overflow-y-auto">
    <div className="flex items-center space-x-3 mb-10">
      <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-xl italic">B</div>
      <h1 className="text-xl font-bold tracking-tight">BidIntelligence</h1>
    </div>
    
    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-4">Database Modules</div>
    <nav className="space-y-1">
      <button
        onClick={() => setView('dashboard')}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${currentView === 'dashboard' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
      >
        <Icons.Dashboard /> <span>Overview</span>
      </button>
      <button
        onClick={() => setView('projects')}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${currentView === 'projects' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
      >
        <Icons.Project /> <span>Projects DB</span>
      </button>
      <button
        onClick={() => setView('talent')}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${currentView === 'talent' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
      >
        <Icons.Talent /> <span>Talent DB</span>
      </button>
    </nav>
  </aside>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('dashboard');
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [talents, setTalents] = useState<Talent[]>(MOCK_TALENTS);
  const [isAddingProject, setIsAddingProject] = useState(false);
  
  // Structured Filters
  const [pFilters, setPFilters] = useState<ProjectFilters>({
    name: '', minAmount: '', maxAmount: '', unit: '', dateFrom: '', dateTo: ''
  });
  const [tFilters, setTFilters] = useState<TalentFilters>({
    name: '', expertise: '', status: 'All'
  });

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchName = p.projectName.toLowerCase().includes(pFilters.name.toLowerCase());
      const matchUnit = p.constructionUnit.toLowerCase().includes(pFilters.unit.toLowerCase());
      const minVal = pFilters.minAmount ? parseFloat(pFilters.minAmount) : 0;
      const maxVal = pFilters.maxAmount ? parseFloat(pFilters.maxAmount) : Infinity;
      const matchAmount = p.contractAmount >= minVal && p.contractAmount <= maxVal;
      
      const signDate = new Date(p.contractSigningDate).getTime();
      const filterFrom = pFilters.dateFrom ? new Date(pFilters.dateFrom).getTime() : 0;
      const filterTo = pFilters.dateTo ? new Date(pFilters.dateTo).getTime() : Infinity;
      const matchDate = signDate >= filterFrom && signDate <= filterTo;

      return matchName && matchUnit && matchAmount && matchDate;
    });
  }, [projects, pFilters]);

  const filteredTalents = useMemo(() => {
    return talents.filter(t => {
      const matchName = t.name.toLowerCase().includes(tFilters.name.toLowerCase());
      const matchExpertise = t.expertise.toLowerCase().includes(tFilters.expertise.toLowerCase());
      const matchStatus = tFilters.status === 'All' || t.socialSecurityStatus === tFilters.status;
      return matchName && matchExpertise && matchStatus;
    });
  }, [talents, tFilters]);

  const stats = useMemo(() => ({
    totalProjects: projects.length,
    totalValue: projects.reduce((sum, p) => sum + p.contractAmount, 0),
    talentCount: talents.length,
    pendingSocial: talents.filter(t => t.socialSecurityStatus === 'Pending').length
  }), [projects, talents]);

  const chartData = useMemo(() => projects.map(p => ({
    name: p.projectName.length > 15 ? p.projectName.substring(0, 15) + '...' : p.projectName,
    amount: p.contractAmount
  })), [projects]);

  const syncTalentData = () => {
    const updated = talents.map(t => ({
      ...t,
      socialSecurityStatus: 'Updated' as const,
      lastUpdateDate: new Date().toISOString().split('T')[0]
    }));
    setTalents(updated);
    alert("Monthly database synchronization complete.");
  };

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Projects', value: stats.totalProjects, color: 'text-blue-600', icon: '📁' },
          { label: 'Portfolio Value (万)', value: stats.totalValue.toLocaleString(), color: 'text-emerald-600', icon: '💰' },
          { label: 'Talent Pool', value: stats.talentCount, color: 'text-purple-600', icon: '👥' },
          { label: 'Compliance Alerts', value: stats.pendingSocial, color: 'text-amber-600', icon: '⚠️' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className={`text-3xl font-black tracking-tight ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6">Contract Allocation Analysis</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#818cf8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-indigo-600 p-8 rounded-2xl shadow-xl text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div>
            <h3 className="text-lg font-bold mb-2">System Insight</h3>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Based on recent trends, project acquisition is up by 12% this quarter. Ensure all talent social security records are updated before the monthly audit.
            </p>
          </div>
          <div className="mt-8 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="opacity-80">Data Integrity</span>
              <span className="font-bold">98.2%</span>
            </div>
            <div className="h-1.5 bg-indigo-900/50 rounded-full">
              <div className="h-1.5 bg-white rounded-full w-[98%]"></div>
            </div>
            <button 
              onClick={() => setView('projects')}
              className="w-full mt-4 bg-white text-indigo-600 py-3 rounded-xl text-xs font-bold shadow-lg hover:bg-indigo-50 transition-colors uppercase tracking-widest"
            >
              Verify Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Smart Query Panel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-5 bg-indigo-500 rounded-full"></div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Search & Filter Engine</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Project/Keyword</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="e.g. Smart City..."
              value={pFilters.name}
              onChange={(e) => setPFilters({...pFilters, name: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Construction Unit</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="Unit name..."
              value={pFilters.unit}
              onChange={(e) => setPFilters({...pFilters, unit: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Min Amount (万)</label>
            <input
              type="number"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none transition-all"
              placeholder="0"
              value={pFilters.minAmount}
              onChange={(e) => setPFilters({...pFilters, minAmount: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Max Amount (万)</label>
            <input
              type="number"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none transition-all"
              placeholder="Max"
              value={pFilters.maxAmount}
              onChange={(e) => setPFilters({...pFilters, maxAmount: e.target.value})}
            />
          </div>
        </div>
        <div className="pt-2 flex justify-between items-center">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            Query: SELECT * FROM projects WHERE name LIKE '%{pFilters.name}%' AND amount &gt; {pFilters.minAmount || 0}
          </div>
          <button 
            onClick={() => setIsAddingProject(true)}
            className="px-6 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center shadow-lg"
          >
            <Icons.Plus /> <span className="ml-2">NEW ENTRY</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identification</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Particulars</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contract Scope</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Value (万)</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Custodian</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-6 py-4 font-mono text-[10px] text-slate-300">#{project.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{project.projectName}</div>
                    <div className="flex gap-1 mt-1.5">
                      {project.keywords.split(',').map((k, i) => (
                        <span key={i} className="bg-slate-100 text-slate-500 text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase">{k.trim()}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500 font-medium">{project.constructionUnit}</div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-1 italic">{project.projectContent}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-black text-slate-900">¥ {project.contractAmount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-slate-800">{project.contactPerson}</div>
                    <div className="text-[10px] text-indigo-500 font-mono">{project.contactPhone}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTalent = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Talent Search Panel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-5 bg-purple-500 rounded-full"></div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Expert Directory Search</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Expert Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-300">
                <Icons.Search />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                placeholder="Search name..."
                value={tFilters.name}
                onChange={(e) => setTFilters({...tFilters, name: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Specialization</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="e.g. Structural..."
              value={tFilters.expertise}
              onChange={(e) => setTFilters({...tFilters, expertise: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Compliance Status</label>
            <select
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all appearance-none"
              value={tFilters.status}
              onChange={(e) => setTFilters({...tFilters, status: e.target.value as any})}
            >
              <option value="All">All Records</option>
              <option value="Updated">Status: Updated</option>
              <option value="Pending">Status: Pending</option>
            </select>
          </div>
        </div>
        <div className="pt-2 flex justify-between items-center">
          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">
            Filtering {filteredTalents.length} Results
          </span>
          <button 
            onClick={syncTalentData}
            className="px-6 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center shadow-lg"
          >
             <div className="mr-2">🔄</div> BATCH SYNC SOCIAL SECURITY
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTalents.map((talent) => (
          <div key={talent.id} className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase border ${talent.socialSecurityStatus === 'Updated' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                {talent.socialSecurityStatus}
              </span>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl group-hover:bg-indigo-50 transition-colors">
                {talent.name.charAt(0)}
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-black text-slate-900 tracking-tight">{talent.name}</h4>
                <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest">{talent.contactPhone}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">Core Expertise</label>
                <div className="text-sm font-medium text-slate-700">{talent.expertise}</div>
              </div>
              
              <div>
                <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-2">Portfolio Links</label>
                <div className="flex flex-wrap gap-2">
                  {talent.relatedProjects.map((rp, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-bold border border-slate-100 group-hover:border-indigo-100 group-hover:text-indigo-500 transition-colors">
                      {rp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Verified: {talent.lastUpdateDate}</span>
              <button className="text-indigo-600 hover:underline">Full Bio →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#FDFDFF]">
      <Sidebar currentView={view} setView={(v) => { setView(v); }} />
      <main className="flex-1 p-8 max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em]">BidIntelligence System</span>
              <span className="text-slate-200">/</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{view}</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 capitalize tracking-tighter">
              {view === 'dashboard' ? 'Insight Hub' : `${view} Repository`}
            </h2>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-900 leading-none">Global Administrator</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">System Node: Central-01</p>
            </div>
            <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black shadow-xl ring-4 ring-slate-100">
              GA
            </div>
          </div>
        </header>

        {isAddingProject ? (
          <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-300">
            <ProjectForm
              onCancel={() => setIsAddingProject(false)}
              onSave={(p) => {
                setProjects([p, ...projects]);
                setIsAddingProject(false);
                setView('projects');
              }}
            />
          </div>
        ) : (
          <div>
            {view === 'dashboard' && renderDashboard()}
            {view === 'projects' && renderProjects()}
            {view === 'talent' && renderTalent()}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
