export const errorInputField = (label, id, value, helperText) => {
  return {
    error: true,
    label: label,
    id: id,
    value: value,
    helperText: helperText,
  };
};

export const normalInputField = (label, id, value) => {
  return { label: label, id: id, value: value };
};
