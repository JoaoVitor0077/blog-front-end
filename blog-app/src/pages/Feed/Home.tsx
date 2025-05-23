import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import api from "../../services/api";
import Navbar from '../../components/Navbar';

type RootStackParamList = {
  PostDetails: { postId: number };
  Posts: undefined;
  // add other routes if needed
};

type Post = {
  id: number;
  titulo: string;
  conteudo: string;
  imagem?: string | null;
  usuario_id: number;
  data_publicacao: string;
};

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const carregarPostsRecentes = async () => {
      try {
        const response = await api.get<Post[]>('/posts');
        // Pega apenas os 4 posts mais recentes
        const postsOrdenados = response.data
          .sort((a, b) => new Date(b.data_publicacao).getTime() - new Date(a.data_publicacao).getTime())
          .slice(0, 4);
        setRecentPosts(postsOrdenados);
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarPostsRecentes();
  }, []);

  const truncateText = (text: string, maxLength: number = 80): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const navigateToPost = (postId: number) => {
    // Navegar para a tela de detalhes do post
    navigation.navigate('PostDetails', { postId });
  };

  const navigateToAllPosts = () => {
    // Navegar para a página completa de artigos
    navigation.navigate('Posts');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <Navbar />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Posts Grid */}
        <View style={styles.postsGrid}>
          {recentPosts.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={styles.postCard} 
              onPress={() => navigateToPost(item.id)}
              activeOpacity={0.8}
            >
              {item.imagem && (
                <Image
                  source={{ uri: `http://localhost:3000/posts/${item.id}/imagem` }}
                  style={styles.postImage}
                />
              )}
              
              <View style={styles.postContent}>
                <Text style={styles.postTitle}>{item.titulo}</Text>
                <Text style={styles.postDescription}>
                  {truncateText(item.conteudo)}
                </Text>
                
                <View style={styles.postFooter}>
                  <View style={styles.tagContainer}>
                    <Text style={styles.newTag}>New</Text>
                  </View>
                  <Text style={styles.postDate}>
                    {new Date(item.data_publicacao).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {recentPosts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum artigo encontrado</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  viewAllText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  postsGrid: {
    width: '90%',
    maxWidth: 400,
    gap: 20,
  },
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  postContent: {
    padding: 20,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  postDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
  },
  newTag: {
    backgroundColor: '#333',
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  postDate: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});