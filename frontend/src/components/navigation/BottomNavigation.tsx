import Link from "next/link";
import {
  BsHouse,
  BsCalendar,
  BsChat,
  BsPerson,
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";

export default function BottomNavigation() {
  return (
    <nav className="relative bottom-0 w-full bg-white shadow-lg border-t min-h-96 border-black px-10 py-8">
      <div className="grid grid-cols-6 gap-8 px-20">
        <div className="col-span-1 flex flex-col gap-y-3">
          <p className="text-xl font-semibold">About Us</p>
          <ul className="text-sm font-light text-slate-600 space-y-1">
            <li>
              <Link href="/join-our-network">Join Our Network</Link>
            </li>
            <li>
              <Link href="/careers">Careers</Link>
            </li>
            <li>
              <Link href="/faqs">FAQs</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-of-use">Terms Of Use</Link>
            </li>
            <li>
              <Link href="/accessibility">Accessibility</Link>
            </li>
            <li>
              <Link href="/media-kit">Media Kit</Link>
            </li>
          </ul>
        </div>

        <div className="col-span-1 flex flex-col gap-y-3">
          <p className="text-xl font-semibold">Services</p>
          <ul className="text-sm font-light text-slate-600 space-y-1">
            <li>
              <Link href="/therapy">Therapy</Link>
            </li>
            <li>
              <Link href="/psychiatry">Psychiatry</Link>
            </li>
            <li>
              <Link href="/counseling">Counseling</Link>
            </li>
            <li>
              <Link href="/support-groups">Support Groups</Link>
            </li>
            <li>
              <Link href="/resources">Resources</Link>
            </li>
          </ul>
        </div>

        <div className="col-span-1 flex flex-col gap-y-3">
          <p className="text-xl font-semibold">Industries</p>
          <ul className="text-sm font-light text-slate-600 space-y-1">
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/support">Support</Link>
            </li>
            <li>
              <Link href="/feedback">Feedback</Link>
            </li>
          </ul>
        </div>

        <div className="col-span-1 flex flex-col gap-y-3">
          <p className="text-xl font-semibold">Useful Links</p>
          <ul className="text-sm font-light text-slate-600 space-y-1">
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/support">Support</Link>
            </li>
            <li>
              <Link href="/feedback">Feedback</Link>
            </li>
          </ul>
        </div>

        <div className="col-span-2 flex flex-col gap-y-3 items-center">
          <p className="text-xl font-semibold">Logo</p>
          <p className="text-xl font-semibold">Follow Us</p>
          <div className="flex space-x-4 text-slate-600">
            <Link href="https://www.facebook.com">
              <div className="hover:text-black cursor-pointer">
                <BsFacebook size={24} />
              </div>
            </Link>
            <Link href="https://www.twitter.com">
              <div className="hover:text-black cursor-pointer">
                <BsTwitter size={24} />
              </div>
            </Link>
            <Link href="https://www.instagram.com">
              <div className="hover:text-black cursor-pointer">
                <BsInstagram size={24} />
              </div>
            </Link>
            <Link href="https://www.linkedin.com">
              <div className="hover:text-black cursor-pointer">
                <BsLinkedin size={24} />
              </div>
            </Link>
          </div>
          <p className="text-center font-light mt-5 text-sm">
            For Support: Contact: +233256619388 | +233501396664
          </p>
          <p className="text-center font-light mt-5 text-sm">
            If you are in a crisis or any other person may be in danger - don't
            use this site. These resources can provide you with immediate help.
          </p>
        </div>
      </div>
    </nav>
  );
}
