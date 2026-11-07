import { useEffect, useMemo, useRef, useState } from 'react';
import Auth from './components/Auth';
import './App.css';

const FOOD = [
  {
    id: 1,
    name: 'The double smash',
    restaurant: 'The Good Burger',
    category: 'Burgers',
    price: 14.5,
    rating: '4.9',
    time: '20–30 min',
    tag: 'Bestseller',
    image: 'photo-1568901346375-23c9450c58cd',
    description: 'Two smashed patties, melted cheddar, ripe tomato & our house sauce.',
  },
  {
    id: 2,
    name: 'Wood-fired classic',
    restaurant: 'Pizzeria Luca',
    category: 'Pizza',
    price: 18,
    rating: '4.8',
    time: '25–35 min',
    tag: 'Fan favorite',
    image: 'photo-1579751626657-72bc17010498',
    description: 'Blistered crust straight from the oven, San Marzano tomato & mozzarella.',
  },
  {
    id: 3,
    name: 'Rainbow chickpea bowl',
    restaurant: 'Little Green',
    category: 'Healthy',
    price: 16.75,
    rating: '4.9',
    time: '15–25 min',
    tag: 'Fresh pick',
    image: 'photo-1512621776951-a57141f2eefd',
    description: 'Avocado, roasted chickpeas, crunchy slaw, sweet peppers & tahini.',
  },
  {
    id: 4,
    name: 'Slow-cooked beef penne',
    restaurant: 'Pasta Social',
    category: 'Pasta',
    price: 17.25,
    rating: '4.7',
    time: '20–30 min',
    tag: 'House made',
    image: 'photo-1621996346565-e3dbc646d9a9',
    description: 'Fresh penne in a rich six-hour beef ragù, finished with parmesan.',
  },
  {
    id: 5,
    name: 'Loaded chicken brioche',
    restaurant: 'The Good Burger',
    category: 'Burgers',
    price: 13.25,
    rating: '4.8',
    time: '20–30 min',
    tag: 'Bestseller',
    image: 'photo-1606755962773-d324e0a13086',
    description: 'Buttery brioche piled with chicken, crunchy pickles & tangy sauce.',
  },
  {
    id: 6,
    name: 'Rosemary four-cheese',
    restaurant: 'Pizzeria Luca',
    category: 'Pizza',
    price: 15.5,
    rating: '4.6',
    time: '20–30 min',
    tag: 'Veggie',
    image: 'photo-1513104890138-7c749659a591',
    description: 'Charred crust, four melted cheeses & a handful of fresh rosemary.',
  },
  {
    id: 7,
    name: 'Golden chicken tenders',
    restaurant: 'Bird & Batter',
    category: 'Comfort food',
    price: 12.5,
    rating: '4.8',
    time: '15–25 min',
    tag: 'Crowd pleaser',
    image: 'photo-1562967914-608f82629710',
    description: 'Hand-breaded, extra crispy tenders with our signature dip.',
  },
  {
    id: 8,
    name: 'Blueberry banana pancakes',
    restaurant: 'Sunday Morning',
    category: 'Breakfast',
    price: 11.75,
    rating: '4.9',
    time: '20–30 min',
    tag: 'Sweet treat',
    image: 'photo-1528207776546-365bb710ee93',
    description: 'A fluffy buttermilk stack, fresh blueberries, banana & warm maple.',
  },
];

const ALL = 'All dishes';
const SAVED = 'Saved';
const FREE_DELIVERY_AT = 35;

const CATEGORIES = [
  { name: ALL, emoji: '🍽️' },
  { name: 'Burgers', emoji: '🍔' },
  { name: 'Pizza', emoji: '🍕' },
  { name: 'Healthy', emoji: '🥑' },
  { name: 'Pasta', emoji: '🍝' },
  { name: 'Comfort food', emoji: '🍗' },
  { name: 'Breakfast', emoji: '🥞' },
];

const ICONS = {
  arrow: <path d="M7 17 17 7M8 7h9v9" />,
  bag: <path d="M6 8h12l1 12H5L6 8Zm3 0V6a3 3 0 0 1 6 0v2" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.500 15.400 12 20 12 20Z" />,
  lock: <path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z" />,
  pin: <path d="M12 21s7-6.100 7-11.500a7 7 0 1 0-14 0C5 14.900 12 21 12 21Zm0-9a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5Z" />,
  scooter: <path d="M6 18a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5Zm12 0a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5ZM8.500 15.500H15c0-4 1-6 3-7l-1-3h-2.500M3 11h6l1.500 4.500" />,
  search: <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm9 2-4-4" />,
  star: <path d="m12 4 2.400 5.100 5.600.700-4.100 3.800 1.100 5.500L12 16.400l-5 2.700 1.100-5.500L4 9.800l5.600-.700L12 4Z" />,
};

