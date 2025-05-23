import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import api from "../../services/api";
import Navbar from '../../components/Navbar';

type Post = {
  id: number;
  titulo: string;
  conteudo: string;
  imagem?: string | null;
  usuario_id: number;
  data_publicacao: string;
};

export default function Artigos() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const carregarTodosPosts = async () => {
      try {
        const response = await api.get<Post[]>('/posts');
        const postsOrdenados = response.data.sort(
          (a, b) => new Date(b.data_publicacao).getTime() - new Date(a.data_publicacao).getTime()
        );
        setPosts(postsOrdenados);
        setFilteredPosts(postsOrdenados);
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarTodosPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.conteudo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm, posts]);

  const truncateText = (text: string, maxLength: number = 120): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const navigateToPost = (postId: number) => {
    // Navegar para a tela de detalhes do post
    console.log('Navegando para post:', postId);
  };

  // Paginação
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando artigos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <Navbar />
      {/* Header com busca */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Todos os Artigos</Text>
        <Text style={styles.headerSubtitle}>
          {filteredPosts.length} artigo{filteredPosts.length !== 1 ? 's' : ''} encontrado{filteredPosts.length !== 1 ? 's' : ''}
        </Text>
        
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar artigos..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {/* Lista de artigos */}
      <FlatList
        data={currentPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.postCard} 
            onPress={() => navigateToPost(item.id)}
            activeOpacity={0.8}
          >
            {item.imagem && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.imagem}` }}
                style={styles.postImage}
              />
            )}
            
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>{item.titulo}</Text>
              <Text style={styles.postDescription}>
                {truncateText(item.conteudo)}
              </Text>
              
              <View style={styles.postFooter}>
                <Text style={styles.postDate}>
                  {new Date(item.data_publicacao).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </Text>
                <Text style={styles.readMore}>Ler mais →</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {searchTerm ? 'Nenhum artigo encontrado para sua busca' : 'Nenhum artigo disponível'}
            </Text>
          </View>
        }
      />

      {/* Paginação */}
      {totalPages > 1 && (
        <View style={styles.pagination}>
          <TouchableOpacity
            style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
            onPress={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Text style={[styles.pageButtonText, currentPage === 1 && styles.disabledText]}>
              Anterior
            </Text>
          </TouchableOpacity>

          <Text style={styles.pageInfo}>
            {currentPage} de {totalPages}
          </Text>

          <TouchableOpacity
            style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
            onPress={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <Text style={[styles.pageButtonText, currentPage === totalPages && styles.disabledText]}>
              Próxima
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  listContainer: {
    padding: 20,
    paddingBottom: 100, // Espaço para paginação
  },
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 26,
  },
  postDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postDate: {
    fontSize: 13,
    color: '#999',
  },
  readMore: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  pageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
  },
  pageButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  disabledText: {
    color: '#ccc',
  },
  pageInfo: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});