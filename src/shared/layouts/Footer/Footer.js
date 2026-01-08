import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const ACTIVE_COLOR = '#032663'; // Gold
const INACTIVE_COLOR = '#207c04ff';
// Smart Farm Theme Colors
const COLORS = {
  primary: '#8dc63f',
  primaryDark: '#032663', // Matching your gradient dark blue
};
// const GRADIENT_COLORS = [COLORS.primaryDark, '#2575fc', COLORS.primaryDark];
const GRADIENT_COLORS = ['#ffffffff', '#ffffffff'];

export default function FooterNav() {
  const navigation = useNavigation();

  const activeRouteName = useNavigationState((state) => {
    if (!state) return null;
    return state.routes[state.index].name;
  });

  const NavItem = ({ icon, label, routeName, onPress }) => {
    const isActive = activeRouteName === routeName;

    return (
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={onPress} 
        activeOpacity={0.7}
      >
        <View style={[styles.iconWrapper, isActive && styles.navItemActive]}>
           <FontAwesome6 
            name={icon} 
            size={isActive ? 28 : 24} 
            color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR} 
          />
        </View>
        {!isActive && <Text style={styles.navText}>{label}</Text>}
        {isActive && <View style={styles.activeDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.navBarContainer}>
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.navBar}
      >
        <NavItem 
          icon="grip" 
          label="Menu" 
          routeName="Dabhboard" 
          onPress={() => navigation.navigate('Dabhboard')} 
        />
        <NavItem 
          icon="user-doctor" 
          label="Crops" 
          routeName="CropsDoctor"
          onPress={() => navigation.navigate('CropsDoctor')} 
        />

        {/* Floating Center Button */}
        <TouchableOpacity 
          style={styles.homeBtnContainer} 
          onPress={() => navigation.replace('Admin')}
          activeOpacity={0.9}
        >
          <View style={[
            styles.homeBtnCircle,
            activeRouteName === 'Admin' && styles.activeHomeCircle
          ]}>
            <FontAwesome6 
              name="house" 
              size={24} 
              color={activeRouteName === 'Admin' ? ACTIVE_COLOR : INACTIVE_COLOR} 
            />
          </View>
        </TouchableOpacity>

        <NavItem 
          icon="qrcode" 
          label="Scanner" 
          routeName="CropScann"
          onPress={() => navigation.navigate('CropScann')} 
        />
        <NavItem 
          icon="user-gear" 
          label="Profile" 
          routeName="Profile"
          onPress={() => navigation.navigate('Profile')} 
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  navBarContainer: {
    position: 'absolute',
    bottom: 15, // Floating off the bottom
    left: 10,
    right: 10,
    alignItems: 'center',
  },
  navBar: {
    width: '100%',
    height: 64,
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    paddingHorizontal: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Glass effect for active item
  },
  navText: {
    fontSize: 9,
    color: INACTIVE_COLOR,
    fontWeight: '500',
    marginTop: 2,
    opacity: 0.8,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: ACTIVE_COLOR,
    marginTop: 2,
  },
  homeBtnContainer: {
    top: -20, // Lifts the home button higher than the bar
    zIndex: 10,
  },
  homeBtnCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffffff', // Solid color or you could use another gradient
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#f5f8f5', // Matches background-light color
    // elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  activeHomeCircle: {
    borderColor: ACTIVE_COLOR,
    transform: [{ scale: 1.1 }],
  }
});








// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import { useNavigation, useNavigationState } from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
// import colors from '../../theme/colors';

// const { width } = Dimensions.get('window');


// const ACTIVE_COLOR = '#FFD700';  
// const INACTIVE_COLOR = '#ffffffff';
// const GRADIENT_COLORS = ['#032663ff' || '#032663ff', colors.secondary || '#2575fc',  '#032663ff'];

// export default function FooterNav() {
//   const navigation = useNavigation();


//   const activeRouteName = useNavigationState((state) => {
//     if (!state) return null;
//     return state.routes[state.index].name;
//   });


//   const NavItem = ({ icon, label, routeName, onPress }) => {
//     const isActive = activeRouteName === routeName;

