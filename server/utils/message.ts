export default function generateMessage(from: string, text: string) {
  return { from, text, createdAt: new Date().getTime() };
}
