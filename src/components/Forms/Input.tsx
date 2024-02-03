type InputProps = {
  id: string;
  testId: string;
  label?: string;
  placeholder?: string;
  containerClass?: string;
  onChange:(id: string, value: string) => void;
};

function Input({
  id,
  testId,
  label = '',
  placeholder = '',
  containerClass = '',
  onChange,
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, e.target.value);
  };
  return (
    <div id={ `container-${id}` } className={ containerClass }>
      {label !== '' ? (
        <label className="form-label " htmlFor={ id }>
          {label}
        </label>
      ) : null}
      <input
        id={ id }
        data-testid={ testId }
        className="form-control"
        type="text"
        onChange={ handleChange }
        placeholder={ placeholder }
      />
    </div>
  );
}

export default Input;
