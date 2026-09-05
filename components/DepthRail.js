'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DepthRail() {
  const pathname = usePathname();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setPct(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  return (
    <div className="depth-rail" aria-hidden="true">
      <div className="track">
        <div className="fill" style={{ height: `${pct}%` }}></div>
      </div>
      <div className="marks">
        <span>0M · SURFACE</span>
        <span>-40M</span>
        <span>-90M</span>
        <span>-140M · SEABED</span>
      </div>
    </div>
  );
}
