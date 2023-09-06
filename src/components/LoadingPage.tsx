import '../styles/LoadingPage.css';
import bgImg from '../images/bgazul.png';
import LoadingMsg from './LoadingMsg';

export default function Loading() {
  return (
    <div className="loading-page-container">
      <img src={ bgImg } alt="background" className="bg-img" />
      <LoadingMsg
        containerStyle="loading-container"
        msgStyle="loading-page"
        spinnerStyle="spinner-page"
      />
    </div>
  );
}
