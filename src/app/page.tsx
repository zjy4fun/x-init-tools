import { headers } from "next/headers";

export default async function Home() {
  const headersData = headers();
  const host = headersData.get("host") || "localhost";
  const protocol =
    headersData.get("x-forwarded-proto") ?? host.startsWith("localhost")
      ? "http"
      : "https";
  const apiBase = `${protocol}://${host}`;

  const res = await fetch(`${apiBase}/api/data`);
  const data: string[] = await res.json();

  return (
    <div className="flex flex-col  w-screen h-screen border border-red-100">
      <div className="text-2xl font-bold text-red-800 m-3 ">x-init-tools</div>
      <div className="p-3">{`${apiBase}/api/data`}</div>
      {data.map((item: string) => (
        <div key={item} className="flex border gap-4 p-3 border-red-800 text-xl font-bold text-red-400">
          <div className="w-96">{item}</div>
        </div>
      ))}
    </div>
  );
}
