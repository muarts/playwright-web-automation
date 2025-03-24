export const INVALID_PASSWORD_ERROR = (password: string) =>
    `User validation failed: password: Path \`password\` (\`${password}\`) is shorter than the minimum allowed length (7).`;
