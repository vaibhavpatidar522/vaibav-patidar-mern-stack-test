const validateForm = (userData ) => {
    const { firstName ,lastName , email , mobile , gender , status , selectedFile , location } = userData

    const isValidEmail = (email) => {

      // Regular expression pattern for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
      // Check if the email matches the pattern
      return emailRegex.test(email);
    };


    const validations = {
      firstName: {
        value: firstName,
        message: 'First name is required',
      },
      lastName: {
        value: lastName,
        message: 'Last name is required',
      },
      email: {
        value: email,
        message: 'Email address is required',
        validate: () => isValidEmail(email),
        validateMessage: 'Invalid email address',
      },
      mobile: {
        value: mobile,
        message: 'Mobile number is required',
      },
      gender: {
        value: gender,
        message: 'Please select a gender',
      },
      status: {
        value: status,
        message: 'Please select a status',
      },
      selectedFile: {
        value: selectedFile,
        message: 'Please select a profile image',
      },
      location: {
        value: location,
        message: 'Location is required',
      },
    };
  
    const errors = {};

 
  
    for (const field in validations) {
      const { value, message, validate, validateMessage } = validations[field];
  
      if (!value) {
        errors[field] = message;
      } else if (validate && !validate(value)) {
        errors[field] = validateMessage;
      }
    }
  
    return errors;
  };
  
export default validateForm;