'use client'

import { Icon } from '@/components/Icon/Icon'

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[#d4cfc7]/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-3 text-text-primary">Phoebus Digital</h3>
            <p className="text-sm text-text-secondary">
              Exceptionally fast and highly affordable web and app development services, exclusively for our personal network.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-3 text-text-primary">Contact</h3>
            <div className="space-y-2 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <Icon name="phone" className="text-base" />
                <span>+1 (416) 768-1201</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="email" className="text-base" />
                <span>phoebusdigitalsolutions@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="location_on" className="text-base" />
                <span>Serving clients globally, remotely</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-3 text-text-primary">Quick Links</h3>
            <div className="space-y-2 text-sm text-text-secondary">
              <div>Services</div>
              <div>Our Process</div>
              <div>Pricing</div>
              <div>About Us</div>
            </div>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-[#d4cfc7]/20">
          <p className="text-xs text-text-secondary/60">
            © 2025 Phoebus Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}