import axios from 'axios';

export async function getMetadataFromLink(link: string): Promise<string> {
  try {
    const { data } = await axios.get(`https://api.microlink.io?url=${encodeURIComponent(link)}`);
    const { title, description } = data.data;
    return `${title ?? ''}. ${description ?? ''}`;
  } catch (err) {
    console.error('Microlink error:', err);
    return '';
  }
}
