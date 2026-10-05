# 픽셀 태그 생성기 · BE_STUDIO

마인크래프트 랭크 태그, 채팅 접두어, 배지, Bedrock 글리프를 픽셀 아트로 만드는 브라우저 도구입니다.
설치나 서버 없이 정적 파일만으로 동작하고, 올린 폰트와 이미지는 브라우저 밖으로 보내지 않습니다.

**사용하기:** https://boredape874.github.io/pixel_tag_generator/

**BE_STUDIO 디스코드:** https://discord.gg/NBSbvdsmgf — 질문, 기능 요청, 만든 태그 공유

## 기능

- **태그 프리셋 1,500여 종 (스타일 80여 가지):** 상태 슬랩, 칩 랭크, 프리미엄 캡슐, 판타지 판, 아이템·희귀도, 배경 없음, 채팅 BE, 네온·발광, 버튼·입체, 테두리·라인, 패턴·질감, 모양·배너, 그라데이션·분할, 소프트·다크 등 계열별 탭과 전체 탭
- **글자:** 내장 비트맵 폰트(5x7, 5x5 굵은 대문자, 3x5), 한글을 포함한 TTF·OTF·WOFF 픽셀 폰트 업로드(크기 자동 감지), Bedrock `glyph_XX.png` 시트 업로드, 대체 폰트, 굵게, 스몰캡스, 물결, 글자마다 색
- **색:** 그라데이션 조합 140여 종, 마크 색 코드 16색, 단색 구간, 기호만 다른 색
- **효과:** 글자 그림자·외곽선, 배경 모양(둥근·깎은 모서리, 뾰족·기울임 끝, 홈, 리본 꼬리, 말풍선 꼬리, 성벽·왕관 장식, 날개), 외곽선, 엠보스, 안쪽 테두리, 무늬 13종, 광택, 띠, 강조선, 두 색 나누기, 외부 발광, 모서리 장식
- **아이콘:** 내장 7x7·작은 픽셀 아이콘, 여러 색 스프라이트, 이미지 업로드, 아이콘 칩(따로 담는 상자)
- **내보내기:** PNG(1×~32×), 이미지 복사, 설정 JSON, **Bedrock 글리프 시트(`glyph_E1.png` 등) 칸 단위 내보내기와 `\uE1xx` 문자 복사**

## 로컬에서 실행

정적 파일이라 아무 웹 서버로 열면 됩니다.

```bash
python -m http.server 8765
```

브라우저에서 `http://127.0.0.1:8765/` 를 엽니다. `index.html` 을 파일로 직접 열어도 대부분 동작하지만, 이미지 복사 등 일부 기능은 브라우저에 따라 막힐 수 있습니다.

## GitHub Pages 배포

1. 이 저장소를 `main` 브랜치에 푸시합니다.
2. 저장소 **Settings → Pages** 에서 Source를 **Deploy from a branch**, Branch를 `main` / `/ (root)` 로 저장합니다.
3. 몇 분 뒤 `https://boredape874.github.io/pixel_tag_generator/` 에서 열립니다.

`.nojekyll` 파일이 있어서 Jekyll 처리 없이 그대로 배포됩니다.

## 구조

```
index.html              페이지 뼈대, BE_STUDIO 헤더·디스코드 버튼
assets/css/style.css    스타일 (라이트·다크)
assets/js/fonts.js      내장 비트맵 폰트, 폰트 업로드
assets/js/storage.js    IndexedDB (업로드한 폰트·아이콘 보관)
assets/js/state.js      설정 상태와 기본값
assets/js/render.js     픽셀 렌더링
assets/js/preview.js    미리보기·PNG 저장
assets/js/ui.js         설정 패널
assets/js/icons.js      아이콘·스프라이트
assets/js/glyph.js      Bedrock 글리프 시트 내보내기
assets/js/settings.js   설정 파일
assets/js/presets.js    태그·글자 스타일 프리셋
assets/js/presets-extra.js  추가 스타일 41종 × 대표 랭크 20개
assets/js/brand.js      BE_STUDIO 워드마크
assets/js/main.js       시작
```

스크립트는 위 순서대로 일반 `<script>` 로 불러오며 전역 범위를 공유합니다. 순서를 바꾸지 마세요.

## 라이선스

[Apache License 2.0](LICENSE)

Minecraft는 Mojang Studios의 상표이며, 이 도구는 Mojang·Microsoft와 관련이 없습니다.
