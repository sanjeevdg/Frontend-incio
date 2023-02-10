export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const requiredValidator = (myText: string) => {
  if (!myText || myText.length <= 0) return 'This field cannot be empty.';

  return '';
};