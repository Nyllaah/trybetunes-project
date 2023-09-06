import spinner from '../images/icon-spinner.png';
import '../styles/LoadingMsg.css';
import { LoadingMsgTypes } from '../types';

export default function LoadingMsg(
  { containerStyle, msgStyle, spinnerStyle }: LoadingMsgTypes,
) {
  return (
    <div className={ containerStyle }>
      <img src={ spinner } alt="loading icon" className={ spinnerStyle } />
      <span className={ msgStyle }>Carregando...</span>
    </div>
  );
}
