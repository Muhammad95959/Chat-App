import moment from "moment";

export function generateMessage(from: string, text: string) {
  return { from, text, createdAt: moment().valueOf() };
}

export function generateLocationMessage(from: string, lat: number, lng: number) {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat}, ${lng}`,
    createdAt: moment().valueOf(),
  };
}
