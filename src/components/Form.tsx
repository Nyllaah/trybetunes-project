import { FormTypes } from '../types';

export default function Form(
  { onSubmit,
    iptType,
    iptTestId,
    inputValue,
    onChange,
    placeholder,
    btnTestId,
    disabled,
    btnText }: FormTypes,
) {
  return (
    <form onSubmit={ onSubmit }>
      <input
        data-testid={ iptTestId }
        type={ iptType }
        value={ inputValue }
        onChange={ onChange }
        placeholder={ placeholder }
      />
      <button
        disabled={ disabled }
        data-testid={ btnTestId }
      >
        {btnText}

      </button>
    </form>
  );
}
