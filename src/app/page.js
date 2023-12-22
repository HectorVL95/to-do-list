"use client"
import React from 'react';
import styles from './page.module.css'
import Main from '../components/Main'
import { BrowserRouter, Route, Routes} from 'react-router-dom';

export default function Home() {
  return (
    <main className={styles.main}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  )
}
