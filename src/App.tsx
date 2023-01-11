import styled from "styled-components";
import { useState } from "react";
import { RecommendSearch } from "./components/RecommandSearch";

function App() {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>("");

  const focusHandler = (type: string) => {
    type === "focus" ? setIsFocus(true) : setIsFocus(false);
  };

  const focusOn = () => {
    document.getElementById("searchInput")?.focus();
  };

  let storageInit = localStorage.getItem("searched")?.split(",");
  console.log(storageInit);

  const [localStorageData, setlocalStorageData] = useState<any>(storageInit);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchWord !== "") {
      if (!localStorage.getItem("searched")) {
        localStorage.setItem("searched", searchWord);
        setlocalStorageData([searchWord]);
      } else {
        let newStorage = `${localStorage.getItem(
          "searched"
        )},${searchWord}`.split(",");
        let newStorageSet = newStorage.filter((item, index) => {
          return newStorage.indexOf(item) === index;
        });
        localStorage.setItem("searched", `${newStorageSet}`);
        setlocalStorageData(newStorageSet);
      }
      setSearchWord("");
    }
  };

  return (
    <SearchBox onClick={() => focusHandler("blur")}>
      <h2>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h2>
      <InputWrap onClick={(e) => e.stopPropagation()}>
        <InputBox
          style={isFocus ? { border: "2px solid #007BE9" } : { border: "none" }}
        >
          <SearchArea onSubmit={onSubmit}>
            <SearchInput
              onChange={(e) => setSearchWord(e.target.value)}
              onFocus={() => focusHandler("focus")}
              id="searchInput"
              type="text"
              autoComplete="off"
              value={searchWord}
            />
            <SearchPlaceHolder
              onClick={focusOn}
              style={
                isFocus || searchWord.length > 0
                  ? { display: "none" }
                  : { display: "flex" }
              }
            >
              <img
                src={require("../src/images/searchGray.png")}
                alt="placeholder"
              />
              질환명을 입력해주세요
            </SearchPlaceHolder>
            <CancelBtn
              onClick={() => setSearchWord("")}
              src={require("../src/images/cancel.png")}
              alt="검색 초기화"
            />
            <SearchBtn>
              <img src={require("../src/images/searchWhite.png")} alt="검색" />
            </SearchBtn>
          </SearchArea>
        </InputBox>
      </InputWrap>
      <RecommendSearch
        isFocus={isFocus}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        focusHandler={focusHandler}
        localStorageData={localStorageData}
        setlocalStorageData={setlocalStorageData}
      />
    </SearchBox>
  );
}
export default App;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 450px;
  background-color: #cae9ff;

  & h2 {
    font-size: 2.2rem;
    text-align: center;
  }
`;

const InputWrap = styled.div`
  height: 90px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 490px;
  height: 75px;
  border: 1px solid black;
  border-radius: 42px;
  background-color: white;
`;

const SearchArea = styled.form`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding-top: 4px;
  padding-right: 25px;
  width: 350px;
  height: 22px;
  font-size: 1.2rem;
  border: none;
  &:focus {
    outline: none;
  }
`;

const SearchPlaceHolder = styled.div`
  position: absolute;

  display: flex;
  align-items: center;
  color: gray;
  & img {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
`;

const CancelBtn = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  cursor: pointer;
`;

const SearchBtn = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: #007be9;
  cursor: pointer;

  & img {
    width: 30px;
    height: 30px;
  }
`;
