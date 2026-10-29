import Link from "next/link";

export default function NotFound() {
  return (
    <div className="prose">
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>주소가 바뀌었거나 없는 성씨 페이지일 수 있습니다.</p>
      <ul>
        <li>
          <Link href="/">메인 변환기로 가기</Link>
        </li>
        <li>
          <Link href="/surname">성씨별 표기 목록 보기</Link>
        </li>
      </ul>
    </div>
  );
}
