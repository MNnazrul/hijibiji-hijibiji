import os
import sys
import subprocess
import urllib.request

def ensure_pip():
    try:
        import pip
        print("✅ pip is already installed.")
    except ImportError:
        print("⚠️ pip not found. Downloading get-pip.py...")
        url = "https://bootstrap.pypa.io/get-pip.py"
        get_pip = "get-pip.py"
        urllib.request.urlretrieve(url, get_pip)
        subprocess.check_call([sys.executable, get_pip])
        os.remove(get_pip)
        print("✅ pip has been installed.")

def ensure_yt_dlp():
    try:
        import yt_dlp
        print("✅ yt-dlp is already installed.")
    except ImportError:
        print("⚠️ yt-dlp not found. Installing via pip...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "--user", "yt-dlp"])
        import yt_dlp  # Try again
    return yt_dlp

def download_video(url):
    import yt_dlp
    ydl_opts = {
        'format': 'bestvideo[height>=720]+bestaudio/best / best',
        'merge_output_format': 'mp4',
        'outtmpl': '%(title)s.%(ext)s',
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

if __name__ == '__main__':
    ensure_pip()
    yt_dlp = ensure_yt_dlp()

    url = input("Enter the YouTube video URL: ").strip()
    if not url:
        print("❌ No URL entered.")
        sys.exit(1)

    try:
        download_video(url)
    except Exception as e:
        print("❌ Error while downloading:", str(e))
