import { useState } from "react";
import { setlocalStorageData } from "../components/type/type";

export const useAutoComplite = () => {
  const [recommendWord, setRecommendWord] = useState<Array<any>>([]);
  const [focusItem, setFocusItem] = useState<string>("");
  // valid && fetch && caching
  const fetchSick = async (param: string) => {
    const BASE_URL = process.env.REACT_APP_BASE_SEARCH_URL;
    const cacheStorage = await caches.open("search");
    const responsedCache = await cacheStorage.match(`${BASE_URL}${param}`);
    try {
      if (responsedCache) {
        responsedCache.json().then((res) => {
          setRecommendWord(res);
        });
      } else {
        const response2 = await fetch(`${BASE_URL}${param}`);
        await cacheStorage.put(`${BASE_URL}${param}`, response2);
        fetchSick(param);
        console.info("calling api");
      }
    } catch (error) {
      alert(error);
    }
  };

  const deleteSearchedWord = (
    value: string,
    localStorageData: string[] | undefined,
    setlocalStorageData: setlocalStorageData
  ) => {
    let newLocalData = localStorageData?.filter((item) => item !== value);
    localStorage.setItem("searched", `${newLocalData}`);
    setlocalStorageData(newLocalData);
  };

  return {
    recommendWord,
    setRecommendWord,
    fetchSick,
    focusItem,
    setFocusItem,
    deleteSearchedWord,
  };
};