//     return (
//       <TouchableOpacity 
//         style={styles.bottomNavItem} 
//         onPress={onPress} 
//         activeOpacity={0.8}
//       >
//         <FontAwesome6 
//           name={icon} 
//           size={isActive ? 28 : 24} 
//           color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR} 
//         />
//         <Text style={[
//           styles.bottomNavText, 
//           isActive && styles.activeNavText
//         ]}>
//           {label}
//         </Text>
//         {/* Active Indicator Bar */}
//         {isActive && <View style={styles.activeIndicator} />}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Main Navigation Bar */}
//       <LinearGradient
//         colors={GRADIENT_COLORS}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={styles.bottomNav}
//       >
//         <NavItem 
//           icon="grip" 
//           label="Menu" 
//           routeName="Dabhboard" 
//           onPress={() => navigation.navigate('Dabhboard')} 
//         />
//         <NavItem 
//           icon="user-doctor" 
//           label="Crops" 
//           routeName="CropsDoctor"
//           onPress={() => navigation.navigate('CropsDoctor')} 
//         />

//         {/* Space for the Floating Home Button */}
//         <View style={styles.placeholder} />

//         <NavItem 
//           icon="qrcode" 
//           label="Scanner" 
//           routeName="CropScann"
//           onPress={() => navigation.navigate('CropScann')} 
//         />
//         <NavItem 
//           icon="user-gear" 
//           label="Profile" 
//           routeName="Profile"
//           onPress={() => navigation.navigate('Profile')} 
//         />
//       </LinearGradient>

//       {/* Floating Center Home Button */}
//       <TouchableOpacity 
//         style={styles.homeBtnContainer} 
//         onPress={() => navigation.replace('Admin')}
//         activeOpacity={0.9}
//       >
//         <LinearGradient
//           colors={GRADIENT_COLORS}
//           style={[
//             styles.homeBtnCircle,
//             activeRouteName === 'Admin' && styles.activeHomeCircle
//           ]}
//         >
//           <FontAwesome6 
//             name="house" 
//             size={26} 
//             color={activeRouteName === 'Admin' ? ACTIVE_COLOR : INACTIVE_COLOR} 
//           />
//         </LinearGradient>
//         <Text style={[
//           styles.homeLabel,
//           activeRouteName === 'Admin' && { color: '#032663', fontWeight: '800' }
//         ]}>
//           Home
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     bottom: 0,
//     width: width,
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//   },
//   bottomNav: {
//     width: width,
//     height: 70,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 10,
//     elevation: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -10 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//   },
//   bottomNavItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     height: '100%',
//   },
//   bottomNavText: {
//     fontSize: 10,
//     marginTop: 4,
//     color: INACTIVE_COLOR,
//     fontWeight: '500',
//     opacity: 0.7,
//   },
//   activeNavText: {
//     color: ACTIVE_COLOR,
//     fontWeight: 'bold',
//     opacity: 1,
//   },
//   activeIndicator: {
//     position: 'absolute',
//     bottom: 8,
//     width: 5,
//     height: 5,
//     borderRadius: 2.5,
//     backgroundColor: ACTIVE_COLOR,
//   },
//   placeholder: {
//     width: width / 5,  
//   },
//   homeBtnContainer: {
//     position: 'absolute',
//     top: -30, 
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   homeBtnCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     borderWidth: 4,
//     borderColor: '#FFF', 
//   },
//   activeHomeCircle: {
//     borderColor: ACTIVE_COLOR,
//     transform: [{ scale: 1.05 }],
//   },
//   homeLabel: {
//     fontSize: 11,
//     color: '#333',
//     fontWeight: '600',
//     marginTop: 4,
//   }
// });










// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import { useNavigation } from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient'; // Ensure this is installed
// import colors from '../../theme/colors';

// const { width } = Dimensions.get('window');
//   // const defaultGradient = [colors.primary || '#4c669f', colors.secondary || '#3b5998', '#192f6a'];
//     const defaultGradient = ['#032663ff' || '#032663ff', colors.secondary || '#2575fc',  '#032663ff'];

// export default function FooterNav() {
//   const navigation = useNavigation();

//   // Helper to render nav items to keep code clean
//   const NavItem = ({ icon, label, onPress }) => (
//     <TouchableOpacity style={styles.bottomNavItem} onPress={onPress} activeOpacity={0.7}>
//       <FontAwesome6 name={icon} size={20} color={colors.white || '#FFFFFF'} />
//       <Text style={styles.bottomNavText}>{label}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Modern Gradient Footer */}
//       <LinearGradient
//         colors={defaultGradient} // Or use [colors.primary, colors.secondary]
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={styles.bottomNav}
//       >
//         <NavItem 
//           icon="grip" 
//           label="Menu" 
//           onPress={() => navigation.navigate('Dabhboard')} 
//         />
//         <NavItem 
//           icon="user-doctor" 
//           label="Crops" 
//           onPress={() => navigation.navigate('CropsDoctor')} 
//         />

