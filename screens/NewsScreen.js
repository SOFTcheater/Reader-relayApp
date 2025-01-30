import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getNewsFromFirebase } from './newsService1';

const NewsArticleScreen = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const news = await getNewsFromFirebase();
      setArticles(news);
    };
    
 
    loadData();
  }, []);

  const handleExpand = (articleId) => {
    setExpandedId(prev => prev === articleId ? null : articleId);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.publication}>Book News</Text>
      </View>

      {articles.map(article => (
        <View key={article.id} style={styles.newsItem}>
          <Text style={styles.headline}>{article.title}</Text>
          
          <View style={styles.meta}>
            <Text style={styles.author}>{article.author}</Text>
            <Text style={styles.category}>{article.category}</Text>
          </View>

          <Image
            source={{ uri: article.imageUrl }}
            style={styles.mainImage}
            resizeMode="cover"
          />

          <TouchableOpacity onPress={() => handleExpand(article.id)}>
            <Text style={styles.summary} numberOfLines={expandedId === article.id ? undefined : 3}>
              {article.content}
            </Text>
            <Text style={styles.showAll}>
              {expandedId === article.id ? 'Show less' : 'Show all'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};
export default NewsArticleScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  publication: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  articleContainer: {
    padding: 20,
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,
    marginBottom: 15,
  },
  meta: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
  },
  category: {
    fontSize: 14,
    color: '#ab0613',
    fontWeight: '500',
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 15,
  },
  summary: {
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
    marginBottom: 10,
  },
  showAll: {
    color: '#ab0613',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 30,
  },
  newsItem: {
    borderTopWidth: 1,
    borderTopColor: '#e2e2e2',
    paddingTop: 25,
    marginTop: 15,
  },
});

// Keep your existing styles