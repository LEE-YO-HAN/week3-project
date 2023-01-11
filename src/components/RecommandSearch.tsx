import { useEffect, useState } from "react";
import styled from "styled-components";
import { searchAPI } from "../api/api";

interface childProps {
  isFocus: boolean;
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  focusHandler: (type: string) => void;
  localStorageData: any;
  setlocalStorageData: React.Dispatch<any>;
  keyInUse: boolean;
}

export const RecommendSearch = ({
  isFocus,
  searchWord,
  setSearchWord,
  focusHandler,
  localStorageData,
  setlocalStorageData,
  keyInUse,
}: childProps) => {
  const [recommendWord, setRecommendWord] = useState<Array<any>>([]);
  const [countAxios, setCountAxios] = useState(0);

  // 과제 요구사항 콘솔
  console.info("axios#############", countAxios);

  const fetchSick = async (param: string) => {
    const { data } = await searchAPI.getSearch(param);
    setRecommendWord(data);
    setCountAxios((prev) => prev + 1);
  };

  let pattern = /([^가-힣a-z\x20])/i;
  let blankPattern = /^\s+|\s+$/g;

  useEffect(() => {
    if (
      searchWord.length > 0 &&
      !blankPattern.test(searchWord) && // not only blank
      !pattern.test(searchWord) && // not each String
      !keyInUse
    ) {
      fetchSick(searchWord);
    }
    if (searchWord.length === 0) setRecommendWord([]);
  }, [searchWord, keyInUse]);

  const deleteSearchedWord = (value: string) => {
    let newLocalData = localStorageData?.filter((item: any) => item !== value);
    localStorage.setItem("searched", `${newLocalData}`);
    setlocalStorageData(newLocalData);
  };

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
              {localStorageData && localStorageData !== undefined ? (
                localStorageData?.map((item: any, index: number) => {
                  return (
                    <li
                      key={index}
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
              {recommendWord?.length !== 0 ? (
                recommendWord?.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setSearchWord(item.sickNm);
                        focusHandler("blur");
                      }}
                    >
                      <ListItemWrap>
                        <img src={require("../images/searchGray.png")} alt="" />
                        {item.sickNm?.split(searchWord)[0]}
                        <ItemBold>{searchWord}</ItemBold>
                        {item.sickNm?.split(searchWord)[1]}
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
