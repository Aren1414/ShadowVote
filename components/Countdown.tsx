"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} | null;

export default function Countdown({ endDate }: { endDate: string }) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference =
      new Date(endDate).getTime() - new Date().getTime();

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / 1000 / 60) % 60
      ),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] =
    useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!timeLeft) {
    return (
      <span className="text-red-600 text-sm font-medium">
        Poll Closed
      </span>
    );
  }

  return (
    <span className="text-sm text-gray-500">
      Ends in {timeLeft.days}d {timeLeft.hours}h{" "}
      {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
}
