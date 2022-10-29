# MILITARY STORY
<img src="https://raw.githubusercontent.com/osamhack2022-v2/WEB_MILITARY_STORY/master/Front-end/public/favicon.ico" height="250px" />

군 장병 커뮤니티 웹 플랫폼 Military Story는 자유롭게 글을 업로드하여 공유하고, 군생활을 하는 데에 있어 도움을 서로 받고 줄 수 있도록 수 있는 웹 커뮤니티입니다.

## 프로젝트 소개

인터넷 커뮤니티는 많이 있지만 군인들만의 인터넷 커뮤니티가 부재함을 알고 Military Story를 기획했습니다.<br/>
Military Story는 여러 개의 게시판으로 이루어져 있어 각각의 게시판의 주제에 맞게 게시물을 업로드 할 수 있습니다.

#### 1. 자유 게시판
자신이 많은 사람들에게 말해주고 싶은 이야기를 공유할 수 있습니다. 인터넷 커뮤니티의 기본적인 특징을 담은 게시판입니다.

#### 2. 고민 상담 게시판
군생활을 하면서 누구나 고민이 생길 수 있습니다. 상담사나 또래상담병에게 고민을 털어놓을 수 있겠지만 어떤 고민은 익명으로 털어 놓고 많은 사람들에게 조언을 받고 싶을 때가 있습니다. <br/>
고민 상담 게시판을 통해 익명으로 고민을 털어놓을 수 있으며 같은 군인의 입장에서 전우들의 관점이 담긴 조언을 받을 수 있는 게시판입니다.

#### 3. 정보 게시판
여단, 사단, 국방부 등 군장병들이 군생활을 하면서 다양한 행사나 대회에 참여할 수 있지만 있는지도 몰라서 참여하지 못하거나 그런 것들을 알아보려고 해도 많은 사이트를 서핑하면서 정보를 얻어야 하기 때문에 시간과 노력이 많이 듭니다. <br />
이에 대한 해결방안으로 커뮤니티 이용 장병들이 자발적으로 자신이 알고 있는 행사나 대회를 공유하여 정보를 손쉽게 얻을 수 있도록 하면 좋을 것이라 생각하여 정보게시판을 만들었습니다.

#### 4. 감사일지 게시판 
감사일지를 노트에 쓰면서 감사노트를 공유하면 군 내에 긍정적인 영향을 끼칠 수 있지 않을까하여 만든 게시판입니다.<br/>
함께 감사일지를 공유하여 감사일지를 매일매일 쓰는 습관을 기를 수 있습니다.

#### 5. 질문 답변 게시판
군생활을 하면서 발생한 질문을 해결할 수 있는 게시판입니다.

#### 6. 취미 게시판
자신만의 특별한 취미를 공유하는 게시판입니다.


## 기능 설명

### 1. 다양한 게시판

취미 공유 게시판, 고민 상담 게시판, 자유 게시판, 질문 답변 게시판 등 다양한 게시판을 만들어 각 게시판의 주제에 맞게 글을 업로드할 수 있습니다.

### 2. 게시물 업로드 기능

게시물의 제목, 내용, 해시태그와 이미지(선택)을 업로드하여 다른 사람들과 공유할 수 있습니다.<br />
또한 내가 작성한 게시글은 수정 및 삭제를 할 수 있으며, 다른 유저의 게시글은 신고할 수 있습니다.

### 3. 댓글 기능

모든 게시물에 댓글을 달 수 있도록 하여 게시글 작성자와 소통할 수 있도록 했습니다.

### 4. 익명 기능

모든 게시물과 댓글은 익명으로 업로드할 수 있습니다. <br />
게시글은 익명으로 올릴 경우 게시자는 익명으로 나타나며, 댓글은 익명성을 유지하면서도, 댓글 작성자 간 구분이 되도록 했습니다. <br />
예를 들어 유저 A, 유저 B가 순서대로 어떤 게시글에 익명 댓글을 작성했을 경우 유저 A, 유저 B가 작성한 댓글의 댓글작성자는 익명1, 익명2로 나타나게 됩니다.

### 5. 스크랩 및 좋아요 기능

유저는 모든 게시글에 대하여 좋아요를 할 수 있고, 만약 좋아요가 특정 수를 넘어서면 인기 게시물에 추가됩니다.<br/>
인기 게시물 페이지는 좋아요 수가 특정 수를 넘는 게시글을 최신순으로 보여줍니다.<br/>
유저는 모든 게시글에 대하여 스크랩을 할 수 있고, 만약 스크랩을 하면 나의 스크랩 페이지에 추가가 됩니다.<br/>
스크랩 기능을 통해 게시물을 스크랩하여 나의 스크랩 페이지에서 스크랩한 게시물을 볼 수 있습니다.<br/>

### 6. 해시태그 기반 검색

