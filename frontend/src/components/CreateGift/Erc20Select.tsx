import React, { useContext, useEffect, useState } from "react";
import { createDataTestId } from "../../lib/create-data-testid";
import { Flex, Stack, Text, Button, Select, Menu, MenuButton, MenuList, Image, MenuItem } from "@chakra-ui/react";
import { useFormik } from "formik";
import { params } from "./";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { darken } from "polished";
import { ProviderContext } from "../../hardhat/HardhatContext";

export const componentDataTestId = createDataTestId("Erc20Select");

export const dataTestIds = {};

interface IProps {
  formik: any;
}

// const erc20Tokens = ["YFI", "yUSD", "y3Crv", "DAI", "USDC", "ETH", "wBTC"];
export const erc20TokensData = [
  {
    // Penguin-UNI LP, no one should have this really
    address: "0xff84179Bf75737B9B651D712D6809E44CFFB382a",
    chainId: 1,
    decimals: 18,
    logoURI: "None",
    name: "None",
    symbol: "None",
  },
  {
    address: "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e",
    chainId: 1,
    decimals: 18,
    logoURI: "https://zapper.fi/images/YFI-icon.png",
    name: "yearn.finance",
    symbol: "YFI",
  },
  {
    address: "0x5dbcf33d8c2e976c6b560249878e6f1491bca25c",
    chainId: 1,
    decimals: 18,
    logoURI: "https://zapper.fi/images/yUSD-icon.png",
    name: "yUSD",
    symbol: "yUSD",
  },
  {
    address: "0x9ca85572e6a3ebf24dedd195623f188735a5179f",
    chainId: 1,
    decimals: 18,
    logoURI:
      "https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x9cA85572E6A3EbF24dEDd195623F188735A5179f/logo-128.png",
    name: "y3Crv",
    symbol: "y3Crv",
  },
  {
    address: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
    chainId: 1,
    decimals: 18,
    logoURI:
      "https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x6B3595068778DD592e39A122f4f5a5cF09C90fE2/logo-128.png",
    name: "Sushi",
    symbol: "SUSHI",
  },
  {
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    chainId: 1,
    decimals: 18,
    logoURI: "https://zapper.fi/images/DAI-icon.png",
    name: "Dai",
    symbol: "DAI",
  },
  {
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    chainId: 1,
    decimals: 6,
    logoURI: "https://zapper.fi/images/USDC-icon.png",
    name: "USD Coin",
    symbol: "USDC",
  },
  {
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    chainId: 1,
    decimals: 18,
    logoURI: "https://zapper.fi/images/WETH-icon.png",
    name: "WETH",
    symbol: "WETH",
  },
  {
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    chainId: 1,
    decimals: 8,
    logoURI: "https://zapper.fi/images/WBTC-icon.png",
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
  },
  {
    address: "0x5D8d9F5b96f4438195BE9b99eee6118Ed4304286",
    chainId: 1,
    decimals: 8,
    logoURI: "https://zapper.fi/images/COVER-icon.png",
    name: "Cover Protocol",
    symbol: "COVER",
  },
  {
    address: "0xd533a949740bb3306d119cc777fa900ba034cd52",
    chainId: 1,
    decimals: 18,
    logoURI: "https://zapper.fi/images/CRV-icon.png",
    name: "Curve DAO Token",
    symbol: "CRV",
  },
  {
    address: "0x37236cd05b34cc79d3715af2383e96dd7443dcf1",
    chainId: 1,
    decimals: 0,
    logoURI: "https://zapper.fi/images/SLP-icon.png",
    name: "Small Love Potion",
    symbol: "SLP",
  },
];

const Erc20Select: React.FunctionComponent<IProps> = (props) => {
  const [provider] = useContext(ProviderContext);
  const [network, setNetwork] = useState<string>("mainnet");
  useEffect(() => {
    const fetch = async () => {
      const { name } = await provider?.getNetwork();
      setNetwork(name);
    };
    fetch();
  }, [provider]);

  return (
    <Flex alignSelf="flex-start" width="100%">
      <Menu>
        <MenuButton
          width="100%"
          textAlign="left"
          height="56px"
          borderRadius="32px"
          {...{
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            background: "#ECF4FA",
            color: "#a1c5e2",
          }}
          _hover={{
            background: "#ECF4FA",
          }}
          _active={{
            background: darken(0.05, "#ECF4FA"),
          }}
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          {erc20TokensData.find((token) => props.formik?.values[Number(params.indexOf("_token"))] === token.address)
            ?.name ||
            (network === "rinkeby" &&
              props.formik?.values[Number(params.indexOf("_token"))] === "0xee71557964a9872fbf77f29b87579329462529cf" &&
              "yUSD (Rinkeby)") ||
            (network === "rinkeby" &&
              props.formik?.values[Number(params.indexOf("_token"))] === "0x8ad3aa5d5ff084307d28c8f514d7a193b2bfe725" &&
              "None") ||
            "Token"}
        </MenuButton>
        <MenuList>
          {erc20TokensData.map((erc20Token) => (
            <MenuItem
              key={erc20Token.address}
              minH="48px"
              minW="415px"
              onClick={() => {
                if (erc20Token.name === "None") {
                  props.formik?.setFieldValue(
                    params.indexOf("_token").toString(),
                    network === "rinkeby" ? "0x8ad3aa5d5ff084307d28c8f514d7a193b2bfe725" : erc20Token.address
                  );
                  props.formik?.setFieldValue(params.indexOf("_amount").toString(), 0);
                  return;
                }
                return props.formik?.setFieldValue(params.indexOf("_token").toString(), erc20Token.address);
              }}
            >
              {erc20Token.name === "None" ? null : (
                <Image boxSize="2rem" borderRadius="full" src={erc20Token.logoURI} alt={erc20Token.name} mr="12px" />
              )}
              <Text>{erc20Token.name}</Text>
            </MenuItem>
          ))}
          {network === "rinkeby" ? (
            <MenuItem
              minH="48px"
              minW="415px"
              onClick={() => {
                props.formik?.setFieldValue(
                  params.indexOf("_token").toString(),
                  "0xee71557964a9872fbf77f29b87579329462529cf"
                );
              }}
            >
              <Image
                boxSize="2rem"
                borderRadius="full"
                src={"https://zapper.fi/images/yUSD-icon.png"}
                alt={"yUSD"}
                mr="12px"
              />
              <Text>{"yUSD (Rinkeby)"}</Text>
            </MenuItem>
          ) : null}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export { Erc20Select };
