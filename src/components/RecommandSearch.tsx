import styled from "styled-components";

export const RecommandSearch = ({ isFocus }: { isFocus: boolean }) => {
  return (
    <>
      {isFocus ? (
        <Container>
          <div>
            <span>최근 검색어</span>
            <p>최근 검색어가 없습니다.</p>
          </div>
          <br />
          <div>
            <span>추천 검색어</span>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
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
