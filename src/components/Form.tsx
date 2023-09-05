import { FormTypes } from '../types';
import '../styles/Form.css';

export default function Form(
  { onSubmit,
    iptType,
    iptTestId,
    inputValue,
    onChange,
    placeholder,
    btnTestId,
    disabled,
    iptClass,
    btnClass,
    btnText }: FormTypes,
) {
  return (
    <form
      onSubmit={ onSubmit }
    >
      <input
        className={ iptClass }
        data-testid={ iptTestId }
        type={ iptType }
        value={ inputValue }
        onChange={ onChange }
        placeholder={ placeholder }
      />
      <button
        className={ btnClass }
        disabled={ disabled }
        data-testid={ btnTestId }
      >
        {btnText}

      </button>
    </form>
  );
}
