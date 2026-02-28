"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icons using emoji (reliable and lightweight)
const Icons = {
  Bag: () => <span className="text-xl">🛍️</span>,
  Search: () => <span className="text-xl">🔍</span>,
  Menu: () => <span className="text-xl">☰</span>,
  Close: () => <span className="text-xl">✕</span>,
  Star: () => <span className="text-yellow-400 text-lg">★</span>,
  StarHalf: () => <span className="text-yellow-400 text-lg">½</span>,
  StarEmpty: () => <span className="text-gray-300 text-lg">☆</span>,
  Truck: () => <span className="text-xl">🚚</span>,
  Shield: () => <span className="text-xl">🛡️</span>,
  Leaf: () => <span className="text-xl">🌿</span>,
  Clock: () => <span className="text-xl">⏰</span>,
  Arrow: () => <span className="text-xl">→</span>,
  Heart: () => <span className="text-xl text-red-500">❤️</span>,
  HeartOutline: () => <span className="text-xl">🤍</span>,
  Minus: () => <span className="text-xl">−</span>,
  Plus: () => <span className="text-xl">+</span>,
  Rupee: () => <span className="text-xl">₹</span>,
  Sparkles: () => <span className="text-xl">✨</span>,
  Award: () => <span className="text-xl">🏆</span>,
  Users: () => <span className="text-xl">👥</span>,
  Package: () => <span className="text-xl">📦</span>,
  Phone: () => <span className="text-xl">📞</span>,
  Mail: () => <span className="text-xl">✉️</span>,
  Pin: () => <span className="text-xl">📍</span>,
  Up: () => <span className="text-xl">↑</span>,
  Cart: () => <span className="text-xl">🛒</span>,
  Flash: () => <span className="text-xl">⚡</span>,
  Fire: () => <span className="text-xl">🔥</span>,
  Check: () => <span className="text-xl text-green-500">✓</span>,
  Info: () => <span className="text-xl">ℹ️</span>,
  Trending: () => <span className="text-xl">📈</span>,
  Filter: () => <span className="text-xl">⚙️</span>,
  Sort: () => <span className="text-xl">↕️</span>,
  Cash: () => <span className="text-xl">💵</span>,
  WhatsApp: () => <span className="text-xl">💬</span>,
  Warning: () => <span className="text-xl">⚠️</span>,
  Share: () => <span className="text-xl">↗️</span>,
  Copy: () => <span className="text-xl">📋</span>,
  Home: () => <span className="text-xl">🏠</span>,
  Back: () => <span className="text-xl">↩️</span>
};

// Background images for hero and categories
const backgroundImages = {
  hero1: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&h=600&fit=crop&auto=format",
  hero2: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1200&h=600&fit=crop&auto=format",
  hero3: "https://images.unsplash.com/photo-1596090909277-123d8d0f1e2a?w=1200&h=600&fit=crop&auto=format",
  category1: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=300&fit=crop&auto=format",
  category2: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&h=300&fit=crop&auto=format",
  category3: "https://images.unsplash.com/photo-1596090909277-123d8d0f1e2a?w=600&h=300&fit=crop&auto=format",
  about: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop&auto=format"
};

