'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, Clock, Shield, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function HeroSection() {
  const [level, setLevel] = useState('250');
  const [deadline, setDeadline] = useState('1');
  const [pages, setPages] = useState('5');

  // Calculate price using useMemo instead of useEffect
  const price = useMemo(() => {
    const basePrice = parseInt(level);
    const multiplier = parseFloat(deadline);
    const pageCount = parseInt(pages) || 1;
    return Math.round(basePrice * multiplier * pageCount);
  }, [level, deadline, pages]);

  const features = [
    { icon: Users, text: 'PhD-qualified writers' },
    { icon: CheckCircle, text: '100% original' },
    { icon: Clock, text: 'On-time delivery' },
    { icon: Shield, text: 'Money-back guarantee' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(30,41,59,0.85), rgba(15,23,42,0.9)), url('https://picsum.photos/id/1015/1920/1080')`,
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Expert Academic Writing
            <br />
            Since 2010
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            {features.map((f, i) => (
              <span key={i}>
                {f.text} •{' '}
              </span>
            ))}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button
              size="lg"
              className="bg-white text-indigo-700 hover:bg-gray-100 px-10 py-6 text-xl font-bold"
              onClick={() => {
                document.getElementById('price-calculator')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Quote in 60 Seconds <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white hover:bg-white/20 px-10 py-6 text-xl"
            >
              View Samples
            </Button>
          </div>
        </div>
      </section>

      {/* Price Calculator Section */}
      <section id="price-calculator" className="py-20 bg-gradient-to-b from-indigo-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-10">Calculate Your Price</h2>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Academic Level */}
                <div className="space-y-2">
                  <Label>Academic Level</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger className="w-full p-4">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="250">High School / Undergraduate (₹250/page)</SelectItem>
                      <SelectItem value="350">Bachelor / Masters (₹350/page)</SelectItem>
                      <SelectItem value="450">Master / Professional (₹450/page)</SelectItem>
                      <SelectItem value="750">PhD / Professional (₹750/page)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Deadline */}
                <div className="space-y-2">
                  <Label>Deadline</Label>
                  <Select value={deadline} onValueChange={setDeadline}>
                    <SelectTrigger className="w-full p-4">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">14+ days (Base price)</SelectItem>
                      <SelectItem value="1.3">7–13 days (+30%)</SelectItem>
                      <SelectItem value="1.6">3–6 days (+60%)</SelectItem>
                      <SelectItem value="2.2">24–48 hours (+120%)</SelectItem>
                      <SelectItem value="3.0">Under 24 hours (+200%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Pages */}
                <div className="space-y-2">
                  <Label>Pages / Words (≈275 words = 1 page)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    className="w-full p-4"
                  />
                </div>

                {/* Price Display */}
                <div className="text-center mt-8">
                  <p className="text-3xl font-bold mb-6">
                    Estimated Price:{' '}
                    <span className="text-indigo-600 dark:text-indigo-400">
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                  </p>
                  <Button size="lg" className="px-12 py-6 text-xl font-bold">
                    Proceed to Order <ArrowRight className="ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
