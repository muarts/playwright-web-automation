export const INVALID_PASSWORD_ERROR = (password: string) =>
    `User validation failed: password: Path \`password\` (\`${password}\`) is shorter than the minimum allowed length (7).`;

export const EMPTY_FIELDS_ERROR = 'User validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required., email: Email is invalid, password: Path `password` is required.';