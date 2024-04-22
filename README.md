# 介紹
  - 此專案是英文家教平台，提供學生和老師的媒介網站
  - 登入後可以預約課程,在課程完成後可以評分及評論
  - 如果想要開課程，可以進一步申請成為老師
# API Design
[後端伺服器](http://platform-backend-dev.ap-northeast-1.elasticbeanstalk.com/) </br>

|method |path | function|
|----|---|---|
|POST| /signup| register a new user|
|POST| /signin| login user take token|
|GET| /users?parameter| take data about user|
|PUT| /users/beTeacher| apply a teacher
|PUT| /course/:courseId/reverse| reverse a course
|PUT| /review/:reviewId | update a review

## test data

1. email: user1@example.com , password: 12345678
2. email: user2@eample.com, password: 12345678

# 實現的想法
 1. 用ATDD的概念去寫code
 2. 根據需求嘗試排程套件還有相關sequelize hook 
 3. 和前端協作
  