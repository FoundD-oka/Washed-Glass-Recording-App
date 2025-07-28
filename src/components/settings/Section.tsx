import React from 'react';
interface SectionProps {
  title: string;
  children: React.ReactNode;
}
const Section: React.FC<SectionProps> = ({
  title,
  children
}) => {
  return <div className="py-3 px-4">
      <h2 className="text-xs font-medium text-gray-500 mb-2">{title}</h2>
      <div className="space-y-1">{children}</div>
    </div>;
};
export default Section;