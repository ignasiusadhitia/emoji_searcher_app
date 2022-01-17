import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Empty from "./components/Empty";
import Emojis from "./components/Emojis";
import Input from "./components/Input";

function App() {
  // ini tempat penyimpanan datanya
  const [emojisData, setEmojisData] = useState([]);

  // ini fungsi search
  const [searchText, setSearchText] = useState("");

  // handling ketika loading
  const [loading, setLoading] = useState(false);

  // handling ketika terjadi error
  const [error, setError] = useState(false);

  // data fetching dari endpoint
  useEffect(() => {
    async function fetchEmojis() {
      setLoading(true);

      try {
        // jika berhasil ini yang akan dilakukan
        const res = await axios.get(
          "https://run.mocky.io/v3/fe964130-70d0-430f-b839-e55081423c28"
        );

        setEmojisData(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);

        setError(true);
        setLoading(false);
      }
    }
    fetchEmojis();
  }, []);

  const handleSearchEmojis = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <Navbar />

      <Container>
        <Input onChange={handleSearchEmojis} value={searchText} />

        {loading && <Empty text="Loading...." />}
        {error && <Empty text="Error!" />}

        {emojisData.length > 0 && (
          <Emojis emojisData={emojisData} searchText={searchText} />
        )}
      </Container>
    </>
  );
}

export default App;
