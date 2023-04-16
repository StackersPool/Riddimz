import { showConnect, UserSession, AppConfig, openContractCall, openContractDeploy } from '@stacks/connect-react'
import { StacksMainnet, StacksTestnet } from '@stacks/network'
import { Storage } from '@stacks/storage'
import { stringAsciiCV } from '@stacks/transactions';
import { principalCV } from '@stacks/transactions/dist/clarity/types/principalCV';
const AppName = 'Riddimz';
const AppIcon = `${window.location.origin}/logo.jpg`;

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });
const storage = new Storage({ userSession });

const reader = new FileReader();

export const wallet = {
  login: () => {
    showConnect({
      appDetails: {
        name: AppName,
        icon: AppIcon
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
  },

  transactions: {
    createKaraoke: (caption, file) => {
      reader.onload = async function () {
        const { type, name } = file[0];
        const fileName = `${Date.now()}.${String(name).split('.').pop().toLowerCase()}`;
        var fileContent = reader.result;
        console.log(fileContent)
        console.log(fileContent, fileName + ' ' + name);
        store({ fileContent, fileName }, { encrypt: false }).then(({ result, success }) => {
          switch (success) {
            case true:
              const tx_sender = userSession.loadUserData().profile.stxAddress.testnet;
              console.log(tx_sender);
              openContractCall({
                contractAddress: 'STT4SQP5RC1BFAJEQKBHZMXQ8NQ7G118F0XRWTMV.test-riddimz',
                contractName: 'test-riddimz',
                functionName: 'post-performance',
                functionArgs: [stringAsciiCV(caption), stringAsciiCV(`${type}/${fileName}`)],
                network: new StacksTestnet(),
                appDetails: {
                  name: AppName,
                  icon: AppIcon
                },
                onFinish: (data) => {
                  console.log('Transaction succeeded')
                  window.open(`https://explorer.hiro.so/txid/${data.txId}?chain=testnet`, '_blank')
                },
                onCancel: () => {
                  deleteStored(fileName)
                  console.log('Transaction Canceled')
                }
              })
              break;
            default:
              console.log('Upload failed')
              break;
          }
        })
      }
      reader.readAsArrayBuffer(file[0]);
    },
    deployContract: (codeBody, contractname) => {
      openContractDeploy({
        contractName: contractname,
        codeBody,
        appDetails: {
          name: AppName,
          icon: AppIcon,
        },
        onFinish: ({txId}) => {
          window.open(`https://explorer.hiro.so/txid/${txId}?chain=testnet`, '_blank');
        },
      });
    }
  }
}

export const store = async (data, options) => {
  try {
    const result = await storage.putFile(data.fileName, data.fileContent, options);
    console.log("File Written to Storage: ", data.fileName);
    return { success: true, result }
  } catch (e) {
    console.log('An error occured while trying to save file', e);
    return { success: false, result: {} }

  }
}

export const deleteStored = async (fileName) => {
  try {
    const result = await storage.deleteFile(fileName);
    return { success: true, result }
  } catch (e) {
    console.log('An error occured while trying to save file', e);
    return { success: false, result: {} }

  }
}

export const getPerfomance = () => {
  const publisher = 'blend.btc';
  const caption = 'Hello Riddimz';
  const type = 'video';
  const uri = 'https://www.youtube.com/shorts/oV1rWHt1Lj0';
  const txId = 'djkhgkjsvjkgdvisbudytsuifjweo3u897983h4oih3894';
  return [{ publisher, caption, type, uri, txId }];
}