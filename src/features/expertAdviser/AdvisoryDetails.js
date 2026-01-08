import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
    StatusBar,
    Modal,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
// 1. Import the DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';
// import DocumentPicker from 'react-native-document-picker';

const { width, height } = Dimensions.get('window');

const AdvisoryDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { doctor } = route.params;

    const [isModalVisible, setModalVisible] = useState(false);
    
    // --- STATE FOR PICKERS ---
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    
// --- UPDATED STATE ---
    const [formData, setFormData] = useState({
        fullName: '',
        // phone: '',
        designation: '', // New
        specialty: doctor?.specialty || '', // New (Pre-filled from doctor)
        date: new Date(),
        // time: new Date(),
        reason: '', // New (Query/Problem)
        attachment: null, // New
    });


    const doctorBio = `Dr. ${doctor.name.split(' ').slice(1).join(' ')} is a highly experienced ${doctor.specialty.toLowerCase()} specialist at IGKV.`;

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // --- PICKER HANDLERS ---
    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios'); // iOS stays open, Android closes
        if (selectedDate) {
            handleInputChange('date', selectedDate);
        }
    };

    const onTimeChange = (event, selectedTime) => {
        setShowTimePicker(Platform.OS === 'ios');
        if (selectedTime) {
            handleInputChange('time', selectedTime);
        }
    };

    // Helper to format date/time for display
    const formatDate = (date) => date.toLocaleDateString();
    // const formatTime = (time) => time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleSubmit = () => {

        // if (!formData.fullName) {
        //     Alert.alert("Error", "Please fill in your name and contact number.");
        //     return;
        // }

        console.log("--- New Appointment Request ---");
        console.log("Doctor:", doctor.name);
        console.log("Date:", formatDate(formData.date));
        console.log("all:", formData);
        // console.log("Time:", formatTime(formData.time));
        console.log("-------------------------------");

        Alert.alert("Success", "Appointment Booked!");
        setModalVisible(false);
    };



    // --- FILE ATTACHMENT HANDLER ---
    const handleFilePick = async () => {
        // try {
        //     const res = await DocumentPicker.pickSingle({
        //         type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        //     });
        //     handleInputChange('attachment', res);
        // } catch (err) {
        //     if (!DocumentPicker.isCancel(err)) {
        //         Alert.alert('Error', 'Unknown error picking file');
        //     }
        // }
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            {/* Header and Hero Image (kept your original UI) */}
            <View style={styles.topHeader}>
                <TouchableOpacity style={styles.circularBack} onPress={() => navigation.goBack()}>
                    <FontAwesome6 name="chevron-left" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>

           <ScrollView showsVerticalScrollIndicator={false}>
               {/* 2. Hero Image */}
               <View style={styles.imageContainer}>
                   <Image
                        source={{ uri: doctor.imageUrl }}
                        style={styles.detailsImage}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.4)', 'transparent', 'transparent']}
                        style={StyleSheet.absoluteFill}
                    />
                </View>

                {/* 3. Content Sheet */}
                <View style={styles.detailsSheet}>
                    <View style={styles.dragHandle} />

                    <View style={styles.titleRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.detailsName}>{doctor.name}</Text>
                            <Text style={styles.detailsSpecialty}>{doctor.specialty} Specialist</Text>
                        </View>
                        <View style={styles.ratingBadge}>
                            <FontAwesome6 name="star" size={12} color="#FFD700" solid />
                            <Text style={styles.ratingText}>{doctor.rating}.0</Text>
                        </View>
                    </View>

                    <View style={styles.locationRow}>
                        <FontAwesome6 name="location-dot" size={14} color="#777" />
                        <Text style={styles.detailsLocation}>{doctor.location}</Text>
                    </View>

                    <View style={styles.statsGrid}>
                        <View style={styles.statItem}>
                            <Text style={styles.statVal}>{doctor.reviews}</Text>
                            <Text style={styles.statLabel}>Reviews</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statVal}>10+</Text>
                            <Text style={styles.statLabel}>Exp. Years</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statVal}>500+</Text>
                            <Text style={styles.statLabel}>Farmers</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionLabel}>Biography</Text>
                    <Text style={styles.detailsBio}>{doctorBio}</Text>
                    <View style={styles.contactCard}>
                        <View style={styles.contactItem}>
                            <FontAwesome6 name="phone" size={14} color="#2a5298" />
                            <Text style={styles.contactText}>+91 98765 43210</Text>
                        </View>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.messageBtn}>
                            <FontAwesome6 name="comment-dots" size={20} color="#2a5298" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.bookBtnWrapper} onPress={() => setModalVisible(true)}>
                            <LinearGradient
                                colors={['#1e3c72', '#2a5298']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.bookBtnGradient}
                            >
                                <Text style={styles.bookBtnText}>Book Appointment</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>


            {/* --- BOOKING MODAL --- */}
          <Modal visible={isModalVisible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
                    <View style={styles.modalSheet}>
                        <View style={styles.headerRow}>
                            <Text style={styles.modalTitle}>Book Appointment</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <FontAwesome6 name="xmark" size={20} color="#999" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
                            
                            {/* 1. Designation & Specialty (Horizontal Row) */}
                            <View style={styles.row}>
                                <View style={[styles.inputWrapper, { flex: 1, marginRight: 10 }]}>
                                    <Text style={styles.inputLabel}>Designation</Text>
                                    <View style={styles.inputBox}>
                                        <TextInput 
                                            placeholder="e.g. Farmer" 
                                            value={formData.designation} 
                                            onChangeText={(val) => handleInputChange('designation', val)} 
                                            style={styles.textInput}
                                        />
                                    </View>
                                </View>
                                <View style={[styles.inputWrapper, { flex: 1 }]}>
                                    <Text style={styles.inputLabel}>Specialty</Text>
                                    <View style={styles.inputBox}>
                                        <TextInput 
                                            placeholder="Expertise" 
                                            value={formData.specialty} 
                                            onChangeText={(val) => handleInputChange('specialty', val)} 
                                            style={styles.textInput}
                                        />
                                    </View>
                                </View>
                            </View>

                            {/* 2. Date & Time Row */}
                            <View style={styles.row}>
                                <TouchableOpacity style={[styles.inputWrapper, { flex: 1, marginRight: 10 }]} onPress={() => setShowDatePicker(true)}>
                                    <Text style={styles.inputLabel}>Appointment Date</Text>
                                    <View style={styles.inputBox}>
                                        <FontAwesome6 name="calendar-days" size={14} color="#2a5298" style={styles.inputIcon} />
                                        <Text style={styles.placeholderText}>{formatDate(formData.date)}</Text>
                                    </View>
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={[styles.inputWrapper, { flex: 1 }]} onPress={() => setShowTimePicker(true)}>
                                    <Text style={styles.inputLabel}>Time</Text>
                                    <View style={styles.inputBox}>
                                        <FontAwesome6 name="clock" size={14} color="#2a5298" style={styles.inputIcon} />
                                        <Text style={styles.placeholderText}>{formatTime(formData.time)}</Text>
                                    </View>
                                </TouchableOpacity> */}
                            </View>

                            {/* 3. Query/Problem Entry */}
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputLabel}>Query / Problem Description</Text>
                                <View style={[styles.inputBox, styles.textArea]}>
                                    <TextInput 
                                        placeholder="Describe your issue in detail..." 
                                        value={formData.reason} 
                                        onChangeText={(val) => handleInputChange('reason', val)} 
                                        multiline
                                        numberOfLines={4}
                                        style={[styles.textInput, { textAlignVertical: 'top' }]}
                                    />
                                </View>
                            </View>

                            {/* 4. File Attachment */}
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputLabel}>Attach Photos/Docs (Optional)</Text>
                                <TouchableOpacity style={styles.attachmentBtn} onPress={handleFilePick}>
                                    <FontAwesome6 name="paperclip" size={16} color="#2a5298" />
                                    <Text style={styles.attachmentText}>
                                        {formData.attachment ? formData.attachment.name : "Upload Image or PDF"}
                                    </Text>
                                    {formData.attachment && <FontAwesome6 name="circle-check" size={16} color="green" />}
                                </TouchableOpacity>
                            </View>

                            {/* Submit Button */}
                            <TouchableOpacity style={styles.submitBtnWrapper}  onPress={handleSubmit}>
                                <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.submitBtn}>
                                    <Text style={styles.submitBtnText}>Confirm Appointment</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            

                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </View>
            
            {/* Pickers (outside scrollview to avoid layout jumps) */}
            {showDatePicker && (
                <DateTimePicker 
                    value={formData.date} 
                    mode="date" 
                    onChange={(e, d) => {setShowDatePicker(false); if(d) handleInputChange('date', d)}} 
                />
            )}
            {showTimePicker && (
                <DateTimePicker 
                    value={formData.time} 
                    mode="time" 
                    onChange={(e, t) => {setShowTimePicker(false); if(t) handleInputChange('time', t)}} 
                />
            )}
        </Modal>




            
        </View>
    );
};

