
export default function Button({ children, ...props }) {
    return (
      <button
        {...props}
        style={{
          padding: "0.5rem 1rem",
          background: "#222",
          color: "#fff",
          borderRadius: "4px",
        }}
      >
        {children}
      </button>
    );
  }
  