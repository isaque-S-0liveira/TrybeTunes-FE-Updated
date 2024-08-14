import { useState } from 'react';
import HeaderViewer from '../../components/HeaderViewer/HeaderViewer';

function AlbumError({ requestError = undefined }: { requestError?: string }) {
  const errorMessage = 'Erro ao buscar as músicas';
  const tryAgain = () => {
    window.location.reload();
  };
  return (
    <>
      <HeaderViewer
        viewer={
          <div className="error-message">
            {requestError && <p>{requestError}</p>}
            {!requestError && <p>{errorMessage}</p>}
            <p>Por favor, tente novamente.</p>
            <button onClick={ tryAgain }>Tentar novamente</button>
          </div>
  }
      />
      <div className="error-message d-lg-none">
        {requestError && <p>{requestError}</p>}
        {!requestError && <p>{errorMessage}</p>}
        <p>Por favor, tente novamente.</p>
        <button onClick={ tryAgain }>Tentar novamente</button>
      </div>
    </>
  );
}

export default AlbumError;
