import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  Alert, 
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Camera, Image as ImageIcon, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// --- THEME COLORS ---
const COLORS = {
  primary: '#8dc63f',
  primaryDark: '#4a7c2a',
  surface: '#ffffff',
  textMain: '#111827',
  textSub: '#6b7280',
  overlay: 'rgba(0,0,0,0.5)',
  border: '#e2e8f0'
};

const ImageInput = ({ onImageSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // --- HANDLERS ---
  const handleCamera = () => {
    const options = { mediaType: 'photo', quality: 0.8, includeBase64: false };
    launchCamera(options, (response) => processResponse(response));
  };

  const handleGallery = () => {
    const options = { mediaType: 'photo', quality: 0.8, includeBase64: false };
    launchImageLibrary(options, (response) => processResponse(response));
  };

  const processResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled picker');
    } else if (response.errorMessage) {
      Alert.alert('Error', response.errorMessage);
    } else {
      setModalVisible(false);
      onImageSelect(response.assets[0]); 
    }
  };

  return (
    <View style={styles.container}>
      
      {/* 1. THE TRIGGER (Invisible Touch Area) */}
      {/* This fills the parent box completely so user can tap anywhere in the box */}
      <TouchableOpacity 
        style={styles.touchableArea} 
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        {/* We leave this empty because the parent component (InsectAnalysis) 
            renders the placeholder icons behind this input. 
            However, if you want this component to render the icon, uncomment below:
        */}
        {/* <View style={styles.iconCircle}>
           <Camera size={24} color={COLORS.primaryDark} />
        </View> 
        */}
      </TouchableOpacity>

      {/* 2. MODERN BOTTOM SHEET MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Tap background to close */}
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                
                {/* Handle bar for visual cue */}
                <View style={styles.handleBar} />
                
                <Text style={styles.modalTitle}>Upload Photo</Text>
                <Text style={styles.modalSubtitle}>Choose how you want to add the photo</Text>

                <View style={styles.actionContainer}>
                  
                  {/* CAMERA OPTION */}
                  <TouchableOpacity style={styles.actionBtn} onPress={handleCamera}>
                    <View style={[styles.actionIcon, { backgroundColor: '#EFF6FF' }]}>
                      <Camera size={24} color="#2563EB" />
                    </View>
                    <Text style={styles.actionText}>Take Photo</Text>
                  </TouchableOpacity>

                  {/* GALLERY OPTION */}
                  <TouchableOpacity style={styles.actionBtn} onPress={handleGallery}>
                    <View style={[styles.actionIcon, { backgroundColor: '#F0FDF4' }]}>
                      <ImageIcon size={24} color="#16A34A" />
                    </View>
                    <Text style={styles.actionText}>From Gallery</Text>
                  </TouchableOpacity>

                </View>

                {/* CANCEL BUTTON */}
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Container fills the parent slot (the square box)
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  touchableArea: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // --- MODAL STYLES ---
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Aligns modal to bottom
    backgroundColor: COLORS.overlay,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textMain,
    textAlign: 'center',
    marginBottom: 8
  },
  modalSubtitle: {
    fontSize: 14,
    color: COLORS.textSub,
    textAlign: 'center',
    marginBottom: 24
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    gap: 15
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMain
  },
  cancelButton: {
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center'
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textMain
  }
});

export default ImageInput;