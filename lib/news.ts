import axios from 'axios';

const API_KEY = 'c9d99876aa084e42afda4742858a85ac';
const API_URL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;

export async function fetchNews() {
  try {
    const response = await axios.get(API_URL);
    const data = response.data;  // Данные из ответа

    console.log('Что пришло от API:', data);  // Логируем для дебага

    if (!data.articles) {
      console.error('Нет статей в ответе!');
      return [];
    }

    return data.articles;
  } catch (error) {
    console.error('Ошибка загрузки новостей:', error);
    return [];
  }
}




