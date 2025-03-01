interface Validation{
    e: React.ChangeEvent<HTMLInputElement>,
    setError: React.Dispatch<React.SetStateAction<string>>
}

const emailValidation = (validation: Validation): void => {
    const email = validation.e.target.value;

    try {
        const formattedEmail: string = email.trim();
        const emailRegex: RegExp = /\S+@\S+\.\S+/;

        if(formattedEmail === '' || !formattedEmail){
            throw new Error('This field is required')
        }
        if(!formattedEmail.match(emailRegex)){
            throw new Error('Invalid email address')
        }

        validation.setError('');
    } catch (error) {
        if (error instanceof Error) {
            validation.setError(error.message);
        } else {
            validation.setError('An unexpected error occurred');
        }
    }
};

const phoneValidation = (validation: Validation) => {
    const phone = validation.e.target.value;
    return phone
}

const nameValidation = (validation: Validation) => {
    const name = validation.e.target.value;
    return name
};

export const validation = (validation: Validation, validationFunction: string) => {
    switch (validationFunction) {
        case 'name':
            return nameValidation(validation)
        case 'email-address':
            return emailValidation(validation)
        case 'phone-number':
            return phoneValidation(validation)
        default:
            break
    }
};
