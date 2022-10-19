# osam_back

## 실행방법
##### npm install --force
##### npx sequelize db:create
##### npm run dev

## 미리 설치 및 설정해야할 것
### mysql 
### .env파일 
> #### COOKIEPARSER=원하는것(따옴표 없이)
> #### DB_PASSWORD=mysql_db_비밀번호(따옴표 없이)
> #### S3_ACCESS_KEY_ID=AWS_S3_KEYID(따옴표 없이)
> #### S3_SECRET_ACCESS_KEY=AWS_SECRET_KEY(따옴표 없이)
> S3 key는 AWS에서 엑셀 파일로 주는데 그거 다운 받고 복사 붙여넣기 하시면 됩니다.

## DB 모델
### User 
#### 사용자를 나타냅니다.
|이름|타입|설명|비고|
|----|---|----|----|
|id|INTEGER|사용자들을 구분해줍니다.|PRIMARY_KEY, AUTO_INCREMENT, NOT NULL|
|email|varchar(30)|사용자의 email입니다.|UNIQUE, NOT NULL|
|nickname|varchar(30)|사용자의 Military Story 활동명입니다.|NOT NULL|
|password|varchar(100)|사용자의 비밀번호입니다.(bcrypt 모듈로 암호화됩니다.)|NOT NULL|
|followers|INTEGER|팔로워 수입니다.|NOT NULL|
|annual|INTEGER|사용자의 연가 일수입니다.|NOT NULL|
|reward|INTEGER|사용자의 보상휴가 일수입니다.|NOT NULL|
|compensation|INTEGER|사용자의 포상휴가 일수입니다.|NOT NULL|
|consolation|INTEGER|사용자의 위로휴가 일수입니다.|NOT NULL|
|petition|INTEGER|사용자의 청원휴가 일수입니다.|NOT NULL|
|start_date|DATE|사용자의 입대일입니다.|NOT NULL|
|end_date|DATE|사용자의 전역일입니다.|NOT NULL|

### Post
#### 게시글을 나타냅니다.
|이름|타입|설명|비고|
|----|----|---|---|
|id|INTEGER|게시글들을 구분해줍니다.|PRIMARY_KEY, AUTO_INCREMENT, NOT NULL|
|content|TEXT|게시글의 내용입니다.(제목+내용+해시태그)|NOT NULL|
|category|TEXT|게시글이 속한 게시판입니다.|NOT NULL|
|private_mode|BOOLEAN|게시글의 익명 모드입니다.|NOT NULL|
|report_count|INTEGER|게시글이 신고당한 횟수입니다.|NOT NULL|
|hidden_mode|BOOLEAN|게시글의 은신 모드입니다.|NOT NULL|
|like_counts|INTEGER|게시글의 좋아요 수입니다.|NOT NULL|
|UserId(←User)|INTEGER|게시글 작성자의 ID입니다.|NULLABLE, FOREIGN_KEY|
### Comment
#### 댓글을 나타냅니다.
|이름|타입|설명|비고|
|---|----|----|----|
|id|INTEGER|댓글들을 구분해줍니다.|PRIMARY_KEY, AUTO_INCREMENT, NOT NULL|
|content|TEXT|댓글의 내용입니다.|NOT NULL|
|private_mode|BOOLEAN|댓글의 익명 모드입니다.|NOT NULL|
|anonymous|TEXT|댓글이 익명일 경우 댓글은 '익명'+anonymous로 됩니다.|NOT NULL|
|UserId(←User)|INTEGER|댓글 작성자의 ID입니다.|NULLABLE, FOREIGN_KEY|
|PostId(←Post)|INTEGER|댓글이 속한 게시글의 ID입니다.|NULLABLE, FOREIGN_KEY|
### Hashtag
#### 해시태그를 나타냅니다.
|이름|타입|설명|비고|
|---|----|----|----|
|id|INTEGER|해시태그들을 구분해줍니다.|PRIMARY_KEY, AUTO_INCREMENT, NOT NULL|
|name|varchar(20)|해시태그입니다.|NOT NULL|
### Userid
#### 게시글에 익명 댓글을 작성한 사용자들의 id를 나타냅니다, Post에 1대n 관계로 사용자들의 id가 배열 형태로 저장될 수 있도록 했습니다.
|이름|타입|설명|비고|
|----|----|---|---|
|id|INTEGER|Userid들을 구분해줍니다.|PRIMARY_KEY, AUTO_INCREMENT, NOT NULL|
|my_id|INTEGER|게시글에 익명댓글을 작성한 사용자의 id입니다.|NOT NULL|
|PostId(←Post)|INTEGER|Userid가 속한 게시글의 ID입니다.|NULLABLE, FOREIGN_KEY|
### Record
#### 사용자의 휴가기록을 나타냅니다.
|이름|타입|설명|비고|
|---|----|----|----|
|id|INTEGER|Record들을 구분해주는 id입니다.|PRIMARY_KEY, AUTO_INCREMENT, NOT NULL|
|category|INTEGER|포상휴가, 위로휴가 같이 휴가의 종류를 나타냅니다.|NOT NULL|
|reason|varchar(300)|휴가의 사유를 적습니다.|NOT NULL|
|num_of_days|INTEGER|휴가 일수를 적습니다.|NOT NULL|
|UserId(←User)|INTEGER|휴가 기록의 사용자의 ID를 나타냅니다.|NULLABLE, FOREIGN_KEY|
### Image
#### 게시글의 이미지를 나타냅니다.
|이름|타입|설명|비고|
|---|----|----|---|
|id|INTEGER|Image들을 구분해줍니다.|PRIMARY_KEY, AUTO_INCREMENT, NOT NULL|
|src|varchar(200)|Image의 주소를 나타냅니다.|NOT NULL|
|PostId(←Post)|INTEGER|이미지가 속한 게시글의 ID를 나타냅니다.|NOT NULL|

