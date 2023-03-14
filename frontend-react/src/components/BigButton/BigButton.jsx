import './BigButton.css';

const BigButton = ({ children, form }) => {
  return (
    <button
      className="bigbutton"
      form={form}
    >
      {children}
    </button>
  );
};

export { BigButton };
