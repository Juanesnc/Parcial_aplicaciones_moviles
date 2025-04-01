// src/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Modal } from 'react-native';
import TabNavigator from './navigation/TabNavigator';
import AuthStackScreen from './navigation/AuthStack';
import ProfileScreen from './screens/ProfileScreen';
import { AppProvider, AppContext } from './contexts/AppContext';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <AppContext.Consumer>
          {({ user, profileModalVisible, closeProfileModal }) =>
            user ? (
              <>
                <TabNavigator />
                <Modal
                  visible={profileModalVisible}
                  animationType="slide"
                  transparent
                  onRequestClose={closeProfileModal}
                >
                  <ProfileScreen onClose={closeProfileModal} />
                </Modal>
              </>
            ) : (
              <AuthStackScreen />
            )
          }
        </AppContext.Consumer>
      </NavigationContainer>
    </AppProvider>
  );
}
