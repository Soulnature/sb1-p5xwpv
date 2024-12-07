import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { WorkHistoryEntry } from '../../../types/forms';

interface WorkHistorySectionProps {
  workHistory: WorkHistoryEntry[];
  onChange: (workHistory: WorkHistoryEntry[]) => void;
}

export const WorkHistorySection = ({ workHistory, onChange }: WorkHistorySectionProps) => {
  const { language } = useLanguage();
  
  const labels = {
    en: {
      title: "Employment History (Last 5 Years)",
      employer: "Employer Name",
      position: "Position/Title",
      startDate: "Start Date",
      endDate: "End Date",
      address: "Employer Address",
      duties: "Job title",
      addMore: "Add Another Employment",
      current: "Current Position"
    },
    zh: {
      title: "工作经历（近5年）",
      employer: "雇主名称",
      position: "职位",
      startDate: "开始日期",
      endDate: "结束日期",
      address: "雇主地址",
      duties: "工作职位",
      addMore: "添加更多工作经历",
      current: "当前职位"
    }
  };

  const currentLabels = labels[language];

  const handleAdd = () => {
    onChange([
      ...workHistory,
      {
        employer: '',
        position: '',
        startDate: '',
        endDate: '',
        address: '',
        duties: '',
        isCurrent: false
      }
    ]);
  };

  const handleChange = (index: number, field: keyof WorkHistoryEntry, value: string | boolean) => {
    const newHistory = [...workHistory];
    newHistory[index] = {
      ...newHistory[index],
      [field]: value
    };
    onChange(newHistory);
  };

  const handleRemove = (index: number) => {
    onChange(workHistory.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">{currentLabels.title}</h3>
      
      {workHistory.map((entry, index) => (
        <div key={index} className="p-6 bg-gray-50 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.employer}
              </label>
              <input
                type="text"
                value={entry.employer}
                onChange={(e) => handleChange(index, 'employer', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.position}
              </label>
              <input
                type="text"
                value={entry.position}
                onChange={(e) => handleChange(index, 'position', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.startDate}
              </label>
              <input
                type="date"
                value={entry.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentLabels.endDate}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="date"
                  value={entry.endDate}
                  onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                  disabled={entry.isCurrent}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={entry.isCurrent}
                    onChange={(e) => handleChange(index, 'isCurrent', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">{currentLabels.current}</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLabels.address}
            </label>
            <input
              type="text"
              value={entry.address}
              onChange={(e) => handleChange(index, 'address', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {currentLabels.duties}
            </label>
            <textarea
              value={entry.duties}
              onChange={(e) => handleChange(index, 'duties', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {workHistory.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        {currentLabels.addMore}
      </button>
    </div>
  );
};