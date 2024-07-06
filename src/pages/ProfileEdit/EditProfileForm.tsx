import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Forms/Button';
import { UserType } from '../../types';
import './EditProfileForm.css';
import { updateUser } from '../../services/userAPI';
import UserContext from '../../context/UserContext';

type EditProfileFormProps = {
  user: UserType;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
function EditProfileForm({ user, setIsLoading }: EditProfileFormProps) {
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userDescription, setUserDescription] = useState(user.description);
  const [rows, setRows] = useState(3);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const { setUserNameCT } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setUserName(value);
    } else if (name === 'email') {
      setUserEmail(value);
    } else {
      setUserDescription(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await updateUser({
      name: userName,
      email: userEmail,
      description: userDescription,
      image: user.image });
    setUserNameCT(userName);
    navigate('/profile');

    setIsLoading(false);
  };

  useEffect(() => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (
      userName.length >= 3
      && emailRegex.test(userEmail)
      && userDescription.length !== 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [userName, userEmail, userDescription]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setRows(5);
      } else {
        setRows(3);
      }
    };

    window.addEventListener('resize', handleResize);

    // Set initial value
    handleResize();

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <form id="profile-edit-form" onSubmit={ handleSubmit }>
      <div className="mb-3 input-container">
        <label
          htmlFor="editName"
          className="form-label label-profile-edit"
        >
          Nome :
        </label>
        <div
          id="nameHelp"
          className="form-text inputHelp"
        >
          Fique á vontade para usar um apelido.
        </div>
        <input
          id="editName"
          type="text"
          name="name"
          minLength={ 3 }
          className="form-control "
          aria-describedby="nameHelp"
          value={ userName }
          onChange={ handleChange }
          required
        />
      </div>
      <div className="mb-3 input-container">
        <label
          htmlFor="editEmail"
          className="form-label label-profile-edit"
        >
          E-mail:
        </label>
        <div
          id="emailHelp"
          className="form-text inputHelp"
        >
          Escolha um e-mail que consulte regularmente.
        </div>
        <input
          id="editEmail"
          name="email"
          type="email"
          minLength={ 3 }
          className="form-control "
          aria-describedby="emailHelp"
          value={ userEmail }
          placeholder="seu_nome@gmail.com"
          onChange={ handleChange }
          required
        />
      </div>
      <div className="mb-3 input-container">
        <label
          htmlFor="editDescription"
          className="form-label label-profile-edit"
        >
          Descrição :
        </label>
        <textarea
          id="editDescription"
          name="description"
          className="form-control"
          maxLength={ 300 }
          rows={ rows }
          onChange={ handleChange }
          value={ userDescription }
          placeholder="Escreva um pouco sobre você..."
        />
      </div>
      <Button
        type="submit"
        disabled={ buttonDisabled }
        testId="edit-profile-button"
        btnClassName="btn-primary"
        containerClassName="d-flex justify-content-center mb-2"
      >
        Salvar
      </Button>
    </form>
  );
}

export default EditProfileForm;
