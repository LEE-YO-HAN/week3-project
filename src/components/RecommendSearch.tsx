import styled from "styled-components";
import { setStateString, setlocalStorageData } from "./type/type";
import { RecommendSearchList } from "./RecommendSearchList";
import { RecentList } from "./RecentList";

interface childProps {
  isFocus: boolean;
  searchWord: string;
  setSearchWord: setStateString;
  focusHandler: (type: string) => void;
  localStorageData: string[] | undefined;
  setlocalStorageData: setlocalStorageData;
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
  return (
    <>
      {isFocus ? (
        <Container onClick={(e) => e.stopPropagation()}>
          {searchWord?.length === 0 ? (
            <>
              <RecentList
                setSearchWord={setSearchWord}
                focusHandler={focusHandler}
                localStorageData={localStorageData}
                setlocalStorageData={setlocalStorageData}
              />
            </>
          ) : (
            <>
              <RecommendSearchList
                searchWord={searchWord}
                setSearchWord={setSearchWord}
                focusHandler={focusHandler}
                keyInUse={keyInUse}
              />
            </>
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
