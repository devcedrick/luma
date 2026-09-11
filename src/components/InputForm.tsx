import type { PatientInputs } from "@/lib/types";

const BOOLEAN_FIELDS = [
  { name: "headache", label: "Headache" },
  { name: "cough", label: "Cough" },
  { name: "sore_throat", label: "Sore throat" },
  { name: "antibiotics_allergy", label: "Antibiotics allergy" },
] as const;

interface InputFormProps {
  inputs: PatientInputs;
  onChange: (patch: Partial<PatientInputs>) => void;
  onRun: () => void;
}

export default function InputForm({ inputs, onChange, onRun }: InputFormProps) {
  const blocked = Number.isNaN(inputs.temperature);
  const warn =
    !blocked && (inputs.temperature < 30 || inputs.temperature > 43);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onRun();
      }}
      className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="temperature" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Temperature (°C)
        </label>
        <input
          id="temperature"
          name="temperature"
          type="number"
          step="0.1"
          placeholder="36.6"
          value={blocked ? "" : inputs.temperature}
          onChange={(e) => onChange({ temperature: e.target.valueAsNumber })}
          className="h-10 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
        {blocked && (
          <p role="alert" className="text-xs text-conclusion break-words">
            Enter a temperature to run inference.
          </p>
        )}
        {warn && (
          <p className="text-xs text-conclusion leading-relaxed break-words">
            Unusual value — outside typical 30–43 °C range, but the run will still proceed.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="nasal_breathing"
          className="text-xs font-semibold uppercase tracking-wider text-text-muted"
        >
          Nasal breathing
        </label>
        <select
          id="nasal_breathing"
          name="nasal_breathing"
          value={inputs.nasal_breathing}
          onChange={(e) =>
            onChange({
              nasal_breathing: e.target.value as PatientInputs["nasal_breathing"],
            })
          }
          className="h-10 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="none">none</option>
          <option value="light">light</option>
          <option value="heavy">heavy</option>
        </select>
      </div>

      {BOOLEAN_FIELDS.map((field) => (
        <fieldset key={field.name} className="flex flex-col gap-1.5">
          <legend className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            {field.label}
          </legend>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-surface/80 px-3 py-2 text-xs font-medium text-text-muted transition-colors hover:border-accent/60 has-[:checked]:border-accent has-[:checked]:bg-accent-dim/40 has-[:checked]:text-text">
              <input
                type="radio"
                name={field.name}
                value="yes"
                checked={inputs[field.name] === true}
                onChange={() => onChange({ [field.name]: true } as Partial<PatientInputs>)}
                className="accent-accent"
              />
              Yes
            </label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-surface/80 px-3 py-2 text-xs font-medium text-text-muted transition-colors hover:border-accent/60 has-[:checked]:border-accent has-[:checked]:bg-accent-dim/40 has-[:checked]:text-text">
              <input
                type="radio"
                name={field.name}
                value="no"
                checked={inputs[field.name] === false}
                onChange={() => onChange({ [field.name]: false } as Partial<PatientInputs>)}
                className="accent-accent"
              />
              No
            </label>
          </div>
        </fieldset>
      ))}
    </form>
  );
}
