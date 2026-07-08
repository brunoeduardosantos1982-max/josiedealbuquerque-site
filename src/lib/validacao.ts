export function isEmailValido(email: string): boolean {
  const valor = email.trim();
  if (valor.length < 6 || valor.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}
