import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Articles: undefined;
  CreatePost: undefined;
  MyPosts: undefined;
};

export default function Navbar() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const activeTab = route.name;

  return (
    <View style={styles.navbar}>
      <View style={styles.navContent}>
        <View style={styles.navLinks}>
          <TouchableOpacity
            style={[styles.navButton, activeTab === 'Home' && styles.activeNavButton]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={[styles.navText, activeTab === 'Home' && styles.activeNavText]}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, activeTab === 'Articles' && styles.activeNavButton]}
            onPress={() => navigation.navigate('Articles')}
          >
            <Text style={[styles.navText, activeTab === 'Articles' && styles.activeNavText]}>
              Artigos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, activeTab === 'CreatePost' && styles.activeNavButton]}
            onPress={() => navigation.navigate('CreatePost')}
          >
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <TouchableOpacity 
          style={styles.avatarContainer}
          onPress={() => setShowProfileMenu(true)}
        >
          <Image
            source={{ uri: 'https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2025/02/12/705457866-chaves-exposicao.jpg' }}
            style={styles.avatar}
          />
        </TouchableOpacity>

        {/* Profile Menu Modal */}
        <Modal
          visible={showProfileMenu}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowProfileMenu(false)}
        >
          <Pressable 
            style={styles.modalOverlay}
            onPress={() => setShowProfileMenu(false)}
          >
            <View style={styles.profileMenu}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setShowProfileMenu(false);
                  navigation.navigate('CreatePost');
                }}
              >
                <Text style={styles.menuItemText}>Criar Post</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setShowProfileMenu(false);
                  navigation.navigate('MyPosts');
                }}
              >
                <Text style={styles.menuItemText}>Meus artigos</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setShowProfileMenu(false);
                  // Adicionar a navegação para o perfil do usuário
                  // navigation.navigate('Profile');
                }}
              >
                <Text style={styles.menuItemText}>Meu Perfil</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.menuItem, styles.lastMenuItem]}
                onPress={() => {
                  setShowProfileMenu(false);
                  // Adicione aqui a lógica de logout
                  // handleLogout();
                }}
              >
                <Text style={styles.menuItemText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  activeNavButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  navText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  activeNavText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  avatarContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: 20,
  },
  profileMenu: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
});