해시태그를 통해 게시물을 검색할 수 있도록 기능을 구현하였습니다.<br/>
글 제목이나 글 내용 기반 검색보다 해시태그는 유저가 주제에 대한 게시물을 더 쉽게 찾을 수 있도록 하기 때문에 해시태그 기반 검색 방식을 채택했습니다.

### 7. 팔로우 기능

팔로우 기능을 통해 자신이 좋아하는 유저를 팔로우 할 수 있습니다.<br/>
프로필 페이지에서 자신이 팔로잉한 사람들과 자신을 팔로잉한 사람들을 볼 수 있으며,<br/>
나의 팔로잉 게시물 페이지로 이동하면 내가 팔로잉한 모든 사람들의 게시글을 볼 수 있습니다.

### 8. 나의 군생활, 휴가 기록 및 계산 기능

회원가입을 할 때 입대일, 전역일을 입력할 수 있고, 프로필 페이지에서도 입대일과 전역일을 수정할 수 있습니다.<br/>
프로필 페이지에서는 내가 군생활을 얼마나 했고, 얼마나 남았는지 도넛 그래프로 볼 수 있으며, 받은 휴가에 대해 기록하여 내가 얼마나 휴가를 받았고 그 사유는 무엇인지에 대해 기록할 수 있습니다.

### 9. 무한 스크롤 페이징
Military Story는 자료 보관의 목적보단 일상 위주의 이야기나 기간이 있는 행사, 대회에 대한 정보, 단순한 질문 및 답변, 고민 상담 등과 같이 휘발성이 있는 정보들에 대해 주로 다룹니다.
유저가 몇 년전의 게시글을 찾는 일이 적으며 무한 스크롤링으로 페이지를 제작한다고 해도 사용자 입장에서 크게 불편한 점이 없을 것이라고 판단했습니다.<br/>
그래서 사용자가 다음페이지로 넘어가는 번호를 눌러줘야하는 번거로움과 눌렀을 때 페이지가 변하는 피로감을 주는 페이지네이션보다 무한 스크롤이 Military Story에 더 어울린다고 생각하여 구현했습니다.


## 기술 스택

### FRONTEND

##### - 개발 언어
|javascript|
|-|
|<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png" width="80px"/>|

##### - 프레임워크
|next.js|
|-------|
|<img src="https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png" height="80px" />|

##### - 상태관리 라이브러리
|redux toolkit|
|-------------|
|<img src="https://hybridheroes.de/blog/content/images/2022/03/redux-toolkit-1400.jpg" height="80px" /> |

##### - 컴포넌트 디자인 라이브러리
|mui|
|---|
|<img src="https://mui.com/static/logo.png" height="80px" /> |

### BACKEND

##### - 개발 언어
|javascript|
|-|
|<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png" width="80px"/>|
##### - 프레임워크
|express js|
|---------|
|<img src="https://expressjs.com/images/express-facebook-share.png" height="80px" /> |

##### - 데이터베이스
|mysql|
|----|
|<img src="https://d1.awsstatic.com/asset-repository/products/amazon-rds/1024px-MySQL.ff87215b43fd7292af172e2a5d9b844217262571.png" height="80px" />|

## 컴퓨터 구성 / 필수 조건 안내

- ECMAScript 6 지원 브라우저 사용
- 권장: Google Chrome 버전 77 이상
- Internet Explorer 미사용 추천

### 각각의 개발문서

- [frontend 개발문서](https://github.com/osamhack2022-v2/WEB_MILITARY_STORY/blob/master/Front-end/README.md)
- [backend 개발문서](https://github.com/osamhack2022-v2/WEB_MILITARY_STORY/blob/master/Back-end/README.md)
- [lambda 개발문서](https://github.com/osamhack2022-v2/WEB_MILITARY_STORY/blob/master/lambda/README.md)

## communications

|slack|
|----|
|<img src="https://apiway.ai/storage/softs/YisONm9JLhNxkKDlmWkpbKGrotSo13uAuZxZhked.jpg" height="80px" />|

|kakao talk|
|---------|
|<img src="https://play-lh.googleusercontent.com/Ob9Ys8yKMeyKzZvl3cB9JNSTui1lJwjSKD60IVYnlvU2DsahysGENJE-txiRIW9_72Vd" height="80px" />|

## 팀원

- #### 김용 (팀장)
  ##### github id : gnncjegrgr
  ##### email : skystar234556@gmail.com
  ##### 역할 : 프론트엔드 페이지 구성 및 기능 개발, 백엔드 개발
- #### 유호인
  ##### github id : hoinhoin
  ##### email : follow3448@naver.com
  ##### 역할 : 프론트엔드 컴포넌트 디자인

## 저작권 및 사용권 정보 (Copyleft / End User License)

- [MIT](https://github.com/osamhack2022-v2/WEB_MILITARY_STORY/blob/master/license.md)
 
This project is licensed under the terms of the MIT license.
