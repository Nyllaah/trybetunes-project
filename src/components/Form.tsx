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
    iptClass,
    btnClass,
    formClass,
    btnText }: FormTypes,
) {
  return (
    <form
      className={ formClass }
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
