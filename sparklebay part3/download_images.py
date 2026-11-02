"""Run once:  python download_images.py
Saves the three photos with descriptive file names into /images (good for SEO and page speed).
The site still works without this because script.js falls back to the Unsplash copy."""
import os, urllib.request
FILES = {
    "mobile-car-wash-hero.jpg": "photo-1601362840469-51e4d8d58785",
    "car-wash-technician-driveway.jpg": "photo-1520340356584-f9917d1eea6f",
    "car-hand-wash-soapy-foam.jpg": "photo-1607860108855-64acf2078ed9",
}
os.makedirs("images", exist_ok=True)
for name, uid in FILES.items():
    url = f"https://images.unsplash.com/{uid}?auto=format&fit=crop&w=1400&q=60"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with open(os.path.join("images", name), "wb") as f:
        f.write(urllib.request.urlopen(req).read())
    print("saved", name)
