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
      <div className="flex flex-col gap-1">
        <label htmlFor="temperature" className="text-sm font-medium text-text">
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
          className="rounded-md border border-border bg-surface px-3 py-2 text-text placeholder:text-text-muted"
        />
        {blocked && (
          <p role="alert" className="text-xs text-conclusion">
            Enter a temperature to run inference.
          </p>
        )}
        {warn && (
          <p className="text-xs text-conclusion">
            Unusual value — outside the typical 30–43 °C range, but the run
            will still proceed.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="nasal_breathing"
          className="text-sm font-medium text-text"
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
          className="rounded-md border border-border bg-surface px-3 py-2 text-text"
        >
          <option value="none">none</option>
          <option value="light">light</option>
          <option value="heavy">heavy</option>
        </select>
      </div>

      {BOOLEAN_FIELDS.map((field) => (
        <fieldset key={field.name} className="flex flex-col gap-1">
          <legend className="text-sm font-medium text-text">
            {field.label}
          </legend>
          <div className="flex gap-4">
            <label className="flex items-center gap-1 text-sm text-text-muted">
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
            <label className="flex items-center gap-1 text-sm text-text-muted">
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
