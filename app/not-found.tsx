import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page_404 text-black bg-white h-screen">
      <div className="text-center">
        <div className="four_zero_four_bg">
          <h1 className="">404</h1>
        </div>

        <div className="contant_box_404">
          <h3 className="text-2xl">Look like you&apos;re lost</h3>

          <p className="text-xl">the page you are looking for not avaible!</p>

          <Link href="/">
            <Button className="my-4" variant="premium">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
