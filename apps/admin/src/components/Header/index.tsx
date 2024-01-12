"use client";
import { useStytch } from "@stytch/nextjs";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  SubMenu,
} from "@szhsin/react-menu";
import { useRouter } from "next/navigation";
import { TbGridDots } from "react-icons/tb";
import Spacer from "react-spacer";
import styles from "./style.module.scss";

export default function Header(): JSX.Element {
  const stytch = useStytch();
  const router = useRouter();

  return (
    <header className={styles.header}>
      <Spacer grow={1} />
      <Menu
        align="end"
        arrow={true}
        direction="bottom"
        menuButton={
          <MenuButton>
            <TbGridDots size={24} />
          </MenuButton>
        }
        transition={true}
      >
        <SubMenu label="ブログ">
          <MenuItem
            onClick={(): void => {
              router.push("/blog");
            }}
          >
            一覧
          </MenuItem>
          <MenuItem
            onClick={(): void => {
              router.push("/blog/new");
            }}
          >
            作成
          </MenuItem>
        </SubMenu>
        <MenuItem
          onClick={(): void => {
            router.push("/user");
          }}
        >
          ユーザー
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={async (): Promise<void> => {
            await stytch.session.revoke();

            router.push("/login");
          }}
        >
          ログアウト
        </MenuItem>
      </Menu>
    </header>
  );
}
