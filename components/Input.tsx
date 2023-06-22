import React from "react";

// Define the prop types for the Input component
interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

// Define the Input component as a functional component
const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
  return (
    <div className="relative">
      {/* Render an input element */}
      <input
        onChange={onChange}
        type={type}
        value={value}
        id={id} // Use the id prop passed to the component
        className="
          block
          rounded-md
          px-6
          pt-6
          pb-1
          w-full
          text-md
          text-white
          bg-neutral-700
          appearance-none
          focus:outline-none
          focus:ring-0
          peer"
        placeholder=""
      />
      {/* Render a label element */}
      <label
        className="
          absolute
          text-md
          text-zinc-400
          duration-150
          transform
          -translate-y-3
          scale-75
          top-4
          z-10
          origin-[0]
          left-6
          peer-placeholder:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-3
        "
        htmlFor={id} // Use the id prop passed to the component
      >
        {label} {/* Use the label prop passed to the component */}
      </label>
    </div>
  );
};

// Export the Input component as the default export
export default Input;
