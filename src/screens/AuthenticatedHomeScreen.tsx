import React from 'react'
import { Image, Platform } from 'react-native'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Colors, Spacing, Typography } from '../styles'
import PollsScreen from './polls/PollsScreen'
import ToolsScreen from './tools/ToolsScreen'
import i18n from '../utils/i18n'
import { Screen } from '../navigation'
import { useTheme } from '../themes'
import HomeNavigator from './home/HomeNavigator'
import ProfileNavigator from './profile/ProfileNavigator'

const TabAndroid = createMaterialBottomTabNavigator()
const TabIos = createBottomTabNavigator()

const getTabBarIcon = (route: any, focused: boolean) => {
  if (route.name === Screen.polls) {
    return focused
      ? require('../assets/images/tabBarIconsPollsOn.png')
      : require('../assets/images/tabBarIconsPollsOff.png')
  } else if (route.name === Screen.homeNavigator) {
    return focused
      ? require('../assets/images/tabBarIconsHomeOn.png')
      : require('../assets/images/tabBarIconsHomeOff.png')
  } else if (route.name === Screen.tools) {
    return focused
      ? require('../assets/images/tabBarIconsToolsOn.png')
      : require('../assets/images/tabBarIconsToolsOff.png')
  } else if (route.name === Screen.profileNavigator) {
    return focused
      ? require('../assets/images/tabBarIconsProfileOn.png')
      : require('../assets/images/tabBarIconsProfileOff.png')
  }
}

const AuthenticatedHomeScreenAndroid = () => {
  const { theme } = useTheme()
  return (
    <TabAndroid.Navigator
      initialRouteName={Screen.homeNavigator}
      backBehavior="initialRoute"
      activeColor={theme.coloredText}
      inactiveColor={Colors.tab}
      shifting={false}
      barStyle={{ backgroundColor: Colors.defaultBackground }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          return (
            <Image
              source={getTabBarIcon(route, focused)}
              style={{ tintColor: color }}
            />
          )
        },
      })}
    >
      <TabAndroid.Screen
        name={Screen.homeNavigator}
        component={HomeNavigator}
        options={{ tabBarLabel: i18n.t('tab.item_home') }}
      />
      <TabAndroid.Screen
        name={Screen.polls}
        component={PollsScreen}
        options={{ tabBarLabel: i18n.t('tab.item_polls') }}
      />
      <TabAndroid.Screen
        name={Screen.tools}
        component={ToolsScreen}
        options={{ tabBarLabel: i18n.t('tab.item_tools') }}
      />
      <TabAndroid.Screen
        name={Screen.profileNavigator}
        component={ProfileNavigator}
        options={{ tabBarLabel: i18n.t('tab.item_profile') }}
      />
    </TabAndroid.Navigator>
  )
}

const AuthenticatedHomeScreenIos = () => {
  const { theme } = useTheme()
  return (
    <TabIos.Navigator
      tabBarOptions={{
        activeTintColor: theme.coloredText,
        inactiveTintColor: Colors.tab,
        labelStyle: {
          ...Typography.tabLabel,
          marginBottom: Spacing.small,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          return (
            <Image
              source={getTabBarIcon(route, focused)}
              style={{ tintColor: color }}
            />
          )
        },
      })}
    >
      <TabIos.Screen
        name={Screen.homeNavigator}
        component={HomeNavigator}
        options={{ tabBarLabel: i18n.t('tab.item_home') }}
      />
      <TabIos.Screen
        name={Screen.polls}
        component={PollsScreen}
        options={{ tabBarLabel: i18n.t('tab.item_polls') }}
      />
      <TabIos.Screen
        name={Screen.tools}
        component={ToolsScreen}
        options={{ tabBarLabel: i18n.t('tab.item_tools') }}
      />
      <TabIos.Screen
        name={Screen.profileNavigator}
        component={ProfileNavigator}
        options={{ tabBarLabel: i18n.t('tab.item_profile') }}
      />
    </TabIos.Navigator>
  )
}

const AuthenticatedHomeScreen = () => {
  if (Platform.OS === 'android') {
    return <AuthenticatedHomeScreenAndroid />
  } else {
    return <AuthenticatedHomeScreenIos />
  }
}

export default AuthenticatedHomeScreen
