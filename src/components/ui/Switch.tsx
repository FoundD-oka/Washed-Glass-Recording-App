import React, { useState } from 'react';
interface SwitchProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}
const Switch: React.FC<SwitchProps> = ({
  defaultChecked = false,
  onChange
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (onChange) {
      onChange(newState);
    }
  };
  return <div className="relative inline-block w-10 h-5 rounded-full">
      <input type="checkbox" className="opacity-0 w-0 h-0" checked={isChecked} onChange={handleToggle} />
      <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-300 ${isChecked ? 'bg-orange-500' : 'bg-gray-300'}`} onClick={handleToggle}>
        <span className={`absolute w-3.5 h-3.5 bg-white rounded-full top-[3px] transition-transform duration-300 ${isChecked ? 'left-[22px]' : 'left-[3px]'}`}></span>
      </span>
    </div>;
};
export default Switch;