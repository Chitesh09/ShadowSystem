"use client";

import { Target, CheckSquare, Activity, Compass } from "lucide-react";

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'focus', label: 'FOCUS', icon: Target },
    { id: 'tasks', label: 'TASKS', icon: CheckSquare },
    { id: 'stats', label: 'STATS', icon: Activity },
    { id: 'train', label: 'TRAIN', icon: Compass },
  ];

  return (
    <div className="bottom-nav">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button 
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Icon className="nav-icon" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
