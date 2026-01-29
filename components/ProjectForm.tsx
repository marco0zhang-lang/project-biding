
import React, { useState } from 'react';
import { Project } from '../types';
import { expandContentTerms } from '../services/geminiService';
import { Icons } from '../constants';

interface ProjectFormProps {
  onSave: (project: Project) => void;
  onCancel: () => void;
  initialData?: Project;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState<Project>(initialData || {
    id: Math.random().toString(36).substr(2, 9),
    projectName: '',
    keywords: '',
    extendedTerms: '',
    projectContent: '',
    contractSigningDate: '',
    projectEndDate: '',
    contractAmount: 0,
    constructionUnit: '',
    contactPerson: '',
    contactPhone: ''
  });

  const [isExpanding, setIsExpanding] = useState(false);

  const handleExpand = async () => {
    if (!formData.keywords || !formData.projectName) {
      alert("Please fill in Project Name and Keywords first!");
      return;
    }
    setIsExpanding(true);
    const result = await expandContentTerms(formData.keywords, formData.projectName);
    setFormData(prev => ({ ...prev, extendedTerms: result }));
    setIsExpanding(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
      <h2 className="text-xl font-bold mb-6 text-slate-800">{initialData ? 'Edit Project' : 'Add New Project'}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Project Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            value={formData.projectName}
            onChange={e => setFormData({ ...formData, projectName: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Keywords</label>
          <input
            type="text"
            placeholder="IoT, Urban, Signal..."
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            value={formData.keywords}
            onChange={e => setFormData({ ...formData, keywords: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 flex justify-between items-center">
            Extended Related Terms (AI Powered)
            <button
              type="button"
              onClick={handleExpand}
              disabled={isExpanding}
              className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold flex items-center"
            >
              <Icons.Sparkles /> {isExpanding ? 'Expanding...' : 'Generate with AI'}
            </button>
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50"
            value={formData.extendedTerms}
            onChange={e => setFormData({ ...formData, extendedTerms: e.target.value })}
            readOnly
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700">Project Content (Searchable)</label>
          <textarea
            rows={3}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            value={formData.projectContent}
            onChange={e => setFormData({ ...formData, projectContent: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Contract Signing Date</label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            value={formData.contractSigningDate}
            onChange={e => setFormData({ ...formData, contractSigningDate: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Project End Date</label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            value={formData.projectEndDate}
            onChange={e => setFormData({ ...formData, projectEndDate: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Contract Amount (10k Yuan)</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            value={formData.contractAmount}
            onChange={e => setFormData({ ...formData, contractAmount: parseFloat(e.target.value) })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Construction Unit</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            value={formData.constructionUnit}
            onChange={e => setFormData({ ...formData, constructionUnit: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Contact Person</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            value={formData.contactPerson}
            onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Contact Phone</label>
          <input
            type="tel"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            value={formData.contactPhone}
            onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
            required
          />
        </div>

        <div className="md:col-span-2 flex justify-end space-x-3 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700"
          >
            {initialData ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
};
