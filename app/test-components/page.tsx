'use client'

import { NeumorphicButton } from '@/components/NeumorphicButton/NeumorphicButton'
import { NeumorphicCard } from '@/components/NeumorphicCard/NeumorphicCard'
import { ServiceCard } from '@/components/ServiceCard/ServiceCard'
import { NeumorphicNav } from '@/components/NeumorphicNav/NeumorphicNav'
import { Icon } from '@/components/Icon/Icon'

export default function TestComponents() {
  return (
    <>
      <div className="animated-gradient-bg fixed inset-0 -z-10"></div>
      <div className="frosted-glass-bg fixed inset-0 -z-5"></div>
      <div className="min-h-screen py-20 px-8 relative">
        {/* Navigation */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8">Navigation Component:</h2>
      </div>

      {/* Logo Text */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8">Logo Text Styles:</h2>
        <div className="space-y-8">
          <h1 className="neumorphic-text-3d">PHOEBUS</h1>
          <h2 className="plastic-tube-text">DIGITAL EXCELLENCE</h2>
          <p className="matter-plastic-light">Transforming Ideas Into Reality</p>
        </div>
      </div>

      {/* NeumorphicNav */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8">Neumorphic Nav Pills:</h2>
        <NeumorphicNav 
          items={[
            { label: 'Strategy' },
            { label: 'Design' },
            { label: 'Development' },
            { label: 'Growth' }
          ]}
          defaultActive={0}
        />
      </div>

      {/* Buttons */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8">Neumorphic Buttons (all sizes):</h2>
        <div className="flex gap-6 flex-wrap">
          <NeumorphicButton size="small">Small Button</NeumorphicButton>
          <NeumorphicButton size="medium">Medium Button</NeumorphicButton>
          <NeumorphicButton size="large">Large Button</NeumorphicButton>
        </div>
      </div>

      {/* Cards */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8">Neumorphic Cards:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NeumorphicCard>
            <h3 className="text-xl font-semibold mb-4">Basic Card</h3>
            <p>This is a basic neumorphic card with content inside.</p>
          </NeumorphicCard>
          
          <NeumorphicCard>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-4">Card with Padding</h3>
              <p>Another card example with different content.</p>
            </div>
          </NeumorphicCard>

          <NeumorphicCard>
            <div className="aspect-square flex items-center justify-center">
              <Icon name="design_services" className="text-6xl" />
            </div>
          </NeumorphicCard>
        </div>
      </div>

      {/* Service Cards */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8">Service Cards:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Web Development"
            description="Custom web solutions built with cutting-edge technology"
            icon="code"
            features={[
              "React & Next.js Development",
              "Full-Stack Applications",
              "API Integration",
              "Performance Optimization",
              "Progressive Web Apps",
              "E-commerce Solutions"
            ]}
          />
          <ServiceCard
            title="UI/UX Design"
            description="Beautiful, intuitive interfaces that users love"
            icon="design_services"
            features={[
              "User Interface Design",
              "User Experience Research",
              "Wireframing & Prototyping",
              "Design Systems",
              "Responsive Design",
              "Accessibility Standards"
            ]}
          />
          <ServiceCard
            title="Digital Strategy"
            description="Data-driven strategies for sustainable growth"
            icon="analytics"
            features={[
              "Market Analysis",
              "SEO Optimization",
              "Content Strategy",
              "Analytics Setup",
              "Conversion Optimization",
              "Growth Planning"
            ]}
          />
        </div>
      </div>

      {/* Hero Cards Layout (static) */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8">Hero Card Collage:</h2>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-4" style={{ height: '600px' }}>
            {/* Large card - spans 5 columns, 2 rows */}
            <div className="col-span-5 row-span-2">
              <NeumorphicCard>
                <div className="h-full flex items-center justify-center p-8">
                  <div>
                    <Icon name="rocket_launch" className="text-6xl mb-4" />
                    <h3 className="text-2xl font-bold">Innovation</h3>
                  </div>
                </div>
              </NeumorphicCard>
            </div>

            {/* Medium card - spans 3 columns */}
            <div className="col-span-3">
              <NeumorphicCard>
                <div className="h-full flex items-center justify-center p-6">
                  <div>
                    <Icon name="design_services" className="text-5xl mb-3" />
                    <h3 className="text-xl font-bold">Design</h3>
                  </div>
                </div>
              </NeumorphicCard>
            </div>

            {/* Small cards */}
            <div className="col-span-2">
              <NeumorphicCard>
                <div className="h-full flex items-center justify-center p-4">
                  <Icon name="code" className="text-4xl" />
                </div>
              </NeumorphicCard>
            </div>

            <div className="col-span-2">
              <NeumorphicCard>
                <div className="h-full flex items-center justify-center p-4">
                  <Icon name="analytics" className="text-4xl" />
                </div>
              </NeumorphicCard>
            </div>
          </div>
        </div>
      </div>

      {/* Icons */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-8">Material Icons:</h2>
        <div className="flex gap-6 flex-wrap">
          <Icon name="home" className="text-4xl" />
          <Icon name="settings" className="text-4xl" />
          <Icon name="person" className="text-4xl" />
          <Icon name="search" className="text-4xl" />
          <Icon name="menu" className="text-4xl" />
          <Icon name="close" className="text-4xl" />
          <Icon name="arrow_forward" className="text-4xl" />
          <Icon name="check_circle" className="text-4xl" />
        </div>
      </div>
    </div>
    </>
  )
}