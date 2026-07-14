interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  name: string;
  error?: string;
  options?: { value: string; label: string }[];
  handleBlur? :  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

 const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder = '',
  required = false,
  value,
  onChange,
  name,
  error,
  options = [],
}) => {
  const isSelect = type === 'select';

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {isSelect ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2.5 rounded-xl border ${
            error ? 'border-red-500' : 'border-slate-200'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-slate-800`}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 rounded-xl border ${
            error ? 'border-red-500' : 'border-slate-200'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-slate-800 placeholder:text-slate-400`}
        />
      )}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input