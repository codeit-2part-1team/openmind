# 🗣️ 오픈마인드 | OPENMIND
<img width="1898" height="956" alt="image" src="https://github.com/user-attachments/assets/88a258e4-4e8c-47d6-880d-db7cd19027ec" />

## 🌐 프로젝트 소개

오픈마인드는 누구나 질문 페이지를 만들고, 익명으로 소통할 수 있는 플랫폼입니다.<br>
사용자는 자신의 이름을 입력하고 질문을 받을 수 있는 페이지를 생성할 수 있으며,<br>
다른 사람에게 익명으로 질문을 남길 수도 있습니다.<br>
이렇게 소통하면서 다양한 의견과 피드를 나누는 재미를 느낄 수 있답니다! 😆

<br>

## 🎥 Demo

<table>
 <tr>
  <tbody>
   <tr>
    <td align="center"><strong>메인 페이지 (+챗봇)</strong></td>
    <td align="center"><strong>질문목록 페이지</strong></td>
   </tr>
   <tr>
    <td><img src="https://github.com/user-attachments/assets/4dad8b53-6005-49ad-9ba2-f6d7e44a2cd7" alt=""></td>
    <td><img src="https://github.com/user-attachments/assets/e8ddb7a0-fdc7-422e-8260-8d65c66b4391" alt=""></td>
   </tr>
   <tr>
        <td align="center"><strong>개별피드 페이지</strong></td>
     <td align="center"><strong>답변하기 페이지</strong></td>
   </tr>
   <tr>
        <td><img src="https://github.com/user-attachments/assets/042d7940-7fce-4b40-a198-8908b56f26cd" alt=""></td>
    <td><img src="https://github.com/user-attachments/assets/cf90c3b4-e04c-4850-9148-619f7987215c" alt=""></td>
   </tr>
     <tr>
       <td align="center"><strong>링킹 페이지</strong></td>
    <td align="center"><strong>404 페이지</strong></td>
   </tr>
   <tr>
      <td><img src="https://github.com/user-attachments/assets/fc07894c-cd21-42e0-93d0-a93c1c2bd2ab" alt=""></td>
    <td><img src="https://github.com/user-attachments/assets/70b37d53-ab80-47bf-bafd-f59d2906a5d3" alt=""></td>
   </tr>
  </tbody>
 </tr>
</table>

<br>


## 🚀 주요 기능
🐱 **질문 피드 생성**: 사용자 이름 기반 개인 질문 피드 생성 및 라우팅<br>
💭 **익명 질문 작성**: 모달 UI를 통한 질문 작성<br>
🛠 **답변 관리 (CRUD)**: 답변 작성, 수정, 삭제 및 상태 관리<br>
❤️ **사용자 반응**: 좋아요 / 싫어요 및 카운트 반영<br>
📄 **질문 리스트 조회**: 최신순 정렬, 페이지네이션 및 무한 스크롤 지원<br>
🔗 **공유 기능**: 링크 복사 및 SNS(카카오톡, 페이스북) 공유<br>
📱 **반응형 UI**: 다양한 디바이스 환경에 최적화 (Desktop / Tablet / Mobile 대응)<br>
🤖 챗봇 기능: 사용자 질문에 대한 실시간 응답 제공

<br>

## 🛠️ 기술 스택
### Frontend
<img src="https://img.shields.io/badge/react-%2361DAFB.svg?&style=for-the-badge&logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=black" /> <img src="https://img.shields.io/badge/styled--components-%23DB7093.svg?&style=for-the-badge&logo=styled-components&logoColor=white" /> <img src="https://img.shields.io/badge/react%20router-%23CA4245.svg?&style=for-the-badge&logo=react%20router&logoColor=white" />

### API
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>

### Development
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) <img src="https://img.shields.io/badge/node.js-%23339933.svg?&style=for-the-badge&logo=node.js&logoColor=white" /> 	<img src="https://img.shields.io/badge/npm-%23CB3837.svg?&style=for-the-badge&logo=npm&logoColor=white" />

### Code Quality
<img src="https://img.shields.io/badge/eslint-%234B32C3.svg?&style=for-the-badge&logo=eslint&logoColor=white" /> <img src="https://img.shields.io/badge/prettier-%23F7B93E.svg?&style=for-the-badge&logo=prettier&logoColor=black" />

### Collaboration Tools
<img src="https://img.shields.io/badge/git-%23F05032.svg?&style=for-the-badge&logo=git&logoColor=white" /> <img src="https://img.shields.io/badge/github-%23181717.svg?&style=for-the-badge&logo=github&logoColor=white" /> <img src="https://img.shields.io/badge/discord-%237289DA.svg?&style=for-the-badge&logo=discord&logoColor=white" /> <img src="https://img.shields.io/badge/figma-%23F24E1E.svg?&style=for-the-badge&logo=figma&logoColor=white" /> 	<img src="https://img.shields.io/badge/notion-%23000000.svg?&style=for-the-badge&logo=notion&logoColor=white" /> <img src="https://img.shields.io/badge/google%20sheets-%2334A853.svg?&style=for-the-badge&logo=google%20sheets&logoColor=white" />

