import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '../ui/textarea';

interface InputProps {
  classes?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  icon?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  textarea?: boolean;
  image?: boolean;
  imageUrl?: string;
}

const InputAdmin: React.FC<InputProps> = ({
  classes,
  label,
  placeholder,
  type = "text",
  name,
  icon,
  value,
  onChange,
  textarea = false,
  image = false,
  imageUrl
}) => {
  return (
    <div className={`flex flex-col gap-2 px-4 rounded-md py-4 text-black bg-gray-100 border ${classes}`}>
      {label && <Label htmlFor={name}>{label}</Label>}
      {
        textarea ? (
          <Textarea
            id={name}
            placeholder={placeholder}
            name={name}
            value={value}
            className={`${classes} `}
            onChange={onChange}
          />
        ) : (
          <>
            <Input
            id={name}
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            className={`${classes} text-black`}
            onChange={onChange}
          />
          {
            image ? (
              <img className='aspect-video object-cover rounded-md' src={imageUrl} alt="image" />
            ) : null
          }
          </>
        )
      }
    </div>
  );  
}

export default InputAdmin;
