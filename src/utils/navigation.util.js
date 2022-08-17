import { Dimensions, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import screenId from '../constants/screen.id.enum';

const decelerate = {type: 'decelerate'};
const NavigationUtil = {
  setDefaultOptions: () => {
    const screenWidth = parseInt(parseFloat(Dimensions.get('window').width).toFixed(0));
    Navigation.setDefaultOptions({
      popGesture: false,
      statusBar: {
        visible: true,
      },
      topBar: {
        animate: false,
        drawBehind: true,
        height: 0,
        visible: false,
      },
      navigationBar: {
        visible: true,
        backgroundColor: 'white',
      },
      layout: {
        orientation: 'portrait',
        componentBackgroundColor: 'white',
      },
      animations: Platform.OS === 'android' ? {
        setRoot: {
          alpha: {from: 0, to: 1, duration: 250, interpolation: decelerate},
          translationX: {from: screenWidth, to: 0, duration: 350, interpolation: decelerate},
          waitForRender: true,
        },
        setStackRoot: {
          alpha: {from: 0, to: 1, duration: 250, interpolation: decelerate},
          translationX: {from: screenWidth, to: 0, duration: 350, interpolation: decelerate},
          waitForRender: true,
        },
        pop: {
          content: {
            alpha: {from: 1, to: 0.2, duration: 250, interpolation: decelerate},
            translationX: {from: 0, to: screenWidth, duration: 350, interpolation: decelerate},
            waitForRender: true,
          },
        },
        push: {
          content: {
            alpha: {from: 0, to: 1, duration: 250, interpolation: decelerate},
            translationX: {from: screenWidth, to: 0, duration: 350, interpolation: decelerate},
            waitForRender: true,
          },
        },
        // these animations will not used as of now as the popups are not using the modal as of now
        showModal: {
          enabled: true,
          alpha: {from: 0, to: 1, duration: 250, interpolation: decelerate},
          scaleX: {from: 0.7, to: 1, duration: 350, interpolation: decelerate},
          scaleY: {from: 0.7, to: 1, duration: 350, interpolation: decelerate},
          waitForRender: true,
        },
        dismissModal: {
          enabled: true,
          alpha: {from: 1, to: 0, duration: 250, interpolation: decelerate},
          scaleX: {from: 1, to: 0.6, duration: 350, interpolation: decelerate},
          scaleY: {from: 1, to: 0.6, duration: 350, interpolation: decelerate},
          waitForRender: true,
        },
      } : {},
    });
  },
  gotoScreen: async (currentScreenID: string, nextScreenID: string, navigationProps: any = {}) => {
    return Navigation.push(currentScreenID, {
      component: {
        name: nextScreenID,
        options: {
          statusBar: {
            visible: true,
          },
        },
        passProps: {
          navigationProps: navigationProps,
        },
      },
    });
  },
  showOverlay: async (overlayID: string, passProps: any = null) => {
    return Navigation.showOverlay({
      component: {
        name: overlayID,
        passProps: passProps,
        options: {
          layout: {
            backgroundColor: 'transparent',
            componentBackgroundColor: 'transparent',
          },
          statusBar: {
            visible: true,
          },
          overlay: {
            interceptTouchOutside: true,
          },
        },
      },
    });
  },
  dismissAllOverlay: () => {
    return Navigation.dismissAllOverlays();
  },
  showProgressIndicator: async () => {
    return NavigationUtil.showOverlay(screenId.Overlays.ProgressIndicator);
  },
  showAlert: async (props) => {
    return NavigationUtil.showOverlay(screenId.Overlays.CommonAlert, props);
  },
  goToBottomTabsMain: async () => {
    await Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [{
            stack: {
              children: [{
                component: {
                  name: screenId.Todo.Page,
                  passProps: {
                    text: 'This is tab 1',
                  },
                },
              }],
              options: {
                bottomTab: {
                  text: 'Todo',
                  textColor: '#000',
                  selectedTextColor: '#E31912',
                  testID: 'FIRST_TAB_BAR_BUTTON',
                },
              },
            },
          },
            {
              stack: {
                children: [{
                  component: {
                    name: screenId.Docs.Page,
                    passProps: {
                      text: 'This is tab 2',
                    },
                  },
                }],
                options: {
                  bottomTab: {
                    text: 'Docs',
                    textColor: '#000',
                    selectedTextColor: '#E31912',
                    testID: 'SECOND_TAB_BAR_BUTTON',
                  },
                },
              },
            },
            {
              stack: {
                children: [{
                  component: {
                    name: screenId.Photos.Page,
                    passProps: {
                      text: 'This is tab 3',
                    },
                  },
                }],
                options: {
                  bottomTab: {
                    text: 'Photos',
                    textColor: '#000',
                    selectedTextColor: '#E31912',
                    testID: 'THIRD_TAB_BAR_BUTTON',
                  },
                },
              },
            },
          ],
          options: {
            bottomTabs: {
              translucent: true,
              elevation: 100,
              tabsAttachMode: 'onSwitchToTab',
              animateTabSelection: false,
              hideOnScroll: false,
              visible: true,
              animate: true,
              barStyle: 'black',
              drawBehind: false,
              backgroundColor: '#33CCCC',
              currentTabIndex: 0,
              preferLargeIcons: false,
            },
            statusBar: {
              visible: true,
            },
          },
        },
      },
    });
  },
};

export default NavigationUtil;
