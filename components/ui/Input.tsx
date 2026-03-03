interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = ({
  label,
  error,
  className = "",
  style,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">
          {label}
        </label>
      )}
      <input
        className={`inp ${error ? "err" : ""} ${className}`}
        style={style}
        {...props}
      />
      {error && <span className="text-[11px] font-medium text-red-400 px-1 animate-fade-in">{error}</span>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
  error?: string;
}

export const Select = ({
  label,
  options,
  error,
  className = "",
  style,
  ...props
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`inp appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1em_1em] pr-10 ${error ? "err" : ""} ${className}`}
          style={{
            ...style,
          }}
          {...props}
        >
          {options.map((opt: { label: string; value: string }) => (
            <option key={opt.value} value={opt.value} className="bg-[#0f172a] text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {error && <span className="text-[11px] font-medium text-red-400 px-1 animate-fade-in">{error}</span>}
    </div>
  );
};
