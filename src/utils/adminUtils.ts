
export const ADMIN_EMAILS = [
  'umairjalbani80@gmail.com',
  'qaistiger2.0@gmail.com'
];

export const isAdmin = (email: string | null | undefined): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};
