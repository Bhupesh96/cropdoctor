import React, { useState } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  View, 
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
// You must install this dependency: npm install react-native-vector-icons
// Note: You imported FontAwesome6 but used FontAwesome. Assuming you want FontAwesome6, update the import accordingly.
// If using FontAwesome6, icon names might differ (e.g., 'user' is still 'user', but confirm).
import Icon from 'react-native-vector-icons/FontAwesome6'; // Changed to FontAwesome6 as per your import

// =====================================================================
// 1. JSON Data (Previously data.js)
// =====================================================================

const countryOptions = [
  { id: 1, value: 'India' },
  { id: 2, value: 'USA' },
  { id: 3, value: 'Canada' },
];

const stateOptions = [
  { id: 1, value: 'Chhattisgarh' },
  { id: 2, value: 'Maharashtra' },
  { id: 3, value: 'Madhya Pradesh' },
];

const districtOptions = [
  { id: 1, value: 'Raigarh' },
  { id: 2, value: 'Bilaspur' },
  { id: 3, value: 'Durg' },
];

const blockOptions = [
  { id: 1, value: 'Udaipur (Dharamjaigarh)' },
  { id: 2, value: 'Ambikapur' },
  { id: 3, value: 'Korba' },
];

const genderOptions = [
  { id: 1, value: 'Male' },
  { id: 2, value: 'Female' },
  { id: 3, value: 'Other' },
];

const cropOptions = [
  { id: 1, value: 'Paddy (Rice)' },
  { id: 2, value: 'Wheat' },
  { id: 3, value: 'Cotton' },
  { id: 4, value: 'Fruit' }, 
  { id: 5, value: 'Vegetable' },
];

// =====================================================================
// 2. Custom Input/Wrapper Component (Previously InputBox.js)
// =====================================================================

const InputBox = ({ iconName, placeholder, keyboardType = 'default', value, onChangeText, isDropdown = false, children }) => (
  <View style={inputBoxStyles.inputContainer}>
    {/* Icon Section */}
    <View style={inputBoxStyles.iconWrapper}>
        <Icon name={iconName} size={20} color="#FF5757" style={inputBoxStyles.icon} />
        <View style={inputBoxStyles.iconBackground} />
    </View>
    
    {/* Input/Dropdown Content Section */}
    {isDropdown ? (
      <View style={inputBoxStyles.contentWrapper}>
        {children}
      </View>
    ) : (
      <TextInput
        style={inputBoxStyles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    )}
  </View>
);

const inputBoxStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingRight: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
    height: 50,
  },
  iconWrapper: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
  iconBackground: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF5757',
    opacity: 0.15,
    zIndex: 1,
  },
  icon: {
    zIndex: 2,
    color: '#FF5757',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333',
    fontSize: 14,
  },
});

// =====================================================================
// 3. Functional Dropdown Component (Updated from MockDropdown)
// =====================================================================

