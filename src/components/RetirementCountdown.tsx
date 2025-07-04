import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Briefcase } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TimeRemaining {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  workDays: number;
}

const RetirementCountdown = () => {
  const [birthDate, setBirthDate] = useState('1979-01-25');
  const [retirementAge, setRetirementAge] = useState(67);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    workDays: 0
  });

  const calculateTimeRemaining = (): TimeRemaining => {
    const birth = new Date(birthDate);
    const retirementDate = new Date(birth);
    retirementDate.setFullYear(birth.getFullYear() + retirementAge);
    
    const now = new Date();
    const timeDifference = retirementDate.getTime() - now.getTime();
    
    if (timeDifference <= 0) {
      return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0, workDays: 0 };
    }
    
    // Beregn år
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));
    
    // Beregn gjenværende dager etter å ha trukket fra årene
    const remainingAfterYears = timeDifference - (years * 365.25 * 24 * 60 * 60 * 1000);
    const days = Math.floor(remainingAfterYears / (1000 * 60 * 60 * 24));
    
    // Beregn gjenværende timer
    const remainingAfterDays = remainingAfterYears - (days * 24 * 60 * 60 * 1000);
    const hours = Math.floor(remainingAfterDays / (1000 * 60 * 60));
    
    // Beregn gjenværende minutter
    const remainingAfterHours = remainingAfterDays - (hours * 60 * 60 * 1000);
    const minutes = Math.floor(remainingAfterHours / (1000 * 60));
    
    // Beregn gjenværende sekunder
    const remainingAfterMinutes = remainingAfterHours - (minutes * 60 * 1000);
    const seconds = Math.floor(remainingAfterMinutes / 1000);
    
    // Beregn arbeidsdager (230 arbeidsdager per år i Norge)
    const totalDaysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const workDays = Math.floor((totalDaysRemaining / 365.25) * 230);
    
    return { years, days, hours, minutes, seconds, workDays };
  };

  useEffect(() => {
    // Oppdater umiddelbart
    setTimeRemaining(calculateTimeRemaining());
    
    // Oppdater hvert sekund
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    
    return () => clearInterval(interval);
  }, [birthDate, retirementAge]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const retirementDate = new Date(birthDate);
  retirementDate.setFullYear(new Date(birthDate).getFullYear() + retirementAge);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-stone-50 to-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl w-full mx-auto text-center">
        
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <Clock className="w-6 h-6 text-neutral-400 mr-4" strokeWidth={1.5} />
            <h1 className="text-3xl md:text-4xl font-extralight text-neutral-800 tracking-[-0.02em] leading-tight">
              Pensjonsnedtelling
            </h1>
          </div>
          
          {/* Editable Fields - More compact and refined */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-end mb-10 max-w-sm mx-auto">
            <div className="space-y-3 flex-1">
              <Label htmlFor="birthDate" className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Fødselsdato
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="border-0 border-b border-neutral-200 rounded-none bg-transparent px-0 pb-2 focus:border-neutral-400 text-center font-mono text-sm"
              />
            </div>
            <div className="space-y-3 flex-1">
              <Label htmlFor="retirementAge" className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Pensjonsalder
              </Label>
              <Input
                id="retirementAge"
                type="number"
                min="60"
                max="80"
                value={retirementAge}
                onChange={(e) => setRetirementAge(parseInt(e.target.value) || 67)}
                className="border-0 border-b border-neutral-200 rounded-none bg-transparent px-0 pb-2 focus:border-neutral-400 text-center font-mono text-sm"
              />
            </div>
          </div>

          <p className="text-neutral-400 text-sm font-light tracking-wide">
            {retirementDate.toLocaleDateString('no-NO', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Main Countdown - Tighter grid with refined typography */}
        <div className="grid grid-cols-5 gap-2 md:gap-4 mb-16 max-w-4xl mx-auto">
          
          {/* Years */}
          <div className="group">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 md:p-6 shadow-sm border border-neutral-100/50 hover:shadow-md hover:bg-white/80 transition-all duration-500">
              <div className="font-mono text-2xl md:text-4xl lg:text-5xl font-light text-neutral-800 mb-1 tracking-tight group-hover:scale-105 transition-transform duration-300">
                {formatNumber(timeRemaining.years)}
              </div>
              <div className="text-neutral-500 text-xs md:text-sm font-medium uppercase tracking-[0.15em] leading-relaxed">
                År
              </div>
            </div>
          </div>

          {/* Days */}
          <div className="group">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 md:p-6 shadow-sm border border-neutral-100/50 hover:shadow-md hover:bg-white/80 transition-all duration-500">
              <div className="font-mono text-2xl md:text-4xl lg:text-5xl font-light text-neutral-800 mb-1 tracking-tight group-hover:scale-105 transition-transform duration-300">
                {formatNumber(timeRemaining.days)}
              </div>
              <div className="text-neutral-500 text-xs md:text-sm font-medium uppercase tracking-[0.15em] leading-relaxed">
                Dager
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="group">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 md:p-6 shadow-sm border border-neutral-100/50 hover:shadow-md hover:bg-white/80 transition-all duration-500">
              <div className="font-mono text-2xl md:text-4xl lg:text-5xl font-light text-neutral-800 mb-1 tracking-tight group-hover:scale-105 transition-transform duration-300">
                {formatNumber(timeRemaining.hours)}
              </div>
              <div className="text-neutral-500 text-xs md:text-sm font-medium uppercase tracking-[0.15em] leading-relaxed">
                Timer
              </div>
            </div>
          </div>

          {/* Minutes */}
          <div className="group">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 md:p-6 shadow-sm border border-neutral-100/50 hover:shadow-md hover:bg-white/80 transition-all duration-500">
              <div className="font-mono text-2xl md:text-4xl lg:text-5xl font-light text-neutral-800 mb-1 tracking-tight group-hover:scale-105 transition-transform duration-300">
                {formatNumber(timeRemaining.minutes)}
              </div>
              <div className="text-neutral-500 text-xs md:text-sm font-medium uppercase tracking-[0.15em] leading-relaxed">
                Minutter
              </div>
            </div>
          </div>

          {/* Seconds */}
          <div className="group">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 md:p-6 shadow-sm border border-neutral-100/50 hover:shadow-md hover:bg-white/80 transition-all duration-500">
              <div className="font-mono text-2xl md:text-4xl lg:text-5xl font-light text-neutral-800 mb-1 tracking-tight group-hover:scale-105 transition-transform duration-300">
                {formatNumber(timeRemaining.seconds)}
              </div>
              <div className="text-neutral-500 text-xs md:text-sm font-medium uppercase tracking-[0.15em] leading-relaxed">
                Sekunder
              </div>
            </div>
          </div>
        </div>

        {/* Work Days - More refined and artistic */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-neutral-100/40 via-stone-100/30 to-neutral-100/40 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-neutral-100/30 hover:shadow-lg transition-all duration-700 max-w-3xl mx-auto group">
            <div className="flex items-center justify-center mb-6">
              <Briefcase className="w-4 h-4 text-neutral-400 mr-3" strokeWidth={1.5} />
              <div className="text-neutral-500 text-sm font-medium uppercase tracking-[0.2em]">
                Arbeidsdager igjen
              </div>
            </div>
            <div className="font-mono text-5xl md:text-6xl lg:text-7xl font-extralight text-neutral-800 tracking-[-0.02em] mb-3 group-hover:scale-105 transition-transform duration-500">
              {timeRemaining.workDays.toLocaleString('no-NO')}
            </div>
            <div className="text-neutral-400 text-xs font-light tracking-wider">
              Basert på 230 arbeidsdager per år
            </div>
          </div>
        </div>

        {/* Footer - Minimalist */}
        <div className="text-neutral-400 text-xs font-light tracking-wide space-y-1">
          <p>Oppdateres kontinuerlig</p>
          <p className="text-neutral-300">Norsk arbeidskalender</p>
        </div>
      </div>
    </div>
  );
};

export default RetirementCountdown;
