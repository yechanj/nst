# NST 모바일 웹 교재 — 제작 규칙

이 파일은 새 강의를 추가할 때마다 참고하는 규칙서입니다.
모든 강의는 이 규칙을 따라 일관된 스타일과 구조를 유지합니다.

---

## 1. 파일 구조 및 명명 규칙

```
NST/
├── index.html                  ← Hub (강의 목록) — 수정 필요 없음
├── RULES.md                    ← 이 파일
├── assets/
│   ├── css/styles.css          ← 공통 CSS — 새 강의에서 수정 금지
│   ├── js/main.js              ← 공통 JS — 새 강의에서 수정 금지
│   └── data/lessons.js         ← 강의 메타데이터 — 새 강의 추가 시 여기에만 1줄 등록
└── lessons/
    ├── lesson-01.html
    ├── lesson-02.html          ← 파일명: lesson-NN.html (두 자리 숫자)
    └── ...
```

**폰트 경로**: `../../ASP/assets/fonts/` (SCDream5.otf, SCDream6.otf, omyu pretty.ttf)
- styles.css에 이미 선언되어 있음. 강의 파일에서 별도 선언 불필요.

---

## 2. 새 강의 HTML 기본 골격

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>N강 · [강의 제목]</title>
  <link rel="stylesheet" href="../assets/css/styles.css" />
</head>
<body>
  <!-- 모바일 상단바 -->
  <div class="topbar">
    <button class="hamburger" aria-label="목차 열기" aria-expanded="false"><span></span></button>
    <div class="topbar__title">N강 · [짧은 제목]</div>
  </div>
  <div class="scrim" aria-hidden="true"></div>

  <div class="app">
    <aside class="sidebar" aria-label="강의 목차">
      <div class="sidebar__brand">
        <div class="sidebar__logo">NST</div>
        <div class="sidebar__title">NST 영양지원
          <small>N강 · [짧은 제목]</small>
        </div>
      </div>
      <nav>
        <ul class="toc">
          <li><a href="#section-id"><span class="num">1</span> 섹션 제목</a></li>
          <!-- ... -->
        </ul>
      </nav>
      <a class="sidebar__back" href="../index.html">← 강의 목록으로</a>
    </aside>

    <div class="content">
      <div class="wrap">
        <header class="lesson-hero">
          <div class="kicker">NST 영양지원 · N강</div>
          <h1>[강의 제목]</h1>
          <p>[한 줄 설명]</p>
        </header>

        <!-- 섹션들 -->
        <section id="section-id" class="section">
          <h2><span class="sec-no">01</span> 섹션 제목</h2>
          <!-- 내용 -->
        </section>

        <!-- QUIZ PLACEHOLDER -->
        <!-- <section id="quiz" class="section">추후 추가</section> -->

      </div>
    </div>
  </div>

  <!-- 하단 내비게이션 -->
  <nav class="bottom-nav">
    <button class="bn-btn" data-open-toc>☰ 목차</button>
    <a class="bn-btn" href="lesson-NN.html">← 이전</a>
    <a class="bn-btn" href="lesson-NN.html">다음 →</a>
  </nav>

  <script src="../assets/js/main.js"></script>
</body>
</html>
```

---

## 3. 섹션 구조 규칙

- `<section id="slug" class="section">` — id는 영문 소문자, 하이픈 사용
- `<h2><span class="sec-no">NN</span> 제목</h2>` — 두 자리 번호 필수
- `<h3>`, `<h4>` — 섹션 내 소제목에 사용 (sec-no 없음)
- 섹션 번호는 강의 내 순서대로, TOC와 일치해야 함
- `scroll-margin-top: 76px` — CSS에 이미 설정됨 (topbar 높이 보정)

---

## 4. 카드 타입 5종

| 클래스 | 색상 | 용도 |
|--------|------|------|
| `card--key` | 파랑 (#2f6fed) | 핵심 개념, KEY POINT, 중요 원칙 |
| `card--pharm` | 청록 (#0f9d8e) | 약사 관점, Pharmacist View, 약물 관련 |
| `card--nst` | 보라 (#7c5cf0) | NST 원칙, ASPEN 근거, 팀 관련 |
| `card--case` | 주황 (#e0872a) | 임상 증례, 환자 사례, 예시 |
| `card--caution` | 빨강 (#e5484d) | 경고, 흔한 실수, ⚠️ 주의사항 |

```html
<div class="card card--key">
  <div class="card__label"><span class="dot"></span>KEY POINT</div>
  <p>내용</p>
