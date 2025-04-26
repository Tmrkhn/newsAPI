import axios from 'axios';

const API_KEY = 'c9d99876aa084e42afda4742858a85ac'
const API_URL = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c9d99876aa084e42afda4742858a85ac'

export const fetchNews = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log('Ответ от NewsAPI:', response.data); // <-- Смотри внимательно сюда в консоль
      return response.data.articles; // Может быть, нужно писать что-то другое
    } catch (error) {
      console.error("Ошибка при загрузке новостей", error);
      return [];
    }
  };
  