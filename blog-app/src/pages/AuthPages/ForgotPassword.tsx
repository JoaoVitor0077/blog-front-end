// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { authStyles } from "../../components/AuthSyles";
import api from '../../services/api';

const ForgotPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Dummy handler for reset button (implement your logic here)
  const handleReset = async () => {
    // Validações básicas
    if (!email || !novaSenha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      await api.post('/forgotpassword', { novaSenha });
      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      // Redirecionar para a tela de login
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
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={authStyles.backButtonText}>← Esqueci a senha</Text>
          </TouchableOpacity>

          <Text style={authStyles.subtitle}>
            Para continuar, informe seu E-mail e defina sua nova senha para redefinir sua conta.
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
              placeholder="Nova senha"
              value={novaSenha}
              onChangeText={setNovaSenha}
              secureTextEntry
            />

            <TextInput
              style={authStyles.input}
              placeholder="Confirmar nova senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={authStyles.primaryButton} onPress={handleReset}>
            <Text style={authStyles.primaryButtonText}>Alterar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={authStyles.linkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={authStyles.linkText}>Voltar para o login aqui</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;