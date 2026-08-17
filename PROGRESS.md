# 2026 광주비엔날레 코가네쵸 파빌리온 홈페이지 개발 진행 기록 (Handover Document)

**최종 업데이트 일시**: 2026년 8월 3일  
**프로젝트 위치**: `/Users/kamc_han/desktop/prpage`  
**개발 방식**: Pure Static Web System (Vanilla HTML, CSS, JavaScript — 빌드 도구/Node.js 실행 의존성 없음)

---

## 1. 프로젝트 개요 및 핵심 요구사항

- **목적**: 2026 광주비엔날레 코가네쵸 파빌리온 (Part 1 아티스트 전시 & Part 2 아카이브 전시) 공식 홍보 웹사이트 1차 구축.
- **디자인 미학 (Design System)**:
  - **다크 차콜 갤러리 테마**: `#0A0B0E` 배후 배경, `#12141A` 카드 및 표면.
  - **초록 와이어프레임 기하학 라인 시스템**: 제안서 PPT의 네온 그린 와이어프레임 박스 모티브 (`#10B981`, `#059669`).
  - **초대형 순백색 타이틀**: `#FFFFFF`, `font-weight: 900`, `text-stroke: 1.5px`, 중앙 정렬.
  - **이모지 완전 배제**: AI 모델 특유의 아마추어적 이미지를 제거하고, 샤프한 모노스페이스 대문자 라벨 (`VENUE:`, `DATE:`, `[—]`)으로 미술관 정체성 확보.
- **다국어 체계**: 한국어 및 영어 동등 위계 지원 (`js/main.js` 및 `localStorage` 연동).

---

## 2. 구축된 파일 구조 및 페이지 역할

```
/Users/kamc_han/desktop/prpage/
├── index.html            # 메인 파빌리온 개요, Part 1/2 듀얼 진입 배너, 개요 상자, 메타데이터 행
├── part1.html            # Part 1 아티스트전 (전일빌딩245) 및 13인 작가 프로필 카드 목록
├── part2.html            # Part 2 아카이브전 (광주 동구 인문학당) 및 10개 기관 연대 카드 목록
├── artists.html          # 13인 참여 아티스트 디렉토리 (검색 및 국적 필터)
├── institutions.html     # 10개 참여 기관 디렉토리 (검색 및 지역 필터)
├── css/
│   └── style.css         # 디자인 시스템 (CSS 변수, 듀얼 배너, 풀스크린 오버레이 메뉴, 모달)
├── js/
│   ├── data.js           # 13인 작가 및 10개 기관 한/영 구조화 데이터 셋
│   └── main.js           # 언어 전환, 풀스크린 내비게이션 오버레이, ESC 키 닫기, 모달 로직
├── images/
│   ├── artists/          # 실자료 추출 작가 프로필/작품 이미지 (shinobu.jpg, bui_bao_tram.jpg 등)
│   └── institutions/     # 실자료 추출 기관 및 전시장 이미지 (koganecho.jpg, donggu.jpg 등)
├── docs/                 # 기획 스펙 및 디자인 가이드라인 문서 저장소
└── PROGRESS.md           # [현재 문서] 지금까지의 작업 기록 및 핸드오버 가이드
```

---

## 3. 세부 페이지별 구성 현황

### ① `index.html` (메인 파빌리온 홈)
1. **Header & Overlay Trigger**:
   - `Gwangju Biennale Pavilion 2026` 브랜딩
   - `EN / 한국어` 언어 토글 버튼
   - `☰ MENU` 풀스크린 내비게이션 토글 버튼
2. **Hero Mega Title**:
   - `Koganecho Pavilion` (영문)
   - `코가네쵸 파빌리온` (한글)
   - `font-size: clamp(4rem, 9vw, 7.2rem)`, `font-weight: 900`, `text-stroke: 1.5px #FFFFFF`, 중앙 정렬, 넉넉한 상하 문장 간격(`line-height: 1.25`, `margin-top: 1.75rem`).
