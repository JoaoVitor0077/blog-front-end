import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  RefreshControl,
  ActivityIndicator 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import api from "../../services/api";
import Navbar from '../../components/Navbar';

type RootStackParamList = {
  PostDetails: { postId: number };
  Posts: undefined;
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
  const [refreshing, setRefreshing] = useState(false);
  // Estado para controlar quais posts estão expandidos
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set());
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await carregarPostsRecentes();
      setLoading(false);
    };
    
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarPostsRecentes();
    setRefreshing(false);
  };

  const truncateText = (text: string, maxLength: number = 100): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const navigateToPost = (postId: number) => {
    navigation.navigate('PostDetails', { postId });
  };

  const navigateToAllPosts = () => {
    navigation.navigate('Posts');
  };

  // Função para alternar expansão do post
  const togglePostExpansion = (postId: number) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // Função para verificar se o post está expandido
  const isPostExpanded = (postId: number): boolean => {
    return expandedPosts.has(postId);
  };

  // Função para determinar se o conteúdo precisa ser truncado
  const needsTruncation = (text: string, maxLength: number): boolean => {
    return text.length > maxLength;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h atrás`;
    }
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando artigos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navbar />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Artigos Recentes</Text> 
        </View>

        {/* Posts Grid */}
        <View style={styles.postsGrid}>
          {recentPosts.map((item, index) => {
            const isExpanded = isPostExpanded(item.id);
            const maxLength = index === 0 ? 120 : 80;
            const showTruncated = !isExpanded && needsTruncation(item.conteudo, maxLength);
            const displayContent = showTruncated 
              ? truncateText(item.conteudo, maxLength)
              : item.conteudo;

            return (
              <View 
                key={item.id}
                style={[
                  styles.postCard,
                  index === 0 && styles.featuredCard
                ]} 
              >
                {/* Área clicável para navegar para detalhes */}
                <TouchableOpacity 
                  onPress={() => navigateToPost(item.id)}
                  activeOpacity={0.8}
                >
                  {item.imagem && (
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: `http://192.168.0.60:3000/posts/${item.id}/imagem` }}
                        style={[
                          styles.postImage,
                          index === 0 && styles.featuredImage
                        ]}
                      />
                      {index === 0 && (
                        <View style={styles.featuredBadge}>
                          <Text style={styles.featuredBadgeText}>Destaque</Text>
                        </View>
                      )}
                    </View>
                  )}
                  
                  <View style={styles.postContent}>
                    <Text style={[
                      styles.postTitle,
                      index === 0 && styles.featuredTitle
                    ]}>
                      {item.titulo}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Conteúdo expansível */}
                <View style={styles.postContent}>
                  <Text style={styles.postDescription}>
                    {displayContent}
                  </Text>
                  
                  <View style={styles.postFooter}>
                    <View style={styles.tagContainer}>
                      <Text style={styles.newTag}>New</Text>
                    </View>
                    <Text style={styles.postDate}>
                      {formatDate(item.data_publicacao)}
                    </Text>
                  </View>
                </View>

                {/* Indicador de leitura - agora com funcionalidade de expandir */}
                {needsTruncation(item.conteudo, maxLength) && (
                  <TouchableOpacity 
                    style={styles.readIndicator}
                    onPress={() => togglePostExpansion(item.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.readText}>
                      {isExpanded ? 'Ler menos ↑' : 'Ler mais →'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        {recentPosts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Nenhum artigo encontrado</Text>
            <Text style={styles.emptyDescription}>
              Não há artigos disponíveis no momento. 
              Puxe para baixo para atualizar.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 12,
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
    fontSize: 26,
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
  featuredCard: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  featuredImage: {
    height: 220,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featuredBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
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
  featuredTitle: {
    fontSize: 20,
    lineHeight: 26,
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
  readIndicator: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  readText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  detailsButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  detailsText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});