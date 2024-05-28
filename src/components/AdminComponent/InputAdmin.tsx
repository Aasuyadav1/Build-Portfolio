import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputProps {
  classes?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  icon?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputAdmin: React.FC<InputProps> = ({
  classes,
  label,
  placeholder,
  type = "text",
  name,
  icon,
  value,
  onChange
}) => {
  return (
    <div className='flex flex-col gap-2 px-4 rounded-md py-4 text-black bg-gray-100 border'>
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        className={`${classes} text-black`}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputAdmin;