// ... keep your existing styles ...
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    topHeader: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    circularBack: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },


    imageContainer: { width: width, height: height * 0.4 },
    detailsImage: { width: '100%', height: '100%' },
    
    
    detailsSheet: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        marginTop: -40,
        paddingHorizontal: 25,
        paddingTop: 15,
        paddingBottom: 50,
        minHeight: height * 0.6,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 20,
    },
    dragHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 20,
    },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    detailsName: { fontSize: 24, fontWeight: '800', color: '#1A1D1E' },
    detailsSpecialty: { fontSize: 16, color: '#2a5298', fontWeight: '600', marginTop: 2 },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9E6',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    ratingText: { marginLeft: 5, fontWeight: 'bold', color: '#333' },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    detailsLocation: { fontSize: 14, color: '#777', marginLeft: 6 },
    statsGrid: {
        flexDirection: 'row',
        backgroundColor: '#F8F9FB',
        borderRadius: 20,
        padding: 20,
        marginVertical: 25,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statItem: { alignItems: 'center' },
    statVal: { fontSize: 18, fontWeight: 'bold', color: '#1A1D1E' },
    statLabel: { fontSize: 12, color: '#999', marginTop: 2 },
    statDivider: { width: 1, height: 30, backgroundColor: '#DDD' },
    sectionLabel: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 10 },
    detailsBio: { fontSize: 15, color: '#666', lineHeight: 22, marginBottom: 25 },
    contactCard: { backgroundColor: '#F0F4F8', borderRadius: 15, padding: 15, marginBottom: 30 },
    contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    contactText: { marginLeft: 10, fontSize: 14, color: '#444', fontWeight: '500' },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    messageBtn: {
        width: 60,
        height: 60,
        borderRadius: 18,
        backgroundColor: '#E7EEF8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookBtnWrapper: { flex: 1, marginLeft: 15, height: 60, borderRadius: 18, overflow: 'hidden', elevation: 5 },
    bookBtnGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    bookBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

    // Modal Styles
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    keyboardView: { width: '100%' },
    modalSheet: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        maxHeight: height * 0.85,
    },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    modalTitle: { fontSize: 22, fontWeight: '800', color: '#1A1D1E' },
    subTitle: { fontSize: 14, color: '#2a5298', fontWeight: '600', marginBottom: 20 },
    closeBtn: { padding: 5 },
    inputWrapper: { marginBottom: 18 },
    inputLabel: { fontSize: 14, fontWeight: '700', color: '#444', marginBottom: 8, marginLeft: 4 },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F7FA',
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 55,
        borderWidth: 1,
        borderColor: '#E1E8EE',
    },
    inputIcon: { marginRight: 12 },
    textInput: { flex: 1, color: '#333', fontSize: 15 },
    placeholderText: { color: '#333', fontSize: 15 },
    row: { flexDirection: 'row' },
    submitBtnWrapper: { marginTop: 10, borderRadius: 15, overflow: 'hidden', elevation: 5 },
    submitBtn: { height: 60, justifyContent: 'center', alignItems: 'center' },
    submitBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
    textArea: {
        height: 100,
        alignItems: 'flex-start',
        paddingVertical: 10,
    },
    attachmentBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F7FA',
        borderStyle: 'dashed',
        borderWidth: 1.5,
        borderColor: '#2a5298',
        borderRadius: 15,
        height: 55,
        paddingHorizontal: 15,
    },
    attachmentText: {
        flex: 1,
        color: '#666',
        fontSize: 14,
        marginLeft: 10,
    }
});

export default AdvisoryDetails;


 