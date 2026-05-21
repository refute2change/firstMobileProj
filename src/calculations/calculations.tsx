export function isValidMathExpression(expression: string): number | false {
  if (typeof expression !== 'string') {
    return false;
  }

  const trimmed = expression.trim();
  if (trimmed.length === 0) {
    return false;
  }

  const validPattern = /^[0-9.+\-*/()\s]+$/;
  if (!validPattern.test(trimmed)) {
    return false;
  }

  try {
    // Using Function to validate syntax and evaluate the expression.
    // eslint-disable-next-line no-new-func
    const result = new Function(`return (${trimmed})`)();
    return result;
  } catch {
    return false;
  }
}
