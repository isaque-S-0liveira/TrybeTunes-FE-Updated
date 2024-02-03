type ButtonProps = {
  testId: string;
  type: 'button' | 'submit';
  disabled: boolean;
  containerClassName: string;
  btnClassName: string;
  children: React.ReactNode;
  onClick: () => void;
};

function Button(
  { testId,
    type,
    disabled,
    containerClassName,
    btnClassName,
    children,
    onClick,
  }: ButtonProps,
) {
  return (
    <div className={ containerClassName }>
      <button
        data-testid={ testId }
        type={ type }
        disabled={ disabled }
        className={ `btn ${btnClassName}` }
        onClick={ onClick }
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