//         {/* Space for the Floating Home Button */}
//         <View style={styles.placeholder} />

//         <NavItem 
//           icon="qrcode" // Modernized from 'camera' to 'qrcode' or keep 'camera'
//           label="Scanner" 
//           onPress={() => navigation.navigate('CropScann')} 
//         />
//         <NavItem 
//           icon="user-gear" 
//           label="Profile" 
//           onPress={() => navigation.navigate('Profile')} 
//         />
//       </LinearGradient>

//       {/* Floating Center Home Button */}
//       <TouchableOpacity 
//         style={styles.homeBtnContainer} 
//         onPress={() => navigation.replace('Admin')}
//         activeOpacity={0.9}
//       >
//         <LinearGradient
//           colors={defaultGradient}
//           style={styles.homeBtnCircle}
//         >
//           <FontAwesome6 name="house" size={26} color={'#ffffffff'} />
//         </LinearGradient>
//         <Text style={styles.homeLabel}>Home</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     bottom: 0,
//     width: width,
//     alignItems: 'center',
//   },
//   bottomNav: {
//     width: width,
//     height: 75,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 10,
//     // Shadow for iOS
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     // Elevation for Android
//     elevation: 20,
//   },
//   bottomNavItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     paddingTop: 10,
//   },
//   bottomNavText: {
//     fontSize: 10,
//     marginTop: 4,
//     color: '#FFFFFF',
//     fontWeight: '600',
//     letterSpacing: 0.5,
//   },
//   placeholder: {
//     width: 60, // Space for the center button
//   },
//   homeBtnContainer: {
//     position: 'absolute',
//     top: -25, // Lifts the button above the bar
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   homeBtnCircle: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     borderWidth: 4,
//     borderColor: '#F9FBFC', // Creates a "gap" look
//   },
//   homeLabel: {
//     fontSize: 11,
//     color: '#333',
//     fontWeight: 'bold',
//     marginTop: 4,
//   }
// });













// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import { useNavigation } from '@react-navigation/native';
// import colors from '../../theme/colors';


// export default function FooterNav() {
//   const navigation = useNavigation();
//   return (
//     <View style={[styles.bottomNav, { backgroundColor: colors.background }]}>
//       <TouchableOpacity style={styles.bottomNavItem} onPress={() => navigation.navigate('Dabhboard')}>
//         <FontAwesome6 name="list" size={24} color={colors.secondary} />
//         <Text style={[styles.bottomNavText, { color: colors.secondary }]}>Menu</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.bottomNavItem} onPress={() => navigation.navigate('CropsDoctor')}>
//         <FontAwesome6 name="user-doctor" size={24} color={colors.secondary} />
//         {/* <FontAwesome6 name="seedling" size={15} color={colors.secondary} /> */}
//         <Text style={[styles.bottomNavText, { color: colors.secondary }]}>Crops</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.replace('Admin')}>
//         <View style={[styles.homeBtnCircle, { backgroundColor: colors.white }]}>
//           <FontAwesome6 name="house" size={30} color={colors.secondary} />
//         </View>
//         <Text style={[styles.bottomNavText, { color: colors.secondary, marginTop: 6 }]}>Home</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.bottomNavItem} onPress={() => navigation.navigate('CropScann')}>
//       {/* <TouchableOpacity style={styles.bottomNavItem} onPress={() => navigation.navigate('ImageInput')}> */}
//         <FontAwesome6 name="camera" size={24} color={colors.secondary} />
//         <Text style={[styles.bottomNavText, { color: colors.secondary }]}>Scanner</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.bottomNavItem} onPress={() => navigation.navigate('Maintenance')}>
//         <FontAwesome6 name="user" size={24} color={colors.secondary} />
//         <Text style={[styles.bottomNavText, { color: colors.secondary }]}>My Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   bottomNav: {
//     // position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 70,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     shadowColor: colors.secondary,
//     shadowOffset: { width: 0, height: -1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 8,
//     paddingHorizontal: 10,
//   },
//   bottomNavItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//   },
//   bottomNavText: {
//     fontSize: 11,
//     marginTop: 2,
//   },
//   homeBtn: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   homeBtnCircle: {
//     width: 58,
//     height: 58,
//     borderRadius: 29,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: colors.secondary,
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.6,
//     shadowRadius: 8,
//     elevation: 8,
//   },
// });
