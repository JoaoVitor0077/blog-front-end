import React, { useState} from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import api from "../../services/api";

const Register = ( { navigation }: any ) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleRegister = async () => {
        try {
            await api.post('/register', { nome, email, senha });
            Alert.alert('Cadastro realizado com sucesso!');
            navigation.navigate('Login');
        } catch (error: any) {
            Alert.alert('Erro ao cadastrar', error.response?.data?.mensagem || 'Tente novamente');
        }
    };

     return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 5 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  link: { color: '#007BFF', textAlign: 'center', marginTop: 15 },
});
