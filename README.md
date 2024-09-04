### 기간: 2024.07.19 ~ 2024.08.16

### 개발자: 최진우, 강태욱, 박상철

### 본인 역할
- **메인페이지**
    - 페이지 레이아웃 구성
    - 글작성, 검색, 카테고리
- **상세페이지**
    - 글 수정, 삭제
    - 댓글 작성, 수정, 삭제
    - 좋아요

---
- [개요](#개요)
- [주요 페이지](#주요-페이지)
    - [메인 페이지](#메인페이지)
    - [상세 페이지](#상세페이지)
    - [로그인/회원가입](#로그인/회원가입)
- [담당 작업](#담당-작업)
    - [게시판 CRUD](#게시판-CRUD)
    - [댓글 CRUD](#게시판-CRUD)
    - [좋아요](#좋아요)
    - [게시물 검색](#게시물-검색)
- [이슈사항](#이슈사항)
- [기타](#기타)
---

### 개요
- KITA는 해외 커뮤니티 사이트 <a href="https://www.reddit.com/">Reddit</a>을 참고하여 만든 사이트로 기본적인 커뮤니티 기능을 가진 사이트입니다.

### 주요 페이지

- 메인페이지
    - 헤더를 제외하고 처음 들어갔을 때 보이는 메인 영역과 각각의 카테고리별 페이지를 구분하였습니다.
    - 각각의 카테고리에서는 기본적인 CRUD 기능이 제공되며 상단 검색바를 통해 게시물을 제목 또는 본문 내용으로 검색할 수 있습니다.
  

![KITA1](https://github.com/user-attachments/assets/9e4b6d50-bb59-4c14-89a2-9b9fdd80c7f7)


- 상세페이지
    - 상세페이지에서는 게시물 수정 삭제가 가능하며, 좋아요 및 댓글 작성이 가능합니다.


![KITA2](https://github.com/user-attachments/assets/f203111e-bdec-424b-a1d8-cabf6c5955b9)



- 로그인/회원가입
    - 로그인 회원가입 페이지에서는 회원가입이 가능하며, 동일한 아이디 및 닉네임으로는 회원 가입을 못하게 하였으며 정규식을 통하여 비밀번호 규칙과 같은 간단한 규칙들을 포함하였습니다.


![KITA3](https://github.com/user-attachments/assets/1b68500c-91d8-402c-bc73-0c8ef0aef4a4)

![KITA4](https://github.com/user-attachments/assets/a92ebf47-7731-47b4-8d2e-559db17c5c46)


### 담당 작업
- 게시물/댓글 CRUD
    - 로그인 시 게시물/댓글 작성이 가능하며 본인이 쓴 글에 한하여 수정, 삭제가 가능하게 하였습니다.

![KITA5](https://github.com/user-attachments/assets/afc430fe-40d9-4461-a95c-d3c7994c07da)


- 좋아요

![KITA6](https://github.com/user-attachments/assets/8d3eb5fe-e3c0-4335-9318-3fd7c4e19128)


- 게시물 검색
    - 검색 기능을 통하여 제목 또는 본문에 해당하는 게시물을 검색할 수 있게 하였으며 검색된 부분은 하이라이터 처리를 하여 알아보기 쉽게 하였습니다.


![KITA7](https://github.com/user-attachments/assets/efc6aa58-1874-4376-8ac9-97e3b4da1549)


### 이슈 사항
- 데이터베이스 중 유저 DB를 저장하는 테이블 생성시 오류 발생으로 시퀄라이즈를 통한 생성이 아닌 SQL 구문을 사용하여 유저 테이블을 생성하였습니다.


### 기타
- 기술 스택
    - Languege : JavaScript, TypeScript
    - Frontend : HTML, CSS
    - Backend : NestJS
    - Database : MySQL

- 발표 PPT
