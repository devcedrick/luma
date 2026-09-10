const BOOLEAN_FIELDS = [
  { name: "headache", label: "Headache" },
  { name: "cough", label: "Cough" },
  { name: "sore_throat", label: "Sore throat" },
  { name: "antibiotics_allergy", label: "Antibiotics allergy" },
] as const;

export default function InputForm() {
  return (
    <form className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
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
          className="rounded-md border border-border bg-surface px-3 py-2 text-text placeholder:text-text-muted"
        />
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
          defaultValue="none"
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
                className="accent-accent"
              />
              Yes
            </label>
            <label className="flex items-center gap-1 text-sm text-text-muted">
              <input
                type="radio"
                name={field.name}
                value="no"
                defaultChecked
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
