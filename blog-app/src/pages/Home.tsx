import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import api from '../services/api';

type Post = {
  id: number;
  titulo: string;
  conteudo: string;
  imagem?: string | null; // pode ser base64 ou URL
  usuario_id: number;
  data_publicacao: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarPosts = async () => {
      try {
        const response = await api.get<Post[]>('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarPosts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Carregando posts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.title}>{item.titulo}</Text>
            {item.imagem ? (
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.imagem}` }}
                style={styles.image}
              />
            ) : null}
            <Text>{item.conteudo}</Text>
            <Text style={styles.date}>{new Date(item.data_publicacao).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  post: { marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  image: { width: '100%', height: 200, marginBottom: 5 },
  date: { fontSize: 12, color: '#666', marginTop: 5 },
});