### Follow
#### User간의 following, follower 관계를 나타냅니다.
|이름|타입|설명|비고|
|---|----|----|---|
|FollowingId|INTEGER|팔로잉 된 사용자의 Id|NOT NULL, FOREIGN_KEY|
|FollwerId|INTEGER|팔로잉 한 사용자의 Id |NOT NULL, FOREIGN_KEY| 

### Like
#### User와 Post간의 Liked, Liker 관계를 나타냅니다.
|이름|타입|설명|비고|
|---|----|----|---|
|PostId|INTEGER|좋아요 된 게시글의 Id.|NOT NULL, FOREIGN_KEY|
|UserId|INTEGER|좋아요 한 사용자의 Id.|NOT NULL, FOREIGN+KEY|

### Scrap
#### User와 Post간의 Scrapper Scrapped 관계를 나타냅니다.
|이름|타입|설명|비고|
|---|----|----|---|
|PostId|INTEGER|스크랩 된 게시글의 Id.|NOT NULL, FOREIGN_KEY|
|UserId|INTEGER|스크랩한 사용자의 Id.|NOT NULL, FOREIGN_KEY|

### PostHashtag
#### Post와 Hashtag간의 관계를 나타냅니다.
|이름|타입|설명|비고|
|---|----|----|---|
|HashtagId|INTEGER|게시글에 속한 해시태그의 Id.|NOT NULL, FOREIGN_KEY|
|PostId|INTEGER|해시태그에 속한 게시글의 Id.|NOT NULL, FOREIGN_KEY|


