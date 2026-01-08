import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StatusBar, FlatList,
  Dimensions, StyleSheet, KeyboardAvoidingView, Platform,
  ActivityIndicator, Modal, SafeAreaView, ImageBackground, Animated
} from 'react-native';
// Using Lucide Icons to match your Home Page
import { 
  ArrowLeft, MoreVertical, Send, Paperclip, Mic, 
  Image as ImageIcon, Camera, FileText, X, Bot, User 
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

// --- THEME MATCHING DASHBOARD ---
const COLORS = {
  primary: '#8dc63f',        // Light Green
  primaryDark: '#4a7c2a',    // Dark Green
  headerStart: '#1a2e12',    // Deep Green (Header Gradient Start)
  headerEnd: '#4a7c2a',      // Header Gradient End
  background: '#f8fafc',     // Slate 50
  surface: '#ffffff',
  textMain: '#111827',
  textSub: '#6b7280',
  accent: '#eaf4ea',         // Light green background
  userBubble: '#4a7c2a',     // Dark green for user
  botBubble: '#ffffff',      // White for bot
};

const initialMessages = [
  { id: '1', text: 'Namaste Kisan Mitra! 🙏 How is your crop health today?', sender: 'other', timestamp: '10:00 AM' },
  { id: '2', text: 'I noticed some yellowing on my wheat leaves.', sender: 'user', timestamp: '10:01 AM' },
  { id: '3', text: 'That could be Nitrogen deficiency. Would you like to upload a photo for the Crop Doctor to analyze?', sender: 'other', timestamp: '10:05 AM' },
  { id: '4', text: 'Sure, let me check the gallery.', sender: 'user', timestamp: '10:08 AM' },
];

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <View style={[
      styles.messageWrapper,
      isUser ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }
    ]}>
      <View style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.otherBubble
      ]}>
        {/* Decorative corner for Bot */}
        {!isUser && <View style={styles.botCorner} />}
        
        <Text style={isUser ? styles.userText : styles.otherText}>
          {message.text}
        </Text>
      </View>
      <Text style={styles.timestamp}>
        {isUser ? 'You • ' : 'Sahayak • '} {message.timestamp}
      </Text>
    </View>
  );
};

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on open
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setInputText('');
    
    // Simulate AI Reply
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: "I have analyzed the input. For wheat yellowing, consider applying Urea top dressing.",
            sender: 'other',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
    }, 1500);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* 1. MATCHING HEADER STYLE */}
      <View style={styles.headerContainer}>
        <LinearGradient 
            colors={[COLORS.headerStart, COLORS.headerEnd]} 
            style={styles.headerGradient}
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
        >
            <SafeAreaView>
                <View style={styles.headerContent}>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={() => navigation?.goBack()}
                    >
                        <ArrowLeft size={24} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.profileInfo}>
                        <View style={styles.avatarContainer}>
                             <Bot size={20} color="#fff" />
                             <View style={styles.onlineDot} />
                        </View>
                        <View>
                            <Text style={styles.headerTitle}>Kisan Sahayak</Text>
                            <Text style={styles.headerSub}>AI Farm Expert • Online</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.menuButton}>
                        <MoreVertical size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* 2. BACKGROUND & CHAT AREA */}
        {/* Optional: Add a subtle pattern if needed, keeping it clean for now */}
        <View style={styles.chatArea}>
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <MessageBubble message={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
            
            {isLoading && (
                <View style={styles.typingContainer}>
                    <View style={styles.typingBubble}>
                        <ActivityIndicator size="small" color={COLORS.primaryDark} />
                        <Text style={styles.typingText}>Analyzing...</Text>
                    </View>
                </View>
            )}
        </View>

        {/* 3. INPUT BAR (Pill Shape like Search) */}
        <View style={styles.footer}>
          <View style={styles.inputWrapper}>
            <TouchableOpacity 
              style={styles.attachBtn} 
              onPress={() => setShowAddModal(true)}
            >
              <Paperclip size={20} color={COLORS.textSub} />
            </TouchableOpacity>
            
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask about crops, pests..."
              placeholderTextColor="#9ca3af"
              multiline
            />

            {inputText.trim().length > 0 ? (
              <TouchableOpacity onPress={handleSend}>
                <LinearGradient 
                  colors={[COLORS.primary, COLORS.primaryDark]} 
                  style={styles.sendBtn}
                >
                  <Send size={18} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.micBtn}>
                <Mic size={20} color={COLORS.primaryDark} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* 4. MODAL (Matching Theme) */}
      <Modal visible={showAddModal} transparent animationType="slide">
        <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={() => setShowAddModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.dragHandle} />
            <Text style={styles.modalTitle}>Upload Media</Text>
            
            <View style={styles.modalGrid}>
              <AttachmentOption 
                icon={Camera} label="Camera" color="#ef4444" bg="#fef2f2" 
                onPress={() => setShowAddModal(false)}
              />
              <AttachmentOption 
                icon={ImageIcon} label="Gallery" color="#10b981" bg="#ecfdf5" 
                onPress={() => setShowAddModal(false)}
              />
              <AttachmentOption 
                icon={FileText} label="Document" color="#3b82f6" bg="#eff6ff" 
                onPress={() => setShowAddModal(false)}
              />
            </View>
            
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowAddModal(false)}>
                <X size={20} color={COLORS.textSub} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// Helper for Modal
