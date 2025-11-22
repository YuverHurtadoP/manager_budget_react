export default function Input({ label, error, ...props }) {
    return (
      <div style={{ marginBottom: "1rem" }}>
        {label && <label>{label}</label>}
        <input {...props} />
        {error && <small style={{ color: "red" }}>{error}</small>}
      </div>
    );
  }