## 코드 설명
### '/'
#### app.js
> ##### backend server의 기본적인 설정을 하고, routes를 합쳐 서비스를 제공
### 'routes'
> #### hashtag.js
> ### GET /hashtag/:hashtag
> 해시태그와 관련된 게시글을 모두 가져옵니다.
> #### req.query
> |query|타입|설명|비고|
> |-----|----|---|----|
> |lastId|INTEGER|Military Story 사이트에서 화면에 보이는 게시글 중에 가장 밑에 있는 게시글의 Id를 넘겨받습니다.(Post Id가 클수록 최신 글이라는 것을 이용해 최신순 나열을 구현했습니다.)|NULLABLE|
> |hashtag|STRING|해시태그와 관련된 글을 받기 위해 해시태그를 넘겨받습니다.|NOT NULL|
> 
> #### res
> |이름|타입|설명|
> |---|----|----|
> |posts|Array(post))|Post(model)의 배열 형태입니다.|
> 
> #### middlewares.js
> 로그인했는지 안 했는지 체크해줍니다.
> ### post.js
> 하나의 게시글과 관련된 처리를 합니다. (좋아요 누르기, 댓글 달기 등)
> ### POST /post
> 게시글을 업로드합니다.
> #### req.body
> |body|타입|설명|비고|
> |-----|---|----|----|
> |content|STRING|게시글의 내용입니다.(제목+내용+해시태그)|NOT NULL|
> |category|STRING|게시글이 어느 게시판에 속한지를 나타냅니다.|NOT NULL|
> |private_mode|BOOLEAN|익명 모드입니다.|NOT NULL|
> |image|STRING|이미지의 주소입니다.|NOT NULL|
> #### res
> |타입|설명|
> |---|---|
> |Post|Post를 업로드하고 Post정보를 return합니다.|X|
> 
> ### POST /post/images
> 게시글을 업로드 하기 전 사진을 업로드하는데, S3에 업로드하고, 주소를 반환합니다.
> #### req.files
> |files|타입|설명|비고|
> |----|---|----|----|
> |files|ARRAY(file)|프론트엔드에서 업로드한 이미지를 가져와 S3에 업로드합니다.|NOT NULL|
> #### res
> |타입|설명|
> |---|----|
> |ARRAY(STRING)|각각의 이미지들의 S3 업로드 주소를 반환해줍니다.|
> 
> ### GET /post/:postId
> postId를 id로 하는 post를 가져옵니다.
> #### req.params
> |params|타입|설명|비고|
> |-----|----|----|----|
> |postId|INTEGER|PostId를 id로 하는 게시글을 찾습니다.|NOT NULL|
> #### res
> |타입|설명|
> |---|----|
> |Post|PostId를 id로 하는 게시글을 반환합니다.|
> ### PATCH /post/:postId/scrap
> id가 postId인 게시글을 스크랩합니다.
> #### req.params
> |params|타입|설명|비고|
> |------|----|---|----|
> |postId|INTEGER|게시글을 스크랩하기 위해 postId를 id로 하는 게시글을 찾습니다.|NOT NULL|
> #### res
> |이름|타입|설명|
> |----|---|----|
> |PostId|INTEGER|스크랩된 게시글의 id를 반환합니다.|
> |UserId|INTEGER|스크랩한 사용자의 id를 반환합니다.|
> ### DELETE /post/:postId/scrap
> id가 postId인 게시글에 대한 스크랩을 취소합니다.
> #### req.params
> |params|타입|설명|비고|
> |------|----|----|---|
> |postId|INTEGER|게시글 스크랩 취소를 위해 postId를 id로 하는 게시글을 찾습니다.|NOT NULL|
> #### res
> |이름|타입|설명|
> |----|---|----|
> |PostId|INTEGER|스크랩이 취소된 게시글의 id를 반환합니다.|
> |UserId|INTEGER|스크랩 취소한 사용자의 id를 반환합니다.|
> ### POST /post/:postId/comment
> id가 postId인 게시글에 댓글을 추가합니다.
> #### req.params
> |params|타입|설명|비고|
> |------|---|---|-----|
> |postId|INTEGER|postId를 id로 하는 게시글을 찾기 위해 받습니다.|NOT NULL|
> #### req.body
> |body|타입|설명|비고|
> |----|----|---|----|
> |content|STRING|댓글의 내용입니다.|NOT NULL|
> |postId|INTEGER|댓글이 달리는 게시글의 id입니다.|NULLABLE|
> |private_mode|댓글의 익명모드입니다.|NOT NULL|
> #### req.user
> |user|타입|설명|비고|
> |----|---|----|----|
> |id|INTEGER|로그인한 사용자의 id입니다.|NOT NULL|
> #### res
> |타입|설명|
> |---|----|
> |Comment|작성한 댓글 정보를 반환합니다.|
> ### DELETE /post/:commentId/comment
> id가 commentId인 댓글을 삭제합니다.
> #### req.params
> |params|타입|설명|비고|
> |------|----|---|----|
> |commentId|INTEGER|commentId를 id로 작성자의 id가 req.user.id로 하는 Comment를 찾아 삭제합니다.|NOT NULL|
> #### req.user
> |user|타입|설명|비고|
> |----|---|----|----|
> |id|INTEGER|commentId를 id로, req.user.id를 작성자의 id로 하는 댓그을 삭제합니다.|NOT NULL|
> ### PATCH /post/:postId/report
> id를 postId로 가지는 게시글을 신고하며 해당 게시글의 신고횟수(report_count)가 1 이상이 되면 hidden_mode를 true로 바꿉니다.
> #### req.params
> |params|타입|설명|비고|
> |------|---|----|----|
> |postId|INTEGER|postId를 id로 하는 post를 찾아 신고하고 report_count를 1만큼 더합니다.|NOT NULL|
> #### res
> |타입|설명|
> |---|----|
> |PostId|게시글의 id|
> |UserId|신고자의 id|
> |hidden_mode|게시글의 hidden_mode|
> 
> ### PATCH /post/:postId/like
> id를 postId로 하는 게시글에 좋아요를 합니다.
> #### req.params
> |params|타입|설명|비고|
> |------|---|----|----|
> |postId|INTEGER|좋아요할 게시글의 postId|NOT NULL|
> 
> #### req.user
> |user|타입|설명|비고|
> |----|----|----|---|
> |id|post의 Likers에 req.user.id를 추가합니다.|NOT NULL|
> #### res
> |타입|설명|
> |---|----|
> |PostId|좋아요된 게시글 id|
> |UserId|좋아요 한 사용자 id|
> ### DELETE /post/:postId/like
> id를 postId로 하는 게시글에 대한 좋아요를 취소합니다.
> #### req.params
> |params|타입|설명|비고|
> |------|---|----|----|
> |postId|INTEGER|좋아요 취소할 게시글의 postId|NOT NULL|
> 
> #### req.user
> |user|타입|설명|비고|
> |----|----|----|---|
> |id|post의 Likers에 req.user.id를 삭제합니다.|NOT NULL|
> #### res
> |타입|설명|
> |---|----|
> |PostId|좋아요 취소된 게시글 id|
> |UserId|좋아요 취소한 사용자 id|
> ### PATCH /post/:postId
> id를 postId로 하는 게시글을 수정합니다.
> #### req.body
> |body|타입|설명|비고|
> |----|---|----|----|
> |content|STRING|게시글의 수정된 내용입니다.|NOT NULL|
> #### req.params
> |params|타입|설명|비고|
> |------|----|---|----|
> |postId|INTEGER|수정되는 post의 id|NOT NULL|
> #### res
> |이름|타입|설명|
> |PostId|INTEGER|수정된 post의 id|
> |content|STRING|수정된 게시글의 내용|
> ### DELETE /post/:postId
> id를 postId로 하는 게시글을 삭제합니다.
> #### req.params
> |params|타입|설명|비고|
> |postId|INTEGER|삭제되는 post의 id|NOT NULL|
> #### req.user
> |user|타입|설명|비고|
> |id|INTEGER|게시글의 작성자가 로그인한 유저인지 확인합니다.|NOT NULL|
> #### res
> |이름|타입|설명|
> |PostId|INTEGER|삭제된 게시글의 PostId|
> 
> ### posts.js
> #### 여러개의 게시글을 가져옵니다.
> ### GET /posts
> hidden_mode가 false이고 특정 게시판에 속한 lastId보다 id값이 작은 게시물들을 10개 가져옵니다.
> 
> ### GET /posts/hot
> ### GET /posts/popular
> ### GET /posts/related
> ### user.js
> #### user정보와 관련된 정보를 처리합니다.
> ### GET /user
> ### PATCH /user/editVacation
> ### GET /user/comments
> ### GET /user/scrap
> ### GET /user/followers
> ### GET /user/followings
> ### GET /user/:userId
> ### GET /user/me/posts
> ### GET /user/:userId/posts
> ### POST /user/login
> ### PATCH /user/editDate
> ### POST /user
> ### PATCH /user/nickname
> ### PATCH /user/:userId/following
> ### DELETE /user/:userId/following
> ### DELETE /user/follower/:userId
### 'passport'
> #### index.js
> ##### 이미 로그인 한 유저의 정보를 다룹니다.
> #### local.js
> ##### 로그인 할 때 입력된 정보가 맞는지 판단합니다.
### 'config'
> #### config.js
> #### db 관련 configuration을 나타냅니다.

## api 문서
