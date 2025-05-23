import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function PostView() {
  const route = useRoute();
  const { post } = route.params as { post: any };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: post.imageUrl }} style={styles.coverImage} />
      
      <Text style={styles.title}>{post.title}</Text>

      <View style={styles.metaInfo}>
        <Text style={styles.author}>Por {post.author}</Text>
        <Text style={styles.date}>Criado em {post.date}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Ionicons name="heart" size={20} color="red" />
          <Text style={styles.statText}>{post.likes}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="chatbubble" size={20} color="#555" />
          <Text style={styles.statText}>{post.comments}</Text>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  coverImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  metaInfo: {
    marginBottom: 10,
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#aaa',
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
  content: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
});