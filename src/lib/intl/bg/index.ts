import common from './common';

function unflatten(obj: Record<string, string>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    const parts = key.split('.');
    let current: Record<string, unknown> = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!(parts[i] in current) || typeof current[parts[i]] !== 'object') {
        current[parts[i]] = {};
      }
      current = current[parts[i]] as Record<string, unknown>;
    }
    current[parts[parts.length - 1]] = obj[key];
  }
  return result;
}

const bg = unflatten(common);

export default bg;
