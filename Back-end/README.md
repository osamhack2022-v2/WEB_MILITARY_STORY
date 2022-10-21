# osam_back

## 실행방법

##### npm install --force

##### npx sequelize db:create

##### npm run dev

## 미리 설치 및 설정해야할 것

### mysql

### .env파일

> #### COOKIEPARSER=원하는것(따옴표 없이)
>
> #### DB*PASSWORD=mysql_db*비밀번호(따옴표 없이)
>
> #### S3_ACCESS_KEY_ID=AWS_S3_KEYID(따옴표 없이)
>
> #### S3_SECRET_ACCESS_KEY=AWS_SECRET_KEY(따옴표 없이)
>
> S3 key는 AWS에서 엑셀 파일로 주는데 그거 다운 받고 복사 붙여넣기 하시면 됩니다.

## DB 모델

### User

#### 유저를 나타냅니다.

| 이름         | 타입         | 설명                                                | 비고                                  |
| ------------ | ------------ | --------------------------------------------------- | ------------------------------------- |
| id           | INTEGER      | 유저들을 구분해줍니다.                              | PRIMARY_KEY, AUTO_INCREMENT, NOT NULL |
| email        | varchar(30)  | 유저의 email입니다.                                 | UNIQUE, NOT NULL                      |
| nickname     | varchar(30)  | 유저의 Military Story 활동명입니다.                 | NOT NULL                              |
| password     | varchar(100) | 유저의 비밀번호입니다.(bcrypt 모듈로 암호화됩니다.) | NOT NULL                              |
| followers    | INTEGER      | 팔로워 수입니다.                                    | NOT NULL                              |
| annual       | INTEGER      | 유저의 연가 일수입니다.                             | NOT NULL                              |
| reward       | INTEGER      | 유저의 보상휴가 일수입니다.                         | NOT NULL                              |
| compensation | INTEGER      | 유저의 포상휴가 일수입니다.                         | NOT NULL                              |
| consolation  | INTEGER      | 유저의 위로휴가 일수입니다.                         | NOT NULL                              |
| petition     | INTEGER      | 유저의 청원휴가 일수입니다.                         | NOT NULL                              |
| start_date   | DATE         | 유저의 입대일입니다.                                | NOT NULL                              |
| end_date     | DATE         | 유저의 전역일입니다.                                | NOT NULL                              |

### Post

#### 게시글을 나타냅니다.

| 이름          | 타입    | 설명                                     | 비고                                  |
| ------------- | ------- | ---------------------------------------- | ------------------------------------- |
| id            | INTEGER | 게시글들을 구분해줍니다.                 | PRIMARY_KEY, AUTO_INCREMENT, NOT NULL |
| content       | TEXT    | 게시글의 내용입니다.(제목+내용+해시태그) | NOT NULL                              |
| category      | TEXT    | 게시글이 속한 게시판입니다.              | NOT NULL                              |
| private_mode  | BOOLEAN | 게시글의 익명 모드입니다.                | NOT NULL                              |
| report_count  | INTEGER | 게시글이 신고당한 횟수입니다.            | NOT NULL                              |
| hidden_mode   | BOOLEAN | 게시글의 은신 모드입니다.                | NOT NULL                              |
| like_counts   | INTEGER | 게시글의 좋아요 수입니다.                | NOT NULL                              |
| UserId(←User) | INTEGER | 게시글 작성자의 ID입니다.                | NULLABLE, FOREIGN_KEY                 |

### Comment

#### 댓글을 나타냅니다.

| 이름          | 타입    | 설명                                                 | 비고                                  |
| ------------- | ------- | ---------------------------------------------------- | ------------------------------------- |
| id            | INTEGER | 댓글들을 구분해줍니다.                               | PRIMARY_KEY, AUTO_INCREMENT, NOT NULL |
| content       | TEXT    | 댓글의 내용입니다.                                   | NOT NULL                              |
| private_mode  | BOOLEAN | 댓글의 익명 모드입니다.                              | NOT NULL                              |
| anonymous     | TEXT    | 댓글이 익명일 경우 댓글은 '익명'+anonymous로 됩니다. | NOT NULL                              |
| UserId(←User) | INTEGER | 댓글 작성자의 ID입니다.                              | NULLABLE, FOREIGN_KEY                 |
| PostId(←Post) | INTEGER | 댓글이 속한 게시글의 ID입니다.                       | NULLABLE, FOREIGN_KEY                 |

