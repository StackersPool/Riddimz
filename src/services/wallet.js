import { showConnect, UserSession, AppConfig } from '@stacks/connect-react'
import { StacksMainnet, StacksTestnet } from '@stacks/network'
const AppName = 'Riddimz';

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });
export const wallet = {
  login: () => {
    showConnect({
      appDetails: {
        name: AppName,
        icon: `${window.location.origin}/logo.jpg`
      },
      redirectTo: '/',
      onFinish: (data) => {
        let userData = userSession.loadUserData();
        window.location.reload();
      },
      onCancel: () => {
        console.log("Connection aborted")
      },
      userSession: userSession,
    })
  },

  logout: () => {
    userSession.signUserOut()
    window.location.replace('/');
  }

}