/* ===================================
   LUXURY HOTEL - FULLY DEBUGGED JAVASCRIPT
   =================================== */

(function () {
  "use strict";

  // ===================================
  // WAIT FOR FULL DOM LOAD
  // ===================================
  window.addEventListener("load", function () {
    console.log("🏨 Initializing Nuptial By Kanta Shrawan...");

    // ===================================
    // 1. STICKY NAVBAR WITH SCROLL EFFECT
    // ===================================
    const header = document.getElementById("header");

    function handleScroll() {
      if (window.pageYOffset > 50) {
        header?.classList.add("scrolled");
      } else {
        header?.classList.remove("scrolled");
      }
    }

    window.addEventListener("scroll", handleScroll);
    console.log("✓ Navbar scroll effect initialized");

    // ===================================
    // 2. MOBILE MENU TOGGLE
    // ===================================
    const mobileToggle = document.getElementById("mobileToggle");
    const navLinks = document.getElementById("navLinks");

    if (mobileToggle && navLinks) {
      // Toggle menu
      mobileToggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const isActive = navLinks.classList.contains("active");

        if (isActive) {
          mobileToggle.classList.remove("active");
          navLinks.classList.remove("active");
        } else {
          mobileToggle.classList.add("active");
          navLinks.classList.add("active");
        }

        console.log("Mobile menu toggled:", !isActive);
      });

      // Close menu when clicking any nav link
      const navLinksList = navLinks.querySelectorAll("a");
      navLinksList.forEach(function (link) {
        link.addEventListener("click", function () {
          mobileToggle.classList.remove("active");
          navLinks.classList.remove("active");
          console.log("Menu closed via link click");
        });
      });

      // Close menu when clicking outside
      document.addEventListener("click", function (e) {
        if (navLinks.classList.contains("active")) {
          if (
            !navLinks.contains(e.target) &&
            !mobileToggle.contains(e.target)
          ) {
            mobileToggle.classList.remove("active");
            navLinks.classList.remove("active");
            console.log("Menu closed via outside click");
          }
        }
      });

      console.log("✓ Mobile menu initialized");
    }

    // ===================================
    // 3. SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        // Skip empty anchors
        if (!href || href === "#") {
          e.preventDefault();
          return;
        }

        try {
          const target = document.querySelector(href);

          if (target) {
            e.preventDefault();

            const headerHeight = 80;
            const targetPosition =
              target.getBoundingClientRect().top +
              window.pageYOffset -
              headerHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });

            console.log("Scrolling to:", href);
          }
        } catch (error) {
          console.error("Scroll error:", error);
        }
      });
    });

    console.log("✓ Smooth scroll initialized for", anchorLinks.length, "links");

    // ===================================
    // 4. TESTIMONIAL SLIDER
    // ===================================
    const testimonials = document.querySelectorAll(".testimonial");
    const sliderBtns = document.querySelectorAll(".slider-btn");
    let currentSlide = 0;
    let autoSlideInterval = null;

    function showSlide(index) {
      // Hide all testimonials
      testimonials.forEach(function (testimonial) {
        testimonial.classList.remove("active");
      });

      // Deactivate all buttons
      sliderBtns.forEach(function (btn) {
        btn.classList.remove("active");
      });

      // Show current slide
      if (testimonials[index]) {
        testimonials[index].classList.add("active");
      }

      if (sliderBtns[index]) {
        sliderBtns[index].classList.add("active");
      }

      currentSlide = index;
      console.log("Showing testimonial slide:", index + 1);
    }

    function nextSlide() {
      const nextIndex = (currentSlide + 1) % testimonials.length;
      showSlide(nextIndex);
    }

    function startAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
      autoSlideInterval = setInterval(nextSlide, 5000);
      console.log("Auto-slide started");
    }

    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
        console.log("Auto-slide stopped");
      }
    }

    // Initialize testimonials
    if (testimonials.length > 0) {
      showSlide(0);
      startAutoSlide();

      // Add click handlers to slider buttons
      sliderBtns.forEach(function (btn, index) {
        btn.addEventListener("click", function () {
          stopAutoSlide();
          showSlide(index);
          startAutoSlide();
        });
      });

      // Pause on hover
      const sliderContainer = document.querySelector(".testimonials-slider");
      if (sliderContainer) {
        sliderContainer.addEventListener("mouseenter", function () {
          stopAutoSlide();
        });

        sliderContainer.addEventListener("mouseleave", function () {
          startAutoSlide();
        });
      }

      console.log(
        "✓ Testimonial slider initialized with",
        testimonials.length,
        "slides"
      );
    }

    // ===================================
    // 5. GALLERY MODAL
    // ===================================
    const modal = document.getElementById("galleryModal");
    const modalImage = document.getElementById("modalImage");
    const closeModalBtn = document.getElementById("closeModal");
    const galleryImages = document.querySelectorAll(".gallery-images img");

    function openModal(imageSrc, imageAlt) {
      if (modal && modalImage) {
        modal.style.display = "block";
        modalImage.src = imageSrc;
        modalImage.alt = imageAlt || "Gallery Image";
        document.body.style.overflow = "hidden";
        console.log("Modal opened:", imageSrc);
      }
    }

    function closeModal() {
      if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        console.log("Modal closed");
      }
    }

    // Click on gallery images to open modal
    galleryImages.forEach(function (img) {
      img.addEventListener("click", function () {
        openModal(this.src, this.alt);
      });
    });

    // Close button
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", function (e) {
        e.preventDefault();
        closeModal();
      });
    }

    // Click outside to close
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    // Escape key to close
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.keyCode === 27) {
        if (modal && modal.style.display === "block") {
          closeModal();
        }
      }
    });

    console.log(
      "✓ Gallery modal initialized for",
      galleryImages.length,
      "images"
    );

    // ===================================
    // 6. SCROLL TO TOP BUTTON
    // ===================================
    const scrollTopBtn = document.getElementById("scrollTop");

    function handleScrollTopButton() {
      if (scrollTopBtn) {
        if (window.pageYOffset > 500) {
          scrollTopBtn.classList.add("visible");
        } else {
          scrollTopBtn.classList.remove("visible");
        }
      }
    }

    window.addEventListener("scroll", handleScrollTopButton);

    if (scrollTopBtn) {
      scrollTopBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        console.log("Scrolling to top");
      });

      console.log("✓ Scroll-to-top button initialized");
    }

    // ===================================
    // 7. INFINITE SCROLL FOR HOME IMAGES
    // ===================================
    const homeImages = document.querySelector(".home-images");

    if (homeImages) {
      const originalImages = Array.from(homeImages.querySelectorAll("img"));

      // Clone all images to create seamless loop
      originalImages.forEach(function (img) {
        const clone = img.cloneNode(true);
        homeImages.appendChild(clone);
      });

      console.log(
        "✓ Home images cloned for infinite scroll (" +
          originalImages.length +
          " images duplicated)"
      );
    }

    // ===================================
    // 8. INTERSECTION OBSERVER FOR ANIMATIONS
    // ===================================
    if ("IntersectionObserver" in window) {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const fadeInObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      }, observerOptions);

      // Observe animated elements
      const animatedElements = document.querySelectorAll(
        ".feature-item, .amenity-card, .attraction-item, .contact-item"
      );

      animatedElements.forEach(function (el) {
        fadeInObserver.observe(el);
      });

      console.log(
        "✓ Intersection Observer initialized for",
        animatedElements.length,
        "elements"
      );
    }

    // ===================================
    // 9. PAUSE ANIMATIONS WHEN TAB HIDDEN
    // ===================================
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopAutoSlide();
        if (homeImages) {
          homeImages.style.animationPlayState = "paused";
        }
        console.log("Page hidden - animations paused");
      } else {
        if (testimonials.length > 0) {
          startAutoSlide();
        }
        if (homeImages) {
          homeImages.style.animationPlayState = "running";
        }
        console.log("Page visible - animations resumed");
      }
    });

    // ===================================
    // 10. FINAL SUCCESS MESSAGE
    // ===================================
    console.log(
      "%c✅ ALL FEATURES LOADED SUCCESSFULLY!",
      "color: #d4af37; font-size: 14px; font-weight: bold; padding: 5px;"
    );
    console.log(
      "%cNuptial By Kanta Shrawan - Luxury Hotels",
      "color: #8f0000; font-size: 12px;"
    );
  }); // End of window.load
})();

function openWhatsApp(room) {
  const phone = "919516321524";
  const message =
    ` Hi, I am contacting from your website, ` +
    `I would like to inquire about booking the ${room}. ` +
    `Please share availability, pricing details, check-in and check-out timings, ` +
    `amenities included, cancellation policy, and booking confirmation process.`;
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}
