<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentation - Trend Forge</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&family=Roboto:wght@400;500;700&display=swap');
        body { font-family: 'Roboto', sans-serif; line-height: 1.6; }
        h1, h2, h3 { font-family: 'Roboto Slab', serif; }
        .economist-red { background-color: #e3120b; }
        .economist-red-text { color: #e3120b; }
    </style>
</head>
<body class="bg-white">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center space-x-6">
                <h1 class="text-3xl font-bold economist-red-text"><a href="index.html">Trend Forge</a></h1>
                <div class="hidden md:flex space-x-6">
                    <a href="world.html" class="text-gray-800 hover:economist-red-text font-medium">World</a>
                    <a href="business.html" class="text-gray-800 hover:economist-red-text font-medium">Business</a>
                    <a href="finance.html" class="text-gray-800 hover:economist-red-text font-medium">Finance</a>
                    <a href="science.html" class="text-gray-800 hover:economist-red-text font-medium">Science</a>
                    <a href="culture.html" class="text-gray-800 hover:economist-red-text font-medium">Culture</a>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <button class="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200">
                    <a href="search.html"><i class="fas fa-search mr-2"></i>Search</a>
                </button>
                <button class="economist-red text-white px-4 py-2 rounded-md hover:bg-red-700">
                    <a href="subscribe.html">Subscribe</a>
                </button>
                <button class="md:hidden">
                    <i class="fas fa-bars text-gray-800 text-xl"></i>
                </button>
            </div>
        </nav>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section class="lg:col-span-2">
                <h2 class="text-3xl font-bold economist-red-text mb-6">Developer Documentation</h2>
                <div class="prose max-w-none text-gray-800">
                    <p class="mb-4">
                        This documentation outlines the technical setup and APIs for Trend Forge’s proposed backend, built with Node.js, Express, and PostgreSQL.
                    </p>
                    <h3 class="text-xl font-bold mt-6 mb-4">Backend Setup</h3>
                    <p class="mb-4">
                        - <strong>Directory</strong>: `/backend` contains configuration, controllers, middleware, models, routes, services, and tests.
                        - <strong>Dependencies</strong>: Install via `npm install` in `/backend`.
                        - <strong>Database</strong>: PostgreSQL (`trend_forge` database).
                        - <strong>Environment</strong>: Configure `.env` with `DATABASE_URL`, `PI_API_KEY`, etc.
                    </p>
                    <h3 class="text-xl font-bold mt-6 mb-4">API Endpoints</h3>
                    <p class="mb-4">Proposed endpoints (TBD):</p>
                    <ul class="list-disc list-inside mb-4">
                        <li><strong>POST /api/contact</strong>: Submit contact form data.</li>
                        <li><strong>GET /api/search?q=query</strong>: Search articles.</li>
                        <li><strong>POST /api/subscribe</strong>: Process Pi Network subscription.</li>
                        <li><strong>GET /api/subscribe/status</strong>: Check subscription status.</li>
                        <li><strong>GET /api/articles</strong>: List articles.</li>
                        <li><strong>GET /api/articles/:id</strong>: Get article (premium check).</li>
                    </ul>
                    <h3 class="text-xl font-bold mt-6 mb-4">Pi Network Integration</h3>
                    <p class="mb-4">
                        Subscriptions use the Pi Network API (placeholder). Update `/backend/services/pi-network.js` with actual credentials.
                    </p>
                    <p class="mb-4">
                        For contribution details, see <a href="contribute.html" class="economist-red-text hover:underline">Contribute</a>.
                    </p>
                </div>
            </section>
            <aside class="lg:col-span-1">
                <h3 class="text-xl font-bold economist-red-text mb-4">Related Links</h3>
                <ul class="space-y-4">
                    <li><a href="contribute.html" class="text-gray-600 hover:economist-red-text">Contribute</a></li>
                    <li><a href="code_of_conduct.html" class="text-gray-600 hover:economist-red-text">Code of Conduct</a></li>
                    <li><a href="subscribe.html" class="text-gray-600 hover:economist-red-text">Subscribe with Pi</a></li>
                </ul>
            </aside>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-black text-white mt-12">
        <div class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4">Trend Forge</h3>
                    <p class="text-gray-400">In-depth analysis and global insights to keep you informed.</p>
                </div>
                <div>
                    <h3 class="text-xl font-bold mb-4">Sections</h3>
                    <ul class="space-y-2">
                        <li><a href="world.html" class="text-gray-400 hover:economist-red-text">World</a></li>
                        <li><a href="business.html" class="text-gray-400 hover:economist-red-text">Business</a></li>
                        <li><a href="finance.html" class="text-gray-400 hover:economist-red-text">Finance</a></li>
                        <li><a href="science.html" class="text-gray-400 hover:economist-red-text">Science</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-xl font-bold mb-4">About</h3>
                    <ul class="space-y-2">
                        <li><a href="about.html" class="text-gray-400 hover:economist-red-text">Our Mission</a></li>
                        <li><a href="contact.html" class="text-gray-400 hover:economist-red-text">Contact Us</a></li>
                        <li><a href="privacy.html" class="text-gray-400 hover:economist-red-text">Privacy Policy</a></li>
                        <li><a href="terms.html" class="text-gray-400 hover:economist-red-text">Terms</a></li>
                        <li><a href="security.html" class="text-gray-400 hover:economist-red-text">Security</a></li>
                        <li><a href="faq.html" class="text-gray-400 hover:economist-red-text">FAQ</a></li>
                        <li><a href="contribute.html" class="text-gray-400 hover:economist-red-text">Contribute</a></li>
                        <li><a href="code_of_conduct.html" class="text-gray-400 hover:economist-red-text">Code of Conduct</a></li>
                        <li><a href="docs.html" class="text-gray-400 hover:economist-red-text">Documentation</a></li>
                        <li><a href="license.html" class="text-gray-400 hover:economist-red-text">License</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-xl font-bold mb-4">Follow Us</h3>
                    <div class="flex space-x-4">
                        <a href="https://twitter.com/trendforge" class="text-gray-400 hover:economist-red-text text-xl"><i class="fab fa-twitter"></i></a>
                        <a href="https://facebook.com/trendforge" class="text-gray-400 hover:economist-red-text text-xl"><i class="fab fa-facebook"></i></a>
                        <a href="https://linkedin.com/company/trendforge" class="text-gray-400 hover:economist-red-text text-xl"><i class="fab fa-linkedin"></i></a>
                        <a href="https://instagram.com/trendforge" class="text-gray-400 hover:economist-red-text text-xl"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                <p>© 2025 Trend Forge. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Mobile Menu -->
    <div class="fixed inset-0 bg-gray-800 bg-opacity-75 hidden" id="mobile-menu">
        <div class="bg-white h-full w-64 p-6">
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-xl font-bold economist-red-text">Menu</h2>
                <button class="text-gray-800" onclick="document.getElementById('mobile-menu').classList.add('hidden')">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <nav class="space-y-4">
                <a href="world.html" class="block text-gray-800 hover:economist-red-text font-medium">World</a>
                <a href="business.html" class="block text-gray-800 hover:economist-red-text font-medium">Business</a>
                <a href="finance.html" class="block text-gray-800 hover:economist-red-text font-medium">Finance</a>
                <a href="science.html" class="block text-gray-800 hover:economist-red-text font-medium">Science</a>
                <a href="culture.html" class="block text-gray-800 hover:economist-red-text font-medium">Culture</a>
                <a href="subscribe.html" class="block economist-red-text font-medium">Subscribe</a>
            </nav>
        </div>
    </div>

    <script>
        document.querySelector('.fa-bars').parentElement.addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.remove('hidden');
        });
    </script>
</body>
</html>
