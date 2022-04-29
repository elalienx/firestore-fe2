export default function InputField({ setup, state }) {
  const { label, placeholder, type, required } = setup;
  const [value, setValue] = state;

  return (
    <label>
      {label}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        required={required}
      />
    </label>
  );
}