const Dropdown = ({ placeholder, value, options, onValueChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item) => {
    onValueChange(item.value);
    setModalVisible(false);
  };

  const displayValue = value || placeholder;

  return (
    <>
      <TouchableOpacity style={dropdownStyles.pickerArea} onPress={() => setModalVisible(true)}>
        <Text style={value ? dropdownStyles.selectedValue : dropdownStyles.placeholderText}>
          {displayValue}
        </Text>
        <Icon name="chevron-down" size={15} color="#777" /> {/* Changed to chevron-down for FontAwesome6 */}
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={dropdownStyles.modalOverlay}>
          <View style={dropdownStyles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={dropdownStyles.option} onPress={() => handleSelect(item)}>
                  <Text style={dropdownStyles.optionText}>{item.value}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={dropdownStyles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={dropdownStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const dropdownStyles = StyleSheet.create({
  pickerArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    height: '100%',
  },
  selectedValue: {
    color: '#333',
    fontSize: 14,
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '50%',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF5757',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

// =====================================================================
// 4. Main Registration Form (Previously RegistrationForm.js)
// =====================================================================

const RegistrationForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    state: 'Chhattisgarh',
    district: 'Raigarh',
    block: 'Udaipur (Dharamjaigarh)',
    gender: 'Male',
    age: '27',
    phone: '9174857381',
    email: 'anil_sth@gmail.com',
    reference: '',
    profession: '',
    crop: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = () => {
    console.log('--- Submitting Form Data ---');
    console.log(formData);
    alert('Sign Up Attempted! Check console for data.');
    // Add API call or validation logic here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Background Pattern */}
        <View style={styles.backgroundPattern} />

        {/* --- Form Fields --- */}

        {/* Input: Name */}
        <InputBox
          iconName="user"
          placeholder="Name"
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />

        {/* Dropdown: Country */}
        <InputBox iconName="globe" isDropdown={true}>
            <Dropdown
              placeholder="Select Your Country"
              value={formData.country}
              options={countryOptions}
              onValueChange={(value) => handleInputChange('country', value)}
            />
        </InputBox>

        {/* Dropdown: State */}
        <InputBox iconName="home" isDropdown={true}>
            <Dropdown
              placeholder="Chhattisgarh"
              value={formData.state}
              options={stateOptions}
              onValueChange={(value) => handleInputChange('state', value)}
            />
        </InputBox>
        
        {/* Dropdown: District */}
        <InputBox iconName="home" isDropdown={true}>
            <Dropdown
              placeholder="Raigarh"
              value={formData.district}
              options={districtOptions}
              onValueChange={(value) => handleInputChange('district', value)}
            />
        </InputBox>

        {/* Dropdown: Block */}
        <InputBox iconName="home" isDropdown={true}>
            <Dropdown
              placeholder="Udaipur (Dharamjaigarh)"
              value={formData.block}
              options={blockOptions}
              onValueChange={(value) => handleInputChange('block', value)}
            />
        </InputBox>

        {/* Dropdown: Gender */}
        <InputBox iconName="users" isDropdown={true}>
            <Dropdown
              placeholder="Male"
              value={formData.gender}
              options={genderOptions}
              onValueChange={(value) => handleInputChange('gender', value)}
            />
        </InputBox>

        {/* Input: Age (using phone as a proxy for the '18+' icon shown in the image) */}
        <InputBox
          iconName="phone" // Simulating the icon type based on position in the image
          placeholder="27"
          keyboardType="numeric"
          value={formData.age}
          onChangeText={(text) => handleInputChange('age', text)}
        />

        {/* Input: Phone Number */}
        <InputBox
          iconName="mobile-screen-button" // Updated for FontAwesome6 (mobile-phone might be mobile-screen-button)
          placeholder="9174857381"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
        />

        {/* Input: Email */}
        <InputBox
          iconName="envelope"
          placeholder="anil_sth@gmail.com"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />

        {/* Input: Reference */}
        <InputBox
          iconName="question"
          placeholder="Refrence? Crop Doctor"
          value={formData.reference}
          onChangeText={(text) => handleInputChange('reference', text)}
        />

        {/* Input: Profession */}
        <InputBox
          iconName="question"
          placeholder="Your Profession?"
          value={formData.profession}
          onChangeText={(text) => handleInputChange('profession', text)}
        />

        {/* Dropdown: Crop */}
        <InputBox iconName="leaf" isDropdown={true}>
            <Dropdown
              placeholder="Please select your Crop?"
              value={formData.crop}
              options={cropOptions}
              onValueChange={(value) => handleInputChange('crop', value)}
            />
        </InputBox>

        {/* SIGN UP Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    paddingVertical: 20,
    minHeight: '100%',
    position: 'relative',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Simulating the green patterned background
    backgroundColor: '#E8F5E9', 
    opacity: 1, 
    zIndex: -1,
  },
  button: {
    backgroundColor: '#FF5757', 
    borderRadius: 30,
    paddingVertical: 15,
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
    shadowColor: '#FF5757',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegistrationForm;
