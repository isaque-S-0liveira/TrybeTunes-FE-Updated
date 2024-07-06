type InputProps = {
  id: string;
  type: 'text' | 'email';
  testId: string;
  value: string;
  label?: string;
  placeholder?: string;
  containerClass?: string;
  onChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
  enterClick: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

function Input({
  id,
  type = 'text',
  testId,
  value,
  label = '',
  placeholder = '',
  containerClass = '',
  onChange,
  enterClick,
}: InputProps) {
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
        type={ type }
        value={ value }
        onChange={ (e) => onChange(e) }
        placeholder={ placeholder }
        onKeyDown={ (e) => e.key === 'Enter' && enterClick(e) }
        required
      />
    </div>
  );
}

export default Input;