### Hashtag

#### 해시태그를 나타냅니다.

| 이름 | 타입        | 설명                       | 비고                                  |
| ---- | ----------- | -------------------------- | ------------------------------------- |
| id   | INTEGER     | 해시태그들을 구분해줍니다. | PRIMARY_KEY, AUTO_INCREMENT, NOT NULL |
| name | varchar(20) | 해시태그입니다.            | NOT NULL                              |

### Userid

#### 게시글에 익명 댓글을 작성한 유저들의 id를 나타냅니다, Post에 1대n 관계로 유저들의 id가 배열 형태로 저장될 수 있도록 했습니다.

| 이름          | 타입    | 설명                                        | 비고                                  |
| ------------- | ------- | ------------------------------------------- | ------------------------------------- |
| id            | INTEGER | Userid들을 구분해줍니다.                    | PRIMARY_KEY, AUTO_INCREMENT, NOT NULL |
| my_id         | INTEGER | 게시글에 익명댓글을 작성한 유저의 id입니다. | NOT NULL                              |
| PostId(←Post) | INTEGER | Userid가 속한 게시글의 ID입니다.            | NULLABLE, FOREIGN_KEY                 |

### Record

#### 유저의 휴가기록을 나타냅니다.

| 이름          | 타입         | 설명                                              | 비고                                  |
| ------------- | ------------ | ------------------------------------------------- | ------------------------------------- |
| id            | INTEGER      | Record들을 구분해주는 id입니다.                   | PRIMARY_KEY, AUTO_INCREMENT, NOT NULL |
| category      | INTEGER      | 포상휴가, 위로휴가 같이 휴가의 종류를 나타냅니다. | NOT NULL                              |
| reason        | varchar(300) | 휴가의 사유를 적습니다.                           | NOT NULL                              |
| num_of_days   | INTEGER      | 휴가 일수를 적습니다.                             | NOT NULL                              |
| UserId(←User) | INTEGER      | 휴가 기록의 유저의 ID를 나타냅니다.               | NULLABLE, FOREIGN_KEY                 |

### Image

#### 게시글의 이미지를 나타냅니다.

| 이름          | 타입         | 설명                                    | 비고                                  |
| ------------- | ------------ | --------------------------------------- | ------------------------------------- |
| id            | INTEGER      | Image들을 구분해줍니다.                 | PRIMARY_KEY, AUTO_INCREMENT, NOT NULL |
| src           | varchar(200) | Image의 주소를 나타냅니다.              | NOT NULL                              |
| PostId(←Post) | INTEGER      | 이미지가 속한 게시글의 ID를 나타냅니다. | NOT NULL                              |

### Follow

#### User간의 following, follower 관계를 나타냅니다.

| 이름        | 타입    | 설명                | 비고                  |
| ----------- | ------- | ------------------- | --------------------- |
| FollowingId | INTEGER | 팔로잉 된 유저의 Id | NOT NULL, FOREIGN_KEY |
| FollwerId   | INTEGER | 팔로잉 한 유저의 Id | NOT NULL, FOREIGN_KEY |

### Like

#### User와 Post간의 Liked, Liker 관계를 나타냅니다.

| 이름   | 타입    | 설명                   | 비고                  |
| ------ | ------- | ---------------------- | --------------------- |
| PostId | INTEGER | 좋아요 된 게시글의 Id. | NOT NULL, FOREIGN_KEY |
| UserId | INTEGER | 좋아요 한 유저의 Id.   | NOT NULL, FOREIGN+KEY |

### Scrap

#### User와 Post간의 Scrapper Scrapped 관계를 나타냅니다.

| 이름   | 타입    | 설명                   | 비고                  |
| ------ | ------- | ---------------------- | --------------------- |
| PostId | INTEGER | 스크랩 된 게시글의 Id. | NOT NULL, FOREIGN_KEY |
| UserId | INTEGER | 스크랩한 유저의 Id.    | NOT NULL, FOREIGN_KEY |

