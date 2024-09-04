import React, { forwardRef } from 'react';
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
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement> | any) => void;
  textarea?: boolean;
  image?: boolean;
  imageUrl?: string;
  error?: string | undefined;
  message?: string;
}

const InputAdmin = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({
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
  imageUrl,
  error,
  message,
}, ref) => {
  return (
    <div className={`flex flex-col gap-2 px-4 rounded-md py-4 text-black bg-gray-100 border ${classes}`}>
      {label && <Label htmlFor={name}>{label}</Label>}
      {textarea ? (
        <Textarea
          id={name}
          placeholder={placeholder}
          name={name}
          value={value}
          className={`${classes} resize-y overflow-auto`}
          rows={8}
          onChange={onChange}
          ref={ref as React.Ref<HTMLTextAreaElement>}
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
            ref={ref as React.Ref<HTMLInputElement>}
          />
          {message && <span className="text-red-600  text-sm">{message}</span>}
          {image && <img className='aspect-video object-cover rounded-md' src={imageUrl} alt="image" />}
        </>
      )}
      {error && <span className="text-red-400 font-medium text-sm">{error}</span>}
    </div>
  );  
});

InputAdmin.displayName = 'InputAdmin';

export default InputAdmin;
