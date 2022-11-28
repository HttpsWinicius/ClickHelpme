/* eslint-disable prettier/prettier */
export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Email não pode ser vazio."
  if (!re.test(email)) return 'Por favor! Digite um endereço de e-mail valido.'
  return ''
}
