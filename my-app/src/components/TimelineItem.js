import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TimelineItem = ({ icon, title, institution, period, description, isSpecial }) => (
  <div className={`relative pl-12 pb-8 ${isSpecial ? 'border-l-4 border-[#FF6B6B]' : 'border-l-4 border-[#394C8C]'}`}>
    <div className={`absolute -left-[26px] top-0 w-12 h-12 ${isSpecial ? 'bg-[#FF6B6B]' : 'bg-[#394C8C]'} text-white rounded-full flex items-center justify-center`}>
      <FontAwesomeIcon icon={icon} />
    </div>
    <div className="ml-6">
      <h3 className="text-base font-semibold text-[#1E2E62]">{title}</h3>
      <p className="text-sm text-gray-600 font-medium">{institution}</p>
      <p className="text-xs text-gray-500 mb-2">{period}</p>
      {description && <p className="text-sm text-gray-700">{description}</p>}
    </div>
  </div>
);

export default TimelineItem; 