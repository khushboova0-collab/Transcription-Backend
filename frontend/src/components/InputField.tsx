import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const InputField: React.FC<Props> = ({ label, ...props }) => (
    <div className="flex flex-col gap-1 w-full">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <input
            {...props}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none w-full"
        />
    </div>
);
