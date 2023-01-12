import styled from "styled-components";
import { useEffect, useState } from "react";
import { RegExp } from "../util/RegExp";
import { KeyLIEvent } from "./type/type";
import { useAutoComplite } from "../hooks/useAutoComplite";
import { useTabIndex } from "../hooks/useTabIndex";

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
  const {
    recommendWord,
    setRecommendWord,
    fetchSick,
    focusItem,
    setFocusItem,
    deleteSearchedWord,
  } = useAutoComplite();

  useEffect(() => {
    if (
      searchWord?.length > 0 &&
      !RegExp.blankPattern(searchWord) && // not only blank
      keyInUse === false
    ) {
      if (
        searchWord?.length <= 1 &&
        RegExp.pattern(searchWord) // not each String
      ) {
        return;
      } else {
        fetchSick(searchWord);
      }
    }
    if (searchWord?.length === 0) setRecommendWord([]);
  }, [searchWord, keyInUse]);

  const { focusContralArrow, focusListSearch } = useTabIndex();
  useEffect(() => {
    document.addEventListener("keydown", (e: KeyboardEvent) =>
      focusListSearch(e, focusItem, setSearchWord)
    );
    return () => {
      document.removeEventListener("keydown", (e: KeyboardEvent) =>
        focusListSearch(e, focusItem, setSearchWord)
      );
    };
  }, [focusItem]);

  return (
    <>
      {isFocus ? (
        <Container onClick={(e) => e.stopPropagation()}>
          {searchWord?.length === 0 ? (
            <CardBox>
              <SearchCate>최근 검색어</SearchCate>
              <RecommendList>
                {localStorageData && localStorageData !== undefined ? (
                  localStorageData?.map((item: string, index: number) => {
                    return (
                      <li
                        key={index}
                        id={`searchList${index}`}
                        tabIndex={0}
                        onClick={() => {
                          setSearchWord(item);
                          focusHandler("blur");
                        }}
                        onKeyDown={(e) =>
                          focusContralArrow(e, index, localStorageData?.length)
                        }
                        onFocus={() => setFocusItem(item)}
                      >
                        <ListItemWrap>
                          <img
                            src={require("../images/searchGray.png")}
                            alt="돋보기 이미지"
                          />
                          <span>{item}</span>
                        </ListItemWrap>
                        <CancelBtn
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSearchedWord(
                              item,
                              localStorageData,
                              setlocalStorageData
                            );
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
          ) : (
            <CardBox>
              <SearchCate>추천 검색어</SearchCate>
              <RecommendList>
                {recommendWord?.length !== 0 ? (
                  recommendWord?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        id={`searchList${index}`}
                        tabIndex={0}
                        onClick={() => {
                          setSearchWord(item.sickNm);
                          focusHandler("blur");
                        }}
                        onKeyDown={(e) =>
                          focusContralArrow(e, index, recommendWord?.length)
                        }
                        onFocus={() => setFocusItem(item.sickNm)}
                      >
                        <ListItemWrap>
                          <img
                            src={require("../images/searchGray.png")}
                            alt="돋보기 이미지"
                          />
                          <span>
                            {item.sickNm?.split(searchWord)[0]}
                            <ItemBold>{searchWord}</ItemBold>
                            {item.sickNm?.split(searchWord)[1]}
                          </span>
                        </ListItemWrap>
                      </li>
                    );
                  })
                ) : (
                  <p>추천 검색어가 없습니다.</p>
                )}
              </RecommendList>
            </CardBox>
          )}
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  position: absolute;
  top: 350px;
  width: 490px;
  max-height: 500px;
  overflow-y: auto;
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
  padding: 0;
  & li {
    margin: 15px 0 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    &:focus {
      outline: none;
      background-color: #cae9ff;
    }
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