function Icon({ name, size = 20, filled = false }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

const money = (value) => `$${value.toFixed(2)}`;
const imageUrl = (id, width = 700) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

// Keeps the layout intact when the image CDN is unreachable (offline demos, locked-down networks).
function FoodImage({ id, width, alt, ...props }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="image-fallback" role="img" aria-label={alt}>🍽️</div>;
  return <img src={imageUrl(id, width)} alt={alt} onError={() => setFailed(true)} {...props} />;
}

function Brand({ className = '' }) {
  return (
    <a className={`brand ${className}`} href="#top" aria-label="Crave Club home">
      <span className="brand-mark">c<span>.</span></span>
      <span className="brand-name">crave<span>club</span></span>
    </a>
  );
}

function Quantity({ item, onChange }) {
  return (
    <div className="quantity-control">
      <button onClick={() => onChange(item.id, -1)} aria-label={`Remove one ${item.name}`}>−</button>
      <span aria-live="polite">{item.quantity}</span>
      <button onClick={() => onChange(item.id, 1)} aria-label={`Add one ${item.name}`}>+</button>
    </div>
  );
}

function readStored(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const searchInputRef = useRef(null);
  const toastTimer = useRef(null);
  const [user, setUser] = useState(() => readStored('user', null));
  const [cart, setCart] = useState(() => {
    const savedCart = readStored('crave-cart', []);
    return Array.isArray(savedCart) ? savedCart : [];
  });
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = readStored('crave-favorites', []);
    return Array.isArray(savedFavorites)
      ? savedFavorites.filter((id) => FOOD.some((item) => item.id === id))
      : [];
  });
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [search, setSearch] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [toast, setToast] = useState('');
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [order, setOrder] = useState(null);

  const closeCart = () => {
    setCartOpen(false);
    setCheckout(false);
  };

  useEffect(() => {
    const handleKeys = (event) => {
      const isSearchShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      const isSlashShortcut = event.key === '/' && !event.target.matches('input, textarea, [contenteditable="true"]');
      if (isSearchShortcut || isSlashShortcut) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.key === 'Escape') {
        setCartOpen(false);
        setCheckout(false);
        setAuthOpen(false);
        setOrder(null);
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, []);

  const overlayOpen = cartOpen || authOpen || Boolean(order);
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [overlayOpen]);

  const filteredFood = useMemo(() => FOOD.filter((item) => {
    const matchesCategory = activeCategory === ALL
      || (activeCategory === SAVED ? favorites.includes(item.id) : item.category === activeCategory);
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || `${item.name} ${item.restaurant} ${item.category} ${item.description}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  }), [activeCategory, search, favorites]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_AT ? 0 : 2.99;
  const tax = subtotal * 0.08;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + delivery + tax - discount;
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const updateCart = (nextCart) => {
    setCart(nextCart);
    localStorage.setItem('crave-cart', JSON.stringify(nextCart));
  };

  const notify = (message) => {
    window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(''), 2600);
  };

  const addToCart = (food) => {
    updateCart([...cart, { ...food, quantity: 1 }]);
    notify(`${food.name} added to your bag`);
  };

  const toggleFavorite = (food) => {
    const isFavorite = favorites.includes(food.id);
    const nextFavorites = isFavorite
      ? favorites.filter((id) => id !== food.id)
      : [...favorites, food.id];
    setFavorites(nextFavorites);
    localStorage.setItem('crave-favorites', JSON.stringify(nextFavorites));
    notify(isFavorite ? `${food.name} removed from your favorites` : `${food.name} saved to your favorites`);
  };

  const changeQuantity = (id, amount) => {
    updateCart(cart
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0));
  };

  const handleLogin = (token, loggedInUser) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setAuthOpen(false);
    notify(`Welcome${loggedInUser?.name ? `, ${loggedInUser.name.split(' ')[0]}` : ' back'}!`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    notify('You have been signed out');
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'CRAVE10') {
      setCouponApplied(true);
      notify('10% off — nice one!');
    } else {
      notify('Try code CRAVE10 for 10% off');
    }
  };

  const placeOrder = (event) => {
    event.preventDefault();
    if (!cart.length) return;
    const form = new FormData(event.currentTarget);
    setOrder({
      number: Math.floor(100000 + Math.random() * 900000),
      name: form.get('name'),
      address: form.get('address'),
      items: itemCount,
      eta: '25–35 minutes',
    });
    updateCart([]);
    closeCart();
    setCouponApplied(false);
    setCoupon('');
  };

  const resetFilters = () => {
    setSearch('');
    setActiveCategory(ALL);
  };

  const scrollToMenu = () => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });

  const chips = [...CATEGORIES, { name: SAVED, emoji: '❤️', count: favorites.length }];

  return (
    <div className="app-shell">
      <div className="announcement">Free delivery on orders over ${FREE_DELIVERY_AT}. Use <strong>CRAVE10</strong> for 10% off your first bag.</div>

      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <button className="delivery-location" onClick={() => notify('Delivering to Brooklyn, NY')}>
            <Icon name="pin" size={18} />
            <span><small>Delivering to</small><strong>Brooklyn, NY</strong></span>
          </button>
          <nav className="header-links" aria-label="Main navigation">
            <a href="#menu">Explore</a>
            <a href="#how-it-works">How it works</a>
          </nav>
          <div className="header-actions">
            {user ? (
              <button className="user-button" onClick={handleLogout} title="Sign out">
                <span className="avatar">{user.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                <span className="user-name">{user.name?.split(' ')[0] || 'Account'} · Sign out</span>
              </button>
            ) : (
              <button className="login-button" onClick={() => { setAuthMode('login'); setAuthOpen(true); }}>Log in</button>
            )}
            <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Open bag, ${itemCount} items`}>
              <Icon name="bag" size={18} />
              <span className="bag-label">Your bag</span>
              <span className="bag-count">{itemCount}</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">Your neighborhood, delivered</div>
            <h1>A little joy. Right to your <em>door.</em></h1>
            <p>Good food from the spots you love, and the ones you’re about to. Delivered while it’s still delicious.</p>
            <div className="hero-actions">
              <button className="primary-button on-dark" onClick={scrollToMenu}>Find your next favorite <Icon name="arrow" size={18} /></button>
              <a className="text-link" href="#how-it-works">How it works</a>
            </div>
            <dl className="hero-stats">
              <div><dt>4.9★</dt><dd>neighborhood rating</dd></div>
              <div><dt>25 min</dt><dd>average delivery</dd></div>
              <div><dt>12k+</dt><dd>happy neighbors</dd></div>
            </dl>
          </div>
          <div className="hero-art">
            <div className="plate">
              <FoodImage id="photo-1574071318508-1cdbab80d002" width={1100} alt="Freshly baked margherita pizza topped with basil" fetchPriority="high" />
            </div>
            <svg className="spin-badge" viewBox="0 0 120 120" aria-hidden="true">
              <defs><path id="badge-circle" d="M60 60m-43 0a43 43 0 1 1 86 0a43 43 0 1 1-86 0" /></defs>
              <text><textPath href="#badge-circle">MADE WITH A LITTLE EXTRA LOVE • FRESH •</textPath></text>
            </svg>
            <div className="floating-note">
              <span className="note-icon"><Icon name="scooter" size={22} /></span>
              <span><strong>At your door</strong><small>in about 25 min</small></span>
            </div>
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-topline">
            <div>
              <div className="eyebrow">A very good place to start</div>
              <h2>What sounds <em>good?</em></h2>
            </div>
            <div className="search-box">
              <Icon name="search" size={20} />
              <input
                ref={searchInputRef}
                aria-label="Search dishes and restaurants"
                placeholder="Dishes, restaurants, cravings..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {search
                ? <button onClick={() => setSearch('')} aria-label="Clear search"><Icon name="close" size={16} /></button>
                : <kbd>Ctrl K</kbd>}
            </div>
          </div>

          <div className="category-list" role="group" aria-label="Filter by food category">
            {chips.map((category) => (
              <button
                key={category.name}
                className={`category-chip ${activeCategory === category.name ? 'selected' : ''}`}
                aria-pressed={activeCategory === category.name}
                onClick={() => setActiveCategory(category.name)}
              >
                <span>{category.emoji}</span>{category.name}
                {category.count > 0 && <b>{category.count}</b>}
              </button>
            ))}
          </div>

          <div className="food-grid">
            {filteredFood.map((food) => {
              const isFavorite = favorites.includes(food.id);
              const inCart = cart.find((item) => item.id === food.id);
              return (
                <article className="food-card" key={food.id}>
                  <div className="food-image-wrap">
                    <FoodImage id={food.image} alt={food.name} loading="lazy" />
                    <span className="food-tag">{food.tag}</span>
                    <button
                      className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
                      aria-label={isFavorite ? `Remove ${food.name} from favorites` : `Save ${food.name} to favorites`}
                      aria-pressed={isFavorite}
                      onClick={() => toggleFavorite(food)}
                    ><Icon name="heart" size={18} filled={isFavorite} /></button>
                  </div>
                  <div className="food-card-content">
                    <div className="food-meta">
                      <span className="food-rating"><Icon name="star" size={14} filled />{food.rating}</span>
                      <span>{food.time}</span>
                    </div>
                    <h3>{food.name}</h3>
                    <p className="food-restaurant">{food.restaurant}</p>
                    <p className="food-description">{food.description}</p>
                    <div className="food-footer">
                      <strong>{money(food.price)}</strong>
                      {inCart
                        ? <Quantity item={inCart} onChange={changeQuantity} />
                        : <button className="add-button" onClick={() => addToCart(food)} aria-label={`Add ${food.name} to bag`}>Add +</button>}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          {!filteredFood.length && (
            <div className="empty-results">
              <span>🥣</span>
              <h3>{activeCategory === SAVED && !search ? 'Nothing saved yet.' : 'No bites found just yet.'}</h3>
              <p>{activeCategory === SAVED && !search ? 'Tap the heart on a dish to keep it here.' : 'Try another search or choose a different category.'}</p>
              <button className="text-button" onClick={resetFilters}>Show me everything</button>
            </div>
          )}
        </section>

        <section className="promise-section" id="how-it-works">
          <div className="promise-inner">
            <div className="promise-heading">
              <div className="eyebrow">The Crave Club way</div>
              <h2>Good food. <em>No fuss.</em></h2>
              <p>A neighborhood favorite, from first tap to first bite.</p>
            </div>
            <ol className="promise-grid">
              <li><span className="promise-number">1</span><h3>Find your thing</h3><p>Browse the best local kitchens, picked with your cravings in mind.</p></li>
              <li><span className="promise-number">2</span><h3>Make it yours</h3><p>Choose your favorites, add a little extra, and we’ll handle the details.</p></li>
              <li><span className="promise-number">3</span><h3>Dig right in</h3><p>We bring it to your door fresh, fast, and ready for that first bite.</p></li>
            </ol>
          </div>
        </section>

        <section className="bottom-cta">
          <div>
            <div className="eyebrow">Your next great meal is right here</div>
            <h2>Go on, get a little crave-y.</h2>
          </div>
          <button className="primary-button on-accent" onClick={scrollToMenu}>Explore the menu <Icon name="arrow" size={18} /></button>
        </section>
      </main>

      <footer className="site-footer">
        <Brand className="footer-brand" />
        <p>Good food brings us together.</p>
        <small>© 2026 Crave Club</small>
      </footer>

      {toast && <div className="toast" role="status"><span><Icon name="check" size={14} /></span>{toast}</div>}

      {cartOpen && (
        <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) closeCart(); }}>
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Your bag">
            <div className="drawer-header">
              <div>
                <div className="eyebrow">{checkout ? 'Almost time to eat' : 'The good stuff'}</div>
                <h2>{checkout ? 'Delivery details' : 'Your bag'} <span>({itemCount})</span></h2>
              </div>
              <button className="close-button" onClick={closeCart} aria-label="Close bag"><Icon name="close" size={18} /></button>
            </div>
            {!cart.length ? (
              <div className="empty-cart">
                <span>🥡</span>
                <h3>Your bag’s looking a little hungry.</h3>
                <p>Let’s fix that with something delicious.</p>
                <button className="primary-button" onClick={() => { closeCart(); scrollToMenu(); }}>Explore the menu <Icon name="arrow" size={18} /></button>
              </div>
            ) : checkout ? (
              <form className="checkout-form" onSubmit={placeOrder}>
                <p className="checkout-intro">Where should we bring all that goodness?</p>
                <label>Your name<input name="name" autoComplete="name" defaultValue={user?.name || ''} placeholder="Alex Morgan" required /></label>
                <label>Delivery address<input name="address" autoComplete="street-address" placeholder="123 Your Street, Apt 4" required /></label>
                <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="(555) 123-4567" required /></label>
                <label>Delivery note <span className="optional">(optional)</span><textarea name="note" rows="2" placeholder="Gate code, leave at the door..." /></label>
                <button className="primary-button checkout-submit" type="submit">Place order · {money(total)}</button>
                <button className="text-button back-to-bag" type="button" onClick={() => setCheckout(false)}>← Back to your bag</button>
              </form>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <FoodImage id={item.image} width={240} alt="" />
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>{item.restaurant}</p>
                        <div className="cart-item-row">
                          <strong>{money(item.price * item.quantity)}</strong>
                          <Quantity item={item} onChange={changeQuantity} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-bottom">
                  <div className="free-delivery">
                    <span>{subtotal >= FREE_DELIVERY_AT ? 'You unlocked free delivery!' : `Add ${money(FREE_DELIVERY_AT - subtotal)} more for free delivery`}</span>
                    <div className="progress"><i style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_AT) * 100)}%` }} /></div>
                  </div>
                  <div className="coupon-entry">
                    <input aria-label="Promo code" placeholder="Got a promo code?" value={coupon} onChange={(event) => { setCoupon(event.target.value); setCouponApplied(false); }} />
                    <button onClick={applyCoupon}>Apply</button>
                  </div>
                  {couponApplied && <div className="coupon-success">CRAVE10 applied — 10% off</div>}
                  <div className="totals">
                    <div><span>Subtotal</span><span>{money(subtotal)}</span></div>
                    <div><span>Delivery</span><span>{delivery === 0 ? 'Free' : money(delivery)}</span></div>
                    <div><span>Estimated tax</span><span>{money(tax)}</span></div>
                    {couponApplied && <div><span>Discount</span><span>−{money(discount)}</span></div>}
                    <div className="total-line"><strong>Total</strong><strong>{money(total)}</strong></div>
                  </div>
                  <button className="primary-button checkout-button" onClick={() => setCheckout(true)}>Continue to checkout <Icon name="arrow" size={18} /></button>
                  <div className="secure-note"><Icon name="lock" size={14} /> Safe, simple, and straight to your door.</div>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {authOpen && (
        <div className="overlay centered" onMouseDown={(event) => { if (event.target === event.currentTarget) setAuthOpen(false); }}>
          <div className="auth-modal" role="dialog" aria-modal="true" aria-label={authMode === 'login' ? 'Log in' : 'Create an account'}>
            <div className="auth-photo">
              <FoodImage id="photo-1565299624946-b28f40a0ae38" width={700} alt="" />
              <p>Good food brings us together.</p>
            </div>
            <div className="auth-panel">
              <button className="close-button auth-close" onClick={() => setAuthOpen(false)} aria-label="Close"><Icon name="close" size={18} /></button>
              <Auth initialMode={authMode} onLoginSuccess={handleLogin} onModeChange={setAuthMode} />
            </div>
          </div>
        </div>
      )}

      {order && (
        <div className="overlay centered" onMouseDown={(event) => { if (event.target === event.currentTarget) setOrder(null); }}>
          <div className="order-modal" role="dialog" aria-modal="true" aria-label="Order confirmed">
            <button className="close-button order-close" onClick={() => setOrder(null)} aria-label="Close"><Icon name="close" size={18} /></button>
            <div className="order-check"><Icon name="check" size={30} /></div>
            <div className="eyebrow">That was a good choice</div>
            <h2>It’s happening.</h2>
            <p>Thanks, {order.name}! Your {order.items === 1 ? 'item is' : `${order.items} items are`} being made fresh and will be at your door in about <strong>{order.eta}</strong>.</p>
            <dl className="order-details">
              <div><dt>Order number</dt><dd>#{order.number}</dd></div>
              <div><dt>Delivering to</dt><dd>{order.address}</dd></div>
            </dl>
            <button className="primary-button" onClick={() => setOrder(null)}>Sounds delicious</button>
            <small className="demo-order-note">Demo order · Connect a backend to accept real orders</small>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