</div>

<div class="card card--pharm">
  <div class="card__label"><span class="dot"></span>PHARMACIST VIEW</div>
  <p>내용</p>
</div>

<div class="card card--nst">
  <div class="card__label"><span class="dot"></span>NST 원칙</div>
  <p>내용</p>
</div>

<div class="card card--case">
  <div class="card__label"><span class="dot"></span>CASE</div>
  <p>내용</p>
</div>

<div class="card card--caution">
  <div class="card__label"><span class="dot"></span>⚠️ 주의</div>
  <p>내용</p>
</div>
```

---

## 5. NST 색상 토큰

CSS custom property로 정의됨. 강의 내용에서 `style="color: var(--nst-energy)"` 형태로 활용 가능.

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--nst-energy` | `#e0872a` | 에너지, kcal, 열량 |
| `--nst-energy-soft` | `#fef3e2` | 에너지 배경 |
| `--nst-protein` | `#0f9d8e` | 단백질, 아미노산 |
| `--nst-protein-soft` | `#dcf5f1` | 단백질 배경 |
| `--nst-fluid` | `#2f6fed` | 수액, fluid |
| `--nst-fluid-soft` | `#e6efff` | 수액 배경 |
| `--nst-elec` | `#8b5cf6` | 전해질 (K, Mg, P, Na) |
| `--nst-elec-soft` | `#efe8fe` | 전해질 배경 |
| `--nst-alert` | `#e5484d` | 경고, 위험, 이상 수치 |
| `--nst-alert-soft` | `#fce8e9` | 경고 배경 |

---

## 6. 인터랙션 컴포넌트 패턴

### 6-1. Reveal (생각 후 펼치기)

```html
<button class="reveal-btn" data-target="answer-id">생각한 뒤 펼치기 ▾</button>
<div class="reveal-panel" id="answer-id" hidden>
  <p>정답/해설 내용</p>
</div>
```

- JS가 자동으로 `hidden` toggling
- 버튼 텍스트: "생각한 뒤 펼치기 ▾" (닫을 땐 "접기 ▴")

### 6-2. Accordion

```html
<div class="accordion">
  <button class="accordion__btn">제목 <span class="accordion__ico">▾</span></button>
  <div class="accordion__body" hidden>
    <p>내용</p>
  </div>
</div>
```

### 6-3. Flowchart (세로 step)

```html
<div class="flow">
  <div class="flow-step">
    <div class="flow-step__no">①</div>
    <div class="flow-step__body"><strong>단계 제목</strong><br>설명</div>
  </div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step">...</div>
</div>
```

### 6-4. Goal Bar (목표 vs 실제)

```html
<div class="goal-bars">
  <div class="goal-bar-row">
    <span class="goal-bar-label">목표</span>
    <div class="goal-bar"><div class="goal-bar__fill goal-bar__fill--target" style="--pct:100%"></div></div>
    <span class="goal-bar-value">1,500 kcal</span>
  </div>
  <div class="goal-bar-row">
    <span class="goal-bar-label">실제</span>
    <div class="goal-bar"><div class="goal-bar__fill goal-bar__fill--actual" style="--pct:67%"></div></div>
    <span class="goal-bar-value">1,000 kcal (67%)</span>
  </div>
</div>
```

### 6-5. Checklist (localStorage 저장)

```html
<div class="checklist" data-key="nst_checklist_lessonNN">
  <div class="checklist__group">
    <div class="checklist__title">PATIENT</div>
    <label class="check-item"><input type="checkbox" data-id="height"> height</label>
    <label class="check-item"><input type="checkbox" data-id="weight"> weight</label>
  </div>
</div>
```

