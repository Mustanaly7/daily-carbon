import React, { useState, useMemo } from 'react';
import { Search, Leaf, Info, Plus, Minus, Car, TreeDeciduous, Mail, Paperclip, Tv, Video, MessageSquare, Twitter, Smartphone, Cloud, Music, Instagram, Wifi, Laptop, Gamepad2, Bitcoin, Coffee, Apple, Banana, Pizza, Beer, Wine, Zap, Bus, Train, Plane, Bike, Footprints, Ship, Wind, Shirt, UtensilsCrossed, Lightbulb, LightbulbOff, ShowerHead, Bath, Droplets, ShoppingBag, Snowflake, ThermometerSun, Recycle, Beef, Drumstick, Sandwich, Candy, Utensils, Cookie, GlassWater, Bean, TrainFront, HelpCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Data
const activityData = [
  // DIGITAL
  { id: 'd1', name: 'Email (Text)', category: 'Digital', co2: 4, unit: 'per email', icon: 'Mail' },
  { id: 'd2', name: 'Email (Attachment)', category: 'Digital', co2: 50, unit: 'per email', icon: 'Paperclip' },
  { id: 'd3', name: 'Netflix (HD)', category: 'Digital', co2: 55, unit: 'per hour', icon: 'Tv' },
  { id: 'd4', name: 'Zoom Call', category: 'Digital', co2: 150, unit: 'per hour', icon: 'Video' },
  { id: 'd5', name: 'ChatGPT Query', category: 'Digital', co2: 4, unit: 'per query', icon: 'MessageSquare' },
  { id: 'd6', name: 'Tweet', category: 'Digital', co2: 0.2, unit: 'per tweet', icon: 'Twitter' },
  { id: 'd7', name: 'Google Search', category: 'Digital', co2: 0.2, unit: 'per search', icon: 'Search' },
  { id: 'd8', name: 'Smartphone Charge', category: 'Digital', co2: 5, unit: 'per charge', icon: 'Smartphone' },
  { id: 'd9', name: 'Cloud Storage 1GB', category: 'Digital', co2: 0.2, unit: 'per year', icon: 'Cloud' },
  { id: 'd10', name: 'TikTok', category: 'Digital', co2: 30, unit: 'per hour', icon: 'Music' },
  { id: 'd11', name: 'Instagram Scroll', category: 'Digital', co2: 1.5, unit: 'per min', icon: 'Instagram' },
  { id: 'd12', name: '4G Data Usage', category: 'Digital', co2: 300, unit: 'per GB', icon: 'Wifi' },
  { id: 'd13', name: 'Laptop Work', category: 'Digital', co2: 50, unit: 'per hour', icon: 'Laptop' },
  { id: 'd14', name: 'Online Gaming', category: 'Digital', co2: 75, unit: 'per hour', icon: 'Gamepad2' },
  { id: 'd15', name: 'Crypto Transaction', category: 'Digital', co2: 500, unit: 'per tx', icon: 'Bitcoin' },

  // FOOD
  { id: 'f1', name: 'Beef Burger', category: 'Food', co2: 3000, unit: 'per serving', icon: 'Beef' },
  { id: 'f2', name: 'Chicken Breast', category: 'Food', co2: 300, unit: 'per serving', icon: 'Drumstick' },
  { id: 'f3', name: 'Cheese Slice', category: 'Food', co2: 100, unit: 'per slice', icon: 'Sandwich' },
  { id: 'f4', name: 'Latte', category: 'Food', co2: 400, unit: 'per cup', icon: 'Coffee' },
  { id: 'f5', name: 'Black Coffee', category: 'Food', co2: 20, unit: 'per cup', icon: 'Coffee' },
  { id: 'f6', name: 'Apple', category: 'Food', co2: 35, unit: 'per fruit', icon: 'Apple' },
  { id: 'f7', name: 'Banana', category: 'Food', co2: 80, unit: 'per fruit', icon: 'Banana' },
  { id: 'f8', name: 'Chocolate Bar', category: 'Food', co2: 200, unit: 'per bar', icon: 'Candy' },
  { id: 'f9', name: 'Rice Bowl', category: 'Food', co2: 40, unit: 'per bowl', icon: 'Utensils' },
  { id: 'f10', name: 'Potato Chips', category: 'Food', co2: 40, unit: 'per bag', icon: 'Cookie' },
  { id: 'f11', name: 'Tap Water', category: 'Food', co2: 0.1, unit: 'per glass', icon: 'GlassWater' },
  { id: 'f12', name: 'Bottled Water', category: 'Food', co2: 150, unit: 'per bottle', icon: 'Droplets' },
  { id: 'f13', name: 'Beer Pint', category: 'Food', co2: 500, unit: 'per pint', icon: 'Beer' },
  { id: 'f14', name: 'Wine Glass', category: 'Food', co2: 200, unit: 'per glass', icon: 'Wine' },
  { id: 'f15', name: 'Pizza Slice', category: 'Food', co2: 600, unit: 'per slice', icon: 'Pizza' },
  { id: 'f16', name: 'Tofu', category: 'Food', co2: 150, unit: 'per serving', icon: 'Bean' },

  // TRANSPORT
  { id: 't1', name: 'Car (Gasoline)', category: 'Transport', co2: 192, unit: 'per km', icon: 'Car' },
  { id: 't2', name: 'Car (EV)', category: 'Transport', co2: 50, unit: 'per km', icon: 'Zap' },
  { id: 't3', name: 'Bus Ride', category: 'Transport', co2: 100, unit: 'per km', icon: 'Bus' },
  { id: 't4', name: 'Train Ride', category: 'Transport', co2: 40, unit: 'per km', icon: 'Train' },
  { id: 't5', name: 'Domestic Flight', category: 'Transport', co2: 250, unit: 'per km', icon: 'Plane' },
  { id: 't6', name: 'Cycling', category: 'Transport', co2: 0, unit: 'per km', icon: 'Bike' },
  { id: 't7', name: 'Walking', category: 'Transport', co2: 0, unit: 'per km', icon: 'Footprints' },
  { id: 't8', name: 'Motorbike', category: 'Transport', co2: 120, unit: 'per km', icon: 'Bike' },
  { id: 't9', name: 'Subway/Metro', category: 'Transport', co2: 30, unit: 'per km', icon: 'TrainFront' },
  { id: 't10', name: 'Ferry', category: 'Transport', co2: 120, unit: 'per km', icon: 'Ship' },

  // HOME
  { id: 'h1', name: 'Tumble Dryer', category: 'Home', co2: 2000, unit: 'per load', icon: 'Wind' },
  { id: 'h2', name: 'Washing Machine (40°C)', category: 'Home', co2: 700, unit: 'per load', icon: 'Shirt' },
  { id: 'h3', name: 'Dishwasher', category: 'Home', co2: 800, unit: 'per load', icon: 'UtensilsCrossed' },
  { id: 'h4', name: 'LED Bulb', category: 'Home', co2: 5, unit: 'per hour', icon: 'Lightbulb' },
  { id: 'h5', name: 'Incandescent Bulb', category: 'Home', co2: 50, unit: 'per hour', icon: 'LightbulbOff' },
  { id: 'h6', name: 'Hot Shower', category: 'Home', co2: 1000, unit: 'per 10min', icon: 'ShowerHead' },
  { id: 'h7', name: 'Bath', category: 'Home', co2: 2000, unit: 'per tub', icon: 'Bath' },
  { id: 'h8', name: 'Flush Toilet', category: 'Home', co2: 1, unit: 'per flush', icon: 'Droplets' },
  { id: 'h9', name: 'Plastic Bag', category: 'Home', co2: 10, unit: 'per bag', icon: 'ShoppingBag' },
  { id: 'h10', name: 'Paper Bag', category: 'Home', co2: 40, unit: 'per bag', icon: 'ShoppingBag' },
  { id: 'h11', name: 'Air Conditioner', category: 'Home', co2: 1500, unit: 'per hour', icon: 'Snowflake' },
  { id: 'h12', name: 'Electric Heater', category: 'Home', co2: 1200, unit: 'per hour', icon: 'ThermometerSun' },
  { id: 'h13', name: 'Microwave', category: 'Home', co2: 100, unit: 'per 5min', icon: 'Lightbulb' },
  { id: 'h14', name: 'Recycling', category: 'Home', co2: -50, unit: 'per bag', icon: 'Recycle' },
];

const iconMap = {
  Mail, Paperclip, Tv, Video, MessageSquare, Twitter, Search, Smartphone, Cloud, Music, 
  Instagram, Wifi, Laptop, Gamepad2, Bitcoin, Beef: Drumstick, Drumstick, Sandwich, 
  Coffee, Apple, Banana, Candy, Utensils, Cookie, GlassWater, Beer, Wine, Pizza, Bean,
  Car, Zap, Bus, Train, Plane, Bike, Footprints, Ship, TrainFront, Wind, Shirt, 
  UtensilsCrossed, Lightbulb, LightbulbOff, ShowerHead, Bath, Droplets, ShoppingBag, 
  Snowflake, ThermometerSun, Recycle, HelpCircle
};

// Activity Card Component
const ActivityCard = ({ item, count, onAdd, onRemove }) => {
  const LucideIcon = iconMap[item.icon] || HelpCircle;

  const categoryStyles = {
    Digital: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    Food: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    Transport: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    Home: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  };

  const isSelected = count > 0;

  return (
    <div className={`
      relative flex flex-col p-5 rounded-3xl border transition-all duration-300 group
      ${isSelected 
        ? 'bg-slate-900/80 border-emerald-500/50 shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)]' 
        : 'bg-slate-900/40 border-slate-800 hover:border-slate-600 hover:bg-slate-800/80'}
    `}>
      
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl border ${categoryStyles[item.category]}`}>
          <LucideIcon size={26} strokeWidth={2} />
        </div>
        {isSelected && (
          <div className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg">
            Active
          </div>
        )}
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-bold text-slate-100 leading-tight mb-1">{item.name}</h3>
        <div className="flex items-baseline gap-1 text-slate-400 text-sm">
          <span className={`font-mono font-bold ${isSelected ? 'text-emerald-400' : 'text-slate-300'}`}>
            {item.co2}g
          </span>
          <span className="opacity-60 text-xs uppercase tracking-wide">/ {item.unit}</span>
        </div>
      </div>

      {/* Footer Layout */}
      <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/5 w-full">
        
        <button 
          onClick={() => onAdd(item.id)}
          className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/50 transition-all min-w-0"
          aria-label="Increase count"
        >
          <Plus size={16} strokeWidth={3} />
          <span className="text-sm font-bold truncate">Add</span>
        </button>

        <div className={`font-mono text-2xl font-bold min-w-[2rem] text-center transition-colors ${
          count > 0 ? 'text-white' : 'text-slate-600'
        }`}>
          {count}
        </div>

        <button 
          onClick={() => onRemove(item.id)}
          disabled={count === 0}
          className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl border transition-all min-w-0 ${
            count === 0 
              ? 'opacity-50 cursor-not-allowed border-slate-700 bg-slate-800/50 text-slate-500' 
              : 'border-slate-700 text-slate-300 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400'
          }`}
          aria-label="Decrease count"
        >
          <Minus size={16} strokeWidth={3} />
          <span className="text-sm font-bold truncate">Remove</span>
        </button>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ log }) => {
  const { totalCO2, categoryData } = useMemo(() => {
    let total = 0;
    const cats = { Digital: 0, Food: 0, Transport: 0, Home: 0 };
    Object.entries(log).forEach(([id, count]) => {
      const item = activityData.find((i) => i.id === id);
      if (item) {
        const impact = item.co2 * count;
        total += impact;
        cats[item.category] += impact;
      }
    });
    return { 
      totalCO2: total, 
      categoryData: Object.keys(cats).map(k => ({ name: k, value: cats[k] })).filter(i => i.value > 0) 
    };
  }, [log]);

  const isNetPositive = totalCO2 <= 0; 
  const displayCO2 = Math.abs(totalCO2);
  const carKm = (totalCO2 / 192).toFixed(1);
  const treeDays = (totalCO2 / 60).toFixed(1);
  
  const COLORS = ['#3B82F6', '#F97316', '#A855F7', '#10B981'];

  return (
    // Changed: Responsive height (h-auto on mobile, h-full on desktop)
    <aside className="h-auto lg:h-full bg-gradient-to-b from-slate-900 to-slate-950 border-b lg:border-b-0 lg:border-r border-slate-700/50 shadow-2xl flex flex-col">
      <div className="p-6 md:p-8 flex flex-col h-full gap-6 md:gap-8">
        
        <div className="flex items-center gap-3 text-emerald-400">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10B981] animate-pulse"></div>
          <h2 className="text-sm font-bold uppercase tracking-widest">Impact</h2>
        </div>

        <div className="relative group">
          <div className={`absolute inset-0 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isNetPositive ? 'bg-emerald-500/20' : 'bg-red-500/10'}`}></div>
          <div className="relative bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 shadow-xl backdrop-blur-sm">
            <p className="text-slate-400 text-xs font-bold uppercase mb-2">
              {isNetPositive ? "Net Climate Impact" : "Total Carbon Footprint"}
            </p>
            <div className="flex items-baseline gap-2">
              <span className={`text-5xl font-black tracking-tighter ${isNetPositive ? 'text-emerald-400' : 'text-white'}`}>
                {isNetPositive && totalCO2 < 0 ? '-' : ''}{displayCO2.toLocaleString()}
              </span>
              <span className="text-xl font-bold text-emerald-500">g</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 bg-slate-900/40 px-3 py-1.5 rounded-lg w-fit">
              <Info size={12} />
              {(displayCO2 / 1000).toFixed(3)} kg CO₂e
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-700/30 text-center hover:bg-slate-800/50 transition-colors backdrop-blur-sm">
            <Car className="mx-auto text-blue-400 mb-2 opacity-80" size={28} />
            <div className="text-2xl font-bold text-white mb-1">{isNetPositive ? 0 : carKm}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Km Drive</div>
          </div>
          <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-700/30 text-center hover:bg-slate-800/50 transition-colors backdrop-blur-sm">
            <TreeDeciduous className="mx-auto text-emerald-400 mb-2 opacity-80" size={28} />
            <div className="text-2xl font-bold text-white mb-1">{isNetPositive ? 0 : treeDays}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Tree Days</div>
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-end min-h-[250px] bg-slate-800/20 rounded-3xl p-4 border border-slate-700/30 backdrop-blur-sm">
           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Emission Breakdown</h3>
           <div className="flex-grow relative h-64 lg:h-auto">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={categoryData} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={60} 
                    outerRadius={80} 
                    paddingAngle={5} 
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }} 
                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 px-4 text-center">
                {totalCO2 < 0 ? (
                  <>
                    <Recycle className="mb-2 text-emerald-500" size={32}/>
                    <span className="text-xs font-bold text-emerald-500">Climate Positive!</span>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-dashed mb-3"></div>
                    <span className="text-xs font-medium">Add data to visualize</span>
                  </>
                )}
              </div>
            )}
           </div>
           
           {categoryData.length > 0 && (
             <div className="flex flex-wrap justify-center gap-3 mt-4">
               {categoryData.map((entry, index) => (
                 <div key={entry.name} className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase font-bold">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                   {entry.name}
                 </div>
               ))}
             </div>
           )}
        </div>

      </div>
    </aside>
  );
};

