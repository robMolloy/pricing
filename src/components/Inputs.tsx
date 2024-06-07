import { FormEvent } from "react";

export function TextInput(p: {
  onInput: (x: string) => void;
  value: string;
  label: React.ReactNode;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="label">
        <span className="label-text">{p.label}</span>
      </label>
      <input
        type="text"
        placeholder={p.placeholder}
        className="input input-bordered w-full bg-white text-slate-600"
        onInput={(e) => {
          const e2 = e as FormEvent<HTMLInputElement> & { target: { value: string } };
          const value = e2.target.value;
          p.onInput(value);
        }}
        value={p.value}
      />
      <div className="label">
        <span className={`badge badge-error w-full ${p.error ? "" : "opacity-0"}`}>{p.error}</span>
      </div>
    </div>
  );
}
export function NumberInput(p: {
  onInput: (x: number) => void;
  value: number;
  label: React.ReactNode;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="label">
        <span className="label-text">{p.label}</span>
      </label>
      <input
        type="text"
        placeholder={p.placeholder}
        className="input input-bordered w-full bg-white text-slate-600"
        onInput={(e) => {
          const e2 = e as FormEvent<HTMLInputElement> & { target: { value: string } };
          const value = e2.target.value;
          p.onInput(Number(value));
        }}
        value={p.value}
      />
      {p.error && (
        <div className="label">
          <span className={`badge badge-error w-full ${p.error ? "" : "opacity-0"}`}>
            {p.error}
          </span>
        </div>
      )}
    </div>
  );
}
