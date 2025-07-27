export function getAuthConfig(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
