import Head from 'next/head';
import styles from '../styles/Home.module.css';
import DataGrid from '../components/DataGrid';

export default function Home() {
  return (
    <div className={styles.container}>
      <DataGrid />
    </div>
  );
}
