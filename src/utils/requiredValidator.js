export const requiredValidator = (myText: string) => {
  if (!myText || myText.length <= 0) return 'This field cannot be empty.';

  return '';
};