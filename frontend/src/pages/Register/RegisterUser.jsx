import React  from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { Header } from 'semantic-ui-react';
import UserForm from '../../components/Form/UserForm';
import styles from './RegisterUser.module.css';
import API_BASE_URL from '../../features/config';

function RegisterUser() {
  const navigate = useNavigate();

  const handleFormSubmit = (formData) => {
    fetch(`${API_BASE_URL}/users/`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            toast.success(data.message);
            navigate('/');
          });
        } else {
          return res.json().then((data) => {
            throw new Error(data.message);
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };

  return (
    <>
      <Header as='h2' block textAlign='center' className={styles.header}>
        Register Your Details
      </Header>
       <UserForm handleFormSubmit={handleFormSubmit} data={ '' } />;
    </>
  );
}

export default RegisterUser;





