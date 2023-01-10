import styled from "styled-components";

function App() {
  return (
    <SearchBox>
      <h2>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </h2>
      <InputBox>
        <SearchArea>
          <SearchInput type="text" placeholder="질환명을 입력해주세요" />
          <CancelBtn
            src={require("../src/images/cancel.png")}
            alt="검색 초기화"
          />
          <SearchBtn>
            <img src={require("../src/images/searchWhite.png")} alt="검색" />
          </SearchBtn>
        </SearchArea>
      </InputBox>
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

const SearchArea = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding-top: 6px;
  padding-right: 25px;
  width: 350px;
  height: 22px;
  font-size: 1.2rem;
  border: none;
  &:focus {
    outline: none;
  }
`;

const CancelBtn = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 10px;
`;

const SearchBtn = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: #007be9;

  & img {
    width: 30px;
    height: 30px;
  }
`;
