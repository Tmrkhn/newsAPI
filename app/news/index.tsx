import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, Pressable, Linking } from 'react-native';
import { fetchNews } from '../../lib/news'; 

export default function NewsScreen() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      const fetchedNews = await fetchNews();
      console.log('Ответ от API:', fetchedNews);
      setNews(fetchedNews || []);
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
        <Pressable
          key={index}
          style={styles.newsItem}
          onPress={() => {
            if (item.url) {
              Linking.openURL(item.url);
            }
          }}
        >
          {item.urlToImage ? (
            <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />
          ) : null}
          <Text style={styles.newsTitle}>{item.title}</Text>
          {item.description ? (
            <Text style={styles.newsText}>{item.description}</Text>
          ) : null}
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsItem: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2, // для Android тень
    shadowColor: '#000', // для iOS тень
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  newsImage: {
    width: '100%',
    height: 200,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    marginHorizontal: 10,
    color: '#333',
  },
  newsText: {
    fontSize: 14,
    marginBottom: 10,
    marginHorizontal: 10,
    color: '#666',
  },
});



