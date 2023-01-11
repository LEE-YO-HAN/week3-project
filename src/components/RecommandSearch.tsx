import { useEffect, useState } from "react";
import styled from "styled-components";
import { searchAPI } from "../api/api";

interface childProps {
  isFocus: boolean;
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  focusHandler: (type: string) => void;
}

export const RecommendSearch = ({
  isFocus,
  searchWord,
  setSearchWord,
  focusHandler,
}: childProps) => {
  const [recommendWord, setRecommendWord] = useState<Array<any>>();
  const [countAxios, setCountAxios] = useState(0);
  console.info("axios#############", countAxios);

  const fetchSick = async () => {
    const data = await searchAPI.getSearch(searchWord).then((res) => {
      setRecommendWord(res.data);
      // #######
      setCountAxios((prev) => prev + 1);
    });
  };
  useEffect(() => {
    // fetchSick();
  }, [searchWord]);

  let storageData = localStorage.getItem("searched")?.split(",");
  const [localData, setLocalData] = useState(storageData);

  const deleteSearchedWord = (value: string) => {
    let newLocalData = localData?.filter((item) => item !== value);
    localStorage.setItem("searched", `${newLocalData}`);
    setLocalData(newLocalData);
  };

  console.log(localData);
  console.log(localStorage.getItem("searched"));

  return (
    <>
      {isFocus ? (
        <Container onClick={(e) => e.stopPropagation()}>
          <CardBox
            style={
              searchWord.length !== 0
                ? { display: "none" }
                : { display: "block" }
            }
          >
            <SearchCate>최근 검색어</SearchCate>
            <RecommendList>
              {localData && localData[0] !== "" ? (
                localData?.map((item) => {
                  return (
                    <li
                      onClick={() => {
                        setSearchWord(item);
                        focusHandler("blur");
                      }}
                    >
                      <ListItemWrap>
                        <img src={require("../images/searchGray.png")} alt="" />
                        <span>{item}</span>
                      </ListItemWrap>
                      <CancelBtn
                        onClick={(e) => {
                          deleteSearchedWord(item);
                          e.stopPropagation();
                        }}
                        src={require("../images/cancel.png")}
                        alt="최근 검색어 삭제"
                      />
                    </li>
                  );
                })
              ) : (
                <p>최근 검색어가 없습니다.</p>
              )}
            </RecommendList>
          </CardBox>
          <CardBox
            style={
              searchWord.length > 0 ? { display: "block" } : { display: "none" }
            }
          >
            <SearchCate>추천 검색어</SearchCate>
            <RecommendList>
              {searchWord.length > 0 && recommendWord !== undefined ? (
                recommendWord?.map((item) => {
                  return (
                    <li
                      onClick={() => {
                        setSearchWord(item.sickNm);
                        focusHandler("blur");
                      }}
                    >
                      <ListItemWrap>
                        <img src={require("../images/searchGray.png")} alt="" />
                        {item.sickNm}
                      </ListItemWrap>
                    </li>
                  );
                })
              ) : (
                <p>추천 검색어가 없습니다.</p>
              )}
            </RecommendList>
          </CardBox>
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  position: absolute;
  top: 350px;

  width: 490px;
  background-color: white;
  box-shadow: 1px 1px 4px 1px lightgray;
  border-radius: 20px;
`;

const CardBox = styled.div`
  padding: 10px;

  & p {
    color: #a3a3a3;
    font-weight: bold;
  }
`;

const SearchCate = styled.span`
  margin-bottom: 10px;
  color: gray;
  font-size: 0.8rem;
  font-weight: bold;
`;

const RecommendList = styled.ul`
  & li {
    margin: 15px 0 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  & img {
    margin-right: 7px;
    width: 20px;
    height: 20px;
  }
`;
const ListItemWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ItemBold = styled.span`
  font-weight: bold;
`;

const CancelBtn = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  cursor: pointer;
`;
