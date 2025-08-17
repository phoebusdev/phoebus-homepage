'use client'

import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { Navigation } from '@/components/Navigation/Navigation'
import { Icon } from '@/components/Icon/Icon'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const ParallaxProvider = dynamic(
  () => import('react-scroll-parallax').then(mod => mod.ParallaxProvider),
  { ssr: false }
)

const Parallax = dynamic(
  () => import('react-scroll-parallax').then(mod => mod.Parallax),
  { ssr: false }
)

// Team members data
const teamMembers = [
  {
    name: "Alex Chen",
    role: "Lead Developer",
    bio: "Full-stack developer with 8+ years building scalable web applications. Passionate about clean code and user experience.",
    skills: ["React", "Node.js", "PostgreSQL", "AWS"],
    image: "/team/alex.jpg", // Placeholder
    color: "bg-gradient-to-br from-[#e8d5f2] to-[#d0e8e3]"
  },
  {
    name: "Sarah Kim",
    role: "Design Lead",
    bio: "UI/UX designer focused on creating intuitive interfaces that users love. Believer in design systems and accessibility.",
    skills: ["Figma", "Design Systems", "UX Research", "Prototyping"],
    image: "/team/sarah.jpg", // Placeholder
    color: "bg-gradient-to-br from-[#d0e8e3] to-[#fce4d6]"
  },
  {
    name: "Marcus Rodriguez",
    role: "DevOps Engineer",
    bio: "Infrastructure specialist ensuring your applications run smoothly at scale. Expert in cloud architecture and automation.",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    image: "/team/marcus.jpg", // Placeholder
    color: "bg-gradient-to-br from-[#fce4d6] to-[#d5e3f0]"
  }
]

// Company values data
const values = [
  {
    icon: "transparency",
    title: "Radical Transparency",
    description: "No hidden costs, no scope creep, no surprises. We tell you exactly what we're building and why."
  },
  {
    icon: "schedule",
    title: "Reliable Delivery",
    description: "Fixed timelines that we actually meet. Your launch date is sacred to us."
  },
  {
    icon: "verified",
    title: "Quality First",
    description: "We'd rather build fewer features well than many features poorly. Quality is non-negotiable."
  },
  {
    icon: "trending_up",
    title: "Future-Proof",
    description: "Built to scale from day one. Your product grows with your business without rebuilds."
  }
]

// Company stats
const stats = [
  { number: "50+", label: "Projects Delivered" },
  { number: "98%", label: "On-Time Delivery" },
  { number: "4.9/5", label: "Client Rating" },
  { number: "100%", label: "Code Ownership" }
]

