/*
import React, { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { postStyles } from "../../components/PostStyles";
import api from "../../services/api";

interface EditPostProps {
  navigation: any;
  route: {
    params: {
      postId: number;
    };
  };
}

export const EditPost = ({ navigation, route }: EditPostProps) => {
  const { postId } = route.params;

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [imagem, setImagem] = useState<string | null>(null);
  const [imagemAlterada, setImagemAlterada] = useState(false); // para controlar se usuário trocou a imagem

  const usuario_id = 1; // ajuste conforme o usuário logado

  // Carregar dados do post ao montar o componente
  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await api.get(`/posts/${postId}`);
        const post = response.data as { titulo: string; conteudo: string; imagem?: string };

        setTitulo(post.titulo);
        setConteudo(post.conteudo);

        // Aqui dependendo de como a imagem é retornada,
        // se for URL ou base64, ajustar para exibir
        if (post.imagem) {
          setImagem(post.imagem);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar o post');
      }
    };
    loadPost();
  }, [postId]);

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permissão de acesso à galeria negada');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      base64: false,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
      setImagemAlterada(true);
    }
  };

  const handleSave = async () => {
    if (!titulo || !conteudo) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('conteudo', conteudo);
    formData.append('usuario_id', usuario_id.toString());

    if (imagemAlterada && imagem) {
      let fileType = imagem.substring(imagem.lastIndexOf('.') + 1);
      let mimeType = fileType === 'png' ? 'image/png' : 'image/jpeg';

      formData.append('imagem', {
        uri: imagem,
        name: `image.${fileType}`,
        type: mimeType,
      } as unknown as Blob);
    }

    try {
      await api.put(`/posts/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Sucesso', 'Post atualizado com sucesso!');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Erro ao atualizar post', error.response?.data?.message || 'Tente novamente');
    }
  };

  return (
    <ScrollView contentContainerStyle={postStyles.container}>
      <Text style={postStyles.header}>Editar Artigo</Text>

      <Text style={postStyles.label}>Banner</Text>
      <TouchableOpacity onPress={handleImagePicker} style={postStyles.imagePicker}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={postStyles.image} />
        ) : (
          <Text style={postStyles.imagePlaceholder}>Adicione uma imagem</Text>
        )}
      </TouchableOpacity>

      <Text style={postStyles.label}>Título</Text>
      <TextInput
        style={postStyles.input}
        placeholder="Adicione um título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={postStyles.label}>Texto</Text>
      <TextInput
        style={[postStyles.input, postStyles.textArea]}
        placeholder="Escreva seu artigo"
        value={conteudo}
        onChangeText={setConteudo}
        multiline
      />

      <TouchableOpacity style={postStyles.button} onPress={handleSave}>
        <Text style={postStyles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
*/