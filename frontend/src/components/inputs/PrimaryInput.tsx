import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

const PrimaryInput: React.FC<InputFieldProps> = ({ label, value, onChange, type="text", placeholder = null, disabled }) => {
  return (
    <div>
      <label className="text-xs">{label}</label>
      <input
        type={type}
        className="px-1 rounded-lg min-h-10 w-full font-light text-sm placeholder:text-xs disabled:bg-slate-100"
        value={value}
        onChange={onChange}
        placeholder={placeholder ? placeholder : label}
        disabled={disabled ? disabled : false}
      />
    </div>
  );
};

export default PrimaryInput;
