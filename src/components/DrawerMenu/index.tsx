import NoSSR from "@mpth/react-no-ssr";
import { Archivo } from "next/font/google";
import { ComponentProps } from "react";
import Drawer from "react-modern-drawer";
import { scroller } from "react-scroll";
import styles from "./style.module.scss";

const archivo = Archivo({ subsets: ["latin"] });

export type DrawerMenuProps = Required<
  Pick<ComponentProps<typeof Drawer>, "onClose" | "open">
> & {
  headerHeight: number;
};

export default function DrawerMenu({
  headerHeight,
  onClose,
  open,
}: DrawerMenuProps): JSX.Element {
  return (
    <NoSSR>
      <Drawer
        className={styles.drawer}
        direction="bottom"
        enableOverlay={false}
        onClose={onClose}
        open={open}
        zIndex={1}
      >
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <a
                className={`${styles.anchor} ${archivo.className}`}
                onClick={(): void => {
                  onClose();

                  scroller.scrollTo("about", {
                    duration: 500,
                    offset: headerHeight * -1,
                    smooth: true,
                  });
                }}
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                className={`${styles.anchor} ${archivo.className}`}
                onClick={(): void => {
                  onClose();

                  scroller.scrollTo("talent", {
                    duration: 500,
                    offset: headerHeight * -1,
                    smooth: true,
                  });
                }}
              >
                TALENT
              </a>
            </li>
            <li>
              <a
                className={`${styles.anchor} ${archivo.className}`}
                onClick={(): void => {
                  onClose();

                  scroller.scrollTo("contact", {
                    duration: 500,
                    offset: headerHeight * -1,
                    smooth: true,
                  });
                }}
              >
                CONTACT
              </a>
            </li>
          </ul>
        </nav>
      </Drawer>
    </NoSSR>
  );
}