// Main App Component
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [dailyLog, setDailyLog] = useState({});

  const addToLog = (id) => {
    setDailyLog(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromLog = (id) => {
    setDailyLog(prev => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const filteredData = activityData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Digital', 'Food', 'Transport', 'Home'];

  return (
    // Changed: min-h-screen, flex-col on mobile, flex-row on desktop
    <div className="min-h-screen w-full bg-slate-950 text-slate-200 font-sans flex flex-col lg:flex-row">
      
      {/* DASHBOARD AREA: Mobile (Top Block) | Desktop (Sticky Sidebar) */}
      <div className="w-full lg:w-[400px] flex-shrink-0 lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto z-20">
        <Dashboard log={dailyLog} />
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full bg-gradient-to-br from-slate-950 to-slate-900">
        <div className="p-6 md:p-8 lg:p-12 w-full">
          
          <header className="mb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <div className="bg-emerald-500 p-3 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)] text-white">
                <Leaf size={32} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">CO2 Tracker</h1>
                <p className="text-slate-400 mt-1 text-base sm:text-lg">Measure the real impact of your daily choices.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden focus-within:border-emerald-500 transition-colors">
                  <Search className="ml-5 text-slate-500" size={22} />
                  <input 
                    type="text" 
                    placeholder="Search activities..." 
                    className="w-full px-4 py-4 bg-transparent outline-none text-white placeholder:text-slate-600 text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${
                      activeCategory === cat 
                        ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/40 transform scale-105' 
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-[1900px]:grid-cols-5 gap-6 pb-20 w-full">
            {filteredData.length > 0 ? (
              filteredData.map(item => (
                <ActivityCard 
                  key={item.id} 
                  item={item} 
                  count={dailyLog[item.id] || 0}
                  onAdd={addToLog}
                  onRemove={removeFromLog}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center opacity-50">
                  <p className="text-xl">No activities found.</p>
              </div>
            )}
          </div>

          <footer className="mt-10 pt-10 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center text-slate-500 text-sm gap-4 w-full">
              <div className="flex items-center gap-2">
                <Info size={16} />
                <span>Data Sources:</span>
              </div>
              <p className="opacity-70 text-center sm:text-right">Estimates based on OWID & EPA averages.</p>
          </footer>
        </div>
      </main>
      
    </div>
  );
};

export default App;