import styled from "styled-components";
import { useAutoComplite } from "../hooks/useAutoComplite";
import { useTabIndex } from "../hooks/useTabIndex";
import { setStateString, setlocalStorageData } from "./type/type";

interface childProps {
  setSearchWord: setStateString;
  focusHandler: (type: string) => void;
  localStorageData: string[] | undefined;
  setlocalStorageData: setlocalStorageData;
}

export const RecentList = ({
  setSearchWord,
  focusHandler,
  localStorageData,
  setlocalStorageData,
}: childProps) => {
  const { setFocusItem, deleteSearchedWord } = useAutoComplite();

  const { focusContralArrow } = useTabIndex();

  return (
    <CardBox>
      <SearchCate>최근 검색어</SearchCate>
      <RecentListBox>
        {localStorageData && localStorageData !== undefined ? (
          localStorageData?.map((item, index) => {
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
      </RecentListBox>
    </CardBox>
  );
};

const RecentListBox = styled.ul`
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
const CancelBtn = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  cursor: pointer;
`;
