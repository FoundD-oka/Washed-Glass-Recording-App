import React from 'react';
interface SwitchProps {
  defaultChecked?: boolean;
}
const Switch: React.FC<SwitchProps> = ({
  defaultChecked
}) => {
  return <div className="relative inline-block w-10 h-5 rounded-full">
      <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked={defaultChecked} />
      <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-300 ${defaultChecked ? 'bg-orange-500' : 'bg-gray-300'}`}>
        <span className={`absolute w-3.5 h-3.5 bg-white rounded-full top-[3px] transition-transform duration-300 ${defaultChecked ? 'left-[22px]' : 'left-[3px]'}`}></span>
      </span>
    </div>;
};
export default Switch;