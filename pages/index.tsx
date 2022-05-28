import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useConnect, useDisconnect, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import useDiscordTag from "../hooks/useDiscordTag";
import useSushismiCount from "../hooks/useSushimiCount";

import Metamask from "../public/icons/Metamask";
import WalletConnect from "../public/icons/WalletConnect";

const injectedConnector = new InjectedConnector({
  options: { shimDisconnect: true },
});
const walletConnectConnector = new WalletConnectConnector({
  options: { qrcode: true },
});

const connectors = [
  { icon: <Metamask />, text: "Metamask", connector: injectedConnector },
  {
    icon: <WalletConnect />,
    text: "WalletConnect",
    connector: walletConnectConnector,
  },
];

const Home: NextPage = () => {
  const router = useRouter();
  const discordId = router.query.userId as string | undefined;

  const { connect, isConnected, data } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessage } = useSignMessage({
    message: JSON.stringify({
      discordId: discordId,
      address: data?.account.toLowerCase(),
      timestamp: Math.floor(Date.now() / 1000),
    }),
    onSuccess: (signature, { message }) =>
      fetch("/api/submitMessage", {
        method: "POST",
        body: JSON.stringify({ signature, message }),
      }),
  });

  const nftCount = useSushismiCount(data?.account);
  const discordTag = useDiscordTag(discordId);

  return (
    <div>
      <Head>
        <title>Sushimi Connect</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center h-screen bg-[#282c34]">
        <div className="p-4 space-y-4 text-white border rounded-xl">
          {!isConnected ? (
            <>
              <div className="text-2xl">Connect Wallet</div>
              {connectors.map((connector, i) => (
                <div
                  className="grid grid-cols-4 gap-4 cursor-pointer"
                  key={i}
                  onClick={() => connect(connector.connector)}
                >
                  <div className="w-full h-full min-w-[32px] min-h-[32px] col-span-1 flex justify-center items-center">
                    {connector.icon}
                  </div>
                  <div className="flex items-center col-span-3">
                    {connector.text}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="text-2xl">Verify Account</div>
              <div>
                <div className="flex justify-between space-x-4">
                  <div>Address:</div>
                  <div>{data?.account}</div>
                </div>
                <div className="flex justify-between space-x-4">
                  <div>Discord Tag:</div>
                  <div>{discordTag}</div>
                </div>
                <div className="flex justify-between space-x-4">
                  <div>Sushimi Count:</div>
                  <div>{nftCount}</div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button onClick={disconnect as any}>reconnect</button>
                <button onClick={() => signMessage()}>confirm</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
