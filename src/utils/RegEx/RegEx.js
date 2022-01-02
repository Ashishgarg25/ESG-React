const RegEx = {
    alphaNumeric: /^[a-zA-Z0-9_]*$/,
    alphaNumericSpace: /^[a-zA-Z0-9\-\s]+$/,
    alphabetSpace: /^(?!\s*$)[a-zA-Z.+\s'-]+$/,
    companyName: /^(?!\s*$)[a-zA-Z0-9.+\s'-]+$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    phone: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
    cin: /^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/,
    // website: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
    website: /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/,
    pinCode: /^[1-9][0-9]{5}$/,
    password: /^[^-\\s]$/,
    otp: /^\d{4}$/,
    nicCodeNew: /^[0-9]{12}$/,
    nicCodeOld: /^[0-9]{9}[vVxX]$/
}

export default RegEx;