3. **Dual Entrance Banners**:
   - **Part 1 배너**: 전일빌딩245 시민갤러리 (`VENUE: 전일빌딩245 시민갤러리 (13 Artists)`)
   - **Part 2 배너**: 광주 동구 인문학당 (`VENUE: 광주 동구 인문학당 (10 Institutions)`)
4. **Pavilion Overview Box**:
   - 배너 밑에 위치한 초록 와이어프레임 한/영 개요 상자 (`[KR] / [EN]`).
5. **Metadata Row**:
   - `EXHIBITION PERIOD`: 2026년 9월 5일 – 11월 15일
   - `VENUES`: 전일빌딩245 시민갤러리 & 동구 인문학당
   - `NETWORK ALLIANCE`: 5 Countries • 10 Institutions • 13 Artists

### ② `part1.html` (Part 1 아티스트 전시)
- 파란색 리치 그라데이션 커버 배너
- 전시 기획 의도 및 모노스페이스 하이라이트 (`[—]`)
- `data.js` 연동 13인 작가 프로필/작품 썸네일 카드 및 팝업 모달

### ③ `part2.html` (Part 2 아카이브 전시)
- 에메랄드 그린 그라데이션 커버 배너
- 20년 레지던시 아카이빙 기획 의도 및 하이라이트 (`[—]`)
- `data.js` 연동 10개 기관 연대 카드 및 팝업 모달

### ④ `artists.html` (참여 아티스트 디렉토리)
- 13인 작가 전체 디렉토리
- 국적별 필터 (All / Japan / Korea / Taiwan / Vietnam / China)
- 작가명 및 매체 실시간 검색창

### ⑤ `institutions.html` (참여 기관 디렉토리)
- 10개 참여 기관 및 대안공간 네트워크 디렉토리
- 국가/지역별 필터 및 실시간 검색창

---

## 4. 디자인 및 사용자 경험(UX) 개선 히스토리

1. **와이어프레임 탈피 & 갤러리 미학 적용**:
   - `doc/002 기관별 자료` 및 `doc/003 아티스트 자료`에서 실제 고화질 프로필/기관 이미지를 추출하여 `images/`에 배치하고 카드 및 모달에 연동.
2. **이모지 아이콘 전면 제거**:
   - 유치한 AI 생성물 느낌을 주는 이모지 (`🌐`, `📍`, `🗓`, `👥`, `✨`, `✓`)를 전부 삭제하고 샤프한 모노스페이스 폰트 라벨(`VENUE:`, `DATE:`, `[—]`)로 단정하게 정리.
3. **풀스크린 내비게이션 오버레이 도입**:
   - `☰ MENU` 아이콘 클릭 시 화면 전체가 갤러리 다크 오버레이 패널로 전환되며, `ESC` 키로도 닫힘.
4. **타이포그래피 및 레이아웃 피드백 반영**:
   - 메인 대형 타이틀 중앙 정렬 및 Ultra Bold (900 + 텍스트 스트로크) 스케일 상향.
   - 영문/한글 문장 간 위아래 간격 띄움.
   - 파빌리온 개요 상자를 배너 아래로 배치.

---

## 5. 다음 작업자를 위한 가이드라인 (Next Steps)

1. **로컬 실행 및 점검**:
   - 별도 npm 또는 Node 서버 없이 `index.html` 파일을 브라우저로 직접 열어 탐색 가능.
2. **GitHub 저장소 연결 및 배포**:
   - 준비 완료 시 `git init` ➔ `git add .` ➔ `git commit -m "feat: complete pure static website for Koganecho Pavilion 2026"` ➔ GitHub Pages 연동.
3. **향후 2차 확장 시 고려사항**:
   - 작가별/기관별 전용 세부 정적 페이지 (`artist-detail.html?id=...` 또는 독립 HTML) 추가 가능.
   - 전시 도록 PDF 다운로드 및 아카이브 영상 이엔베드 플레이어 연동.
