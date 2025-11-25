<h1 align="center">PhotoSphere 📸🏝️</h1>

<p align="center">
  A modern, responsive *photo discovery app* built with React + Vite, powered by the *Pexels API*, to explore, search, and save stunning images.
</p>

---

## 🚀 Live Demo  
[photo-sphere-one.vercel.app](https://photo-sphere-one.vercel.app)  

---

## 🔍 What Is PhotoSphere?

PhotoSphere is a web application that lets users:

- 🌐 Browse a curated gallery of high-quality images  
- 🔎 Search photos by keywords or predefined categories  
- ⭐ Favorite or “like” images to save them locally  
- 📱 View images in a clean, immersive layout  
- 📂 Explore photographer details (when available) and optionally follow links to their profile  

It’s built to be fast, responsive, and user-friendly — designed for both desktop and mobile experiences.

---

## 🧰 Tech Stack & Tools

- **Frontend**: React, Vite  
- **State Management**: React hooks (useState, useEffect)  
- **Styling**: Tailwind
- **API**: Pexels REST API for fetching images  
- **Persistence**: LocalStorage (for saving favorites)  
- **Linting / Quality**: ESLint (as seen in `eslint.config.js`)  
- **Deployment**: Vercel  

---

## 📦 How It Works

1. **Fetching Photos**  
   The app calls the Pexels API to retrieve image data based on search terms or categories.

2. **Displaying Images**  
   Results are displayed in a responsive grid layout. Each photo card shows a preview image, and when clicked, provides more details (like photographer name).

3. **Saving Favorites**  
   Users can mark photos as favorites (or “like” them). These are stored in `localStorage` so favorites persist across sessions.

4. **Attribution**  
   Each image is properly attributed to its photographer, with a link back to the original source on Pexels.

---

## ⚙️ Getting Started (Development)

To run PhotoSphere locally:

```bash
# Clone the repo
git clone https://github.com/Sadiqag2001/PhotoSphere.git

# Change directory
cd PhotoSphere

# Install dependencies
npm install   # or `yarn install` if you use yarn

# Add your Pexels API key
# Create a `.env` file (or use Vite env variables) and add:
# VITE_PEXELS_API_KEY=your_api_key_here

# Run the development server
npm run dev   # or `yarn dev`

# Open http://localhost:3000 (or the port Vite uses) in your browser