const AttachmentOption = ({ icon: Icon, label, color, bg, onPress }) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <View style={[styles.optionIcon, { backgroundColor: bg }]}>
      <Icon size={24} color={color} />
    </View>
    <Text style={styles.optionLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },

  // --- HEADER ---
  headerContainer: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    backgroundColor: COLORS.background, // Fix for corner blending
    elevation: 5,
    zIndex: 10,
  },
  headerGradient: {
    paddingTop: Platform.OS === 'android' ? 60 : 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  menuButton: {
    width: 40, height: 40,
    justifyContent: 'center', alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  avatarContainer: {
    width: 42, height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)'
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2, right: 2,
    width: 10, height: 10,
    borderRadius: 5,
    backgroundColor: '#4ade80', // Bright Green
    borderWidth: 1.5, borderColor: COLORS.headerEnd
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },

  // --- CHAT AREA ---
  chatArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: 10, // Reduced padding to utilize width
    paddingVertical: 20,
    paddingBottom: 10,
  },
  messageWrapper: {
    marginBottom: 16,
    width: '100%', // Ensure wrapper takes full width
  },
  bubble: {
    maxWidth: '88%', // INCREASED WIDTH (Was 80%)
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userBubble: {
    backgroundColor: COLORS.userBubble, // Dark Green
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: COLORS.botBubble, // White
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  userText: { color: '#fff', fontSize: 16, lineHeight: 22 },
  otherText: { color: COLORS.textMain, fontSize: 16, lineHeight: 22 },
  timestamp: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 4,
    marginHorizontal: 8,
    alignSelf: 'auto'
  },
  
  // Bot Bubble accent
  botCorner: {
    position: 'absolute',
    top: 0, left: 0, width: 4, height: '100%',
    backgroundColor: COLORS.primary, // Light Green accent strip
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 4
  },

  typingContainer: { paddingHorizontal: 20, marginBottom: 10 },
  typingBubble: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', padding: 10, borderRadius: 20,
    alignSelf: 'flex-start',
    elevation: 2
  },
  typingText: { marginLeft: 8, color: COLORS.textSub, fontSize: 12 },

  // --- FOOTER (INPUT) ---
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background, // Transparent feel
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30, // Pill shape like search bar
    paddingHorizontal: 8,
    paddingVertical: 6,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  input: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: 12,
    fontSize: 16,
    color: COLORS.textMain,
  },
  attachBtn: {
    width: 40, height: 40,
    justifyContent: 'center', alignItems: 'center',
  },
  micBtn: {
    width: 40, height: 40,
    justifyContent: 'center', alignItems: 'center',
  },
  sendBtn: {
    width: 42, height: 42,
    borderRadius: 21,
    justifyContent: 'center', alignItems: 'center',
    marginLeft: 4,
    elevation: 2
  },

  // --- MODAL ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
  },
  dragHandle: {
    width: 40, height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textMain,
    marginBottom: 24,
    textAlign: 'center'
  },
  modalGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionItem: { alignItems: 'center' },
  optionIcon: {
    width: 60, height: 60,
    borderRadius: 20, // Squircle
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSub
  },
  closeButton: {
    position: 'absolute',
    top: 20, right: 20,
    padding: 10
  }
});

export default ChatScreen;