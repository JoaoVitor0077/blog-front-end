import React, { useState} from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import api from "../../services/api";
import { authStyles } from "../../components/AuthSyles";

const Register = ({ navigation }: any) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleRegister = async () => {
    // Validações básicas
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      await api.post('/register', { nome, email, senha });
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Erro ao cadastrar', error.response?.data?.mensagem || 'Tente novamente');
    }
  };

  return (
    <SafeAreaView style={authStyles.container}>
      <ScrollView contentContainerStyle={authStyles.scrollContainer}>
        <View style={authStyles.content}>
          <TouchableOpacity 
            style={authStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={authStyles.backButtonText}>← Registrar</Text>
          </TouchableOpacity>

          <Text style={authStyles.subtitle}>
            Para criar sua conta, informe seus dados e defina sua senha para participar da comunidade.
          </Text>

          <View style={authStyles.inputContainer}>
            <TextInput
              style={authStyles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />

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

            <TextInput
              style={authStyles.input}
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={authStyles.primaryButton} onPress={handleRegister}>
            <Text style={authStyles.primaryButtonText}>Criar conta</Text>
          </TouchableOpacity>

          <Text style={authStyles.termsText}>
            Ao criar uma conta, você concorda com os Termos de Uso e a Política de Privacidade.
          </Text>

          <TouchableOpacity 
            style={authStyles.linkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={authStyles.linkText}>Já tem conta? Faça seu login aqui</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;