// Custom hook for stacked deck animation
function useStackedDeckAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      const triggerPoint = viewportHeight * 0.5
      const animationRange = viewportHeight * 1.5
      
      const scrollFromTrigger = triggerPoint - rect.top
      const rawProgress = Math.max(0, Math.min(1, scrollFromTrigger / animationRange))
      
      const easedProgress = rawProgress * rawProgress * (3 - 2 * rawProgress)
      
      setProgress(easedProgress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { containerRef, progress }
}

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { containerRef, progress } = useStackedDeckAnimation()

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!mounted) {
    return (
      <main className="min-h-screen relative">
        <Navigation />
        <div className="relative z-10">
          <section className="relative pt-4 pb-12 md:pt-6 md:pb-16 lg:pt-8 lg:pb-20 px-4 w-full">
            <div className="max-w-6xl mx-auto w-full">
              <div className="hero-neumorphic-card text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-relaxed font-display break-words neumorphic-text-3d mb-4">
                  <span className="plastic-tube-text">About Us</span>
                </h1>
                <p className="text-lg sm:text-xl text-text-secondary max-w-4xl mx-auto mb-8">
                  Building digital products that actually work, delivered when promised.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    )
  }

  return (
    <ParallaxProvider 
      scrollAxis="vertical"
      isDisabled={isMobile}
    >
      <main className="min-h-screen relative">
        <Navigation />

        <Parallax 
          translateY={[-20, 20]}
          className="absolute inset-0 z-0"
        >
          <div className="w-full h-[120vh] bg-gradient-to-br from-[rgba(232,213,242,0.03)] via-[rgba(208,232,227,0.03)] to-[rgba(252,228,214,0.02)]" />
        </Parallax>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center">
            <div className="max-w-5xl mx-auto w-full">
              <div className="transform scale-75 origin-center">
                <Parallax 
                  translateY={[-30, 30]} 
                  scale={[1.05, 0.95]}
                >
                  <div className="hero-neumorphic-card text-center">
                    <div className="relative z-10">
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed font-display break-words neumorphic-text-3d mb-6">
                        <span className="plastic-tube-text">About Phoebus Digital</span>
                      </h1>
                      <p className="text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto mb-8">
                        We're a team of developers and designers who believe <span className="matter-plastic-light">building software 
                        should be predictable</span>. No drama, no surprises, just <span className="matter-plastic-light">clean code 
                        delivered on time</span>.
                      </p>
                      <div className="flex gap-4 flex-wrap justify-center">
                        <NeumorphicButton>
                          Meet the Team
                        </NeumorphicButton>
                        <NeumorphicButton>
                          Our Process
                        </NeumorphicButton>
                      </div>
                    </div>
                  </div>
                </Parallax>
              </div>
            </div>
          </section>

          {/* Team Members - Stacked Deck Animation */}
          <section 
            ref={containerRef}
            className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center"
          >
            <div className="max-w-7xl mx-auto w-full">
              <div className="transform scale-75 origin-center" style={{ overflow: 'visible' }}>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                    Meet Our <span className="plastic-tube-text">Team</span>
                  </h2>
                  <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                    A small, focused team of experts who have been building digital products 
                    for over a decade. No account managers, no project coordinators—just builders.
                  </p>
                </div>
                
                <div className="relative h-96 flex items-center justify-center">
                  {teamMembers.map((member, idx) => {
                    const translateY = progress * idx * 180
                    const rotateX = progress * 10
                    const scale = 1 - progress * idx * 0.05
                    const zIndex = 3 - idx
                    
                    return (
                      <div
                        key={idx}
                        className="absolute transition-transform duration-75 ease-out"
                        style={{
                          transform: `translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`,
                          zIndex: zIndex,
                        }}
                      >
                        <TeamMemberCard member={member} index={idx} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Company Values Section */}
          <section className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center">
            <div className="max-w-7xl mx-auto w-full">
              <div className="transform scale-75 origin-center">
                <Parallax translateY={[-20, 10]}>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                      Our <span className="plastic-tube-text">Values</span>
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                      These aren't just words on a wall—they guide every decision we make 
                      and every line of code we write.
                    </p>
                  </div>
                </Parallax>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {values.map((value, idx) => (
                    <Parallax 
                      key={idx}
                      translateY={[20 + idx * 5, -10 - idx * 2]}
                      easing="easeOutQuad"
                    >
                      <ValueCard value={value} index={idx} />
                    </Parallax>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="scroll-snap-section min-h-screen py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12 flex items-center">
            <div className="max-w-5xl mx-auto w-full">
              <div className="transform scale-75 origin-center">
                <Parallax translateY={[-15, 15]}>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display neumorphic-text-3d mb-6">
                      Track Record That <span className="plastic-tube-text">Speaks</span>
                    </h2>
                    <p className="text-lg md:text-xl text-text-secondary">
                      Numbers don't lie. Our clients get what they pay for, when they expect it.
                    </p>
                  </div>
                </Parallax>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, idx) => (
                    <Parallax 
                      key={idx}
                      translateY={[30 + idx * 10, -15]}
                      easing="easeOutQuad"
                    >
                      <StatCard stat={stat} index={idx} />
                    </Parallax>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </ParallaxProvider>
  )
}

// Team Member Card Component
function TeamMemberCard({ member, index }: { member: any, index: number }) {
  return (
    <NeumorphicCard className={`w-80 h-64 ${member.color}`}>
      <div className="text-center p-6">
        <div className="w-16 h-16 bg-gradient-to-br from-shadow-light to-shadow-dark rounded-full mx-auto mb-3 flex items-center justify-center">
          <Icon name="person" className="text-2xl text-text-primary" />
        </div>
        <h3 className="text-xl font-display neumorphic-text-3d mb-1">{member.name}</h3>
        <div className="text-sm text-accent-sage font-display mb-2">{member.role}</div>
        <p className="text-xs text-text-secondary line-clamp-3 mb-3">{member.bio}</p>
        <div className="flex flex-wrap gap-1 justify-center">
          {member.skills.slice(0, 3).map((skill: string, idx: number) => (
            <span key={idx} className="text-xs bg-white/20 rounded px-2 py-1">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </NeumorphicCard>
  )
}

// Value Card Component
function ValueCard({ value, index }: { value: any, index: number }) {
  return (
    <NeumorphicCard className="h-full">
      <div className="text-center p-6">
        <Icon name={value.icon} className="text-4xl text-text-primary mb-4" />
        <h3 className="text-xl font-display neumorphic-text-3d mb-3">
          {value.title}
        </h3>
        <p className="text-text-secondary">
          {value.description}
        </p>
      </div>
    </NeumorphicCard>
  )
}

// Stat Card Component
function StatCard({ stat, index }: { stat: any, index: number }) {
  return (
    <NeumorphicCard className="text-center p-6">
      <div className="text-3xl font-bold text-text-primary mb-2">{stat.number}</div>
      <div className="text-sm text-text-secondary font-display">{stat.label}</div>
    </NeumorphicCard>
  )
}