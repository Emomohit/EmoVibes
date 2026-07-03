document.addEventListener("DOMContentLoaded", () => {
    // Scroll reveal animation
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    
    // Trigger once on load
    setTimeout(revealOnScroll, 100);

    // Fetch latest release from GitHub
    const REPO_URL = "https://api.github.com/repos/Emomohit/EmoVibe/releases/latest";
    const heroBtn = document.getElementById("hero-download-btn");
    const footerBtn = document.getElementById("footer-download-btn");
    const versionInfo = document.getElementById("latest-version-info");

    fetch(REPO_URL)
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            const latestVersion = data.tag_name;
            const assets = data.assets;
            
            let downloadUrl = data.html_url; // Fallback to release page

            // Find the universal APK asset
            const apkAsset = assets.find(asset => asset.name === "app-universal-release.apk");
            if (apkAsset) {
                downloadUrl = apkAsset.browser_download_url;
            }

            heroBtn.href = downloadUrl;
            footerBtn.href = downloadUrl;
            versionInfo.textContent = `Latest Release: ${latestVersion}`;
            
            // Update Open Source card version
            const osVersionText = document.getElementById("os-version-text");
            if (osVersionText) {
                osVersionText.textContent = latestVersion;
            }
        })
        .catch(error => {
            console.error("Error fetching release info:", error);
            versionInfo.textContent = "Check GitHub for the latest release.";
        });
});
