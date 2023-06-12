import React, { useEffect, useState } from 'react';
import { Button, Container, Divider, Dropdown, Form, Image, Radio } from 'semantic-ui-react';
import FormData from 'form-data';
import validateForm from '../../features/validateForm';
import styles from './UserForm.module.css';

function UserForm(props) {
  const { handleFormSubmit, data } = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data) {
      setFirstName(data.firstName || '');
      setLastName(data.lastName || '');
      setEmail(data.email || '');
      setMobile(data.mobile || '');
      setGender(data.gender || '');
      setStatus(data.status || '');
      setLocation(data.location || '');
      if (data.selectedFile) {
        setSelectedFile(null); // Clear the selected file if selectedFile is available
      }
    }
  }, [data]);

  const getImageSrc = () => {
    if (data && data.selectedFile) {
      return selectedFile ? URL.createObjectURL(selectedFile) : data.selectedFile;
    } else if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    } else {
      return 'https://react.semantic-ui.com/images/avatar/large/molly.png';
    }
  };

  const clearError = (fieldName) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: undefined }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      email,
      mobile,
      gender,
      status,
      selectedFile: selectedFile === null && data ? data.selectedFile : selectedFile,
      location,
    };

    const formErrors = validateForm(userData);

    if (Object.keys(formErrors).length === 0) {
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      handleFormSubmit(formData);
    } else {
      setErrors(formErrors);
    }
  };

  const handleMobileChange = (e) => {
    const inputMobile = e.target.value;
    const formattedMobile = inputMobile.replace(/\D/g, ''); // Remove non-digit characters
    setMobile(formattedMobile);
  };

  return (
    <>
     

      <Container className={styles.container}>
        <div className={styles.imageContainer}>
        <Image
            src={getImageSrc()}
            size='small'
            circular
            />
        </div>
          

        <Form size='big' onSubmit={handleSubmit} encType='multipart/form-data'>
          <Form.Group widths='equal'>
            <Form.Field
              label='First name'
              control='input'
              placeholder='First name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={() => clearError('firstName')}
              error={errors.firstName ? { content: errors.firstName } : null}
            />
            <Form.Field
              label='Last name'
              control='input'
              placeholder='Last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onFocus={() => clearError('lastName')}
              error={errors.lastName ? { content: errors.lastName } : null}
            />
          </Form.Group>
          <Divider hidden />
          <Form.Group widths='equal'>
            <Form.Field
              label='Email Address'
              control='input'
              placeholder='example@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => clearError('email')}
              error={errors.email ? { content: errors.email } : null}
            />
               <Form.Field
              label='Mobile'
              control='input'
              placeholder='Enter Mobile'
              value={mobile}
              onChange={handleMobileChange}
              onFocus={() => clearError('mobile')}
              error={errors.mobile ? { content: errors.mobile } : null}
            />
          </Form.Group>
          <Divider hidden />
          <Form.Group widths='equal'>
            <Form.Field>
              Select Your Gender
              <div>
                <Form.Field>
                  <Radio
                    label='Male'
                    name='radioGroup'
                    value='Male'
                    checked={gender === 'Male'}
                    onChange={(e, { value }) => setGender(value)}
                    onFocus={() => clearError('gender')}
                    error={errors.gender ? { content: errors.gender } : null}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label='Female'
                    name='radioGroup'
                    value='Female'
                    checked={gender === 'Female'}
                    onChange={(e, { value }) => setGender(value)}
                    onFocus={() => clearError('gender')}
                  />
                </Form.Field>
              </div>
              {errors.gender && <div className={styles.error}>{errors.gender}</div>}
            </Form.Field>

            <Form.Field error={errors.status ? { content: errors.status } : null}>
              <label>Status</label>
              <Dropdown
                placeholder='Select...'
                fluid
                selection
                options={[
                  { key: 'Active', text: 'Active', value: 'Active' },
                  { key: 'InActive', text: 'InActive', value: 'InActive' },
                ]}
                onChange={(e, { value }) => setStatus(value)}
              />
            </Form.Field>
          </Form.Group>
          <Divider hidden />
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Select Your Profile</label>
              <input type="file" onChange={handleFileChange} />
              {errors.selectedFile && <div className={styles.error}>{errors.selectedFile}</div>}
              {selectedFile && (
                <div>
                  <p>File Size: {selectedFile.size} bytes</p>
                 
                </div>
              )}
            </Form.Field>
            <Form.Field
              label='Enter Your Location'
              control='input'
              placeholder='Enter Your Location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => clearError('location')}
              error={errors.location ? { content: errors.location } : null}
            />
          </Form.Group>
          <Divider hidden />
          <Button type='submit' fluid className={styles.customButton}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}


export default UserForm