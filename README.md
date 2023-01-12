# 검색창/검색어 추천 기능 구현 - 원티드 프리온보딩 3주차

## 배포주소 :

</br>

## json-server 배포 레포 :

</br></br>

1. [Local Start](#local-start)
2. [구현사항](#구현사항)

</br>

### Local Start

<br>

```bash
# yarn
yarn install
```

```bash
# local DB
yarn json-server --watch db.json --port 3001
```

```bash
# start project
yarn start
```

<h3 align="center">🛠Used Tools🛠</h3>

<div align="center" >
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/>

</div>
<div align="center">
    <img src="https://img.shields.io/badge/styled-components-DB7093?style=flat&logo=styled-components&logoColor=white"/>
    <img src="https://img.shields.io/badge/JsonServer-000000?style=flat&logo=JSON&logoColor=white"/>
    <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=Vercel&logoColor=white"/>
</div>

<br>
<br>
<br>

### 구현사항

1. 질환명 검색시 API 호출을 통해 검색어 추천 기능 구현
   - 사용자가 입력한 텍스트와 일치하는 부분은 bold 처리
   - input focus시 localStorage를 이용해 최근 검색어 노출
   - 일치하는 검색 결과가 없는 경우의 UI 표시

</br>

2. API 호출 최적화
   - keyUp/keyDown event를 통해 사용자의 키 입력이 끝나고 일정 시간 지연시간을 준 뒤, API 호출을 통해 해당하는 값에 대한 요청값 반환
   - 띄어쓰기만 있는 string, 완성되지 않은 문자(자음 모음 분리)의 경우 API 호출을 하지 않는 등의 호출 조건 추가
   - CacheStorage를 이용해 동일한 요청의 값은 캐시를 통해 반환

</br>

3. 키보드만으로도 추천/최근 검색어로 이동 가능
   - tab키 or 화살표 방향키 상하 조작으로 이동 가능
   - 추천 검색어로 키보드 이동 후 Enter 입력 시 submit => 최근 검색어 localStorage로 저장
   - 추천 검색어 마우스 클릭 시, 해당 키워드를 input의 value로 이동

</br></br>
