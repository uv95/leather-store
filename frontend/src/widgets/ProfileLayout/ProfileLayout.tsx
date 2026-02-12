import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../entities/User';
import { SidebarItem, Tab } from '../../shared/config/sidebar/sidebarItems';
import { Sidebar } from '../Sidebar';
import styles from './ProfileLayout.module.scss';

interface ProfileLayoutProps<T> {
  children: ReactNode;
  sidebarItems: SidebarItem<T>[];
  setCurrentItem: (arg: T) => void;
  currentItem: T;
}

function ProfileLayout<T extends Tab>({
  children,
  sidebarItems,
  setCurrentItem,
  currentItem,
}: ProfileLayoutProps<T>) {
  const user = useSelector(getUserSelector);

  return (
    <div className={styles.ProfileLayout}>
      <h1 className={styles.name}>{user?.name}</h1>
      <div className={styles.container}>
        <Sidebar
          items={sidebarItems}
          setCurrentItem={setCurrentItem}
          currentItem={currentItem}
        />
        <section className={styles.content}>{children}</section>
      </div>
    </div>
  );
}

export default ProfileLayout;
