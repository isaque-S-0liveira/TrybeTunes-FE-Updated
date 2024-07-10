/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Forms/Button';
import Input from '../../components/Forms/Input';
import logo from '/logo.png';
import Img from '../../components/Imagem';
import './Login.css';
import { createUser, getUser } from '../../services/userAPI';
import Loading from '../../components/Loading/Loading';

function Login() {
  const navigate = useNavigate();
  const [userName, setUsername] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
    if (value.length < 3) {
      setButtonDisabled(true);
      return;
    }
    setButtonDisabled(false);
  };

  const handleClick = async () => {
    setIsLoading(true);
    const user = await getUser();
    if (userName.length >= 3) {
      await createUser({ ...user, name: userName });
      setIsLoading(false);
      navigate('/search');
    } else {
      return null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === 'Enter' && userName.length >= 3) {
      handleClick();
    }
  };

  if (!isLoading) {
    return (
      <section id="main-login" className="container primary-bg-color">
        <div className="row">
          <Img
            src={ logo }
            alt="logo-TrybeTunes"
            containerClass="col-12 d-flex justify-content-center mt-3"
            imgClass="col-6 col-sm-5 col-lg-6"
          />
          <form id="form-login" className="col-12 mt-5 ">
            <div className="pb-5">
              <Input
                type="text"
                testId="login-name-input"
                id="username"
                value={ userName }
                onChange={ handleChange }
                enterClick={ handleKeyDown }
                containerClass="col mb-2 d-flex justify-content-center"
                placeholder="Digite seu nome"

              />
              <Button
                testId="login-submit-button"
                type="button"
                disabled={ buttonDisabled }
                containerClassName="col d-flex justify-content-center"
                btnClassName="primary-btn col-12"
                onClick={ handleClick }
              >
                Entrar
              </Button>
            </div>
          </form>
        </div>
      </section>
    );
  }

  return <Loading considerHeaderHeight={ false } position="absolute" />;
}

export default Login;