// Product Data with exact pricing
const spices = [
  // Whole Spices
  {
    id: 1,
    name: "Black Pepper",
    description: "Whole Black Pepper - Bold & Aromatic",
    fullDescription: "Premium grade whole black pepper from the hills of Wayanad. Known for its sharp aroma and pungent flavor. Hand-picked, sun-dried, and carefully graded to bring you the finest quality pepper.",
    image: "/item (1).png",
    rating: 4.8,
    reviews: 2456,
    prices: { "100g": 99, "200g": 189, "400g": 369 },
    category: "whole",
    badge: "Bestseller",
    inStock: true,
    origin: "Wayanad, Kerala",
    harvestYear: 2024,
    benefits: ["Digestive Health", "Antioxidant Rich", "Boosts Metabolism"]
  },
  {
    id: 2,
    name: "Cardamom",
    description: "Green Cardamom - Queen of Spices",
    fullDescription: "Aromatic green cardamom with intense floral notes. Hand-picked from the high ranges of Idukki. Each pod is carefully selected for its size, color, and aroma.",
    image: "/item (2).png",
    rating: 4.9,
    reviews: 1890,
    prices: { "100g": 349, "200g": 679, "400g": 1349 },
    category: "whole",
    badge: "Premium",
    inStock: true,
    origin: "Idukki, Kerala",
    harvestYear: 2024,
    benefits: ["Oral Health", "Detoxification", "Freshens Breath"]
  },
  {
    id: 3,
    name: "Clove",
    description: "Premium Cloves - Intensely Aromatic",
    fullDescription: "Hand-picked cloves with high oil content. Known for their numbing warmth and intense aroma. Perfect for both sweet and savory dishes.",
    image: "/item (3).png",
    rating: 4.7,
    reviews: 987,
    prices: { "100g": 139, "200g": 269, "400g": 529 },
    category: "whole",
    badge: "Essential",
    inStock: true,
    origin: "Kollam, Kerala",
    harvestYear: 2024,
    benefits: ["Dental Care", "Digestive Aid", "Antimicrobial"]
  },
  {
    id: 4,
    name: "Cinnamon",
    description: "Ceylon Cinnamon - Sweet & Woody",
    fullDescription: "True Ceylon cinnamon sticks with sweet, woody aroma. Perfect for both sweet and savory dishes. Known as the 'true cinnamon' with delicate layers.",
    image: "/item (4).png",
    rating: 4.8,
    reviews: 1432,
    prices: { "100g": 99, "200g": 189, "400g": 369 },
    category: "whole",
    badge: "Aromatic",
    inStock: true,
    origin: "Kerala Hills",
    harvestYear: 2024,
    benefits: ["Blood Sugar Control", "Anti-inflammatory", "Heart Health"]
  },
  {
    id: 5,
    name: "Cumin (Jeera)",
    description: "Whole Cumin Seeds - Earthy & Warm",
    fullDescription: "Premium whole cumin seeds with strong earthy aroma. Essential for tempering and flavoring various dishes. Sourced from the finest farms.",
    image: "/item (5).png",
    rating: 4.8,
    reviews: 1876,
    prices: { "100g": 69, "200g": 129, "400g": 249 },
    category: "seeds",
    badge: "Popular",
    inStock: true,
    origin: "Palakkad, Kerala",
    harvestYear: 2024,
    benefits: ["Digestive Health", "Iron Rich", "Immunity Booster"]
  },
  {
    id: 6,
    name: "Fennel",
    description: "Sweet Fennel Seeds - Cooling",
    fullDescription: "Sweet and cooling fennel seeds, perfect as a post-meal digestive and mouth freshener. Known for its licorice-like flavor.",
    image: "/item (6).png",
    rating: 4.8,
    reviews: 1765,
    prices: { "100g": 49, "200g": 89, "400g": 169 },
    category: "seeds",
    badge: "Everyday",
    inStock: true,
    origin: "Palakkad, Kerala",
    harvestYear: 2024,
    benefits: ["Digestive Health", "Freshens Breath", "Cooling Effect"]
  },
  {
    id: 7,
    name: "Coriander Seeds",
    description: "Whole Coriander - Citrus & Floral",
    fullDescription: "Whole coriander seeds with citrusy and floral notes. Essential for pickling, spice blends, and tempering. Sun-dried for perfect flavor.",
    image: "/item (7).png",
    rating: 4.6,
    reviews: 1234,
    prices: { "100g": 29, "200g": 59, "400g": 109 },
    category: "seeds",
    badge: "Value",
    inStock: true,
    origin: "Madhya Pradesh",
    harvestYear: 2024,
    benefits: ["Digestive Aid", "Antioxidant", "Blood Sugar Control"]
  },
  {
    id: 8,
    name: "Mustard Seeds",
    description: "Black Mustard Seeds - Pungent",
    fullDescription: "Black mustard seeds with intense pungent flavor. Essential for tempering in Indian cooking. Pop them in hot oil for aromatic flavor.",
    image: "/item (8).png",
    rating: 4.7,
    reviews: 987,
    prices: { "100g": 29, "200g": 59, "400g": 109 },
    category: "seeds",
    badge: "Essential",
    inStock: true,
    origin: "Rajasthan",
    harvestYear: 2024,
    benefits: ["Anti-inflammatory", "Rich in Minerals", "Digestive Health"]
  },
  {
    id: 9,
    name: "Fenugreek",
    description: "Methi Seeds - Slightly Bitter",
    fullDescription: "Fenugreek seeds with distinctive slightly bitter taste. Known for its health benefits and used in pickles and spice blends.",
    image: "/item (9).png",
    rating: 4.6,
    reviews: 765,
    prices: { "100g": 29, "200g": 59, "400g": 109 },
    category: "seeds",
    badge: "Healthy",
    inStock: true,
    origin: "Rajasthan",
    harvestYear: 2024,
    benefits: ["Blood Sugar Control", "Digestive Health", "Lactation Aid"]
  },
  // Powder Spices
  {
    id: 10,
    name: "Turmeric Powder",
    description: "Pure Turmeric - High Curcumin",
    fullDescription: "Golden turmeric powder with high curcumin content. Sourced from the traditional farms of Alleppey. Known for its anti-inflammatory properties.",
    image: "/item (10).png",
    rating: 4.9,
    reviews: 3210,
    prices: { "100g": 39, "200g": 69, "400g": 129 },
    category: "powder",
    badge: "Bestseller",
    inStock: true,
    origin: "Alleppey, Kerala",
    harvestYear: 2024,
    benefits: ["Anti-inflammatory", "Immunity Booster", "Natural Healer"]
  },
  {
    id: 11,
    name: "Chilli Powder",
    description: "Kashmiri Chilli - Vibrant Color",
    fullDescription: "Mild heat, vibrant red color chilli powder. Perfect for adding color without excessive heat. Sourced from the valleys of Kashmir.",
    image: "/item (11).png",
    rating: 4.7,
    reviews: 2456,
    prices: { "100g": 59, "200g": 109, "400g": 209 },
    category: "powder",
    badge: "Popular",
    inStock: true,
    origin: "Kashmir Valley",
    harvestYear: 2024,
    benefits: ["Rich in Vitamin C", "Adds Color", "Boosts Metabolism"]
  },
  {
    id: 12,
    name: "Coriander Powder",
    description: "Ground Coriander - Citrus Notes",
    fullDescription: "Freshly ground coriander powder from premium quality seeds. Retains the citrusy and floral notes. Essential for everyday cooking.",
    image: "/item (12).png",
    rating: 4.6,
    reviews: 1876,
    prices: { "100g": 39, "200g": 69, "400g": 129 },
    category: "powder",
    badge: "Value",
    inStock: true,
    origin: "Madhya Pradesh",
    harvestYear: 2024,
    benefits: ["Digestive Aid", "Antioxidant", "Flavor Enhancer"]
  },
  {
    id: 13,
    name: "Garam Masala",
    description: "Premium Blend - Warm & Aromatic",
    fullDescription: "Signature blend of 12 aromatic spices. Hand-ground to perfection for that authentic North Indian flavor. No artificial colors or additives.",
    image: "/item (13).png",
    rating: 4.9,
    reviews: 2987,
    prices: { "100g": 79, "200g": 149, "400g": 289 },
    category: "powder",
    badge: "Premium",
    inStock: true,
    origin: "Kerala",
    harvestYear: 2024,
    benefits: ["Warming Spices", "Digestive Aid", "Flavor Enhancer"]
  },
  {
    id: 14,
    name: "Sambar Powder",
    description: "South Indian Special Blend",
    fullDescription: "Authentic blend for the perfect South Indian sambar. Made with roasted lentils and select spices. Traditional family recipe.",
    image: "/item (14).png",
    rating: 4.8,
    reviews: 1654,
    prices: { "100g": 49, "200g": 89, "400g": 169 },
    category: "powder",
    badge: "Popular",
    inStock: true,
    origin: "Tamil Nadu",
    harvestYear: 2024,
    benefits: ["Traditional Recipe", "No Preservatives", "Authentic Taste"]
  },
  {
    id: 15,
    name: "Meat Masala",
    description: "Rich & Spicy - For Non-Veg",
    fullDescription: "Specialized blend for meat preparations. Rich, aromatic, and perfectly balanced for biryanis and curries. Secret family recipe.",
    image: "/item (15).png",
    rating: 4.8,
    reviews: 1432,
    prices: { "100g": 69, "200g": 129, "400g": 249 },
    category: "powder",
    badge: "Special",
    inStock: true,
    origin: "Kerala",
    harvestYear: 2024,
    benefits: ["Tenderizes Meat", "Rich Aroma", "Balanced Spice"]
  }
];

