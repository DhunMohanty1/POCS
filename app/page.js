'use client';

import React, { useEffect, useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

const images = [
  '/Brahmeshwara-Temple.jpg',
  '/Chandipur-Odisha.jpg',
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

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
          'fixed top-0 w-full z-50 transition-colors duration-300 shadow-md',
          isScrolled ? 'bg-black' : 'bg-black/60 backdrop-blur-md'
        )}
      >
        <div className="flex items-center justify-between px-10 h-20 text-white">
          {/* Logo */}
          <div className="flex items-center h-full">
            <Image
              src="/oscan-logo.png"
              alt="POCS Logo"
              width={160}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Navigation Links */}
          <NavigationMenu>
            <NavigationMenuList className="space-x-10 text-lg font-medium">
              {['Home', 'About Us', 'Gallery', 'Events', 'Contact Us', 'Membership'].map((item, idx) => (
                <NavigationMenuItem key={idx}>
                  <NavigationMenuLink
                    href="#"
                    className="hover:text-red-400 transition-colors duration-200"
                  >
                    {item}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Donate Button */}
          <Button className="bg-red-500 hover:bg-red-600 text-lg px-6 py-2 rounded-lg shadow-md">
            Donate
          </Button>
        </div>
      </div>

      {/* ✅ Fullscreen Image Slider */}
      <div className="pt-20 relative w-full h-[90vh] overflow-hidden">
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

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
        >
          <ChevronRight />
        </button>

        {/* ✅ Text Overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-[140px] font-extrabold text-red-500 leading-none tracking-tight">POCS</h1>
          <div className="h-[2px] w-[90%] bg-white mx-auto my-4" />
          <p className="text-4xl text-white font-light">
            Prabasi Odia Cultural Society | Chennai
          </p>
        </div>
      </div>

      {/* ✅ Mission Section */}
      <section id="mission" className="py-20 px-6 md:px-20 flex flex-col md:flex-row gap-10 bg-gray-100 items-center">
        <Image
          src="/Rath_Yatra_Puri.jpg"
          alt="Mission"
          width={600}
          height={400}
          className="rounded-lg shadow-lg object-cover w-full md:w-1/2"
        />
        <div className="text-left w-full md:w-1/2">
          <h2 className="text-5xl font-bold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-8">
            POCS aims to connect the Odia community in Chennai through cultural events that celebrate our heritage. Since its inception, POCS has brought together hundreds of individuals with shared values and a deep pride in Odia culture.
          </p>
          <p className="mt-4 font-semibold">
            Follow us, support our events, and stay in touch with your kind suggestions.
          </p>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-black text-white text-center py-6">
        <p>© 2025 Prabasi Odia Cultural Society, Chennai. All rights reserved.</p>
      </footer>
    </div>
  );
}
