import React, { useState, useMemo } from 'react';
import { Tool } from '../../types/tool';
import { ToolCard } from './ToolCard';
import { Search } from 'lucide-react';

interface ToolGridProps {
  tools: Tool[];
  onClick: (tool: Tool) => void;
}

export function ToolGrid({ tools, onClick }: ToolGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = ['all', ...new Set(tools.map(tool => tool.category))];
    return cats.map(cat => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    }));
  }, [tools]);

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [tools, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 border border-gray-600 rounded-lg leading-5 bg-[#1a2847]/50 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6B5BFF] focus:border-[#6B5BFF] sm:text-sm backdrop-blur-sm transition-all duration-200"
          />
        </div>
        <div className="flex-shrink-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full px-4 py-3 text-base border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6B5BFF] focus:border-[#6B5BFF] sm:text-sm rounded-lg bg-[#1a2847]/50 text-white backdrop-blur-sm appearance-none transition-all duration-200"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%9ca3af' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: '36px',
            }}
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTools.map(tool => (
          <ToolCard key={tool.id} tool={tool} onClick={onClick} />
        ))}
      </div>
    </div>
  );
}