import React, { useState, useEffect } from 'react';

// StarRating component to display a visual rating and customer count.
const StarRating = ({ rating, customerCount, compact = false }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div style={{...styles.starRatingContainer, ...(compact && styles.starRatingContainerCompact)}}>
      <div style={styles.starsContainer}>
        {/* Full stars */}
        {Array.from({ length: fullStars }, (_, i) => (
          <span key={`full-${i}`} style={styles.starFilled}>★</span>
        ))}
        {/* Half star if needed */}
        {hasHalfStar && <span style={styles.starHalf}>☆</span>}
        {/* Empty stars */}
        {Array.from({ length: emptyStars }, (_, i) => (
          <span key={`empty-${i}`} style={styles.starEmpty}>☆</span>
        ))}
      </div>
      <span style={{...styles.ratingText, ...(compact && styles.ratingTextCompact)}}>
        {rating.toFixed(1)} ({customerCount} reviews)
      </span>
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const products = [
    // Face Products (10)
    {
      id: 1,
      name: 'Radiant Glow Foundation',
      description: 'A lightweight foundation that provides a natural, luminous finish and all-day.',
      price: 550,
      image: 'https://rahulphate.com/wp-content/uploads/2023/12/Radiant-Glow-Gold-Facial-Kit-Big-Frant-PNG.png',
      category: 'Face',
      type: 'liquid',
      volume: '30ml',
      rating: 4.5,
      customerCount: 124
    },
    {
      id: 2,
      name: 'Matte Finish Pressed Powder',
      description: 'Oil-absorbing powder that sets makeup and controls shine for a flawless matte finish.',
      price: 399,
      image: 'https://m.media-amazon.com/images/I/61VZF6Gb8vL._UF1000,1000_QL80_.jpg',
      category: 'Face',
      type: 'powder',
      weight: '10gm',
      rating: 4.2,
      customerCount: 89
    },
    {
      id: 3,
      name: 'Cream Blush Palette',
      description: 'Set of 4 blendable cream blushes for a natural, dewy flush of color on cheeks.',
      price: 650,
      image: 'https://cosmeticshub.in/wp-content/uploads/2024/07/CREAM-1.webp',
      category: 'Face',
      type: 'cream',
      weight: '15gm',
      rating: 4.7,
      customerCount: 203
    },
    {
      id: 4,
      name: 'Illuminating Highlighter',
      description: 'Pearlescent highlighter that gives skin a natural-looking glow and radiant finish.',
      price: 499,
      image: 'https://media6.ppl-media.com//tr:h-750,w-750,c-at_max,dpr-2,q-40/static/img/product/213583/bella-vosteluminizing-highlighter-goddess-03-4-5-g_2_display_1676632745_a1ecf62b.jpg',
      category: 'Face',
      type: 'powder',
      weight: '8gm',
      rating: 4.8,
      customerCount: 156
    },
    {
      id: 5,
      name: 'Color Correcting Palette',
      description: '6-color correcting palette to neutralize skin discoloration and create perfect.',
      price: 599,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm9J0OwQpr0szRikSdicHoN16yFavXY8F5_g&s',
      category: 'Face',
      type: 'cream',
      weight: '20gm',
      rating: 4.3,
      customerCount: 98
    },
    {
      id: 6,
      name: 'Mineral Setting Spray',
      description: 'Fine mist setting spray that locks makeup in place for up to 16 hours.',
      price: 449,
      image: 'https://images-static.nykaa.com/media/catalog/product/9/6/96c9f3fNYKAC00002302_8N.jpg?tr=w-500',
      category: 'Face',
      type: 'liquid',
      volume: '100ml',
      rating: 4.6,
      customerCount: 267
    },
    {
      id: 7,
      name: 'Concealer Wand',
      description: 'Full coverage concealer that hides dark circles, blemishes and imperfections.',
      price: 379,
      image: 'https://thumbs.dreamstime.com/b/concealer-wand-open-cap-white-background-concealer-applicator-wand-cap-removed-isolated-white-background-suitable-375700593.jpg',
      category: 'Face',
      type: 'liquid',
      volume: '8ml',
      rating: 4.4,
      customerCount: 189
    },
    {
      id: 8,
      name: 'Tinted Moisturizer',
      description: 'Sheer coverage moisturizer with SPF 20 that hydrates while evening skin tone.',
      price: 525,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNIMuj_Hh4etHudSVD6_dEmA2BCDCiNyfiyA&s',
      category: 'Face',
      type: 'cream',
      weight: '50ml',
      rating: 4.5,
      customerCount: 142
    },
    {
      id: 9,
      name: 'Bronzing Powder',
      description: 'Sun-kissed bronzing powder for a warm, natural-looking glow all year round.',
      price: 475,
      image: 'https://m.media-amazon.com/images/I/81iMKmDUQGL.jpg',
      category: 'Face',
      type: 'powder',
      weight: '12gm',
      rating: 4.7,
      customerCount: 215
    },
    {
      id: 10,
      name: 'Primer Serum',
      description: 'Hydrating primer that smooths skin texture and extends makeup wear.',
      price: 599,
      image: 'https://m.media-amazon.com/images/I/31mwpG++KoL._UF1000,1000_QL80_.jpg',
      category: 'Face',
      type: 'liquid',
      volume: '30ml',
      rating: 4.6,
      customerCount: 178
    },

    // Skincare Products (10)
    {
      id: 11,
      name: 'Hydrating Face Serum',
      description: 'Infused with hyaluronic acid and Vitamin C, this serum deeply hydrates and brightens the skin.',
      price: 475,
      image: 'https://www.vhv.rs/dpng/d/546-5468887_24k-gold-serum-hd-png-download.png',
      category: 'Skincare',
      type: 'liquid',
      volume: '50ml',
      rating: 4.8,
      customerCount: 356
    },
    {
      id: 12,
      name: 'Under Eye Cream',
      description: 'Targeted treatment that reduces dark circles and puffiness with caffeine and vitamin K.',
      price: 599,
      image: 'https://wellify.in/cdn/shop/files/Lacto-Calamine-under-eye-cream-for-dark-circles.jpg?v=1684734060',
      category: 'Skincare',
      type: 'cream',
      weight: '30gm',
      rating: 4.1,
      customerCount: 93
    },
    {
      id: 13,
      name: 'AHA Exfoliating Toner',
      description: 'Gentle exfoliating toner with glycolic acid that reveals brighter, smoother skin.',
      price: 425,
      image: 'https://arishbionatural.com/cdn/shop/files/aha-bha-balance-exfoliator-toner-272897.jpg?v=1749983307&width=480',
      category: 'Skincare',
      type: 'liquid',
      volume: '150ml',
      rating: 4.5,
      customerCount: 204
    },
    {
      id: 14,
      name: 'Overnight Repair Cream',
      description: 'Rich night cream that repairs skin barrier and reduces fine lines while you sleep.',
      price: 799,
      image: 'https://nutrinormwellness.com/cdn/shop/files/night-repair-cream-3.webp?v=1716986041&width=1946',
      category: 'Skincare',
      type: 'cream',
      weight: '50gm',
      rating: 4.7,
      customerCount: 167
    },
    {
      id: 15,
      name: 'Facial Cleansing Oil',
      description: 'Gentle oil-based cleanser that removes makeup and impurities without stripping skin.',
      price: 449,
      image: 'https://thumbs.dreamstime.com/b/cleansing-oil-drops-showcased-assorted-smudges-clean-white-background-high-quality-studio-setting-cleansing-oil-366702558.jpg',
      category: 'Skincare',
      type: 'liquid',
      volume: '200ml',
      rating: 4.6,
      customerCount: 189
    },
    {
      id: 16,
      name: 'Clay Mask',
      description: 'Purifying clay mask that draws out impurities and minimizes pores.',
      price: 349,
      image: 'https://xystcare.com/cdn/shop/files/01_Xyst_ClayMask-SkinRestoreTripleExfoliating_WBGImage.jpg?v=1750334586&width=600',
      category: 'Skincare',
      type: 'cream',
      weight: '100gm',
      rating: 4.4,
      customerCount: 276
    },
    {
      id: 17,
      name: 'Vitamin C Brightening Cream',
      description: 'Day cream with Vitamin C that brightens skin and protects against environmental damage.',
      price: 675,
      image: 'https://cosdermastore.com/cdn/shop/files/LeeposhVitaminCFaceCream-OilFree_QuickAbsorbing-ForAllSkinTypes.jpg?v=1722432327',
      category: 'Skincare',
      type: 'cream',
      weight: '50gm',
      rating: 4.8,
      customerCount: 198
    },
    {
      id: 18,
      name: 'Facial Mist',
      description: 'Hydrating facial mist with rose water and aloe vera for instant refreshment.',
      price: 299,
      image: 'https://www.thebarebar.in/cdn/shop/files/rose-facial-mist-100-ml-main-setup-RYK09306-_5.jpg?v=1747998528&width=1946',
      category: 'Skincare',
      type: 'liquid',
      volume: '100ml',
      rating: 4.3,
      customerCount: 154
    },
    {
      id: 19,
      name: 'Retinol Night Serum',
      description: 'Anti-aging serum with retinol that reduces wrinkles and improves skin texture.',
      price: 899,
      image: 'https://beautybaskets.in/wp-content/uploads/2021/03/bbj-600x600.jpg',
      category: 'Skincare',
      type: 'liquid',
      volume: '30ml',
      rating: 4.9,
      customerCount: 132
    },
    {
      id: 20,
      name: 'Sunscreen SPF 50',
      description: 'Lightweight, non-greasy sunscreen that provides broad spectrum protection.',
      price: 499,
      image: 'https://www.dotandkey.com/cdn/shop/files/1_c4cdff0a-0b0b-425b-8e2e-598dab539e32.jpg?v=1745308948&width=700',
      category: 'Skincare',
      type: 'cream',
      weight: '50gm',
      rating: 4.7,
      customerCount: 321
    },

    // Eyes Products (10)
    {
      id: 21,
      name: 'Volumizing Mascara',
      description: 'Lifts and separates lashes for a dramatic, voluminous look. Smudge-proof and long-lasting.',
      price: 229,
      image: 'https://www.muastore.co.uk/cdn/shop/files/Mascara-Volume-Lid-OFF---2024.jpg?v=1740471997&width=1800',
      category: 'Eyes',
      type: 'liquid',
      volume: '10ml',
      rating: 4.2,
      customerCount: 89
    },
    {
      id: 22,
      name: 'Eyeshadow Palette',
      description: '12 highly pigmented shades with matte and shimmer finishes for creating endless eye looks.',
      price: 799,
      image: 'https://t4.ftcdn.net/jpg/03/74/55/47/360_F_374554763_JFMp3AdyiRwsijThbaxavQd0kBPNT7Gd.jpg',
      category: 'Eyes',
      type: 'powder',
      weight: '20gm',
      rating: 4.6,
      customerCount: 298
    },
    {
      id: 23,
      name: 'Liquid Eyeliner',
      description: 'Precision liquid eyeliner with fine tip for creating sharp wings and defined lines.',
      price: 279,
      image: 'https://m.media-amazon.com/images/I/518V3XQ4pjL._UF1000,1000_QL80_.jpg',
      category: 'Eyes',
      type: 'liquid',
      volume: '5ml',
      rating: 4.5,
      customerCount: 167
    },
    {
      id: 24,
      name: 'Eyebrow Pomade',
      description: 'Creamy eyebrow pomade that fills and defines brows for a natural look.',
      price: 349,
      image: 'https://m.media-amazon.com/images/I/71BFg2eZNtL.jpg',
      category: 'Eyes',
      type: 'cream',
      weight: '4gm',
      rating: 4.7,
      customerCount: 134
    },
    {
      id: 25,
      name: 'Eyelash Curler',
      description: 'Professional eyelash curler that lifts lashes for wide-eyed look.',
      price: 199,
      image: 'https://media.istockphoto.com/id/1363403850/photo/beautiful-woman-using-eyelash-curler.jpg?s=612x612&w=0&k=20&c=9a3H4n1l59a0i_KyZkQ4g2Jz5mQLGrkrgP8hyTc9Ygc=',
      category: 'Eyes',
      type: 'tool',
      quantity: '1 unit',
      rating: 4.3,
      customerCount: 87
    },
    {
      id: 26,
      name: 'Glitter Eyeshadow',
      description: 'Intense glitter eyeshadow that applies smoothly and stays put all day.',
      price: 179,
      image: 'https://img.joomcdn.net/8607961b386bf9a09dcff5848d6395633ea84f0c_1024_1024.jpeg',
      category: 'Eyes',
      type: 'powder',
      weight: '3gm',
      rating: 4.4,
      customerCount: 112
    },
    {
      id: 27,
      name: 'Eye Primer',
      description: 'Base primer that makes eyeshadow more vibrant and prevents creasing.',
      price: 249,
      image: 'https://m.media-amazon.com/images/I/61rjB0UvAPL.jpg',
      category: 'Eyes',
      type: 'cream',
      weight: '10ml',
      rating: 4.6,
      customerCount: 98
    },
    {
      id: 28,
      name: 'False Eyelashes',
      description: 'Natural-looking false eyelashes that add volume and length to natural lashes.',
      price: 149,
      image: 'https://image.made-in-china.com/2f0j00KtCkRMgshcpD/Best-Selling-False-Eyelashes-Self-Adhesive-Reusable-Glue-Free-Lazy-Eyelashes-Simulation-Natural-Curling-Super-Soft.webp',
      category: 'Eyes',
      type: 'accessory',
      quantity: '1 pair',
      rating: 4.2,
      customerCount: 203
    },
    {
      id: 29,
      name: 'Eyebrow Pencil',
      description: 'Fine-tipped eyebrow pencil for precise application and natural-looking brows.',
      price: 199,
      image: 'https://www.gabrow.com/wp-content/uploads/2022/05/Eyebrow-Pencil-Gold-Double-Ended-Precision-Waterproof-Brow-Cruelty-Free68.jpg',
      category: 'Eyes',
      type: 'pencil',
      quantity: '1 unit',
      rating: 4.5,
      customerCount: 176
    },
    {
      id: 30,
      name: 'Gel Eyeliner',
      description: 'Smooth gel eyeliner that glides on easily and stays smudge-proof all day.',
      price: 299,
      image: 'https://www.coloressence.com/cdn/shop/files/Long-wear-pot-eyeliner-with-brush.jpg?v=1707997791',
      category: 'Eyes',
      type: 'gel',
      weight: '5gm',
      rating: 4.4,
      customerCount: 145
    },
    // Lips Products (10)
    {
      id: 31,
      name: 'Lip Balm Trio Set',
      description: 'A set of three nourishing lip balms with shea butter and jojoba oil.',
      price: 649,
      image: 'https://naturium.com/cdn/shop/files/NATR_Viral_Lip_Kit_bone_front.jpg?v=1729673949',
      category: 'Lips',
      type: 'balm',
      quantity: '3 pieces',
      rating: 3.9,
      customerCount: 52
    },
    {
      id: 32,
      name: 'Matte Liquid Lipstick',
      description: 'Long-wearing liquid lipstick with intense color payoff and a comfortable, non-drying formula.',
      price: 650,
      image: 'https://m.media-amazon.com/images/I/711dFeieIQL.jpg',
      category: 'Lips',
      type: 'liquid',
      volume: '6ml',
      rating: 4.0,
      customerCount: 78
    },
    {
      id: 33,
      name: 'Lip Plumping Gloss',
      description: 'High-shine gloss with peppermint oil that gently plumps lips for fuller appearance.',
      price: 399,
      image: 'https://i5.walmartimages.com/seo/Ruby-Kisses-Plumping-Lip-Gloss-Hydrating-Voluminous-High-Shine-Cruelty-Free-Lip-Plumper-Smoothing-Instinct-Lip-Maximizer-4-Colors-0-15-FL-oz-Nude_6b19a5d0-5cf2-4b55-9a98-cdf036738b9f.37fa1e56f4a8e8f6e2266164a9b3fa17.jpeg',
      category: 'Lips',
      type: 'liquid',
      volume: '8ml',
      rating: 4.3,
      customerCount: 167
    },
    {
      id: 34,
      name: 'Lip Liner Set',
      description: 'Set of 5 versatile lip liners that prevent feathering and define lip shape.',
      price: 499,
      image: 'https://m.media-amazon.com/images/I/51TQ+KsvLAL._UF1000,1000_QL80_.jpg',
      category: 'Lips',
      type: 'pencil',
      quantity: '5 units',
      rating: 4.5,
      customerCount: 134
    },
    {
      id: 35,
      name: 'Lip Scrub',
      description: 'Gentle sugar-based lip scrub that exfoliates and softens dry, chapped lips.',
      price: 249,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh1n0YpPuJV2aHv3WCWeEbwNct5cfg0XPvPg&s',
      category: 'Lips',
      type: 'scrub',
      weight: '15gm',
      rating: 4.6,
      customerCount: 189
    },
    {
      id: 36,
      name: 'Lip Stain',
      description: 'Water-based lip stain that provides long-lasting color that won\'t transfer.',
      price: 349,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Lips',
      type: 'liquid',
      volume: '5ml',
      rating: 4.4,
      customerCount: 112
    },
    {
      id: 37,
      name: 'Lip Mask',
      description: 'Overnight lip treatment mask that deeply hydrates and repairs dry lips.',
      price: 299,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Lips',
      type: 'mask',
      weight: '10gm',
      rating: 4.7,
      customerCount: 156
    },
    {
      id: 38,
      name: 'Lipstick Set',
      description: 'Collection of 6 creamy lipsticks in various shades from nude to bold.',
      price: 899,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Lips',
      type: 'stick',
      quantity: '6 units',
      rating: 4.8,
      customerCount: 203
    },
    {
      id: 39,
      name: 'Lip Oil',
      description: 'Nourishing lip oil with vitamin E that gives shiny finish while hydrating.',
      price: 349,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Lips',
      type: 'oil',
      volume: '10ml',
      rating: 4.5,
      customerCount: 134
    },
    {
      id: 40,
      name: 'Lip Primer',
      description: 'Base primer that extends lipstick wear and prevents feathering.',
      price: 249,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Lips',
      type: 'cream',
      weight: '5gm',
      rating: 4.3,
      customerCount: 98
    },
    // Body Products (10)
    {
      id: 41,
      name: 'Exfoliating Body Scrub',
      description: 'Gently polishes and smooths skin with fine sugar crystals and essential oils.',
      price: 99,
      image: 'https://m.media-amazon.com/images/I/71pyPEO6ylL.jpg',
      category: 'Body',
      type: 'scrub',
      weight: '300gm',
      rating: 4.1,
      customerCount: 201
    },
    {
      id: 42,
      name: 'Nourishing Hand Cream',
      description: 'Deeply moisturizing hand cream with shea butter and almond oil for soft, hydrated hands.',
      price: 1100,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO28fnkWUo526CKhGMXUyzIyBArOmWVkJd7g&s',
      category: 'Body',
      type: 'cream',
      weight: '75gm',
      rating: 4.3,
      customerCount: 112
    },
    {
      id: 43,
      name: 'Body Butter',
      description: 'Rich, creamy body butter that provides intense hydration for dry skin.',
      price: 599,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Body',
      type: 'cream',
      weight: '200gm',
      rating: 4.6,
      customerCount: 189
    },
    {
      id: 44,
      name: 'Shower Gel',
      description: 'Luxurious shower gel with nourishing oils that cleanse without stripping moisture.',
      price: 349,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Body',
      type: 'gel',
      volume: '250ml',
      rating: 4.5,
      customerCount: 234
    },
    {
      id: 45,
      name: 'Body Oil',
      description: 'Lightweight body oil that absorbs quickly and leaves skin glowing and hydrated.',
      price: 499,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Body',
      type: 'oil',
      volume: '100ml',
      rating: 4.7,
      customerCount: 167
    },
    {
      id: 46,
      name: 'Body Lotion',
      description: 'Lightweight daily moisturizer that hydrates skin without greasy residue.',
      price: 399,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Body',
      type: 'lotion',
      volume: '200ml',
      rating: 4.4,
      customerCount: 289
    },
    {
      id: 47,
      name: 'Body Spray',
      description: 'Refreshing body spray with light fragrance that lasts throughout the day.',
      price: 299,
      image: 'https://alhassan.in/cdn/shop/files/AlHassan-16-Photoroom_1.jpg?v=1746598895',
      category: 'Body',
      type: 'spray',
      volume: '150ml',
      rating: 4.3,
      customerCount: 176
    },
    {
      id: 48,
      name: 'Foot Cream',
      description: 'Intensive foot cream that softens rough skin and soothes tired feet.',
      price: 349,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Body',
      type: 'cream',
      weight: '100gm',
      rating: 4.6,
      customerCount: 134
    },
    {
      id: 49,
      name: 'Body Scrub Brush',
      description: 'Natural bristle brush that exfoliates skin and stimulates circulation.',
      price: 199,
      image: 'https://m.media-amazon.com/images/I/61A-LK-DuYL.jpg',
      category: 'Body',
      type: 'tool',
      quantity: '1 unit',
      rating: 4.2,
      customerCount: 98
    },
    {
      id: 50,
      name: 'Bath Bombs Set',
      description: 'Set of 6 fragrant bath bombs that fizz and release moisturizing oils.',
      price: 449,
      image: 'https://static.vecteezy.com/system/resources/previews/040/298/405/non_2x/ai-generated-colorful-sprinkle-topped-artisanal-colorful-spa-bath-bombs-photo.jpg',
      category: 'Body',
      type: 'bomb',
      quantity: '6 pieces',
      rating: 4.8,
      customerCount: 203
    },
    // Nails Products (10)
    {
      id: 51,
      name: 'Nail Polish Collection',
      description: 'A vibrant collection of six long-wear nail polishes in trendy shades.',
      price: 899,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBI-Lx3_KsbejirSYIErzOJ6XKoMPXmPqvUg&s',
      category: 'Nails',
      type: 'liquid',
      volume: '36ml (6x6ml)',
      rating: 4.7,
      customerCount: 154
    },
    {
      id: 52,
      name: 'Nail Strengthener',
      description: 'Treatment that strengthens brittle nails and prevents breakage with keratin and calcium.',
      price: 249,
      image: 'https://www.debellecosmetix.com/cdn/shop/products/DeBelle_Best_nail_hardener_2025_Nail_Hardener_600x600_crop_center.jpg?v=1749038406',
      category: 'Nails',
      type: 'liquid',
      volume: '15ml',
      rating: 4.9,
      customerCount: 45
    },
    {
      id: 53,
      name: 'Quick-Dry Top Coat',
      description: 'Seals your manicure and provides a glossy finish in seconds. Prevents chipping and adds durability.',
      price: 720,
      image: 'https://i.etsystatic.com/7029989/r/il/6743b3/6462999287/il_570xN.6462999287_800a.jpg',
      category: 'Nails',
      type: 'liquid',
      volume: '10ml',
      rating: 4.6,
      customerCount: 231
    },
    {
      id: 54,
      name: 'Nail Art Brush Set',
      description: 'A professional set of fine-tipped brushes for intricate nail art designs and detailing.',
      price: 299,
      image: 'https://modelones.com/cdn/shop/products/8_a29eefd7-aae7-472b-b251-cac1e0f20486.webp?v=1671162287',
      category: 'Nails',
      type: 'tool',
      quantity: '6 pieces',
      rating: 4.9,
      customerCount: 87
    },
    {
      id: 55,
      name: 'Gel Nail Kit',
      description: 'An all-in-one kit with everything you need for a salon-quality gel manicure at home, including a mini UV lamp.',
      price: 1299,
      image: 'https://verymiss.in/cdn/shop/files/4_5b4e7347-1367-400c-bf5e-bbab9bb23810.png?v=1750694985&width=1445',
      category: 'Nails',
      type: 'kit',
      quantity: '1 kit',
      rating: 4.3,
      customerCount: 199
    },
    {
      id: 56,
      name: 'Cuticle Remover Oil',
      description: 'Gentle formula that softens and removes excess cuticles, leaving your nails clean and healthy.',
      price: 149,
      image: 'https://m.media-amazon.com/images/I/519Q2oovBHL._UF1000,1000_QL80_.jpg',
      category: 'Nails',
      type: 'oil',
      volume: '12ml',
      rating: 4.5,
      customerCount: 69
    },
    {
      id: 57,
      name: 'Matte Top Coat',
      description: 'Transforms any glossy nail polish into a sophisticated, velvety matte finish.',
      price: 179,
      image: 'https://www.debellecosmetix.com/cdn/shop/files/DeBelle_best_top_coat_online_Matte_Top_Coat_800x.jpg?v=1753509208',
      category: 'Nails',
      type: 'liquid',
      volume: '8ml',
      rating: 3.9,
      customerCount: 135
    },
    {
      id: 58,
      name: 'Nail Polish Remover',
      description: 'Gentle yet effective nail polish remover that conditions nails while removing polish.',
      price: 199,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      category: 'Nails',
      type: 'liquid',
      volume: '100ml',
      rating: 4.2,
      customerCount: 178
    },
    {
      id: 59,
      name: 'Nail File Set',
      description: 'Professional-grade nail file set with different grits for shaping and smoothing.',
      price: 149,
      image: 'https://img.freepik.com/free-vector/pedicure-tools-realistic-icon-set_1284-21230.jpg?semt=ais_hybrid&w=740&q=80',
      category: 'Nails',
      type: 'tool',
      quantity: '5 pieces',
      rating: 4.4,
      customerCount: 112
    },
    {
      id: 60,
      name: 'Nail Art Stickers',
      description: 'Easy-to-apply nail art stickers in various designs for quick manicures.',
      price: 99,
      image: 'https://img.kwcdn.com/product/fancy/45f20cfd-472e-4bdb-be65-1c625a733941.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp',
      category: 'Nails',
      type: 'accessory',
      quantity: '50 stickers',
      rating: 4.3,
      customerCount: 167
    }
  ];

  // Get unique categories for filtering
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Login function
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
   
    // Simple validation (in a real app, you'd verify against a backend)
    if (email && password) {
      setIsLoggedIn(true);
      setUser({ email, name: email.split('@')[0] });
      setCurrentPage('home');
    }
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage('home');
  };

  // Logic for adding a product to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setShowCart(true);
  };

  // Logic for updating product quantity in cart
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
   
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Logic for adding a product to the cart and going to checkout
  const handleBuyNow = (product) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }
    setCart(updatedCart);
    setCurrentPage('checkout');
    setShowCart(false);
  };

  // Logic for removing a product from the cart
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Logic for placing an order and showing the confirmation modal
  const handlePlaceOrder = () => {
    setCart([]);
    setShowOrderModal(true);
  };

  // Logic for selecting a product to show details
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  // Close product detail overlay
  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
   
    return matchesSearch && matchesCategory;
  });

  // Group products by category for display
  const productsByCategory = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  // Function to get product specification text
  const getProductSpec = (product) => {
    if (product.type === 'liquid') {
      return `Volume: ${product.volume}`;
    } else if (product.type === 'cream') {
      return `Weight: ${product.weight}`;
    } else if (product.type === 'powder') {
      return `Weight: ${product.weight}`;
    } else {
      return `Quantity: ${product.quantity}`;
    }
  };

  // Get related products for the selected product
  const getRelatedProducts = () => {
    if (!selectedProduct) return [];
    return products.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
      .sort(() => Math.random() - 0.5) // Randomize the order
      .slice(0, 4); // Show only 4 related products
  };

  // Switch statement to render the correct page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div style={styles.pageContent}>
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
           
            <div style={styles.categoryFilter}>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    ...styles.categoryButton,
                    ...(selectedCategory === category ? styles.activeCategoryButton : {})
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
           
            <h2 style={styles.sectionTitle}>Discover Our Cosmetics</h2>
           
            {Object.keys(productsByCategory).length > 0 ? (
              Object.entries(productsByCategory).map(([category, categoryProducts]) => (
                <div key={category} style={styles.categorySection}>
                  <h3 style={styles.categoryTitle}>{category}</h3>
                  <div style={styles.productGrid}>
                    {categoryProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleBuyNow}
                        onProductClick={handleProductSelect}
                        getProductSpec={getProductSpec}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p style={styles.noProducts}>No products found matching your criteria.</p>
            )}
          </div>
        );
      case 'cart':
        return <Cart cartItems={cart} onRemove={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} onCheckout={() => setCurrentPage('checkout')} getProductSpec={getProductSpec} />;
      case 'checkout':
        return <Checkout cartItems={cart} onPlaceOrder={handlePlaceOrder} getProductSpec={getProductSpec} />;
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  };

  const Header = () => (
    <header style={styles.mainHeader}>
      <div style={styles.headerContainer}>
        <button onClick={() => setCurrentPage('home')} style={styles.logoButton}>
          Divine Glow ☆
        </button>
        <div style={styles.navContainer}>
          <button
            onClick={() => setCurrentPage('home')}
            style={{...styles.navLink, ...(currentPage === 'home' ? styles.activeNavLink : {})}}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage('about')}
            style={{...styles.navLink, ...(currentPage === 'about' ? styles.activeNavLink : {})}}
          >
            About Us
          </button>
          <button
            onClick={() => setCurrentPage('contact')}
            style={{...styles.navLink, ...(currentPage === 'contact' ? styles.activeNavLink : {})}}
          >
            Contact
          </button>
        </div>
        <nav style={styles.headerNav}>
          {isLoggedIn ? (
            <div style={styles.userContainer}>
              <span style={styles.userWelcome}>Welcome, {user?.name}</span>
              <button onClick={handleLogout} style={styles.authButton}>
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentPage('login')}
              style={{...styles.authButton, ...(currentPage === 'login' ? styles.activeNavLink : {})}}
            >
              Login
            </button>
          )}
          <button onClick={() => setShowCart(true)} style={{...styles.navButton, ...styles.cartButton}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.navIcon}>
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
            {cart.length > 0 && (
              <span style={styles.cartItemCount}>
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );

  const CartSidebar = ({ show, onClose, onCheckout, onRemove, onUpdateQuantity, getProductSpec }) => (
    <div style={{...styles.sidebarOverlay, ...(show ? styles.sidebarShow : {})}} onClick={onClose}>
      <div style={{...styles.sidebarContent, ...(show ? styles.sidebarContentShow : {})}} onClick={(e) => e.stopPropagation()}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>Shopping Cart</h2>
          <button onClick={onClose} style={styles.sidebarCloseButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m15 9-6 6"></path>
              <path d="m9 9 6 6"></path>
            </svg>
          </button>
        </div>
        {cart.length === 0 ? (
          <p style={styles.emptyCartText}>Your cart is empty.</p>
        ) : (
          <>
            <div style={styles.cartItemsList}>
              {cart.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <img src={item.image} alt={item.name} style={styles.cartItemImage} />
                  <div style={styles.cartItemDetails}>
                    <h3 style={styles.cartItemName}>{item.name}</h3>
                    <p style={styles.cartItemSpecs}>
                      {getProductSpec(item)}
                    </p>
                    <p style={styles.cartItemPrice}>₹{(item.price * item.quantity).toFixed(2)}</p>
                    <div style={styles.quantityControls}>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        style={styles.quantityButton}
                      >
                        -
                      </button>
                      <span style={styles.quantityDisplay}>{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        style={styles.quantityButton}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button onClick={() => onRemove(item.id)} style={styles.cartItemRemoveButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m15 9-6 6"></path>
                      <path d="m9 9 6 6"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div style={styles.sidebarFooter}>
              <div style={styles.cartTotal}>
                <span>Total:</span>
                <span>₹{cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
              </div>
              <button onClick={() => { onClose(); onCheckout(); }} style={styles.checkoutButton}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Product Detail Overlay Component
  const ProductDetailOverlay = ({ product, onClose, onAddToCart, onBuyNow, getProductSpec, relatedProducts, onProductClick }) => (
    <div style={styles.productDetailOverlay}>
      <div style={styles.productDetailContent}>
        <button onClick={onClose} style={styles.closeDetailButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m15 9-6 6"></path>
            <path d="m9 9 6 6"></path>
          </svg>
        </button>
        
        <div style={styles.productDetailMain}>
          <div style={styles.productDetailImageContainer}>
            <img src={product.image} alt={product.name} style={styles.productDetailImage} />
          </div>
          
          <div style={styles.productDetailInfo}>
            <div style={styles.productDetailCategory}>{product.category}</div>
            <h2 style={styles.productDetailName}>{product.name}</h2>
            <StarRating rating={product.rating} customerCount={product.customerCount} />
            <p style={styles.productDetailDescription}>{product.description}</p>
            
            <div style={styles.productDetailSpecs}>
              <span style={styles.productDetailSpecText}>{getProductSpec(product)}</span>
            </div>
            
            <div style={styles.productDetailPriceContainer}>
              <p style={styles.productDetailPrice}>₹{product.price.toFixed(2)}</p>
            </div>
            
            <div style={styles.productDetailActions}>
              <button onClick={() => onAddToCart(product)} style={{...styles.button, ...styles.addToCartButton, ...styles.detailActionButton}}>
                Add to Cart
              </button>
              <button onClick={() => onBuyNow(product)} style={{...styles.button, ...styles.buyNowButton, ...styles.detailActionButton}}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
        
        {relatedProducts.length > 0 && (
          <div style={styles.relatedProductsSection}>
            <h3 style={styles.relatedProductsTitle}>You Might Also Like</h3>
            <div style={styles.relatedProductsGrid}>
              {relatedProducts.map(relatedProduct => (
                <RelatedProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  onAddToCart={onAddToCart}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={styles.appContainer}>
      <div style={styles.backgroundImage}></div>
      <Header />
      <main style={styles.containerMain}>
        {renderPage()}
      </main>
      
      {/* Product Detail Overlay */}
      {selectedProduct && (
        <ProductDetailOverlay
          product={selectedProduct}
          onClose={handleCloseProductDetail}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          getProductSpec={getProductSpec}
          relatedProducts={getRelatedProducts()}
          onProductClick={handleProductSelect}
        />
      )}
      
      <CartSidebar
        show={showCart}
        onClose={() => setShowCart(false)}
        onCheckout={() => { setCurrentPage('checkout'); setShowCart(false); }}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        getProductSpec={getProductSpec}
      />
      {showOrderModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.modalIcon}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-8.6"></path>
                <path d="M22 4 12 14.01l-3-3"></path>
            </svg>
            <h2 style={styles.modalTitle}>Order Placed!</h2>
            <p style={styles.modalText}>
              Thank you for your purchase. Your order has been successfully placed and will be shipped shortly.
            </p>
            <button
              onClick={() => {
                setShowOrderModal(false);
                setCurrentPage('home');
              }}
              style={styles.modalButton}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// A reusable component for a product card
const ProductCard = ({ product, onAddToCart, onBuyNow, onProductClick, getProductSpec }) => (
  <div style={styles.productCard}>
    <div onClick={() => onProductClick(product)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <div style={styles.productImageContainer}>
        <img
          src={product.image}
          alt={product.name}
          style={styles.productImage}
        />
        <div style={styles.productCategory}>
          {product.category}
        </div>
      </div>
      <div style={styles.productInfo}>
        <h3 style={styles.productName}>{product.name}</h3>
        <StarRating rating={product.rating} customerCount={product.customerCount} compact={true} />
        <p style={styles.productDescription}>{product.description}</p>
        <div style={styles.productSpecs}>
          <span style={styles.productSpecText}>{getProductSpec(product)}</span>
        </div>
        <div style={styles.productPriceContainer}>
          <p style={styles.productPrice}>₹{product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
    <div style={styles.productCardButtons}>
      <button onClick={() => onAddToCart(product)} style={{...styles.button, ...styles.addToCartButton}}>
        Add to Cart
      </button>
      <button onClick={() => onBuyNow(product)} style={{...styles.button, ...styles.buyNowButton}}>
        Buy Now
      </button>
    </div>
  </div>
);

// A new component to display related products
const RelatedProductCard = ({ product, onAddToCart, onProductClick }) => (
  <div style={styles.relatedProductCard}>
    <div onClick={() => onProductClick(product)} style={{ cursor: 'pointer' }}>
      <img src={product.image} alt={product.name} style={styles.relatedProductImage} />
      <div style={styles.relatedProductInfo}>
        <h5 style={styles.relatedProductName}>{product.name}</h5>
        <div style={styles.relatedStarRatingContainer}>
          <StarRating rating={product.rating} customerCount={product.customerCount} compact={true} />
        </div>
        <p style={styles.relatedProductPrice}>₹{product.price.toFixed(2)}</p>
      </div>
    </div>
    <button 
      onClick={() => onAddToCart(product)} 
      style={styles.relatedProductAddButton}
      title="Add to cart"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap='round' strokeLinejoin='round'>
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
    </button>
  </div>
);

// The page component for the shopping cart
const Cart = ({ cartItems, onRemove, onUpdateQuantity, onCheckout, getProductSpec }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={styles.pageContent}>
      <h2 style={styles.pageHeader}>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p style={styles.emptyCartText}>Your cart is empty. Time to find some magic!</p>
      ) : (
        <div style={styles.pageGrid}>
          <div style={{ gridColumn: 'span 2' }}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.cartItemCard}>
                <img src={item.image} alt={item.name} style={styles.cartItemImageLarge} />
                <div style={styles.cartItemDetailsLarge}>
                  <h3 style={styles.cartItemNameLarge}>{item.name}</h3>
                  <p style={styles.cartItemSpecs}>
                    {getProductSpec(item)}
                  </p>
                  <div style={styles.quantityControls}>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      style={styles.quantityButton}
                    >
                      -
                    </button>
                    <span style={styles.quantityDisplay}>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      style={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  <p style={styles.productPrice}>₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button onClick={() => onRemove(item.id)} style={styles.cartItemRemoveButton}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m15 9-6 6"></path>
                    <path d="m9 9 6 6"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div style={{ ...styles.orderSummaryBox, ...{ height: 'fit-content' } }}>
            <h3 style={styles.summaryTitle}>Order Summary</h3>
            <div style={styles.summaryRow}><span>Subtotal</span><span>₹{total.toFixed(2)}</span></div>
            <div style={styles.summaryRow}><span>Shipping</span><span>Free</span></div>
            <div style={styles.summaryDivider}></div>
            <div style={styles.summaryTotal}><span>Total</span><span>₹{total.toFixed(2)}</span></div>
            <button onClick={onCheckout} style={{ ...styles.checkoutButton, ...{ width: '100%' } }}>
              Proceed to Checkout
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

// The page component for the checkout process
const Checkout = ({ cartItems, onPlaceOrder, getProductSpec }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={styles.pageContent}>
      <h2 style={styles.pageHeader}>Checkout</h2>
      <div style={styles.pageGrid}>
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ ...styles.formSection, ...{ marginBottom: '1.5rem' } }}>
            <h3 style={styles.formTitle}>Shipping Information</h3>
            <div style={styles.formGrid}>
              <input type="text" placeholder="Full Name" style={styles.formInput} />
              <input type="text" placeholder="Address Line 1" style={styles.formInput} />
              <input type="text" placeholder="City" style={styles.formInput} />
              <input type="text" placeholder="Postal Code" style={styles.formInput} />
              <input type="email" placeholder="Email Address" style={{...styles.formInput, ...{ gridColumn: 'span 2'}}} />
            </div>
          </div>
          <div style={styles.formSection}>
            <h3 style={styles.formTitle}>Payment Details</h3>
            <p style={styles.simulatedWarning}>This is a simulated payment page. No real transactions will occur.</p>
            <div style={styles.formGrid}>
              <input type="text" placeholder="Card Number" style={styles.formInput} />
              <input type="text" placeholder="Cardholder Name" style={styles.formInput} />
              <input type="text" placeholder="MM/YY" style={styles.formInput} />
              <input type="text" placeholder="CVC" style={styles.formInput} />
            </div>
          </div>
        </div>
        <div style={{ ...styles.orderSummaryBox, ...{ height: 'fit-content' } }}>
            <h3 style={styles.summaryTitle}>Order Summary</h3>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              {cartItems.map((item) => (
                <li key={item.id} style={{...styles.summaryRow, ...{ marginBottom: '0.5rem' }}}>
                  <div>
                    <span style={{ color: '#4B5563', display: 'block' }}>{item.name}</span>
                    <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>
                      {getProductSpec(item)}
                    </span>
                    <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>Quantity: {item.quantity}</span>
                  </div>
                  <span style={{ fontWeight: '600', color: '#1F2937' }}>₹{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div style={styles.summaryDivider}></div>
            <div style={styles.summaryTotal}>
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button onClick={onPlaceOrder} style={{ ...styles.checkoutButton, ...{ width: '100%' } }}>
              Pay Now
            </button>
          </div>
      </div>
    </div>
  );
};

// Login page component
const Login = ({ onLogin }) => (
  <div style={styles.pageContent}>
    <div style={styles.loginContainer}>
      <h2 style={styles.pageHeader}>Login to Your Account</h2>
      <form onSubmit={onLogin} style={styles.loginForm}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.formLabel}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            style={styles.formInput}
            placeholder="Enter your email"
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.formLabel}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            style={styles.formInput}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" style={styles.loginButton}>Login</button>
      </form>
      <p style={styles.loginNote}>
        Don't have an account?
      </p>
    </div>
  </div>
);

// About Us page component
const About = () => (
  <div style={styles.pageContent}>
    <h2 style={styles.pageHeader}>About Divine Glow</h2>
    <div style={styles.aboutContent}>
      <div style={styles.aboutText}>
        <p>
          Divine Glow is your premier destination for high-quality cosmetics and skincare products.
          We believe that everyone deserves to feel beautiful and confident in their own skin.
        </p>
        <p>
          Our carefully curated collection features only the finest products, sourced from trusted
          brands and manufacturers around the world. From luxurious foundations to nourishing serums,
          we have everything you need to create your perfect beauty routine.
        </p>
        <p>
          At Divine Glow, we're committed to cruelty-free products and sustainable practices.
          We believe that beauty shouldn't come at the expense of our planet or its inhabitants.
        </p>
      </div>
      <div style={styles.aboutImage}>
        <img
          src="https://thumbs.dreamstime.com/b/skin-care-beauty-portrait-woman-holding-bottle-dropper-near-face-model-using-natural-cosmetic-product-skin-care-beauty-192845926.jpg"
          alt="About Divine Glow"
          style={styles.aboutImg}
        />
      </div>
    </div>
  </div>
);

// Contact page component
const Contact = () => (
  <div style={styles.pageContent}>
    <h2 style={styles.pageHeader}>Contact Us</h2>
    <div style={styles.contactContainer}>
      <div style={styles.contactInfo}>
        <h3 style={styles.contactTitle}>Get in Touch</h3>
        <p style={styles.contactText}>
          Have questions about our products or need assistance with your order?
          Our customer service team is here to help.
        </p>
        <div style={styles.contactDetail}>
          <strong>Email:</strong> support@divineglow.com
        </div>
        <div style={styles.contactDetail}>
          <strong>Phone:</strong> +91 1234567890
        </div>
        <div style={styles.contactDetail}>
          <strong>Address:</strong> 123 Avenue, Cosmetic City, CC 12345
        </div>
        <div style={styles.contactDetail}>
          <strong>Hours:</strong> Monday-Friday, 9AM-6PM
        </div>
      </div>
      <div style={styles.contactForm}>
        <h3 style={styles.contactTitle}>Send us a Message</h3>
        <form style={styles.messageForm}>
          <div style={styles.formGroup}>
            <input type="text" placeholder="Your Name" style={styles.formInput} />
          </div>
          <div style={styles.formGroup}>
            <input type="email" placeholder="Your Email" style={styles.formInput} />
          </div>
          <div style={styles.formGroup}>
            <textarea placeholder="Your Message" rows="5" style={{...styles.formInput, ...styles.textarea}}></textarea>
          </div>
          <button type="submit" style={styles.submitButton}>Send Message</button>
        </form>
      </div>
    </div>
  </div>
);

const styles = {
  // General Layout & Typography
  appContainer: {
    backgroundColor: '#fffafb',
    color: '#1F2937',
    minHeight: '100vh',
    fontFamily: '"Roboto", sans-serif',
    position: 'relative',
    fontSize: '14px',
    lineHeight: '1.5'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("https://static.vecteezy.com/system/resources/thumbnails/003/805/655/small_2x/pink-background-template-free-vector.jpg")',
    opacity: 0.25,
    zIndex: 0
  },
  containerMain: { 
    flexGrow: 1, 
    position: 'relative', 
    zIndex: 1,
    paddingTop: '1rem'
  },
  pageContent: { 
    maxWidth: '1280px', 
    margin: '0 auto', 
    padding: '1rem', 
    position: 'relative', 
    zIndex: 1 
  },
  pageGrid: { 
    display: 'grid', 
    gridTemplateColumns: '1fr',
    gap: '1.5rem',
    '@media (min-width: 768px)': { 
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' 
    } 
  },
  sectionTitle: { 
    fontSize: '1.875rem',
    fontWeight: '700', 
    margin: '2rem 0', 
    color: '#831843', 
    textAlign: 'center', 
    fontFamily: '"Playfair Display", serif',
    textShadow: '0 2px 4px rgba(190, 24, 93, 0.1)',
    '@media (min-width: 768px)': {
      fontSize: '2.25rem'
    }
  },
  pageHeader: { 
    fontSize: '1.875rem',
    fontWeight: '700', 
    marginBottom: '1.5rem', 
    color: '#831843', 
    textAlign: 'center', 
    fontFamily: '"Playfair Display", serif',
    textShadow: '0 2px 4px rgba(190, 24, 93, 0.1)',
    '@media (min-width: 768px)': {
      fontSize: '2.25rem'
    }
  },

  // Header & Navigation
  mainHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    boxShadow: '0 2px 4px rgba(190, 24, 93, 0.1)',
    borderBottom: '1px solid #f9a8d4'
  },
  headerContainer: { 
    maxWidth: '1280px', 
    margin: '0 auto', 
    padding: '1rem', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    flexWrap: 'wrap',
    gap: '1rem'
  },
  logoButton: {
    color: '#831843',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    transition: 'transform 0.3s ease-in-out',
    fontFamily: '"Playfair Display", serif',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    '@media (min-width: 768px)': {
      fontSize: '1.75rem'
    }
  },
  navContainer: { 
    display: 'flex', 
    gap: '0.5rem', 
    margin: '0 0.5rem',
    flexWrap: 'wrap',
    '@media (min-width: 768px)': {
      gap: '1rem',
      margin: '0 1rem'
    }
  },
  navLink: {
    padding: '0.5rem 1rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    borderRadius: '0.375rem',
    color: '#831843',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    fontFamily: '"Roboto", sans-serif',
    fontSize: '1rem',
    '@media (min-width: 768px)': {
      padding: '0.625rem 1.125rem',
      fontSize: '1rem'
    }
  },
  activeNavLink: { backgroundColor: '#fce7f3', color: '#be185d' },
  headerNav: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '0.75rem',
    '@media (min-width: 768px)': {
      gap: '1rem'
    }
  },
  navButton: { 
    padding: '0.5rem', 
    border: 'none', 
    background: 'none', 
    cursor: 'pointer', 
    borderRadius: '9999px', 
    color: '#831843', 
    display: 'flex', 
    alignItems: 'center', 
    transition: 'background-color 0.3s ease' 
  },
  navIcon: { height: '1.5rem', width: '1.5rem' },
  cartButton: { position: 'relative' },
  cartItemCount: { 
    position: 'absolute', 
    top: '-0.375rem', 
    right: '-0.375rem', 
    backgroundColor: '#ec4899', 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: '0.75rem', 
    width: '1.25rem', 
    height: '1.25rem', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: '9999px' 
  },
  authButton: {
    padding: '0.5rem 1rem',
    border: '1px solid #f9a8d4',
    background: 'none',
    cursor: 'pointer',
    borderRadius: '0.375rem',
    color: '#831843',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    fontFamily: '"Roboto", sans-serif',
    fontSize: '1rem',
    '@media (min-width: 768px)': {
      padding: '0.625rem 1.125rem',
      fontSize: '1rem'
    }
  },
  userContainer: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '0.75rem',
    '@media (min-width: 768px)': {
      gap: '1rem'
    }
  },
  userWelcome: { 
    color: '#831843', 
    fontSize: '0.875rem', 
    fontWeight: '500',
    '@media (min-width: 768px)': {
      fontSize: '1rem'
    }
  },

  // Search and Category Filter
  searchContainer: { 
    margin: '1.5rem 0', 
    display: 'flex', 
    justifyContent: 'center' 
  },
  searchInput: {
    width: '100%',
    maxWidth: '500px',
    padding: '0.75rem 1.25rem',
    border: '1px solid #f9a8d4',
    borderRadius: '2rem',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    fontFamily: '"Roboto", sans-serif',
    boxShadow: '0 2px 4px rgba(190, 24, 93, 0.1)'
  },
  categoryFilter: { 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: '0.5rem', 
    marginBottom: '1.5rem', 
    justifyContent: 'center' 
  },
  categoryButton: {
    padding: '0.5rem 1rem',
    border: '1px solid #f9a8d4',
    background: 'rgba(255, 255, 255, 0.9)',
    cursor: 'pointer',
    borderRadius: '2rem',
    color: '#831843',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    fontFamily: '"Roboto", sans-serif',
    fontSize: '0.875rem',
    boxShadow: '0 1px 2px rgba(190, 24, 93, 0.1)',
    '@media (min-width: 768px)': {
      padding: '0.625rem 1.25rem',
      fontSize: '1rem'
    }
  },
  activeCategoryButton: { backgroundColor: '#ec4899', color: 'white', borderColor: '#ec4899', boxShadow: '0 2px 4px rgba(236, 72, 153, 0.2)' },
  categorySection: { marginBottom: '3rem' },
  categoryTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1.25rem',
    color: '#831843',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #f9a8d4',
    fontFamily: '"Playfair Display", serif',
    textAlign: 'center',
    textShadow: '0 1px 2px rgba(190, 24, 93, 0.1)',
    '@media (min-width: 768px)': {
      fontSize: '1.75rem'
    }
  },
  noProducts: { textAlign: 'center', color: '#9d174d', fontSize: '1.125rem', margin: '2rem 0' },
  emptyCartText: { textAlign: 'center', color: '#9d174d', margin: '2.5rem 0' },

  // Product Grid
  productGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
    gap: '1.5rem',
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
      gap: '1.25rem'
    }
  },
  productCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 6px 12px rgba(190, 24, 93, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '1px solid #fbcfe8',
    '@media (min-width: 768px)': {
      padding: '1.25rem'
    }
  },
  productImageContainer: { position: 'relative' },
  productImage: { 
    width: '100%', 
    height: '200px', 
    objectFit: 'cover', 
    borderRadius: '0.5rem', 
    marginBottom: '1rem'
  },
  productCategory: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    backgroundColor: '#ec4899',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '0.75rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    '@media (min-width: 768px)': {
      padding: '0.375rem 0.75rem'
    }
  },
  productInfo: { flex: 1 },
  productName: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#831843',
    fontFamily: '"Playfair Display", serif',
    marginBottom: '0.5rem',
    lineHeight: '1.3'
  },
  productDescription: {
    color: '#6B7280',
    fontSize: '0.875rem',
    marginBottom: '0.75rem',
    height: '3rem',
    overflow: 'hidden',
    fontFamily: '"Roboto", sans-serif',
    lineHeight: '1.4'
  },
  productSpecs: { marginBottom: '0.75rem' },
  productSpecText: {
    fontSize: '0.875rem',
    color: '#831843',
    backgroundColor: '#fce7f3',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    display: 'inline-block',
    fontFamily: '"Roboto", sans-serif'
  },
  productPriceContainer: { marginBottom: '1rem' },
  productPrice: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#ec4899',
    fontFamily: '"Playfair Display", serif'
  },
  productCardButtons: { 
    display: 'flex', 
    gap: '0.5rem'
  },
  button: {
    flex: 1,
    padding: '0.625rem',
    borderRadius: '0.625rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    fontFamily: '"Roboto", sans-serif'
  },
  addToCartButton: { backgroundColor: '#fce7f3', color: '#ec4899' },
  buyNowButton: { backgroundColor: '#ec4899', color: 'white' },

  // Star Rating Styles - FIXED
  starRatingContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '0.5rem 0',
    position: 'relative',
    height: '1.125rem'
  },
  starRatingContainerCompact: {
    margin: '0.375rem 0',
    height: '0.9375rem'
  },
  starsContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  starFilled: {
    color: '#fcd34d',
    fontSize: '1.125rem',
    marginRight: '0.125rem'
  },
  starHalf: {
    color: '#fcd34d',
    fontSize: '1.125rem',
    marginRight: '0.125rem'
  },
  starEmpty: {
    color: '#d1d5db',
    fontSize: '1.125rem',
    marginRight: '0.125rem'
  },
  ratingText: {
    fontSize: '0.875rem',
    color: '#4b5563',
    marginLeft: '0.5rem',
    fontFamily: '"Roboto", sans-serif'
  },
  ratingTextCompact: {
    fontSize: '0.8125rem',
    marginLeft: '0.375rem'
  },

  // Product Detail Overlay Styles
  productDetailOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    overflowY: 'auto'
  },
  productDetailContent: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '80vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.2)',
    '@media (min-width: 768px)': {
      padding: '2rem'
    }
  },
  closeDetailButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#831843',
    zIndex: 10,
    padding: '0.375rem'
  },
  productDetailMain: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem',
    marginBottom: '2rem',
    '@media (min-width: 768px)': {
      gridTemplateColumns: '1fr 1fr',
    }
  },
  productDetailImageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  productDetailImage: {
    width: '100%',
    maxHeight: '280px',
    objectFit: 'contain',
    borderRadius: '0.5rem',
    '@media (min-width: 768px)': {
      maxHeight: '320px'
    }
  },
  productDetailInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  productDetailCategory: {
    backgroundColor: '#ec4899',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    alignSelf: 'flex-start'
  },
  productDetailName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#831843',
    fontFamily: '"Playfair Display", serif',
    margin: 0,
    lineHeight: '1.3',
    '@media (min-width: 768px)': {
      fontSize: '1.75rem'
    }
  },
  productDetailDescription: {
    color: '#6B7280',
    fontSize: '1rem',
    lineHeight: '1.6',
    fontFamily: '"Roboto", sans-serif'
  },
  productDetailSpecs: {
    margin: '0.75rem 0'
  },
  productDetailSpecText: {
    fontSize: '1rem',
    color: '#831843',
    backgroundColor: '#fce7f3',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    display: 'inline-block',
    fontFamily: '"Roboto", sans-serif'
  },
  productDetailPriceContainer: {
    margin: '0.75rem 0'
  },
  productDetailPrice: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ec4899',
    fontFamily: '"Playfair Display", serif',
    margin: 0,
    '@media (min-width: 768px)': {
      fontSize: '1.75rem'
    }
  },
  productDetailActions: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.75rem',
    flexDirection: 'column',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      gap: '1rem',
      marginTop: '1rem'
    }
  },
  detailActionButton: {
    padding: '0.75rem 1.25rem',
    fontSize: '1rem'
  },
  
  // Related Products Section in Detail Overlay
  relatedProductsSection: {
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTop: '1px solid #fce7f3'
  },
  relatedProductsTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#831843',
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontFamily: '"Playfair Display", serif'
  },
  relatedProductsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '1.5rem',
    maxWidth: '600px',
    margin: '0 auto'
  },
  relatedProductCard: {
    backgroundColor: 'white',
    padding: '0.75rem',
    borderRadius: '0.625rem',
    boxShadow: '0 3px 6px rgba(190, 24, 93, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    border: '1px solid #fce7f3',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  relatedProductImage: {
    width: '100%',
    height: '100px',
    objectFit: 'contain',
    borderRadius: '0.5rem',
    marginBottom: '0.625rem'
  },
  relatedProductInfo: { flexGrow: 1, textAlign: 'center' },
  relatedProductName: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#831843',
    marginBottom: '0.375rem',
    fontFamily: '"Playfair Display", serif',
    lineHeight: '1.3'
  },
  relatedStarRatingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '0.375rem'
  },
  relatedProductPrice: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#ec4899',
    marginTop: '0.375rem',
    fontFamily: '"Playfair Display", serif'
  },
  relatedProductAddButton: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%',
    backgroundColor: '#fce7f3',
    color: '#ec4899',
    border: '1px solid #f9a8d4',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },

  // Quantity Controls
  quantityControls: { display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.5rem 0' },
  quantityButton: {
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%',
    border: '1px solid #f9a8d4',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    color: '#831843'
  },
  quantityDisplay: {
    padding: '0.25rem 0.5rem',
    border: '1px solid #f9a8d4',
    borderRadius: '0.375rem',
    minWidth: '2rem',
    textAlign: 'center',
    color: '#831843',
    fontSize: '1rem'
  },

  // Cart Sidebar
  sidebarOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 99, transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out', opacity: 0, visibility: 'hidden' },
  sidebarShow: { opacity: 1, visibility: 'visible' },
  sidebarContent: { position: 'fixed', top: 0, right: 0, height: '100%', width: '100%', maxWidth: '360px', backgroundColor: 'white', boxShadow: '-4px 0 10px rgba(0, 0, 0, 0.1)', padding: '1rem', transition: 'transform 0.3s ease-in-out', transform: 'translateX(100%)', display: 'flex', flexDirection: 'column' },
  sidebarContentShow: { transform: 'translateX(0)' },
  sidebarHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.625rem', borderBottom: '1px solid #fce7f3' },
  sidebarTitle: { fontSize: '1.25rem', fontWeight: '600', color: '#831843', fontFamily: '"Playfair Display", serif' },
  sidebarCloseButton: { background: 'none', border: 'none', cursor: 'pointer', color: '#831843', padding: '0.375rem' },
  cartItemsList: { overflowY: 'auto', flexGrow: 1 },
  cartItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem', paddingBottom: '0.875rem', borderBottom: '1px solid #fce7f3' },
  cartItemImage: { width: '3rem', height: '3rem', objectFit: 'cover', borderRadius: '0.5rem' },
  cartItemDetails: { flex: 1 },
  cartItemName: { fontSize: '1rem', fontWeight: '500', color: '#831843', marginBottom: '0.375rem' },
  cartItemSpecs: { fontSize: '0.8125rem', color: '#9d174d', margin: '0.25rem 0' },
  cartItemPrice: { color: '#ec4899', fontWeight: '600', marginTop: '0.375rem', fontSize: '1rem' },
  cartItemRemoveButton: { color: '#f9a8d4', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s ease', padding: '0.375rem' },
  sidebarFooter: { paddingTop: '1rem', borderTop: '1px solid #fce7f3' },
    cartTotal: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#831843' },
  checkoutButton: {
    width: '100%',
    backgroundColor: '#ec4899',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '0.625rem',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    fontFamily: '"Roboto", sans-serif'
  },

  // Order Modal
  modalOverlay: { position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  modalContent: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '1rem',
    boxShadow: '0 6px 12px rgba(190, 24, 93, 0.1)',
    maxWidth: '24rem',
    textAlign: 'center',
    border: '1px solid #fce7f3',
    margin: '1rem'
  },
  modalIcon: { color: '#22C55E', margin: '0 auto', marginBottom: '1rem' },
  modalTitle: { fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#831843', fontFamily: '"Playfair Display", serif' },
  modalText: { color: '#9d174d', marginBottom: '1rem', fontFamily: '"Roboto", sans-serif', fontSize: '1rem' },
  modalButton: {
    backgroundColor: '#ec4899',
    color: 'white',
    padding: '0.625rem 1.25rem',
    borderRadius: '0.625rem',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    fontFamily: '"Roboto", sans-serif',
    fontSize: '1rem'
  },

  // Cart Page & Checkout Page Styles
  cartItemCard: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 8px rgba(190, 24, 93, 0.1)',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    border: '1px solid #fce7f3',
    flexDirection: 'column',
    '@media (min-width: 768px)': {
      flexDirection: 'row'
    }
  },
  cartItemImageLarge: { width: '4.5rem', height: '4.5rem', objectFit: 'cover', borderRadius: '0.5rem' },
  cartItemDetailsLarge: { flex: 1 },
  cartItemNameLarge: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#831843',
    marginBottom: '0.5rem'
  },
  orderSummaryBox: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 8px rgba(190, 24, 93, 0.1)',
    marginBottom: '1.5rem',
    border: '1px solid #fce7f3'
  },
  summaryTitle: { fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#831843', fontFamily: '"Playfair Display", serif' },
  formSection: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 8px rgba(190, 24, 93, 0.1)',
    marginBottom: '1rem',
    border: '1px solid #fce7f3'
  },
  formTitle: { fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#831843', fontFamily: '"Playfair Display", serif' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', color: '#831843', fontSize: '1rem' },
  summaryDivider: { borderTop: '1px solid #fce7f3', marginTop: '1rem', marginBottom: '1rem' },
  summaryTotal: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#831843' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' } },
  formInput: {
    padding: '0.75rem',
    border: '1px solid #f9a8d4',
    borderRadius: '0.5rem',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    fontFamily: '"Roboto", sans-serif',
    color: '#831843',
    fontSize: '1rem'
  },
  simulatedWarning: { fontSize: '0.875rem', color: '#ef4444', marginBottom: '1rem' },

  // Login Page Styles
  loginContainer: {
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '1.5rem',
    borderRadius: '1rem',
    boxShadow: '0 6px 12px rgba(190, 24, 93, 0.1)',
    border: '1px solid #fce7f3'
  },
  loginForm: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  formLabel: { fontWeight: '600', color: '#831843', fontFamily: '"Roboto", sans-serif', fontSize: '1rem' },
  loginButton: {
    backgroundColor: '#ec4899',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1rem',
    fontFamily: '"Roboto", sans-serif'
  },
  loginNote: { textAlign: 'center', marginTop: '1.5rem', color: '#9d174d', fontSize: '0.9375rem', fontFamily: '"Roboto", sans-serif' },

  // About Page Styles
  aboutContent: { display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', '@media (min-width: 768px)': { gridTemplateColumns: '2fr 1fr', gap: '2rem' } },
  aboutText: { display: 'flex', flexDirection: 'column', gap: '1rem', color: '#831843', fontFamily: '"Roboto", sans-serif', fontSize: '1rem', lineHeight: '1.6' },
  aboutImage: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  aboutImg: { width: '100', borderRadius: '1rem', boxShadow: '0 6px 12px rgba(190, 24, 93, 0.1)', border: '1px solid #fce7f3', '@media (min-width: 768px)': { width: '80%' } },

  // Contact Page Styles
  contactContainer: { display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr', gap: '2rem' } },
  contactInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 6px 12px rgba(190, 24, 93, 0.1)',
    border: '1px solid #fce7f3'
  },
  contactTitle: { 
    fontSize: '1.25rem', 
    fontWeight: 'bold', 
    marginBottom: '1rem', 
    color: '#831843', 
    fontFamily: '"Playfair Display", serif'
  },
  contactText: { 
    marginBottom: '1rem', 
    color: '#9d174d', 
    fontFamily: '"Roboto", sans-serif',
    fontSize: '1rem'
  },
  contactDetail: { 
    marginBottom: '0.75rem', 
    color: '#831843', 
    fontFamily: '"Roboto", sans-serif',
    fontSize: '0.9375rem'
  },
  contactForm: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 6px 12px rgba(190, 24, 93, 0.1)',
    border: '1px solid #fce7f3'
  },
  messageForm: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  textarea: { 
    resize: 'vertical', 
    minHeight: '120px', 
    fontFamily: '"Roboto", sans-serif',
    fontSize: '1rem'
  },
  submitButton: {
    backgroundColor: '#ec4899',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1rem',
    fontFamily: '"Roboto", sans-serif'
  }
};

export default App;