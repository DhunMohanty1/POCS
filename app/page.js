'use client';

import React, { useEffect, useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

const images = [
  '/Brahmeshwara-Temple.jpg',
  '/Chandipur-Odisha.jpg',
  '/Lord-Shree-Jagganth-Temple.png'
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const next = () => setCurrent((current + 1) % images.length);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* ✅ Navbar */}
      <div
        className={clsx(
          'fixed top-0 w-full z-50 transition-colors duration-800 shadow-md',
          isScrolled ? 'bg-black' : 'bg-black/60 backdrop-blur-md'
        )}
      >
        <div className="flex items-center justify-between px-4 md:px-10 h-20 text-white">
          <Image
            src="/oscan-logo.png"
            alt="POCS Logo"
            width={130}
            height={60}
            className="object-contain"
          />

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={28} />
          </button>

          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex space-x-6 text-base font-medium">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Gallery', href: '#' },
                { name: 'Events', href: '#' },
                { name: 'Contact Us', href: '#' },
                { name: 'Membership', href: '#' }
              ].map(({ name, href }, idx) => (
                <NavigationMenuItem key={idx}>
                  <NavigationMenuLink
                    href={href}
                    className="hover:text-red-400 transition-colors duration-800"
                  >
                    {name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden md:block">
            <Button className="bg-red-500 hover:bg-red-600 text-sm md:text-base px-4 md:px-6 py-2 rounded-lg shadow-md">
              Donate
            </Button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-black text-white px-4 pb-4 space-y-2">
            {[
              { name: 'Home', href: '/' },
              { name: 'About Us', href: '/about' },
              { name: 'Gallery', href: '#' },
              { name: 'Events', href: '#' },
              { name: 'Contact Us', href: '#' },
              { name: 'Membership', href: '#' }
            ].map(({ name, href }, idx) => (
              <div key={idx} className="border-b border-gray-700 py-2">
                <a href={href} className="block text-base hover:text-red-400">
                  {name}
                </a>
              </div>
            ))}
            <Button className="bg-red-500 hover:bg-red-600 w-full">Donate</Button>
          </div>
        )}
      </div>

      {/* ✅ Slider */}
      <div className="pt-20 relative w-full h-[80vh] sm:h-[85vh] overflow-hidden">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Slide ${index}`}
            layout="fill"
            objectFit="cover"
            className={clsx(
              'absolute transition-opacity duration-1000 ease-in-out',
              index === current ? 'opacity-100' : 'opacity-0'
            )}
            priority={index === current}
          />
        ))}

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10"
        >
          <ChevronRight />
        </button>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-red-500 tracking-tight leading-tight">
            POCS
          </h1>
          <div className="h-[2px] w-[80%] bg-white mx-auto my-4" />
          <p className="text-lg sm:text-xl md:text-2xl text-white font-light">
            Prabasi Odia Cultural Society | Chennai
          </p>
        </div>
      </div>

      {/* ✅ About Section */}
      <section className="py-14 px-4 sm:px-6 md:px-20 bg-white text-gray-800">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Some Words ABOUT</h2>
        <div className="text-base sm:text-lg space-y-4">
          <p>
            <strong className="text-gray-900">Prabasi Oriya Cultural Society:</strong> Prabasi Oriya Cultural Society is a non-profit socio-cultural organization of Odias in Chennai. Established in 2006 by like-minded individuals, it unites people from Odisha living in Tamil Nadu.
          </p>
        </div>
      </section>

      {/* ✅ Mission Section */}
      <section className="py-14 px-4 sm:px-6 md:px-20 bg-gray-100 flex flex-col md:flex-row gap-10 items-center">
        <Image
          src="/Rath_Yatra_Puri.jpg"
          alt="Mission"
          width={600}
          height={400}
          className="rounded-lg shadow-lg object-cover w-full md:w-1/2"
        />
        <div className="text-left w-full md:w-1/2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-base sm:text-lg text-gray-700 leading-7">
            POCS aims to connect the Odia community in Chennai through cultural events that celebrate our heritage. Since its inception, POCS has brought together hundreds of individuals with shared values and a deep pride in Odia culture.
          </p>
          <p className="mt-4 font-semibold text-sm md:text-base">
            Follow us, support our events, and stay in touch with your kind suggestions.
          </p>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-black text-white px-6 py-8 text-center sm:text-left">
        <div className="max-w-5xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm sm:text-base">
          <div>
            <h2 className="text-lg font-semibold mb-2">Prabasi Odia Cultural Society</h2>
            <p>© 2025. All rights reserved.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
            <p>093635 72401</p>
            <p>pocschennai@gmail.com</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Location</h2>
            <p>Chennai, Tamil Nadu, India</p>
          </div>
        </div>
        <Separator className="my-6 bg-gray-700" />
        <p className="text-xs text-gray-400">&copy; 2025 Prabasi Odia Cultural Society, Chennai</p>
      </footer>
    </div>
  );
}