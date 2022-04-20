export default function InputField({ setup, state }) {
  const { label, placeholder } = setup;
  const [ value, setValue ] = state;

  return (
    <label>
      {label}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </label>
  );
}
