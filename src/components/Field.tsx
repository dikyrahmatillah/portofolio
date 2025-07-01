type FieldProps = {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
};

export function Field({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  textarea = false,
  rows = 2,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-1 font-semibold text-zinc-100 text-sm"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          className="input-field"
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          className="input-field"
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
}