### Deployment
<img src="https://img.shields.io/badge/vercel-%23000000.svg?&style=for-the-badge&logo=vercel&logoColor=white" />

<br>

## 📁 프로젝트 구조

```bash


├── public
│   ├── favicon.ico
│   └── openmind_og.png
├── src/
│   ├── apis
│   │   ├── answers
│   │   ├── questions
│   │   └── subjects
│   ├── assets
│   │   ├── icons
│   │   └── images
│   ├── components
│   │   ├── answer
│   │   ├── chatbot
│   │   ├── common
│   │   ├── home
│   │   ├── profile
│   │   ├── questionbutton
│   │   └── questionlist
│   ├── index.css
│   ├── App.jsx
│   ├── main.jsx
│   └── pages
│       ├── Answer.jsx
│       ├── Home.jsx
│       ├── NotFoundPage.jsx
│       ├── Post.jsx
│       ├── QuestionList.jsx
│       └── Ranking.jsx
├── index.html
├── eslint.config.js
├── package-lock.json
├── package.json
├── vercel.json
└── vite.config.js
``` 

<br>

 
## 👥 팀원 구성

<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/218423054?s=96&v=4" width="150"/><br/>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/181364682?v=4" width="150"/><br/>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/211442066?s=96&v=4" width="150"/><br/>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/239947698?s=96&v=4" width="150"/><br/>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/113983522?s=96&v=4" width="150"/><br/>
    </td>
  </tr>
   <tr>
    <td align="center">
      <a href="https://github.com/devchae10">양채원</a><br>
    </td>
    <td align="center">
      <a href="https://github.com/2ruuuu">최일우</a><br>
    </td>
    <td align="center">
      <a href="https://github.com/strawberryHCl">신유환</a><br>
    </td>
    <td align="center">
      <a href="https://github.com/ejlee6742-source">이은지</a><br>
    </td>
    <td align="center">
      <a href="https://github.com/hhhnseo">장현서</a><br>
    </td>
  </tr>
   <tr>
    <td align="center">
      <sub>
       -질문목록 페이지<br>
       -폰트 세팅
      </sub>
    </td>
    <td align="center">
      <sub>
        -프로젝트 기초 세팅 및 배포<br>
        -메인 페이지, 개별피드페이지 모달
      </sub>
    </td>
    <td align="center">
      <sub>-개별피드 페이지<br><br></sub>
    </td>
    <td align="center">
      <sub>
        -랭킹 페이지<br>
        -404 페이지, 메타태그 세팅
      </sub>
    </td>
    <td align="center">
      <sub>
        -프로젝트 기초 세팅<br>
        -답변하기 페이지
      </sub>
    </td>
  </tr>
</table>

<br>

## 👨‍💻 역할 분담

### 양채원
<ul>
  <li><b>UI</b>
    <ul>
      <li>페이지 : 질문목록 페이지</li>
      <li>컴포넌트 : 유저 카드, 드롭다운, 페이지네이션</li>
    </ul>
  </li>
  <li><b>기능</b>
    <ul>
      <li>유저 카드 데이터 조회 및 랜더링 / 페이지네이션 / 드롭다운 정렬 / 상태 기반 페이지 이동 / 로딩 및 에러 처리 / 폰트 세팅</li>
    </ul>
  </li>
</ul><br>

### 최일우
<ul>
  <li><b>UI</b>
    <ul>
      <li>페이지 : 메인 페이지, 개별피드 페이지 모달</li>
      <li>컴포넌트 : Chatbot, InputField, InputTextArea, Modal, Logo</li>
    </ul>
  </li>
  <li><b>기능</b>
    <ul>
      <li>localStorage / 챗봇</li>
    </ul>
  </li>
</ul><br>

### 신유환
<ul>
  <li><b>UI</b>
    <ul>
      <li>페이지 : 개별피드 페이지</li>
      <li>컴포넌트 : SNS 공유 버튼 / 질문하기 버튼</li>
    </ul>
  </li>
  <li><b>기능</b>
    <ul>
      <li>URL 복사 / 카카오톡 공유 / 페이스북 공유 / 모달 오픈 로직</li>
    </ul>
  </li>
</ul><br>

### 이은지
<ul>
  <li><b>UI</b>
    <ul>
      <li>페이지 : 랭킹 페이지, 404 페이지</li>
      <li>컴포넌트 : 버튼 컴포넌트</li>
    </ul>
  </li>
  <li><b>기능</b>
    <ul>
      <li>인기 답변자 순위 / 인기 질문 순위 / 메타태그 / og 설정</li>
    </ul>
  </li>
</ul><br>

