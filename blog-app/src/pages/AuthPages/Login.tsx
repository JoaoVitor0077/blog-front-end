import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { authStyles } from "../../components/AuthSyles";
import api from "../../services/api";

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    // Validações básicas
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const response = await api.post('/login', { email, senha });
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('Home');
    } catch (error: any) {
      Alert.alert('Erro ao fazer login', error.response?.data?.mensagem || 'Tente novamente');
    }
  };

  return (
    <SafeAreaView style={authStyles.container}>
      <ScrollView contentContainerStyle={authStyles.scrollContainer}>
        <View style={authStyles.content}>
          <Text style={authStyles.title}>Bem-vindo de volta!</Text>
          <Text style={authStyles.subtitle}>
            Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito mais.
          </Text>

          <View style={authStyles.inputContainer}>
            <TextInput
              style={authStyles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={authStyles.input}
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={authStyles.forgotPasswordButton}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={authStyles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={authStyles.primaryButton} onPress={handleLogin}>
            <Text style={authStyles.primaryButtonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={authStyles.linkButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={authStyles.linkText}>Não possui conta? Crie aqui</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;