import React from 'react';
interface SubListProps {
  children: React.ReactNode;
}
const SubList: React.FC<SubListProps> = ({
  children
}) => {
  return <div className="ml-4 pl-2 border-l border-gray-200">{children}</div>;
};
export default SubList;