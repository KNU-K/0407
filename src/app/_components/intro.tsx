"use client";
import Link from "next/link";

export function Intro() {
  const routeHomePageHandler = (e: any) => {
    location.href = "/";
  };

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1
        style={{ cursor: "pointer" }}
        className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8"
        onClick={(e: any) => routeHomePageHandler(e)}
      >
        <img src="/images/mainlogo.png"></img>
      </h1>
      <nav>
        <ul className="flex" style={{ alignItems: "center" }}>
          <li className="mr-6">
            <Link as={`/`} href="/" className="hover:underline font-bold">
              홈
            </Link>
          </li>
          <li className="mr-6">
            <Link
              as={`/business-notice`}
              href="/business-notice"
              className="hover:underline font-bold"
            >
              사업공고
            </Link>
          </li>
          <li className="mr-6">
            <Link
              as={`/card-news`}
              href="/card-news"
              className="hover:underline font-bold"
            >
              카드뉴스
            </Link>
          </li>
          <li className="mr-6">
            <Link
              as={`/space`}
              href="/space"
              className="hover:underline font-bold"
            >
              창업공간
            </Link>
          </li>
          <li className="mr-6">
            <Link
              as={`/community`}
              href="/community"
              className="hover:underline font-bold"
            >
              경험공유
            </Link>
          </li>
          <li className="mr-6">
            <Link
              as={`/sponsor`}
              href="/sponsor"
              className="hover:underline font-bold"
            >
              스폰서쉽
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
