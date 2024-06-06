import { Typography } from "@/components";
import Router, { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  return (
    <div className="flex h-[70vh] items-center justify-center text-center">
      <div className="text-center">
        <Typography fullPage>
          <h1 className="mb-0" style={{ fontSize: "12rem" }}>
            404
          </h1>
          <h2 className="text-center">Page Not Found</h2>
          <p>Navigate using the side menu or</p>
          <span role="button" className="btn btn-primary" onClick={() => router.push("/")}>
            Go Home
          </span>
        </Typography>
      </div>
    </div>
  );
}
