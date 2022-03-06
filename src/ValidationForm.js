export const validateForm = (dish) => {
    const {name, preparation_time, type, no_of_slices, diameter, slices_of_bread} = dish;

    if(name === ''){
        return [false, 'The \'name\'\  field is required.']
    }

    const regExpPrepTime = /[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/;
    if (!regExpPrepTime.test(preparation_time)){
        return [false, 'Preparation time has the wrong format.'];
    }

    if (type === ''){
        return [false, `You have to choose a type of dish.`];
    }

    if(type === 'pizza' && no_of_slices == false){
        return [false, 'The \'number of slices\'\ field is required.']
    }

    if(type === 'pizza' && diameter == false){
        return [false, 'The \'diameter\'\ field is required.']
    }

    if(type === 'sandwich' && slices_of_bread == false){
        return [false, 'The \'slices of bread\'\ field is required.']
    }

    if (no_of_slices < 0 || diameter < 0 || no_of_slices < 0)
    {
        return [false, 'Number field can\'t be less than zero.']
    }

    return [true, ''];
};