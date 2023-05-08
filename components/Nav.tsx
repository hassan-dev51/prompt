"use client";

import Link from "next/link";
import Image from "next/image";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";
import { useState, useEffect } from "react";
import { BuiltInProviderType } from "next-auth/providers";

const Nav = () => {
  const islog = true;

  const [providers, setProviders] = useState<Record<
    BuiltInProviderType | string,
    ClientSafeProvider
  > | null>(null);

  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const providerFun = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    providerFun();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-3 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptia</p>
      </Link>

      {/* desktop version */}

      <div className="sm:flex hidden">
        {islog ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          // if we have access to the provider
          <>
            {providers &&
              Object.values(providers).map((currElem) => (
                <button
                  key={currElem.name}
                  type="button"
                  onClick={() => signIn(currElem.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile navigation */}

      <div className="sm:hidden flex relative">
        {islog ? (
          <div className="flex">
            {" "}
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggle((prevState) => !prevState)}
            />
            {toggle && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggle(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggle(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggle(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {" "}
            {providers &&
              Object.values(providers).map((currElem) => (
                <button
                  key={currElem.name}
                  type="button"
                  onClick={() => signIn(currElem.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
