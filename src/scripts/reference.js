export async function example() {
  const payload = { data: data, error: false };

  try {
  } catch {}

  return payload;

  // {data: data, error: false} // means we manage to get the data correctly.
  // {data: data, error: true} // means we could not get the data, and data is the error message of why it failed
}