- localStorage key: `nst_checklist_lessonNN`
- JS가 자동으로 상태 저장/복원

### 6-6. Locked Feature

```html
<div class="locked-card">
  <div class="locked-card__title">Energy Calculator</div>
  <div class="locked-card__badge">🔒 3강에서 해제</div>
</div>
```

### 6-7. Patient Card (환자 정보 표시)

```html
<div class="patient-card">
  <div class="patient-card__header">
    <span class="patient-card__icon">👨‍🦳</span>
    <div>
      <div class="patient-card__name">72세 남성 / 60 kg</div>
      <div class="patient-card__dx">Pneumonia</div>
    </div>
  </div>
  <div class="patient-card__body">
    <div class="patient-card__row"><span class="label">NPO</span><span>5일째</span></div>
    <!-- ... -->
  </div>
</div>
```

### 6-8. Lab Table (검사 결과 표)

```html
<div class="lab-table-wrap">
  <table class="lab-table">
    <thead><tr><th>검사</th><th>결과</th><th>참고치</th></tr></thead>
    <tbody>
      <tr class="lab-abnormal"><td>K</td><td>3.2 mEq/L ↓</td><td>3.5–5.0</td></tr>
    </tbody>
  </table>
</div>
```

- `lab-abnormal` 클래스: 이상 수치 강조 (주황/빨강)
- 모바일에서 가로 스크롤 가능

---

## 7. 모바일 디자인 규칙

1. **탭 영역**: 최소 44 × 44px (버튼, 체크박스 라벨 포함)
2. **플로우차트**: 모바일에서 반드시 세로 스택 (가로 나열 금지)
3. **표**: `<div class="table-wrap">` 안에 넣어 가로 스크롤 처리
4. **2컬럼 레이아웃**: `.twopanel` 사용, 모바일에서 자동으로 1컬럼
5. **폰트 크기**: `clamp(15px, ...)` 사용, 직접 px 지정 지양
6. **여백**: 강의 본문 `.wrap` 내에서 처리, 별도 outer margin 추가 금지
7. **배경색**: `--bg` (#f6f8fb), 카드/섹션은 `--surface` (#ffffff)

---

## 8. lessons.js에 강의 추가하는 방법

`assets/data/lessons.js`의 `NST_LESSONS` 배열에 아래 형식으로 추가:

```javascript
{
  no: N,
  href: "lessons/lesson-NN.html",
  title: "강의 제목",
  desc: "한두 문장으로 강의 내용 요약",
  tags: ["태그1", "태그2", "태그3"],
  status: "ready"  // 또는 "coming"
}
```

---

## 9. 퀴즈 처리 규칙

- 아직 퀴즈를 작성하지 않는 강의는 해당 위치에 주석만 삽입:
  ```html
  <!-- QUIZ PLACEHOLDER: 퀴즈는 추후 추가 예정 -->
  ```
- 퀴즈가 완성되면 `<section id="quiz" class="section">` 으로 대체
- 퀴즈 JSON 데이터는 `assets/data/questions/lesson-NN.json`에 별도 관리

---

## 10. 잠금(Lock) UI 규칙

계산기 기능 등 이후 강의에서 해제되는 기능은 다음 규칙을 따름:

- 잠긴 상태: `class="locked-card"` + 🔒 + "N강에서 해제" 텍스트
- 해제 예정 표시는 반드시 몇 강에서 해제되는지 명시
- 해제된 기능은 `locked-card` → 실제 기능 컴포넌트로 교체

---

## 11. 참고 자료 표기 규칙

- ASPEN 근거: `<cite class="ref">ASPEN</cite>`
- 국내 자료: `<cite class="ref">국립도서관</cite>` / `<cite class="ref">AMC 서울</cite>` 등
- 인라인 표시: `<span class="ref-inline">출처</span>`
- 본문에 직접 삽입하되 강조하지 않음 (작은 텍스트)