### PostHashtag

#### Post와 Hashtag간의 관계를 나타냅니다.

| 이름      | 타입    | 설명                         | 비고                  |
| --------- | ------- | ---------------------------- | --------------------- |
| HashtagId | INTEGER | 게시글에 속한 해시태그의 Id. | NOT NULL, FOREIGN_KEY |
| PostId    | INTEGER | 해시태그에 속한 게시글의 Id. | NOT NULL, FOREIGN_KEY |

## 코드 설명

### '/'

#### app.js

> ##### backend server의 기본적인 설정을 하고, routes를 합쳐 서비스를 제공

### 'routes'

> #### hashtag.js
>
> ### GET /hashtag/:hashtag
>
> 해시태그와 관련된 게시글을 모두 가져옵니다.
>
> #### req.query
>
> | query   | 타입    | 설명                                                                                                                                                                   | 비고     |
> | ------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
> | lastId  | INTEGER | Military Story 사이트에서 화면에 보이는 게시글 중에 가장 밑에 있는 게시글의 Id를 넘겨받습니다.(Post Id가 클수록 최신 글이라는 것을 이용해 최신순 나열을 구현했습니다.) | NULLABLE |
> | hashtag | STRING  | 해시태그와 관련된 글을 받기 위해 해시태그를 넘겨받습니다.                                                                                                              | NOT NULL |
>
> #### res
>
> | 이름  | 타입         | 설명                           |
> | ----- | ------------ | ------------------------------ |
> | posts | Array(post)) | Post(model)의 배열 형태입니다. |
>
> #### middlewares.js
>
> 로그인했는지 안 했는지 체크해줍니다.
>
> ### post.js
>
> 하나의 게시글과 관련된 처리를 합니다. (좋아요 누르기, 댓글 달기 등)
>
> ### POST /post
>
> 게시글을 업로드합니다.
>
> #### req.body
>
> | body         | 타입    | 설명                                        | 비고     |
> | ------------ | ------- | ------------------------------------------- | -------- |
> | content      | STRING  | 게시글의 내용입니다.(제목+내용+해시태그)    | NOT NULL |
> | category     | STRING  | 게시글이 어느 게시판에 속한지를 나타냅니다. | NOT NULL |
> | private_mode | BOOLEAN | 익명 모드입니다.                            | NOT NULL |
> | image        | STRING  | 이미지의 주소입니다.                        | NOT NULL |
>
> #### res
>
> | 이름     | 타입        | 설명                                             |
> | -------- | ----------- | ------------------------------------------------ |
> | fullPost | ARRAY(Post) | Post를 업로드하고 해당 Post 정보를 return합니다. |
>
> ### POST /post/images
>
> 게시글을 업로드 하기 전 사진을 업로드하는데, S3에 업로드하고, 주소를 반환합니다.
>
> #### req.files
>
> | files | 타입        | 설명                                                       | 비고     |
> | ----- | ----------- | ---------------------------------------------------------- | -------- |
> | files | ARRAY(file) | 프론트엔드에서 업로드한 이미지를 가져와 S3에 업로드합니다. | NOT NULL |
>
> #### res
>
> | 타입          | 설명                                             |
> | ------------- | ------------------------------------------------ |
> | ARRAY(STRING) | 각각의 이미지들의 S3 업로드 주소를 반환해줍니다. |
>
> ### GET /post/:postId
>
> postId를 id로 하는 post를 가져옵니다.
>
> #### req.params
>
> | params | 타입    | 설명                                  | 비고     |
> | ------ | ------- | ------------------------------------- | -------- |
> | postId | INTEGER | PostId를 id로 하는 게시글을 찾습니다. | NOT NULL |
>
> #### res
>
> | 타입 | 설명                                    |
> | ---- | --------------------------------------- |
> | Post | PostId를 id로 하는 게시글을 반환합니다. |
>
> ### PATCH /post/:postId/scrap
>
> id가 postId인 게시글을 스크랩합니다.
>
> #### req.params
>
> | params | 타입    | 설명                                                           | 비고     |
> | ------ | ------- | -------------------------------------------------------------- | -------- |
> | postId | INTEGER | 게시글을 스크랩하기 위해 postId를 id로 하는 게시글을 찾습니다. | NOT NULL |
>
> #### res
>
> | 이름   | 타입    | 설명                               |
> | ------ | ------- | ---------------------------------- |
> | PostId | INTEGER | 스크랩된 게시글의 id를 반환합니다. |
> | UserId | INTEGER | 스크랩한 유저의 id를 반환합니다.   |
>
> ### DELETE /post/:postId/scrap
>
> id가 postId인 게시글에 대한 스크랩을 취소합니다.
>
> #### req.params
>
> | params | 타입    | 설명                                                            | 비고     |
> | ------ | ------- | --------------------------------------------------------------- | -------- |
> | postId | INTEGER | 게시글 스크랩 취소를 위해 postId를 id로 하는 게시글을 찾습니다. | NOT NULL |
>
> #### res
>
> | 이름   | 타입    | 설명                                      |
> | ------ | ------- | ----------------------------------------- |
> | PostId | INTEGER | 스크랩이 취소된 게시글의 id를 반환합니다. |
> | UserId | INTEGER | 스크랩 취소한 유저의 id를 반환합니다.     |
>
> ### POST /post/:postId/comment
>
> id가 postId인 게시글에 댓글을 추가합니다.
>
> #### req.params
>
> | params | 타입    | 설명                                            | 비고     |
> | ------ | ------- | ----------------------------------------------- | -------- |
> | postId | INTEGER | postId를 id로 하는 게시글을 찾기 위해 받습니다. | NOT NULL |
>
> #### req.body
>
> | body         | 타입                   | 설명                             | 비고     |
> | ------------ | ---------------------- | -------------------------------- | -------- |
> | content      | STRING                 | 댓글의 내용입니다.               | NOT NULL |
> | postId       | INTEGER                | 댓글이 달리는 게시글의 id입니다. | NULLABLE |
> | private_mode | 댓글의 익명모드입니다. | NOT NULL                         |
>
> #### req.user
>
> | user | 타입    | 설명                      | 비고     |
> | ---- | ------- | ------------------------- | -------- |
> | id   | INTEGER | 로그인한 유저의 id입니다. | NOT NULL |
>
> #### res
>
> | 이름        | 타입    | 설명                           |
> | ----------- | ------- | ------------------------------ |
> | fullComment | Comment | 작성한 댓글 정보를 반환합니다. |
>
> ### DELETE /post/:commentId/comment
>
> id가 commentId인 댓글을 삭제합니다.
>
> #### req.params
>
> | params    | 타입    | 설명                                                                         | 비고     |
> | --------- | ------- | ---------------------------------------------------------------------------- | -------- |
> | commentId | INTEGER | commentId를 id로 작성자의 id가 req.user.id로 하는 Comment를 찾아 삭제합니다. | NOT NULL |
>
> #### req.user
>
> | user | 타입    | 설명                                                                  | 비고     |
> | ---- | ------- | --------------------------------------------------------------------- | -------- |
> | id   | INTEGER | commentId를 id로, req.user.id를 작성자의 id로 하는 댓그을 삭제합니다. | NOT NULL |
>
> #### res
>
> | 이름      | 타입    | 설명                  |
> | --------- | ------- | --------------------- |
> | commentId | INTEGER | 지우려는 Comment의 Id |
>
> ### PATCH /post/:postId/report
>
> id를 postId로 가지는 게시글을 신고하며 해당 게시글의 신고횟수(report_count)가 1 이상이 되면 hidden_mode를 true로 바꿉니다.
>
> #### req.params
>
> | params | 타입    | 설명                                                                   | 비고     |
> | ------ | ------- | ---------------------------------------------------------------------- | -------- |
> | postId | INTEGER | postId를 id로 하는 post를 찾아 신고하고 report_count를 1만큼 더합니다. | NOT NULL |
>
> #### res
>
> | 이름        | 타입    | 설명                 |
> | ----------- | ------- | -------------------- |
> | PostId      | INTEGER | 게시글의 id          |
> | UserId      | INTEGER | 신고자의 id          |
> | hidden_mode | BOOLEAN | 게시글의 hidden_mode |
>
> ### PATCH /post/:postId/like
>
> id를 postId로 하는 게시글에 좋아요를 합니다.
>
> #### req.params
>
> | params | 타입    | 설명                     | 비고     |
> | ------ | ------- | ------------------------ | -------- |
> | postId | INTEGER | 좋아요할 게시글의 postId | NOT NULL |
>
> #### req.user
>
> | user | 타입                                      | 설명     | 비고 |
> | ---- | ----------------------------------------- | -------- | ---- |
> | id   | post의 Likers에 req.user.id를 추가합니다. | NOT NULL |
>
> #### res
>
> | 이름   | 타입    | 설명               |
> | ------ | ------- | ------------------ |
> | PostId | INTEGER | 좋아요된 게시글 id |
> | UserId | INTEGEr | 좋아요 한 유저 id  |
>
> ### DELETE /post/:postId/like
>
> id를 postId로 하는 게시글에 대한 좋아요를 취소합니다.
>
> #### req.params
>
> | params | 타입    | 설명                          | 비고     |
> | ------ | ------- | ----------------------------- | -------- |
> | postId | INTEGER | 좋아요 취소할 게시글의 postId | NOT NULL |
>
> #### req.user
>
> | user | 타입                                      | 설명     | 비고 |
> | ---- | ----------------------------------------- | -------- | ---- |
> | id   | post의 Likers에 req.user.id를 삭제합니다. | NOT NULL |
>
> #### res
>
> | 이름   | 타입    | 설명                    |
> | ------ | ------- | ----------------------- |
> | PostId | INTEGER | 좋아요 취소된 게시글 id |
> | UserId | INTEGER | 좋아요 취소한 유저 id   |
>
> ### PATCH /post/:postId
>
> id를 postId로 하는 게시글을 수정합니다.
>
> #### req.body
>
> | body    | 타입   | 설명                        | 비고     |
> | ------- | ------ | --------------------------- | -------- |
> | content | STRING | 게시글의 수정된 내용입니다. | NOT NULL |
>
> #### req.params
>
> | params | 타입    | 설명               | 비고     |
> | ------ | ------- | ------------------ | -------- |
> | postId | INTEGER | 수정되는 post의 id | NOT NULL |
>
> #### res
>
> | 이름    | 타입    | 설명                 |
> | ------- | ------- | -------------------- |
> | PostId  | INTEGER | 수정된 post의 id     |
> | content | STRING  | 수정된 게시글의 내용 |
>
> ### DELETE /post/:postId
>
> id를 postId로 하는 게시글을 삭제합니다.
>
> #### req.params
>
> | params | 타입    | 설명               | 비고     |
> | ------ | ------- | ------------------ | -------- |
> | postId | INTEGER | 삭제되는 post의 id | NOT NULL |
>
> #### req.user
>
> | user | 타입    | 설명                                            | 비고     |
> | ---- | ------- | ----------------------------------------------- | -------- |
> | id   | INTEGER | 게시글의 작성자가 로그인한 유저인지 확인합니다. | NOT NULL |
>
> #### res
>
> | 이름   | 타입    | 설명                   |
> | ------ | ------- | ---------------------- |
> | PostId | INTEGER | 삭제된 게시글의 PostId |
>
> ### posts.js
>
> #### 여러개의 게시글을 가져옵니다.
>
> ### GET /posts
>
> hidden_mode가 false이고 특정 게시판에 속한 lastId보다 id값이 작은 게시물들을 10개 가져옵니다.(최신순으로 post 가져오기)
>
> #### req.query
>
> | query    | 타입    | 설명                                                          | 비고     |
> | -------- | ------- | ------------------------------------------------------------- | -------- |
> | lasatId  | INTEGER | 프론트 엔드 상에서 나타나 있는 가장 마지막 게시글의 id입니다. | NULLABLE |
> | category | STRING  | 어떤 게시판의 글을 가져올 것인지 나타냅니다.                  | NOT NULL |
>
> #### res
>
> | 타입        | 설명                                             |
> | ----------- | ------------------------------------------------ |
> | ARRAY(POST) | 특정 게시판의 글을 최신순으로 10개를 반환합니다. |
>
> ### GET /posts/hot
>
> 좋아요 수가 3개 이상인 글을 가져옵니다.
>
> #### res
>
> | 이름  | 타입        | 설명                                                                          |
> | ----- | ----------- | ----------------------------------------------------------------------------- |
> | posts | ARRAY(POST) | 게시판에 상관없이 좋아요 수가 3개 이상인 게시글 10개를 최신순으로 반환합니다. |
>
> ### GET /posts/popular
>
> 좋아요 수가 3개 이상인 글을 가져옵니다.
>
> ### res
>
> | 이름  | 타입        | 설명                                                                         |
> | ----- | ----------- | ---------------------------------------------------------------------------- |
> | posts | ARRAY(POST) | 게시판에 상관없이 좋아요 수가 3개 이상인 게시글 3개를 최신순으로 반환합니다. |
>
> ### GET /posts/related
>
> 내가 팔로우한 유저들의 게시글을 가져옵니다.
>
> #### req.query
>
> | query  | 타입    | 설명                                                          | 비고     |
> | ------ | ------- | ------------------------------------------------------------- | -------- |
> | lastId | INTEGER | 프론트 엔드 상에서 나타나 있는 가장 마지막 게시글의 id입니다. | NULLABLE |
>
> #### req.user
>
> | user | 타입    | 설명                | 비고     |
> | ---- | ------- | ------------------- | -------- |
> | id   | INTEGER | 로그인 한 유저의 id | NOT NULL |
>
> #### res
>
> | 이름  | 타입        | 설명                                                       |
> | ----- | ----------- | ---------------------------------------------------------- |
> | posts | ARRAY(POST) | 내가 팔로우 한 유저의 게시글을 최신순으로 10개 가져옵니다. |
>
> ### user.js
>
> #### user정보와 관련된 정보를 처리합니다.
>
> ### GET /user
>
> 내 정보를 가져옵니다.
>
> #### req.user
>
> | user | 타입    | 설명                       | 비고     |
> | ---- | ------- | -------------------------- | -------- |
> | id   | INTEGER | 로그인 한 유저의 id입니다. | NOT NULL |
>
> #### res
>
> | 이름                    | 타입 | 설명                                             |
> | ----------------------- | ---- | ------------------------------------------------ |
> | fullUserWithoutPassword | USER | 내 정보에서 비밀번호를 제외한 정보를 가져옵니다. |
>
> ### PATCH /user/editVacation
>
> 나의 휴가정보를 수정합니다.
>
> #### req.body
>
> | body        | 타입    | 설명                                                      | 비고     |
> | ----------- | ------- | --------------------------------------------------------- | -------- |
> | category    | STRING  | 어떤 휴가를 받았는지를 나타냅니다.(포상휴가, 위로휴가 등) | NOT NULL |
> | reason      | STRING  | 휴가를 받은 사유입니다.                                   | NOT NULL |
> | num_of_days | INTEGER | 휴가 받은 일수입니다.                                     | NOT NULL |
>
> #### req.user
>
> | user | 타입    | 설명                | 비고     |
> | ---- | ------- | ------------------- | -------- |
> | id   | INTEGER | 로그인 한 유저의 id | NOT NULL |
>
> #### res
>
> | 이름                    | 타입 | 설명                                             |
> | ----------------------- | ---- | ------------------------------------------------ |
> | fullUserWithoutPassword | USER | 내 정보에서 비밀번호를 제외한 정보를 가져옵니다. |
>
> ### GET /user/comments
>
> 내가 댓글을 단 게시글을 가져옵니다.
>
> #### req.user
>
> | user | 타입    | 설명                | 비고     |
> | ---- | ------- | ------------------- | -------- |
> | id   | INTEGER | 로그인 한 유저의 id | NOT NULL |
>
> #### res
>
> | 이름        | 타입        | 설명                                     |
> | ----------- | ----------- | ---------------------------------------- |
> | my_comments | ARRAY(POST) | 내가 댓글을 단 게시글 정보를 가져옵니다. |
>
> ### GET /user/scrap
>
> 내가 스크랩한 게시글을 가져옵니다.
>
> #### req.user
>
> | user | 타입    | 설명                | 비고     |
> | ---- | ------- | ------------------- | -------- |
> | id   | INTEGER | 로그인 한 유저의 id | NOT NULL |
>
> #### res
>
> | 이름        | 타입        | 설명                          |
> | ----------- | ----------- | ----------------------------- |
> | my_scrapped | ARRAY(POST) | 스크랩한 게시글을 가져옵니다. |
>
> ### GET /user/followers
>
> 나의 팔로워들을 조회합니다.
>
> #### req.query
>
> | query | 타입    | 설명                                 | 비고     |
> | ----- | ------- | ------------------------------------ | -------- |
> | limit | INTEGER | 몇명의 팔로워들을 가져올지 정합니다. | NOT NULL |
>
> #### req.user
>
> | user | 타입    | 설명                      | 비고     |
> | ---- | ------- | ------------------------- | -------- |
> | id   | INTEGER | 로그인한 유저의 id입니다. | NOT NULL |
>
> #### res
>
> | 이름      | 타입        | 설명                   |
> | --------- | ----------- | ---------------------- |
> | followers | ARRAY(USER) | 팔로워들의 정보입니다. |
>
> ### GET /user/followings
>
> 나의 팔로잉 유저를 조회합니다.
>
> #### req.query
>
> | query | 타입    | 설명                                        | 비고     |
> | ----- | ------- | ------------------------------------------- | -------- |
> | limit | INTEGER | 몇명의 팔로잉한 유저들을 가져올지 정합니다. | NOT NULL |
>
> #### req.user
>
> | user | 타입    | 설명                      | 비고     |
> | ---- | ------- | ------------------------- | -------- |
> | id   | INTEGER | 로그인한 유저의 id입니다. | NOT NULL |
>
> #### res
>
> | 이름       | 타입        | 설명                          |
> | ---------- | ----------- | ----------------------------- |
> | followings | ARRAY(USER) | 팔로잉한 유저들의 정보입니다. |
>
> ### GET /user/:userId
>
> 특정 유저의 정보를 가져옵니다.
>
> #### req.params
>
> | params | 타입    | 설명                     | 비고 |
> | ------ | ------- | ------------------------ | ---- |
> | UserId | INTEGER | 유저의 id입니다.NOT NULL |
>
> #### res
>
> | 이름 | 타입 | 설명                    |
> | ---- | ---- | ----------------------- |
> | data | USER | 특정 유저의 정보입니다. |
>
> ### GET /user/me/posts
>
> 내가 업로드한 게시글을 가져옵니다.
>
> #### req.user
>
> | user | 타입    | 설명                      | 비고     |
> | ---- | ------- | ------------------------- | -------- |
> | id   | INTEGER | 로그인한 유저의 id입니다. | NOT NULL |
>
> #### res
>
> | 이름  | 타입        | 설명                      |
> | ----- | ----------- | ------------------------- |
> | posts | ARRAY(POST) | 나의 게시글을 가져옵니다. |
>
> ### GET /user/:userId/posts
>
> 특정 유저의 게시글을 가져옵니다.
>
> #### req.params
>
> | params | 타입    | 설명                     | 비고 |
> | ------ | ------- | ------------------------ | ---- |
> | UserId | INTEGER | 유저의 id입니다.NOT NULL |
>
> #### req.query
>
> | query  | 타입    | 설명                                                          | 비고     |
> | ------ | ------- | ------------------------------------------------------------- | -------- |
> | lastId | INTEGER | 프론트 엔드 상에서 나타나 있는 가장 마지막 게시글의 id입니다. | NULLABLE |
>
> #### res
>
> | 이름  | 타입        | 설명                             |
> | ----- | ----------- | -------------------------------- |
> | posts | ARRAY(POST) | 특정 유저의 게시글을 가져옵니다. |
>
> ### POST /user/login
>
> 로그인합니다.
>
> #### req.body
>
> | body     | 타입   | 설명                   | 비고     |
> | -------- | ------ | ---------------------- | -------- |
> | email    | STRING | 로그인 이메일입니다.   | NOT NULL |
> | password | STRING | 로그인 비밀번호입니다. | NOT NULL |
>
> #### res
>
> | 이름                    | 타입 | 설명                                             |
> | ----------------------- | ---- | ------------------------------------------------ |
> | fullUserWithoutPassword | USER | 내 정보에서 비밀번호를 제외한 정보를 가져옵니다. |
>
> ### PATCH /user/editDate
>
> 나의 입대일 또는 전역일을 수정합니다.
>
> #### req.body
>
> | body       | 타입 | 설명          | 비고     |
> | ---------- | ---- | ------------- | -------- |
> | start_date | DATE | 입대일입니다. | NOT NULL |
> | end_date   | DATE | 전역일입니다. | NOT NULL |
>
> #### req.user
>
> | user | 타입    | 설명                      | 비고     |
> | ---- | ------- | ------------------------- | -------- |
> | id   | INTEGER | 로그인한 유저의 id입니다. | NOT NULL |
>
> #### res
>
> | 이름                    | 타입 | 설명                                             |
> | ----------------------- | ---- | ------------------------------------------------ |
> | fullUserWithoutPassword | USER | 내 정보에서 비밀번호를 제외한 정보를 가져옵니다. |
>
> ### POST /user
>
> 회원가입합니다.
>
> #### req.body
>
> | body       | 타입   | 설명            | 비고     |
> | ---------- | ------ | --------------- | -------- |
> | email      | STRING | email입니다.    | NOT NULL |
> | nickname   | STRING | 닉네임입니다.   | NOT NULL |
> | password   | STRING | 비밀번호입니다. | NOT NULL |
> | start_date | DATE   | 입대일입니다.   | NOT NULL |
> | end_date   | DATE   | 전역일입니다.   | NOT NULL |
>
> #### res
>
> | 이름 | 타입   | 설명 |
> | ---- | ------ | ---- |
> | X    | STRING | 'ok' |
>
> ### POST /user/logout
>
> 로그아웃합니다.
>
> #### res
>
> | 이름 | 타입   | 설명 |
> | ---- | ------ | ---- |
> | X    | STRING | 'ok' |
>
> ### PATCH /user/nickname
>
> 나의 닉네임을 수정합니다.
>
> #### req.body
>
> | body     | 타입   | 설명          | 비고     |
> | -------- | ------ | ------------- | -------- |
> | nickname | STRING | 닉네임입니다. | NOT NULL |
>
> #### res
>
> | 이름     | 타입   | 설명                   |
> | -------- | ------ | ---------------------- |
> | nickname | STRING | nickname을 반환합니다. |
>
> ### PATCH /user/:userId/following
>
> 특정 유저를 팔로잉합니다.
>
> #### req.params
>
> | params | 타입    | 설명                    | 비고     |
> | ------ | ------- | ----------------------- | -------- |
> | userId | INTEGER | 팔로우 하려는 유저의 id | NOT NULL |
>
> #### res
>
> | 이름   | 타입    | 설명                |
> | ------ | ------- | ------------------- |
> | UserId | INTEGER | 팔로우 한 유저의 id |
>
> ### DELETE /user/:userId/following
>
> 특정 유저의 팔로잉을 취소합니다.
>
> #### req.params
>
> | params | 타입    | 설명                        | 비고 |
> | ------ | ------- | --------------------------- | ---- |
> | UserId | INTEGER | 팔로우 취소하려는 유저의 id |
>
> #### res
>
> | 이름   | 타입    | 설명                    |
> | ------ | ------- | ----------------------- |
> | UserId | INTEGER | 팔로우 취소한 유저의 id |

### 'passport'

> #### index.js
>
> ##### 이미 로그인 한 유저의 정보를 다룹니다.
>
> #### local.js
>
> ##### 로그인 할 때 입력된 정보가 맞는지 판단합니다.

### 'config'

> #### config.js
>
> #### db 관련 configuration을 나타냅니다.
