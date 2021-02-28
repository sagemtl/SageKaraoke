import { useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import '../styles/previewButtons.scss';

const PreviewButtons = () => {
  const history = useHistory();
  const location = useLocation();
  const [, , titleId] = location.pathname.split('/'); // Outputs song title id

  const goToSing = () => {
    history.push(`/sing/${titleId}`);
  };

  return (
    <div className="preview-controls">
      <Button
        variant="contained"
        className="sing-button"
        onClick={goToSing}
        color="primary"
      >
        START SINGING
      </Button>
    </div>
  );
};

export default PreviewButtons;
