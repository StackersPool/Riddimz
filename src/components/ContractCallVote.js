import { useConnect } from "@stacks/connect-react";
import { StacksTestnet } from "@stacks/network";
import {
  AnchorMode,
  PostConditionMode,
  stringUtf8CV,
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";
import Markdown from 'markdown-to-jsx';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const ContractCallVote = ({ mdData }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const { doContractCall } = useConnect();
  function vote(pick) {
    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST39MJ145BR6S8C315AG2BD61SJ16E208P1FDK3AK",
      contractName: "example-fruit-vote-contract",
      functionName: "vote",
      functionArgs: [stringUtf8CV(pick)],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.stacks.co/txid/${data.txId}?chain=testnet`,
            "_blank"
          )
          .focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  if (!userSession.isUserSignedIn()) {
    return null;
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={8}>
            <Item>
              {mdData
                ? <Markdown options={{ forceBlock: true }}>
                  {mdData}
                </Markdown>
                : null
              }
            </Item>
          </Grid>
        </Grid>
      </Box>

      {/* <p>

      </p>
      <p>Vote via Smart Contract</p>
      <button disabled={true} className="Vote" onClick={() => vote("🍊")}>
        Vote for 🍊
      </button>
      <button disabled={true} className="Vote" onClick={() => vote("🍎")}>
        Vote for 🍎
      </button> */}
    </div>
  );
};

export default ContractCallVote;
