import React, { useEffect, useState }  from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import { Header } from 'semantic-ui-react';
import UserForm from '../../components/Form/UserForm';
import styles from './EditUser.module.css';
import API_BASE_URL from '../../features/config';

function EditUser() {
  const navigate = useNavigate();
  const [usersData , setUsersData ]  = useState(null)
  const { id } = useParams();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`);
        if (response.ok) {
          const responseData = await response.json();
        
          setUsersData(responseData);
          
        } else {
          throw new Error('Error fetching data');
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    };

    fetchData();
  }, [ id]);




  const handleFormSubmit = (formData) => {
    fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
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
        Edit User Details
      </Header>

       
       <UserForm handleFormSubmit={handleFormSubmit} data={ usersData ? usersData : ''} />;
    </>
  );
}
export default EditUser