/* eslint-disable prettier/prettier */
export function passwordValidator(password) {
  if (!password) return "Senha não pode ser vazio."
  if (password.length < 6) return 'Senha deve possuir ao menos 6 caracteres.'
  return ''
}
