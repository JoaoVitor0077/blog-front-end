import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import api from "../../services/api";

const Login = ( { navigation }: any ) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            const response = await api.post('/login', { email, senha });
            Alert.alert('Login realizado com sucesso!');
            navigation.navigate('Home');
        } catch (error: any) {
            Alert.alert('Erro ao fazer login', error.response?.data?.mensagem || 'Tente novamente');
        }
    };
    return (

    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

    <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 5 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  link: { color: '#007BFF', textAlign: 'center', marginTop: 15 },
});