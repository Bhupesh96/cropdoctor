// <!DOCTYPE html>

// <html class="light" lang="en"><head>
// <meta charset="utf-8"/>
// <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
// <title>User Profile</title>
// <!-- Fonts -->
// <link href="https://fonts.googleapis.com" rel="preconnect"/>
// <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
// <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;display=swap" rel="stylesheet"/>
// <!-- Material Icons -->
// <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
// <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
// <!-- Tailwind CSS -->
// <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
// <script id="tailwind-config">
//         tailwind.config = {
//             darkMode: "class",
//             theme: {
//                 extend: {
//                     colors: {
//                         "primary": "#ea2a33",
//                         "background-light": "#f8f6f6",
//                         "background-dark": "#211111",
//                         "card-light": "#ffffff",
//                         "card-dark": "#2d1b1b", // Slightly lighter than bg-dark
//                         "text-main-light": "#1b0e0e",
//                         "text-main-dark": "#f0eaea",
//                         "text-sub-light": "#6b5859",
//                         "text-sub-dark": "#b0a2a2",
//                     },
//                     fontFamily: {
//                         "display": ["Manrope", "sans-serif"]
//                     },
//                     borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "full": "9999px" },
//                 },
//             },
//         }
//     </script>
// <style>
//         body {
//             font-family: 'Manrope', sans-serif;
//         }
//         /* Custom scrollbar hide for clean horizontal scroll if needed */
//         .no-scrollbar::-webkit-scrollbar {
//             display: none;
//         }
//         .no-scrollbar {
//             -ms-overflow-style: none;
//             scrollbar-width: none;
//         }
//     </style>
// <style>
//     body {
//       min-height: max(884px, 100dvh);
//     }
//   </style>
//   </head>
// <body class="bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark transition-colors duration-200">
// <!-- Top App Bar -->
// <header class="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
// <div class="flex items-center justify-between px-4 py-3 max-w-md mx-auto w-full">
// <div class="w-10"></div> <!-- Spacer for centering -->
// <h2 class="text-lg font-bold leading-tight tracking-tight flex-1 text-center">My Account</h2>
// <div class="w-10 flex justify-end">
// <span class="material-symbols-outlined text-text-main-light dark:text-text-main-dark cursor-pointer">settings</span>
// </div>
// </div>
// </header>
// <!-- Main Content Area -->
// <main class="flex flex-col min-h-screen pb-24 max-w-md mx-auto w-full px-4 pt-4 gap-5">
// <!-- Profile Header Card -->
// <section class="bg-card-light dark:bg-card-dark rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
// <div class="flex items-center gap-4">
// <div class="relative shrink-0">
// <div class="h-20 w-20 rounded-full bg-cover bg-center border-2 border-primary" data-alt="Portrait of a smiling user with short hair" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAEQ6Nl2xCDQBlNKLdbW1BWiu-peXJhePtHG7C_96B5INwt9R8TQJq_q782Z0GlyrZ9ECXbsWxTtCTvBdYCy_ARwh-RNSbu4EHk7LUCOfp4m5NLe-s9jDF8UMiE2m_5MMPxPNNIVtI56aagNN1emm8atjmNMPa28kUuQs1d0Bf9D5e9I_bvfDu0CvD3VJ2eI8hsCl0GtBjQhRzrMpcGC0u4rR6aQorgVwomKyqiWkXyg-2Rhb_84B2ovkc1eMmrRC4uMdyavnkMJVY");'>
// </div>
// <div class="absolute bottom-0 right-0 bg-primary rounded-full p-1 border-2 border-white dark:border-card-dark flex items-center justify-center">
// <span class="material-symbols-outlined text-white text-[14px] font-bold">edit</span>
// </div>
// </div>
// <div class="flex flex-col flex-1">
// <h1 class="text-xl font-bold text-text-main-light dark:text-text-main-dark">Jane Doe</h1>
// <div class="flex items-center gap-1 mt-1">
// <span class="material-symbols-outlined text-primary text-[16px]">verified</span>
// <p class="text-primary text-sm font-bold">Gold Member</p>
// </div>
// </div>
// </div>
// </section>
// <!-- Orders Section -->
// <section class="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
// <!-- Action Panel / Header -->
// <div class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
// <h3 class="text-base font-bold text-text-main-light dark:text-text-main-dark">My Orders</h3>
// <a class="flex items-center gap-1 text-sm font-bold text-text-sub-light dark:text-text-sub-dark hover:text-primary transition-colors" href="#">
//                     View All
//                     <span class="material-symbols-outlined text-[18px]">chevron_right</span>
// </a>
// </div>
// <!-- Text Grid / Status Icons -->
// <div class="grid grid-cols-4 gap-2 p-4">
// <div class="flex flex-col items-center gap-2 group cursor-pointer">
// <div class="relative p-3 rounded-full bg-background-light dark:bg-background-dark group-hover:bg-primary/10 transition-colors">
// <span class="material-symbols-outlined text-text-main-light dark:text-text-main-dark group-hover:text-primary text-2xl">credit_card</span>
// <div class="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">1</div>
// </div>
// <span class="text-xs font-medium text-text-sub-light dark:text-text-sub-dark group-hover:text-primary">To Pay</span>
// </div>
// <div class="flex flex-col items-center gap-2 group cursor-pointer">
// <div class="relative p-3 rounded-full bg-background-light dark:bg-background-dark group-hover:bg-primary/10 transition-colors">
// <span class="material-symbols-outlined text-text-main-light dark:text-text-main-dark group-hover:text-primary text-2xl">local_shipping</span>
// <div class="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">2</div>
// </div>
// <span class="text-xs font-medium text-text-sub-light dark:text-text-sub-dark group-hover:text-primary">To Ship</span>
// </div>
// <div class="flex flex-col items-center gap-2 group cursor-pointer">
// <div class="relative p-3 rounded-full bg-background-light dark:bg-background-dark group-hover:bg-primary/10 transition-colors">
// <span class="material-symbols-outlined text-text-main-light dark:text-text-main-dark group-hover:text-primary text-2xl">inventory_2</span>
// </div>
// <span class="text-xs font-medium text-text-sub-light dark:text-text-sub-dark group-hover:text-primary">To Receive</span>
// </div>
// <div class="flex flex-col items-center gap-2 group cursor-pointer">
// <div class="relative p-3 rounded-full bg-background-light dark:bg-background-dark group-hover:bg-primary/10 transition-colors">
// <span class="material-symbols-outlined text-text-main-light dark:text-text-main-dark group-hover:text-primary text-2xl">rate_review</span>
// </div>
// <span class="text-xs font-medium text-text-sub-light dark:text-text-sub-dark group-hover:text-primary">To Review</span>
// </div>
// </div>
// </section>
// <!-- Account Actions List (Group 1) -->
// <section class="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
// <!-- Item 1 -->
// <div class="flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-800/50">
// <div class="flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20 shrink-0 h-10 w-10 text-primary">
// <span class="material-symbols-outlined">account_balance_wallet</span>
// </div>
// <div class="flex flex-1 items-center justify-between">
// <p class="text-base font-semibold text-text-main-light dark:text-text-main-dark">My Wallet</p>
// <div class="flex items-center gap-2">
// <span class="text-sm font-medium text-text-sub-light dark:text-text-sub-dark">$240.50</span>
// <span class="material-symbols-outlined text-text-sub-light dark:text-text-sub-dark text-xl">chevron_right</span>
// </div>
// </div>
// </div>
// <!-- Item 2 -->
// <div class="flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-800/50">
// <div class="flex items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-900/20 shrink-0 h-10 w-10 text-orange-500">
// <span class="material-symbols-outlined">loyalty</span>
// </div>
// <div class="flex flex-1 items-center justify-between">
// <p class="text-base font-semibold text-text-main-light dark:text-text-main-dark">Loyalty Points</p>
// <div class="flex items-center gap-2">
// <span class="text-sm font-medium text-text-sub-light dark:text-text-sub-dark">12,400 pts</span>
// <span class="material-symbols-outlined text-text-sub-light dark:text-text-sub-dark text-xl">chevron_right</span>
// </div>
// </div>
// </div>
// <!-- Item 3 -->
// <div class="flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
// <div class="flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 shrink-0 h-10 w-10 text-blue-500">
// <span class="material-symbols-outlined">local_activity</span>
// </div>
// <div class="flex flex-1 items-center justify-between">
// <p class="text-base font-semibold text-text-main-light dark:text-text-main-dark">Vouchers</p>
// <div class="flex items-center gap-2">
// <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">2 New</span>
// <span class="material-symbols-outlined text-text-sub-light dark:text-text-sub-dark text-xl">chevron_right</span>
// </div>
// </div>
// </div>
// </section>
// <!-- General Settings List (Group 2) -->
// <section class="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
// <!-- Item 1 -->
// <div class="flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-800/50">
// <div class="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0 h-10 w-10 text-text-main-light dark:text-text-main-dark">
// <span class="material-symbols-outlined">location_on</span>
// </div>
// <div class="flex flex-1 items-center justify-between">
// <p class="text-base font-medium text-text-main-light dark:text-text-main-dark">Shipping Addresses</p>
// <span class="material-symbols-outlined text-text-sub-light dark:text-text-sub-dark text-xl">chevron_right</span>
// </div>
// </div>
// <!-- Item 2 -->
// <div class="flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-800/50">
// <div class="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0 h-10 w-10 text-text-main-light dark:text-text-main-dark">
// <span class="material-symbols-outlined">favorite</span>
// </div>
// <div class="flex flex-1 items-center justify-between">
// <p class="text-base font-medium text-text-main-light dark:text-text-main-dark">My Wishlist</p>
// <span class="material-symbols-outlined text-text-sub-light dark:text-text-sub-dark text-xl">chevron_right</span>
// </div>
// </div>
// <!-- Item 3 -->
// <div class="flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
// <div class="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0 h-10 w-10 text-text-main-light dark:text-text-main-dark">
// <span class="material-symbols-outlined">support_agent</span>
// </div>
// <div class="flex flex-1 items-center justify-between">
// <p class="text-base font-medium text-text-main-light dark:text-text-main-dark">Help Center</p>
// <span class="material-symbols-outlined text-text-sub-light dark:text-text-sub-dark text-xl">chevron_right</span>
// </div>
// </div>
// </section>
// <!-- Logout Button -->
// <button class="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-text-sub-light dark:text-text-sub-dark font-bold hover:bg-gray-100 dark:hover:bg-white/5 transition-colors mb-4">
// <span class="material-symbols-outlined">logout</span>
//             Sign Out
//         </button>
// <div class="text-center text-xs text-text-sub-light dark:text-text-sub-dark pb-6">
//             App Version 2.4.0
//         </div>
// </main>
// <!-- Bottom Navigation Bar -->
// <nav class="fixed bottom-0 w-full z-40 bg-card-light dark:bg-card-dark border-t border-gray-200 dark:border-gray-800 safe-area-bottom">
// <div class="max-w-md mx-auto flex justify-between items-center px-6 h-16">
// <a class="flex flex-col items-center gap-1 text-text-sub-light dark:text-text-sub-dark hover:text-primary dark:hover:text-primary transition-colors" href="#">
// <span class="material-symbols-outlined text-[24px]">home</span>
// <span class="text-[10px] font-medium">Home</span>
// </a>
// <a class="flex flex-col items-center gap-1 text-text-sub-light dark:text-text-sub-dark hover:text-primary dark:hover:text-primary transition-colors" href="#">
// <span class="material-symbols-outlined text-[24px]">grid_view</span>
// <span class="text-[10px] font-medium">Categories</span>
// </a>
// <a class="flex flex-col items-center gap-1 text-text-sub-light dark:text-text-sub-dark hover:text-primary dark:hover:text-primary transition-colors" href="#">
// <div class="relative">
// <span class="material-symbols-outlined text-[24px]">shopping_cart</span>
// <span class="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full border border-card-light dark:border-card-dark"></span>
// </div>
// <span class="text-[10px] font-medium">Cart</span>
// </a>
// <a class="flex flex-col items-center gap-1 text-primary" href="#">
// <span class="material-symbols-outlined text-[24px] font-variation-settings-fill">person</span>
// <span class="text-[10px] font-bold">Profile</span>
// </a>
// </div>
// </nav>
// <!-- CSS for Filled Material Icons (Specific override for active state) -->
// <style>
//         .font-variation-settings-fill {
//             font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
//         }
//         /* Safe area for iPhone home indicator */
//         .safe-area-bottom {
//             padding-bottom: env(safe-area-inset-bottom);
//         }
//     </style>
// </body></html>