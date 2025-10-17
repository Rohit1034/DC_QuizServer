// =======================================
// RESPONSIVE DESIGN VALIDATION
// Online Quiz System - Breakpoint Testing
// =======================================

import React from 'react';

export const ResponsiveTestPage: React.FC = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const breakpoints = {
    mobile: { width: '375px', label: 'Mobile (375px)' },
    tablet: { width: '1024px', label: 'Tablet (1024px)' },
    desktop: { width: '1440px', label: 'Desktop (1440px)' }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Breakpoint Selector */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Responsive Design Validation</h1>
        <div className="flex space-x-4">
          {Object.entries(breakpoints).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setCurrentBreakpoint(key as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentBreakpoint === key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {value.label}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Design Guidelines */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Design System Breakpoints</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mobile Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3">📱 Mobile (375px+)</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Single column layouts</li>
              <li>• Stacked navigation (hamburger menu)</li>
              <li>• Full-width cards and forms</li>
              <li>• Larger touch targets (44px min)</li>
              <li>• Reduced padding and margins</li>
              <li>• Simplified quiz navigation</li>
              <li>• Collapsible sidebar content</li>
            </ul>
          </div>

          {/* Tablet Guidelines */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-3">📟 Tablet (1024px+)</h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li>• Two-column layouts</li>
              <li>• Condensed navigation bar</li>
              <li>• Adaptive card grids (2 columns)</li>
              <li>• Medium spacing scales</li>
              <li>• Quiz sidebar becomes overlay</li>
              <li>• Admin panels stack vertically</li>
              <li>• Touch-optimized interactions</li>
            </ul>
          </div>

          {/* Desktop Guidelines */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-3">💻 Desktop (1440px+)</h3>
            <ul className="text-sm text-purple-800 space-y-2">
              <li>• Multi-column layouts (3-4 columns)</li>
              <li>• Full horizontal navigation</li>
              <li>• Complex dashboard grids</li>
              <li>• Generous spacing and padding</li>
              <li>• Side-by-side quiz layout</li>
              <li>• Advanced admin interfaces</li>
              <li>• Hover states and animations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Component Responsive Patterns */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Component Responsive Patterns</h2>
        
        <div className="space-y-6">
          {/* Header Navigation */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Header Navigation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-blue-600">Mobile:</strong>
                <p className="text-gray-600">Hamburger menu, logo only, notification badge</p>
              </div>
              <div>
                <strong className="text-green-600">Tablet:</strong>
                <p className="text-gray-600">Compact nav items, user avatar, search icon</p>
              </div>
              <div>
                <strong className="text-purple-600">Desktop:</strong>
                <p className="text-gray-600">Full navigation menu, search bar, user dropdown</p>
              </div>
            </div>
          </div>

          {/* Quiz Interface */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Quiz Taking Interface</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-blue-600">Mobile:</strong>
                <p className="text-gray-600">Full-screen question, bottom navigation, timer overlay</p>
              </div>
              <div>
                <strong className="text-green-600">Tablet:</strong>
                <p className="text-gray-600">Question + sidebar toggle, floating timer</p>
              </div>
              <div>
                <strong className="text-purple-600">Desktop:</strong>
                <p className="text-gray-600">Side-by-side layout, persistent sidebar, header timer</p>
              </div>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Dashboard Grid System</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-blue-600">Mobile:</strong>
                <p className="text-gray-600">Single column, stacked KPI cards, simplified charts</p>
              </div>
              <div>
                <strong className="text-green-600">Tablet:</strong>
                <p className="text-gray-600">2-column grid, condensed sidebar, tabbed content</p>
              </div>
              <div>
                <strong className="text-purple-600">Desktop:</strong>
                <p className="text-gray-600">4-column grid, full sidebar, complex layouts</p>
              </div>
            </div>
          </div>

          {/* Form Layouts */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Form Layouts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-blue-600">Mobile:</strong>
                <p className="text-gray-600">Single column forms, full-width inputs, stacked buttons</p>
              </div>
              <div>
                <strong className="text-green-600">Tablet:</strong>
                <p className="text-gray-600">Two-column forms, grouped inputs, inline buttons</p>
              </div>
              <div>
                <strong className="text-purple-600">Desktop:</strong>
                <p className="text-gray-600">Multi-column forms, side-by-side inputs, action bars</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Classes for Responsive Design */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tailwind Responsive Classes</h2>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">
{`/* Grid System Examples */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- KPI Cards -->
</div>

/* Navigation Examples */
<nav className="hidden md:flex items-center space-x-6">
  <!-- Desktop Navigation -->
</nav>
<button className="md:hidden p-2">
  <!-- Mobile Hamburger -->
</button>

/* Layout Examples */
<div className="flex flex-col lg:flex-row gap-6">
  <aside className="w-full lg:w-64 lg:flex-shrink-0">
    <!-- Sidebar -->
  </aside>
  <main className="flex-1">
    <!-- Main Content -->
  </main>
</div>

/* Spacing Examples */
<div className="px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
  <!-- Responsive Padding -->
</div>

/* Typography Examples */
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  <!-- Responsive Text Size -->
</h1>

/* Button Examples */
<button className="w-full md:w-auto px-4 py-2">
  <!-- Full width on mobile, auto on desktop -->
</button>`}
          </pre>
        </div>
      </div>

      {/* Testing Checklist */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Responsive Testing Checklist</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Layout Testing</h3>
            <div className="space-y-2 text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>All content fits within viewport</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>No horizontal scrolling on mobile</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Grid layouts adapt properly</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Sidebars collapse/expand correctly</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Cards and components stack properly</span>
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Interaction Testing</h3>
            <div className="space-y-2 text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Touch targets are 44px minimum</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Forms are easy to fill on mobile</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Navigation is accessible on all devices</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Modals and overlays work properly</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Quiz taking works on all screen sizes</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveTestPage;