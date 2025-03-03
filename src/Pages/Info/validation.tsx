interface Validation{
    e: React.ChangeEvent<HTMLInputElement>,
    setError: React.Dispatch<React.SetStateAction<string>>
}

function handleError (error: unknown, setError: React.Dispatch<React.SetStateAction<string>>): void{
    if (error instanceof Error) {
        setError(error.message);
    } else {
        setError('An unexpected error occurred');
    }
};

const nameValidation = (validation: Validation): void => {
    const name = validation.e.target.value;

    try {
        const formattedName: string = name.trim();
        const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]{2,}(?:\s+[a-zA-ZÀ-ÖØ-öø-ÿ]{2,})+$/; //The name must contain a minimum of 2 strings with a minium of 2 words each

        if(formattedName === '' || !formattedName){
            throw new Error('This field is required')
        }
        if(!formattedName.match(nameRegex)){
            throw new Error('Invalid name')
        }

        validation.setError('');
    } catch (error) {
        handleError(error, validation.setError)
    }
};

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
        handleError(error, validation.setError)
    }
};

const phoneValidation = (validation: Validation): void => {
    const phone = validation.e.target.value;

    try {
        const formattedPhone: string = phone.trim();
        const phoneRegex: RegExp = /^(?:\D*\d\D*){8,15}$/;

        if(formattedPhone=== '' || !formattedPhone){
            throw new Error('This field is required')
        }
        if(!formattedPhone.match(phoneRegex)){
            throw new Error('Invalid phone number')
        }

        validation.setError('');
    } catch (error) {
        handleError(error, validation.setError)
    }
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
