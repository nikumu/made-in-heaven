"use client"

import { useState, useEffect, useRef } from 'react'

export default function Component() {
  const [time, setTime] = useState(new Date())
  const [initialTime] = useState(new Date())
  const [accelerated, setAccelerated] = useState(false)
  const [rotations, setRotations] = useState(0)
  const [stopped, setStopped] = useState(false)
  const [zaWarudoActive, setZaWarudoActive] = useState(false)
  const clockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      if (!stopped) {
        setTime(prevTime => {
          const newTime = new Date(prevTime)
          newTime.setMilliseconds(newTime.getMilliseconds() + (accelerated ? 2500 : 50))
          return newTime
        })
      }
    }, 50)

    return () => clearInterval(timer)
  }, [accelerated, stopped])

  useEffect(() => {
    if (accelerated) {
      if (rotations < 100) {
        const rotationTimer = setTimeout(() => {
          setRotations(prev => prev + 1)
        }, 100)
        return () => clearTimeout(rotationTimer)
      } else {
        setAccelerated(false)
        setRotations(0)
      }
    }
  }, [accelerated, rotations])

  const handleMadeInHeaven = () => {
    setAccelerated(true)
    setRotations(0)
  }

  const handleNormal = () => {
    setAccelerated(false)
    setRotations(0)
    setTime(new Date(initialTime))
    setZaWarudoActive(false)
  }

  const handleZaWarudo = () => {
    setStopped(true)
    setZaWarudoActive(true)
    setTimeout(() => {
      setStopped(false)
      setZaWarudoActive(false)
    }, 6000)
  }

  const hour = time.getHours() % 12
  const minute = time.getMinutes()
  const second = time.getSeconds()
  const millisecond = time.getMilliseconds()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div 
        ref={clockRef}
        className={`relative w-64 h-64 rounded-full shadow-xl ${zaWarudoActive ? 'bg-black' : 'bg-white'}`}
      >
        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute w-full h-full">
            <div
              style={{
              }}
            />
            <span
              className={`absolute text-xl font-bold ${zaWarudoActive ? 'text-white' : 'text-black'}`}
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 30}deg) translate(0, -88px) rotate(-${i * 30}deg)`,
              }}
            >
              {i === 0 ? 12 : i}
            </span>
          </div>
        ))}
        <div
          className={`absolute top-1/2 left-1/2 w-1.5 h-16 rounded-full origin-bottom ${zaWarudoActive ? 'bg-white' : 'bg-black'}`}
          style={{
            transform: `translate(-50%, -100%) rotate(${(hour + minute / 60) * 30}deg)`,
          }}
        />
        <div
          className={`absolute top-1/2 left-1/2 w-1 h-24 rounded-full origin-bottom ${zaWarudoActive ? 'bg-white' : 'bg-black'}`}
          style={{
            transform: `translate(-50%, -100%) rotate(${(minute + second / 60) * 6}deg)`,
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-0.5 h-28 bg-red-500 rounded-full origin-bottom"
          style={{
            transform: `translate(-50%, -100%) rotate(${(second + millisecond / 1000) * 6}deg)`,
          }}
        />
        <div className={`absolute top-1/2 left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${zaWarudoActive ? 'bg-white' : 'bg-black'}`} />
      </div>
      <div className="mt-8 flex flex-col space-y-4"> 
        <button
          onClick={handleNormal}
          className="px-6 py-2 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition-colors duration-300"
        >
          Normal
        </button>

        <button
          onClick={handleMadeInHeaven}
          className="px-6 py-2 bg-purple-500 text-black font-bold rounded-full hover:bg-purple-400 transition-colors duration-300"
          disabled={accelerated}
        >
          Made in Heaven
        </button>

        <button
          onClick={handleZaWarudo}
          className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition-colors duration-300"
          disabled={stopped}
        >
          ZA WARUDO
        </button>
      </div>
    </div>
  )
}