export default function Home() {
  // State Management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [deliveryPincode, setDeliveryPincode] = useState("");
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('chefkerala-cart');
    if (savedCart) {
      setQuantities(JSON.parse(savedCart));
    }
    const savedWishlist = localStorage.getItem('chefkerala-wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    setIsLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('chefkerala-cart', JSON.stringify(quantities));
    }
  }, [quantities, isLoading]);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('chefkerala-wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isLoading]);

  // Auto-rotate hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Computed Values
  const totalItems = useMemo(() => 
    Object.values(quantities).reduce((a, b) => a + b, 0), [quantities]
  );

  const cartSubtotal = useMemo(() => {
    let total = 0;
    Object.entries(quantities).forEach(([key, qty]) => {
      if (qty > 0) {
        const [productId, weight] = key.split('-');
        const product = spices.find(s => s.id === parseInt(productId));
        if (product) {
          total += product.prices[weight] * qty;
        }
      }
    });
    return total;
  }, [quantities]);

  const itemCount = useMemo(() => totalItems, [totalItems]);
  
  // Calculate delivery charge
  const deliveryChargeAmount = useMemo(() => {
    if (cartSubtotal >= 500) return 0;
    if (itemCount >= 5) return 100;
    if (itemCount >= 1) return 50;
    return 0;
  }, [cartSubtotal, itemCount]);

  const cartTotal = useMemo(() => 
    cartSubtotal + deliveryChargeAmount, 
    [cartSubtotal, deliveryChargeAmount]
  );

  const cartItems = useMemo(() => {
    const items = [];
    Object.entries(quantities).forEach(([key, qty]) => {
      if (qty > 0) {
        const [productId, weight] = key.split('-');
        const product = spices.find(s => s.id === parseInt(productId));
        if (product) {
          items.push({
            ...product,
            selectedWeight: weight,
            quantity: qty,
            subtotal: product.prices[weight] * qty
          });
        }
      }
    });
    return items;
  }, [quantities]);

  const filteredProducts = useMemo(() => {
    let filtered = spices;
    
    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(spice =>
        spice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spice.origin.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(spice => spice.category === selectedCategory);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "popular":
        filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case "priceLow":
        filtered = [...filtered].sort((a, b) => 
          Math.min(...Object.values(a.prices)) - Math.min(...Object.values(b.prices))
        );
        break;
      case "priceHigh":
        filtered = [...filtered].sort((a, b) => 
          Math.max(...Object.values(b.prices)) - Math.max(...Object.values(a.prices))
        );
        break;
    }
    
    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  // Notification System
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Cart Functions
  const addToCart = useCallback((productId, weight, quantity = 1) => {
    setQuantities(prev => {
      const key = `${productId}-${weight}`;
      const current = prev[key] || 0;
      return { ...prev, [key]: current + quantity };
    });
    showNotification('Added to cart!', 'success');
  }, [showNotification]);

  const updateQuantity = useCallback((productId, weight, change) => {
    setQuantities(prev => {
      const key = `${productId}-${weight}`;
      const current = prev[key] || 0;
      const newQty = Math.max(0, current + change);
      if (newQty === 0) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: newQty };
    });
  }, []);

  const removeFromCart = useCallback((productId, weight) => {
    setQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[`${productId}-${weight}`];
      return newQuantities;
    });
    showNotification('Item removed from cart', 'info');
  }, [showNotification]);

  const clearCart = useCallback(() => {
    setQuantities({});
    showNotification('Cart cleared', 'info');
  }, [showNotification]);

  // Buy Now Function
  const buyNow = useCallback((product, weight) => {
    setQuantities({ [`${product.id}-${weight}`]: 1 });
    setShowCart(true);
    showNotification('Proceed to checkout', 'success');
  }, [showNotification]);

  // Wishlist Functions
  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    showNotification(
      wishlist.includes(productId) ? 'Removed from wishlist' : 'Added to wishlist',
      'success'
    );
  }, [wishlist, showNotification]);

  // WhatsApp Message Generation
  const generateWhatsAppMessage = useCallback(() => {
    let message = "🛒 *NEW ORDER - ChefKerala*\n\n";
    message += "━━━━━━━━━━━━━━━━━━━━\n\n";
    
    cartItems.forEach(item => {
      message += `• *${item.name}*\n`;
      message += `  Pack: ${item.selectedWeight}\n`;
      message += `  Qty: ${item.quantity} × ₹${item.prices[item.selectedWeight]}\n`;
      message += `  Subtotal: ₹${item.subtotal}\n\n`;
    });
    
    message += "━━━━━━━━━━━━━━━━━━━━\n";
    message += `*Subtotal: ₹${cartSubtotal}*\n`;
    if (deliveryChargeAmount > 0) {
      message += `*Delivery Charge: ₹${deliveryChargeAmount}*\n`;
    } else {
      message += `*Delivery Charge: FREE*\n`;
    }
    message += `*TOTAL: ₹${cartTotal}*\n\n`;
    message += "━━━━━━━━━━━━━━━━━━━━\n\n";
    message += "📍 *DELIVERY DETAILS:*\n";
    message += "• Full Name:\n";
    message += "• Phone Number:\n";
    message += "• Complete Address:\n";
    message += "• Pincode:\n";
    message += "• Landmark:\n\n";
    message += "💰 *PAYMENT METHOD:* Cash on Delivery\n\n";
    message += "━━━━━━━━━━━━━━━━━━━━\n";
    message += "_Thank you for choosing ChefKerala!_\n";
    message += "_We'll confirm your order shortly._ 🌿";
    
    return encodeURIComponent(message);
  }, [cartItems, cartSubtotal, cartTotal, deliveryChargeAmount]);

  // WhatsApp Order Handler
  const handleWhatsAppOrder = useCallback(() => {
    if (totalItems === 0) {
      showNotification("Your cart is empty!", 'error');
      return;
    }
    window.open(`https://wa.me/919567344229?text=${generateWhatsAppMessage()}`, '_blank');
    showNotification('Redirecting to WhatsApp...', 'success');
  }, [totalItems, generateWhatsAppMessage, showNotification]);

  // COD Order Handler
  const handleCODOrder = useCallback(() => {
    if (totalItems === 0) {
      showNotification("Your cart is empty!", 'error');
      return;
    }
    setShowPincodeModal(true);
  }, [totalItems]);

  const confirmCODOrder = useCallback(() => {
    if (!deliveryPincode || deliveryPincode.length !== 6) {
      showNotification("Please enter valid 6-digit pincode", 'error');
      return;
    }
    
    const message = generateWhatsAppMessage() + `\n*Pincode:* ${deliveryPincode}\n*Payment:* Cash on Delivery`;
    window.open(`https://wa.me/919567344229?text=${message}`, '_blank');
    setShowPincodeModal(false);
    setShowCart(false);
    setDeliveryPincode("");
    showNotification('Order placed! Check WhatsApp to confirm.', 'success');
  }, [deliveryPincode, generateWhatsAppMessage, showNotification]);

  // Open Product Modal
  const openProductModal = useCallback((product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  }, []);

  // Quick View
  const quickView = useCallback((product) => {
    setQuickViewProduct(product);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionid);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  }, []);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="relative w-20 h-20 mx-auto mb-4"
          >
            <div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <Icons.Leaf />
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-emerald-800 font-medium"
          >
            Loading premium spices...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Styles */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {showProductModal && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto"
            onClick={() => setShowProductModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                  <button
                    onClick={() => setShowProductModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Icons.Close />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm">
                        {selectedProduct.badge}
                      </span>
                      <span className="text-sm text-gray-500">{selectedProduct.origin}</span>
                    </div>

                    <p className="text-gray-600 mb-4">{selectedProduct.fullDescription}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-green-600 text-white px-2 py-1 rounded flex items-center gap-1">
                        {selectedProduct.rating} <Icons.Star />
                      </span>
                      <span className="text-gray-500">{selectedProduct.reviews} reviews</span>
                    </div>

                    {/* Benefits */}
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Benefits:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.benefits.map((benefit, idx) => (
                          <span key={idx} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Prices and Add to Cart */}
                    <div className="space-y-3 mb-4">
                      <h3 className="font-semibold">Available Sizes:</h3>
                      {Object.entries(selectedProduct.prices).map(([weight, price]) => {
                        const key = `${selectedProduct.id}-${weight}`;
                        const qty = quantities[key] || 0;
                        return (
                          <div key={weight} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <span className="font-medium">{weight}</span>
                              <span className="ml-2 text-emerald-700 font-bold">₹{price}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(selectedProduct.id, weight, -1)}
                                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100"
                                >
                                  <Icons.Minus />
                                </button>
                                <span className="w-8 text-center font-medium">{qty}</span>
                                <button
                                  onClick={() => updateQuantity(selectedProduct.id, weight, 1)}
                                  className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-sm hover:bg-emerald-700"
                                >
                                  <Icons.Plus />
                                </button>
                              </div>
                              <button
                                onClick={() => buyNow(selectedProduct, weight)}
                                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600"
                              >
                                Buy Now
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          Object.entries(selectedProduct.prices).forEach(([weight]) => {
                            addToCart(selectedProduct.id, weight, 1);
                          });
                          setShowProductModal(false);
                        }}
                        className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 flex items-center justify-center gap-2"
                      >
                        <Icons.Cart /> Add All to Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(selectedProduct.id)}
                        className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50"
                      >
                        {wishlist.includes(selectedProduct.id) ? <Icons.Heart /> : <Icons.HeartOutline />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pincode Modal */}
      <AnimatePresence>
        {showPincodeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowPincodeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Enter Delivery Pincode</h3>
                <button onClick={() => setShowPincodeModal(false)} className="p-2">
                  <Icons.Close />
                </button>
              </div>
              <p className="text-gray-600 mb-4">Check if we deliver to your location</p>
              <input
                type="text"
                value={deliveryPincode}
                onChange={(e) => setDeliveryPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="6-digit pincode"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:border-emerald-500"
                maxLength={6}
              />
              <button
                onClick={confirmCODOrder}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
              >
                Continue with COD
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className={`fixed top-20 left-1/2 z-50 px-4 py-2 rounded-full shadow-lg text-white font-medium flex items-center gap-2 ${
              notification.type === 'success' ? 'bg-emerald-600' :
              notification.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
            }`}
          >
            {notification.type === 'success' && <Icons.Check />}
            {notification.type === 'error' && <span className="text-lg">⚠️</span>}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delivery Charge Warning */}
      <AnimatePresence>
        {cartSubtotal > 0 && cartSubtotal < 500 && cartSubtotal >= 400 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-28 left-1/2 transform -translate-x-1/2 z-40 bg-orange-100 text-orange-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm"
          >
            <Icons.Warning />
            Add ₹{500 - cartSubtotal} more for FREE delivery!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <div className="flex items-center gap-4 md:gap-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => scrollToSection('home')}
              >
                <div className="relative w-8 h-8 md:w-10 md:h-10">
                  <Image
                    src="/logo.png"
                    alt="ChefKerala"
                    fill
                    className="object-contain rounded-full"
                    priority
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-base md:text-lg font-bold text-emerald-700">ChefKerala</h1>
                  <p className="text-[10px] text-gray-500">Premium Spices</p>
                </div>
              </motion.div>

              {/* Categories - Desktop */}
              <div className="hidden md:flex items-center gap-6">
                {[
                  { id: 'all', name: 'All Spices' },
                  { id: 'whole', name: 'Whole Spices' },
                  { id: 'powder', name: 'Powders' },
                  { id: 'seeds', name: 'Seeds' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-sm font-medium capitalize ${
                      selectedCategory === cat.id 
                        ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' 
                        : 'text-gray-600 hover:text-emerald-600'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for spices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500 text-sm"
                />
                <div className="absolute left-3 top-2.5">
                  <Icons.Search />
                </div>
              </div>
            </div>

            {/* Cart Icon */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Icons.Cart />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              >
                {isMenuOpen ? <Icons.Close /> : <Icons.Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div className="md:hidden fixed top-14 left-0 right-0 z-30 bg-white border-t p-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for spices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500 text-sm"
          />
          <div className="absolute left-3 top-2.5">
            <Icons.Search />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-28 left-0 right-0 z-30 bg-white border-b md:hidden"
          >
            <div className="p-4 grid grid-cols-2 gap-2">
              {[
                { id: 'all', name: 'All Spices', icon: '🛒' },
                { id: 'whole', name: 'Whole Spices', icon: '🌰' },
                { id: 'powder', name: 'Powders', icon: '🧂' },
                { id: 'seeds', name: 'Seeds', icon: '🌱' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setIsMenuOpen(false);
                  }}
                  className={`p-3 rounded-lg text-center ${
                    selectedCategory === cat.id 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div className="text-xs">{cat.name}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed top-0 right-0 w-full md:w-96 h-full z-50 bg-white shadow-2xl overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Icons.Cart /> Your Cart ({totalItems})
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Icons.Close />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <button
                    onClick={() => {
                      setShowCart(false);
                      scrollToSection('products');
                    }}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700"
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
                    {cartItems.map((item) => (
                      <div
                        key={`${item.id}-${item.selectedWeight}`}
                        className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div 
                          className="w-16 h-16 bg-emerald-100 rounded-lg overflow-hidden cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(item);
                            setShowProductModal(true);
                            setShowCart(false);
                          }}
                        >
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 
                            className="font-semibold text-sm cursor-pointer hover:text-emerald-600"
                            onClick={() => {
                              setSelectedProduct(item);
                              setShowProductModal(true);
                              setShowCart(false);
                            }}
                          >
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500">{item.selectedWeight}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-bold text-emerald-700">₹{item.subtotal}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.selectedWeight, -1)}
                                className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100"
                              >
                                <Icons.Minus />
                              </button>
                              <span className="text-sm font-medium w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.selectedWeight, 1)}
                                className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-sm hover:bg-emerald-700"
                              >
                                <Icons.Plus />
                              </button>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedWeight)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Icons.Close />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info */}
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <div className="flex items-start gap-2 text-sm">
                      <Icons.Truck />
                      <div>
                        <p className="font-medium">Delivery Charges:</p>
                        {cartSubtotal >= 500 ? (
                          <p className="text-green-600">✓ Free Delivery</p>
                        ) : (
                          <>
                            <p className="text-gray-600">
                              {itemCount >= 5 ? '₹100' : '₹50'} delivery charge
                            </p>
                            <p className="text-xs text-orange-600 mt-1">
                              Add ₹{500 - cartSubtotal} more for free delivery
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Cart Summary */}
                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">₹{cartSubtotal}</span>
                    </div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-gray-600">Delivery:</span>
                      <span className={deliveryChargeAmount === 0 ? 'text-green-600 font-semibold' : 'font-semibold'}>
                        {deliveryChargeAmount === 0 ? 'FREE' : `₹${deliveryChargeAmount}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-emerald-700">₹{cartTotal}</span>
                    </div>
                  </div>

                  {/* Checkout Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleCODOrder}
                      className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Icons.Cash /> Cash on Delivery
                    </button>
                    <button
                      onClick={handleWhatsAppOrder}
                      className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Icons.WhatsApp /> Order on WhatsApp
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full border border-red-300 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-50"
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 hover:scale-110 transition-all"
          >
            <Icons.Up />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Slider */}
      <section id="home" className="pt-14 md:pt-16">
        <div className="relative h-[300px] md:h-[400px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <img
                src={backgroundImages[`hero${currentHeroSlide + 1}`]}
                alt={`Hero ${currentHeroSlide + 1}`}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r from-black/60 to-transparent`} />
              
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 w-full">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-xl text-white"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                      {currentHeroSlide === 0 ? "Authentic Kerala Spices" :
                       currentHeroSlide === 1 ? "Premium Quality Spices" :
                       "Fresh Harvest 2024"}
                    </h2>
                    <p className="text-lg mb-4 text-white/90">
                      {currentHeroSlide === 0 ? "Direct from the farms of God's Own Country" :
                       currentHeroSlide === 1 ? "Hand-picked, sun-dried, and carefully graded" :
                       "New crop directly from our partner farmers"}
                    </p>
                    <button
                      onClick={() => scrollToSection('products')}
                      className="bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50"
                    >
                      Shop Now
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentHeroSlide === index ? 'w-8 bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex overflow-x-auto scrollbar-hide gap-6 justify-between">
            {[
              { icon: Icons.Truck, text: "Free Delivery", sub: "on ₹500+" },
              { icon: Icons.Cash, text: "Cash on Delivery", sub: "available" },
              { icon: Icons.Shield, text: "Premium Quality", sub: "100% authentic" },
              { icon: Icons.Clock, text: "Fresh Stock", sub: "harvested 2024" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs md:text-sm whitespace-nowrap">
                <item.icon />
                <div>
                  <span className="font-medium text-gray-800">{item.text}</span>
                  <span className="text-gray-500 ml-1 hidden sm:inline">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Banner */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-lg md:text-xl font-bold mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { name: "Whole Spices", image: backgroundImages.category1, count: "9 items", cat: "whole" },
              { name: "Spice Powders", image: backgroundImages.category2, count: "6 items", cat: "powder" },
              { name: "Seeds", image: backgroundImages.category3, count: "4 items", cat: "seeds" }
            ].map((cat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedCategory(cat.cat)}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-24 md:h-32 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-3 text-white">
                  <h3 className="font-semibold text-sm md:text-base">{cat.name}</h3>
                  <p className="text-xs opacity-90">{cat.count}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-4">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header with Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h2 className="text-lg md:text-xl font-bold">
              {selectedCategory === 'all' ? 'All Spices' : 
               selectedCategory === 'whole' ? 'Whole Spices' :
               selectedCategory === 'powder' ? 'Spice Powders' : 'Seeds'}
            </h2>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border rounded-lg px-3 py-2 bg-white"
            >
              <option value="popular">Popularity</option>
              <option value="rating">Top Rated</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.02, 0.3) }}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Product Image - Click to open details */}
                <div 
                  className="relative aspect-square bg-gray-50 cursor-pointer"
                  onClick={() => openProductModal(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-emerald-600 text-white px-2 py-0.5 rounded text-xs">
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:scale-110 transition-transform"
                  >
                    {wishlist.includes(product.id) ? (
                      <Icons.Heart />
                    ) : (
                      <Icons.HeartOutline />
                    )}
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-2">
                  <h3 
                    className="font-medium text-sm line-clamp-1 cursor-pointer hover:text-emerald-600"
                    onClick={() => openProductModal(product)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-1 line-clamp-1">{product.description}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-1">
                    <span className="bg-green-600 text-white text-xs px-1 rounded flex items-center gap-0.5">
                      {product.rating} <Icons.Star />
                    </span>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>

                  {/* Price Range */}
                  <div className="flex items-center gap-1 mb-2">
                    <span className="font-bold text-sm text-gray-900">
                      ₹{Math.min(...Object.values(product.prices))}
                    </span>
                    <span className="text-xs text-gray-500"> - ₹{Math.max(...Object.values(product.prices))}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => addToCart(product.id, "100g", 1)}
                      className="flex-1 bg-emerald-600 text-white text-xs py-2 rounded hover:bg-emerald-700 flex items-center justify-center gap-1"
                    >
                      <Icons.Cart /> Add
                    </button>
                    <button
                      onClick={() => buyNow(product, "100g")}
                      className="flex-1 bg-orange-500 text-white text-xs py-2 rounded hover:bg-orange-600 flex items-center justify-center gap-1"
                    >
                      <Icons.Flash /> Buy
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </section>

      {/* Recently Viewed - Would need actual tracking */}
      {cartItems.length > 0 && (
        <section className="py-6 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Icons.Trending /> Recommended for You
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {spices.filter(s => !cartItems.some(c => c.id === s.id)).slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  onClick={() => openProductModal(product)}
                  className="bg-gray-50 rounded-lg p-2 cursor-pointer hover:bg-emerald-50 transition-colors"
                >
                  <div className="w-full h-16 bg-emerald-100 rounded-lg mb-2 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs font-medium text-center line-clamp-1">{product.name}</p>
                  <p className="text-xs text-emerald-600 text-center">₹{Math.min(...Object.values(product.prices))}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-emerald-600">Our Story</span>
              </h2>
              <p className="text-gray-600 mb-4">
                For over three generations, ChefKerala has been synonymous with the finest spices from God's Own Country. Our journey began in 1985 in the spice hills of Kerala, with a simple mission: to bring authentic Kerala spices to kitchens worldwide.
              </p>
              <p className="text-gray-600 mb-6">
                Today, we work directly with over 500 farmers across Kerala, ensuring fair prices and sustainable farming practices. Every spice is hand-picked, sun-dried, and carefully graded to meet our exacting standards.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-emerald-700">500+</div>
                  <div className="text-sm text-gray-600">Partner Farmers</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-orange-700">38+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
              <img
                src={backgroundImages.about}
                alt="Kerala Spice Farms"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-emerald-50 to-orange-50 rounded-2xl p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Icons.Phone />
                    </div>
                    <a href="tel:+919567344229" className="text-gray-600 hover:text-emerald-600">
                      +91 95673 44229
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Icons.Mail />
                    </div>
                    <a href="mailto:hello@chefkerala.com" className="text-gray-600 hover:text-emerald-600">
                      hello@chefkerala.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Icons.Pin />
                    </div>
                    <span className="text-gray-600">Kochi, Kerala, India</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Quick Order via WhatsApp</h3>
                <p className="text-gray-600 mb-4">
                  Send us your order directly on WhatsApp for faster processing
                </p>
                <button
                  onClick={() => {
                    if (totalItems > 0) {
                      setShowCart(true);
                    } else {
                      window.open(`https://wa.me/919567344229?text=Hi, I'm interested in your spices`, '_blank');
                    }
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <Icons.WhatsApp /> Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="ChefKerala" width={32} height={32} className="rounded-full" />
                <span className="font-bold">ChefKerala</span>
              </div>
              <p className="text-gray-400 text-sm">
                Premium Kerala spices since 1985. Bringing authentic flavors to your kitchen.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-emerald-400">About Us</button></li>
                <li><button onClick={() => scrollToSection('products')} className="hover:text-emerald-400">Our Products</button></li>
                <li><a href="#" className="hover:text-emerald-400">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-400">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-emerald-400">Contact Us</button></li>
                <li><a href="#" className="hover:text-emerald-400">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-emerald-400">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-3">Subscribe for recipes and offers</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 rounded-l-lg w-full text-gray-900 text-sm"
                />
                <button className="bg-emerald-600 px-4 py-2 rounded-r-lg hover:bg-emerald-700 text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} ChefKerala. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}