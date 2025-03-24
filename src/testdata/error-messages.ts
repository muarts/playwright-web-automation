export const INVALID_PASSWORD_ERROR = (password: string) => `User validation failed: password: Path \`password\` (\`${password}\`) is shorter than the minimum allowed length (7).`;
export const EMPTY_FIELDS_ERROR = 'User validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required., email: Email is invalid, password: Path `password` is required.';
export const INVALID_EMAIL_ERROR = 'User validation failed: email: Email is invalid';
export const EMAIL_ADDRESS_ALREADY_IN_USE_ERROR = "Email address is already in use";
export const FIRST_NAME_AND_LAST_NAME_ARE_REQUIRED_ERROR = 'Contact validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required.';