/*
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../services/api";
import { myPostStyles } from "../../components/MyPostsStyles";

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  imagem?: string;
}

export const MyPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Erro', 'Usuário não autenticado. Faça login novamente.');
        return;
      }

      const response = await api.get('/posts/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setPosts(response.data as Post[]);
    } catch (error: any) {
      Alert.alert('Erro ao carregar posts', error.response?.data?.message || 'Tente novamente');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderItem = ({ item }: { item: Post }) => (
    <View style={myPostStyles.postContainer}>
      <Text style={myPostStyles.postTitle}>{item.titulo}</Text>
      <Text style={myPostStyles.postContent}>{item.conteudo}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <View style={myPostStyles.container}>
      <Text style={myPostStyles.header}>Meus Artigos</Text>
      {posts.length === 0 ? (
        <Text style={myPostStyles.noPosts}>Você ainda não criou nenhum artigo.</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};
*/