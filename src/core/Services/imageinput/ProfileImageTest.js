import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import ImageInput from './ImageInput';

const ProfileScreen = () => {
    const [image, setImage] = useState(null);
    // Callback function to handle image selection
    const handleImageSelect = (selectedImage) => {
        console.log(selectedImage, "selectedImage")
        setImage(selectedImage);
        Alert.alert('Image Selected', 'You have selected an image!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            {/* Pass the handleImageSelect function to ImageInput */}
            <ImageInput onImageSelect={handleImageSelect} />

            {/* Display the selected image */}
            {image && (
                <View>
                    <Text>Selected Image:</Text>
                    <Image source={{ uri: image.uri }} style={styles.image} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginTop: 20,
    },
});

export default ProfileScreen;
