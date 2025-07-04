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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-6xl w-full mx-auto text-center animate-fade-in">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <Clock className="w-8 h-8 text-slate-600 mr-3" />
            <h1 className="text-2xl md:text-3xl font-light text-slate-800 tracking-tight">
              Pensjonsnedtelling
            </h1>
          </div>
          
          {/* Editable Fields */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8 max-w-md mx-auto">
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-sm font-medium text-slate-700">
                Fødselsdato
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retirementAge" className="text-sm font-medium text-slate-700">
                Pensjonsalder
              </Label>
              <Input
                id="retirementAge"
                type="number"
                min="60"
                max="80"
                value={retirementAge}
                onChange={(e) => setRetirementAge(parseInt(e.target.value) || 67)}
                className="w-full"
              />
            </div>
          </div>

          <p className="text-slate-500 text-base">
            Pensjonering {retirementDate.toLocaleDateString('no-NO', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Main Countdown Display - All 5 boxes on same row */}
        <div className="grid grid-cols-5 gap-3 md:gap-6 mb-12">
          
          {/* Years */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
            <div className="font-mono text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800 mb-2 animate-pulse-subtle">
              {formatNumber(timeRemaining.years)}
            </div>
            <div className="text-slate-600 text-xs md:text-sm font-medium uppercase tracking-wider">
              År
            </div>
          </div>

          {/* Days */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
            <div className="font-mono text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800 mb-2 animate-pulse-subtle">
              {formatNumber(timeRemaining.days)}
            </div>
            <div className="text-slate-600 text-xs md:text-sm font-medium uppercase tracking-wider">
              Dager
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
            <div className="font-mono text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800 mb-2 animate-pulse-subtle">
              {formatNumber(timeRemaining.hours)}
            </div>
            <div className="text-slate-600 text-xs md:text-sm font-medium uppercase tracking-wider">
              Timer
            </div>
          </div>

          {/* Minutes */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
            <div className="font-mono text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800 mb-2 animate-pulse-subtle">
              {formatNumber(timeRemaining.minutes)}
            </div>
            <div className="text-slate-600 text-xs md:text-sm font-medium uppercase tracking-wider">
              Minutter
            </div>
          </div>

          {/* Seconds */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
            <div className="font-mono text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800 mb-2 animate-pulse-subtle">
              {formatNumber(timeRemaining.seconds)}
            </div>
            <div className="text-slate-600 text-xs md:text-sm font-medium uppercase tracking-wider">
              Sekunder
            </div>
          </div>
        </div>

        {/* Work Days - Separate row */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-slate-100/80 to-slate-200/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              <Briefcase className="w-5 h-5 text-slate-600 mr-2" />
              <div className="text-slate-600 text-sm md:text-base font-medium uppercase tracking-wider">
                Arbeidsdager igjen
              </div>
            </div>
            <div className="font-mono text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-800 animate-pulse-subtle">
              {timeRemaining.workDays.toLocaleString('no-NO')}
            </div>
            <div className="text-slate-500 text-xs mt-2">
              Basert på 230 arbeidsdager per år
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-slate-500 text-sm font-light">
          <p className="mb-2">Nedtellingen oppdateres hvert sekund</p>
          <p>Beregnet med norsk arbeidskalender</p>
        </div>
      </div>
    </div>
  );
};

export default RetirementCountdown;
