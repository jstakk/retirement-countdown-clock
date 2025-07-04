
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeRemaining {
  years: number;
  days: number;
  hours: number;
  minutes: number;
}

const RetirementCountdown = () => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0
  });

  const calculateTimeRemaining = (): TimeRemaining => {
    // Fødselsdato: 25. januar 1979
    const birthDate = new Date(1979, 0, 25); // Måned er 0-indeksert
    
    // Pensjoneringsalder: 67 år
    const retirementDate = new Date(birthDate);
    retirementDate.setFullYear(birthDate.getFullYear() + 67);
    
    const now = new Date();
    const timeDifference = retirementDate.getTime() - now.getTime();
    
    if (timeDifference <= 0) {
      return { years: 0, days: 0, hours: 0, minutes: 0 };
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
    
    return { years, days, hours, minutes };
  };

  useEffect(() => {
    // Oppdater umiddelbart
    setTimeRemaining(calculateTimeRemaining());
    
    // Oppdater hvert minutt
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const retirementDate = new Date(1979, 0, 25);
  retirementDate.setFullYear(1979 + 67);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full mx-auto text-center animate-fade-in">
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-6">
            <Clock className="w-8 h-8 text-slate-600 mr-3" />
            <h1 className="text-2xl md:text-3xl font-light text-slate-800 tracking-tight">
              Pensjonsnedtelling
            </h1>
          </div>
          <p className="text-slate-600 text-lg font-light mb-2">
            Født 25. januar 1979
          </p>
          <p className="text-slate-500 text-base">
            Pensjonering {retirementDate.toLocaleDateString('no-NO', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Countdown Display */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          
          {/* Years */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
            <div className="font-mono text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-800 mb-3 animate-pulse-subtle">
              {formatNumber(timeRemaining.years)}
            </div>
            <div className="text-slate-600 text-sm md:text-base font-medium uppercase tracking-wider">
              År
            </div>
          </div>

          {/* Days */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
            <div className="font-mono text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-800 mb-3 animate-pulse-subtle">
              {formatNumber(timeRemaining.days)}
            </div>
            <div className="text-slate-600 text-sm md:text-base font-medium uppercase tracking-wider">
              Dager
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
            <div className="font-mono text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-800 mb-3 animate-pulse-subtle">
              {formatNumber(timeRemaining.hours)}
            </div>
            <div className="text-slate-600 text-sm md:text-base font-medium uppercase tracking-wider">
              Timer
            </div>
          </div>

          {/* Minutes */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
            <div className="font-mono text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-800 mb-3 animate-pulse-subtle">
              {formatNumber(timeRemaining.minutes)}
            </div>
            <div className="text-slate-600 text-sm md:text-base font-medium uppercase tracking-wider">
              Minutter
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-slate-500 text-sm font-light">
          <p className="mb-2">Nedtellingen oppdateres hvert minutt</p>
          <p>Pensjoneringsalder: 67 år</p>
        </div>
      </div>
    </div>
  );
};

export default RetirementCountdown;