### 장현서
<ul>
  <li><b>UI</b>
    <ul>
      <li>페이지 : 답변하기 페이지</li>
      <li>컴포넌트 : 뱃지 / 리액션 / 케밥메뉴 / 답변 박스 / FeedCard (Question, Answer) / 카드프레임</li>
    </ul>
  </li>
  <li><b>기능</b>
    <ul>
      <li>뱃지 / 리액션 / 케밥메뉴 / 답변 박스 / FeedCard (Question, Answer) / 카드프레임</li>
    </ul>
  </li>
</ul>

<br>

## 📌 페이지별 기능

### [메인 페이지]

- 챗봇 기능 구현
  - **Openai API**를 연동하여 실시간 챗봇 구현
  - **Uselocation** 훅을 활용하여 사용자가 현재 머물고 있는 **페이지 파악 후 상황에 맞는 적절한 방법을 안내**
  - 보안을 위해 API 키는 **환경 변수**로 분리
-  로컬스토리지 id 저장을 통한 기능 구현
   - 처음 생성 이름 → Id 생성 후 답변 페이지로 이동
   - 기존 저장 이름 → Id 중복 체크 후 기존 Id 답변 페이지로 이동

![메인_챗봇](https://github.com/user-attachments/assets/4dad8b53-6005-49ad-9ba2-f6d7e44a2cd7)



<br>

### [질문목록 페이지]
- API 데이터 조회 및 렌더링
  - Swagger 문서를 기반으로 axios를 활용해  데이터 요청 및 화면 렌더링 (PC : 8개 / MO : 6개)
- 페이지네이션 로직 구현
  - 전체 페이지 수와 현재 페이지를 기반으로  표시 범위를 계산하고, 첫/마지막 페이지 기준으로 중간 숫자 동적 정렬
- 정렬 기능 구현 (최신순 / 인기순)
  - 드롭다운 선택에 따라 상태별 정렬 (SearchParams 활용)
- 상태 기반 페이지 이동 처리
  - 로컬스토리지의 id 저장 여부를 기준으로 조건 분기하여 이동 링크를 다르게 설정
- 로딩 및 에러 처리
  - 로딩, 에러 컴포넌트 적용으로 사용자 경험 개선
 

![질문목록_v2](https://github.com/user-attachments/assets/e8ddb7a0-fdc7-422e-8260-8d65c66b4391)



<br>

### [랭킹 페이지]
- 인기 답변자 순위 불러오기
  - 받은 질문의 수가 높은 순서대로 배열
  - 순위를 정하고 스타일 컴포넌트를 통해 금. 은. 동 메달 아이콘을 적용
- 인기 질문 순위 불러오기
  - 모든 id의 질문 데이터를 가져와서 좋아요 수에서 싫어요 값을 뺀 후 좋아요가 높은 순서대로 배열
  - 최상위 3개의 데이터까지만 표시
- 질문 클릭 시 해당 유저의 답변 페이지로 이동
  - 선택한 질문을 클릭하면 해당 유저의 /post/{id}/answer 페이지로 이동

![화면기록_랭킹_pc](https://github.com/user-attachments/assets/fc07894c-cd21-42e0-93d0-a93c1c2bd2ab)

<br>

### [개별피드 페이지]
- URL 복사 및 SNS 공유 기능 구현
  - 현재 페이지 URL을 복사하여 공유 가능하도록 구현
  - 카카오 JavaScript SDK를 연동하여 현재 페이지를 카카오톡으로 공유할 수 있도록 구현
- 질문 작성 모달 기능 구현
  - 버튼 클릭 시 모달 창 노출
  - 사용자 입력을 통한 질문 작성 및 전송 기능 구현


![개별피드_2](https://github.com/user-attachments/assets/042d7940-7fce-4b40-a198-8908b56f26cd)




<br>

### [답변하기 페이지]
- 무한 스크롤 기능 구현
  - 스크롤 시 데이터를 3개씩 추가로 요청하여 리스트 렌더링
- 삭제 기능 구현
  - 삭제 버튼 클릭 시 확인 알림창을 표시하고, 확인 시 카드 데이터 전체 삭제
- 답변 박스 생성
  - 답변이 없는 경우 자동으로 입력 박스를 노출하고, 케밥 메뉴의 “수정하기” 클릭시 답변 수정이 가능한 입력 박스 생성
- 케밥 메뉴 조건부 렌더링
  - 답변 상태에 따라 메뉴 옵션을 다르게 표시
    - 답변 거절 상태 : “수정하기” 미노출
    - 답변 없음 : “수정하기” 미노출

![화면기록_답변하기_pc](https://github.com/user-attachments/assets/cf90c3b4-e04c-4850-9148-619f7987215c)



<br>

### [404 페이지]
- 유효하지 않은 라우트 접근 시 404 페이지로 리다이렉트 및 사용자 안내 처리

![화면기록_404](https://github.com/user-attachments/assets/70b37d53-ab80-47bf-bafd-f59d2906a5d3)


