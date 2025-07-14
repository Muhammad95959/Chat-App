export function generateMessage(from: string, text: string) {
  return { from, text, createdAt: new Date().getTime() };
}

export function generateLocationMessage(from: string, lat: number, lng: number) {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat}, ${lng}`,
    createdAt: new Date().getTime(),
  };
}
