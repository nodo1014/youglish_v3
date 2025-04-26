
# 🧭 Youglish Clone 로컬 개발 통합 지시서 (Cursor Pro / Copilot 최적화)

## 📌 프로젝트 개요
- 목표: 
  내 컴퓨터(MacBook Air M1) 내부 USB-C 외장하드나 폴더에 저장된 미디어 파일(mp4, mkv 등)과 영어 자막 파일(srt, vtt)을 인덱싱하고, 
  Youglish 스타일로 검색하고, 영상을 구간 반복 재생할 수 있는 로컬 전용 웹 애플리케이션을 만든다.
- 구동 환경:
  - Backend: FastAPI (Python 3.12)
  - Frontend: React (Vite + TailwindCSS)
  - Database: SQLite
  - 기타: react-icons, react-router-dom

## 🏗️ 전체 시스템 구성
### 백엔드 (FastAPI)
- `/api/index`: 미디어/자막 파일 인덱싱
- `/api/search?q=검색어`: 자막 검색
- `/media/{media_id}/stream`: 영상 스트리밍
- SQLite 테이블 스키마:
  - media(id, filename, path)
  - subtitle(id, media_id, time, text)

### 프론트엔드 (React + TailwindCSS)
- 상단 오른쪽: 검색창 (SearchBar.tsx)
- 왼쪽 2/3: 비디오 플레이어 (VideoPlayer.tsx)
- 비디오 하단: 컨트롤바 (ControlBar.tsx)
- 오른쪽 1/3: 3줄 자막 표시 (SubtitleSnippet.tsx)

## ⚙️ 디렉토리 구조
youglish-clone/
  ├── backend/
  │    ├── app.py
  │    ├── database.py
  │    ├── indexer.py
  ├── frontend/
  │    ├── src/
  │         ├── components/
  │         │    ├── SearchBar.tsx
  │         │    ├── VideoPlayer.tsx
  │         │    ├── ControlBar.tsx
  │         │    ├── SubtitleSnippet.tsx
  │         ├── pages/
  │         │    ├── SearchWithPlayback.tsx
  │         ├── App.tsx
  │         ├── main.tsx

## ✍️ 개발 명령 지시문
- FastAPI로 backend 구축
- Vite + Tailwind로 frontend 구축
- 컴포넌트 분리: SearchBar, VideoPlayer, ControlBar, SubtitleSnippet
- Tailwind 스타일 적용: grid-cols-1, lg:grid-cols-2

## 📦 필수 설치 패키지
### backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn sqlalchemy

### frontend
cd frontend
npm create vite@latest
npm install
npm install tailwindcss postcss autoprefixer
npm install react-icons react-router-dom

## 🚀 개발 순서
1. 프론트: 레이아웃과 컴포넌트 구축
2. 백엔드: FastAPI로 API 구축
3. 프론트-백 연동
4. 전체 통합 테스트 및 폴리싱

## 🧠 최종 메모
- Cursor Pro는 이 문서를 기반으로 프로젝트 진행.
- VSCode Copilot은 보조 도구로 활용.
