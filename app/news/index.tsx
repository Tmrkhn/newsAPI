import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { fetchNews } from '../../lib/news';

export default function NewsScreen() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      const fetchedNews = await fetchNews();
      console.log('Ответ от API:', fetchedNews); // <-- Печатаем ответ для дебага
      setNews(fetchedNews || []); // Если нет данных - ставим пустой массив
      setLoading(false);
    };
    
    getNews();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Загрузка новостей...</Text>
      </View>
    );
  }

  if (!news || news.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Нет новостей для отображения.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {news.map((item, index) => (
        <View key={index} style={styles.newsItem}>
          <Text style={styles.newsTitle}>{item.title}</Text>
          <Text style={styles.newsText}>{item.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  newsText: {
    fontSize: 14,
    color: '#666',
  },
});


