'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const images = ['/ratha-yatra.jpg', '/rath.jpeg'];

export default function AboutPage() {
  const [current, setCurrent] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
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
      {/* Navbar */}
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

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={28} />
          </button>

          {/* Desktop Navigation */}
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
                  <Link href={href} passHref legacyBehavior>
                    <NavigationMenuLink className="hover:text-red-400 transition-colors duration-800">
                      {name}
                    </NavigationMenuLink>
                  </Link>
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

        {/* Mobile Dropdown */}
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
                <Link href={href}>
                  <span className="block text-base hover:text-red-400">{name}</span>
                </Link>
              </div>
            ))}
            <Button className="bg-red-500 hover:bg-red-600 w-full">Donate</Button>
          </div>
        )}
      </div>

      {/* Slider Banner */}
      <div className="pt-20 relative w-full h-[80vh] overflow-hidden">
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

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold">About POCS</h1>
          <p className="mt-2 text-lg sm:text-xl">Home &gt; About Us</p>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 px-6 sm:px-10 md:px-24 bg-white text-gray-800">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 border-l-8 border-indigo-600 pl-3">
              Who Are We?
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Odisha, a state in eastern India on the Bay of Bengal, is famed for its ancient culture and stunning architecture.
              Vibrant art and music, diverse dialects, dance styles and cuisines add to Odisha’s individuality.
              With its Maritime adventures of the past and the sports patronage of the present, Odisha has made a distinct mark in the world.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Prabasi Odia Cultural Society (POCS) is a not-for-profit organization based in Chennai, India. Founded in 2006 by a group of like-minded Odias passionate about preserving and promoting Odia culture, POCS has been actively fostering community spirit, cultural awareness, and social engagement among Odias living outside Odisha. Since its inception, the society has grown steadily through consistent community participation, cultural events, and shared values rooted in tradition and unity.
            </p>
          </div>
          <div>
            <Image
              src="/rath.jpeg"
              alt="Ratha Yatra"
              width={800}
              height={500}
              className="rounded-lg shadow-md object-cover w-full"
            />
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="relative py-20 px-6 sm:px-10 md:px-24 bg-gray-100 text-gray-800">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Image
              src="/oscan16-scaled.jpg"
              alt="POCS Purpose"
              width={800}
              height={500}
              className="rounded-lg shadow-md object-cover w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 border-l-8 border-red-600 pl-3">
              Our Purpose
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              POCS’s purpose is to promote knowledge and understanding of Odia culture and history. Our idea of togetherness and inclusion derives from the sense of community and collaboration that Odia society is recognized for. We organise Odia festivals, community events, and charities to build unity among Odias in Chennai and with the society in which we live. We aspire to become a portal for next generation Odias connecting them with their roots through the interactions we cultivate. We assist Odias with their education, professional advancement, and social circle expansion by providing numerous opportunities for networking and counselling.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
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