import styled from "styled-components";
import { useEffect } from "react";
import { useAutoComplite } from "../hooks/useAutoComplite";
import { useTabIndex } from "../hooks/useTabIndex";
import { setStateString } from "./type/type";
import { RegExp } from "../util/RegExp";

interface childProps {
  searchWord: string;
  setSearchWord: setStateString;
  focusHandler: (type: string) => void;
  keyInUse: boolean;
}

export const RecommendSearchList = ({
  searchWord,
  setSearchWord,
  focusHandler,
  keyInUse,
}: childProps) => {
  const {
    recommendWord,
    setRecommendWord,
    fetchSick,
    focusItem,
    setFocusItem,
  } = useAutoComplite();

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

  return (
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
  );
};

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
const ListItemWrap = styled.div`
  display: flex;
  align-items: center;
`;
const ItemBold = styled.span`
  font-weight: bold;
`;
