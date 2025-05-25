addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    // HTML content with modern Fluent UI design
    const html = `
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>个人主页 - lingbu</title>
    <!-- Fluent UI Icons -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/fluent-ui-icons/1.1.229/fluent-icons.min.css" rel="stylesheet">
    <!-- 现代字体 -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      :root {
        /* Fluent UI 2.0 颜色系统 */
        --brand-primary: #0F6CBD;
        --brand-primary-hover: #115EA3;
        --brand-primary-pressed: #0E4775;
        --brand-secondary: #E3F2FD;
        
        /* 背景色 */
        --background-primary: #FAFAFA;
        --background-secondary: #FFFFFF;
        --background-tertiary: #F5F5F5;
        --background-overlay: rgba(255, 255, 255, 0.85);
        
        /* 文字色 */
        --text-primary: #242424;
        --text-secondary: #616161;
        --text-tertiary: #9E9E9E;
        
        /* 边框色 */
        --border-subtle: #E0E0E0;
        --border-medium: #D1D1D1;
        
        /* 阴影 */
        --shadow-2: 0 1px 2px rgba(0, 0, 0, 0.05);
        --shadow-4: 0 2px 4px rgba(0, 0, 0, 0.08);
        --shadow-8: 0 4px 8px rgba(0, 0, 0, 0.12);
        --shadow-16: 0 8px 16px rgba(0, 0, 0, 0.14);
        
        /* 圆角 */
        --radius-small: 4px;
        --radius-medium: 8px;
        --radius-large: 12px;
        --radius-xl: 16px;
        
        /* 字体 */
        --font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;
        
        /* 动画 */
        --ease-out: cubic-bezier(0.33, 1, 0.68, 1);
        --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
      }
      
      * {
        box-sizing: border-box;
      }
      
      body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: var(--font-family);
        font-size: 14px;
        line-height: 1.5;
        color: var(--text-primary);
        background: var(--background-primary);
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      .app-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      
      /* 现代渐变背景 */
      .background-gradient {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
          rgba(15, 108, 189, 0.03) 0%, 
          rgba(99, 177, 247, 0.06) 25%,
          rgba(227, 242, 253, 0.08) 50%,
          rgba(15, 108, 189, 0.04) 75%,
          rgba(99, 177, 247, 0.02) 100%);
        z-index: -2;
      }
      
      /* 装饰性几何形状 */
      .decorative-shapes {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        overflow: hidden;
        pointer-events: none;
      }
      
      .shape {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(45deg, var(--brand-primary), var(--brand-secondary));
        opacity: 0.1;
        animation: float 6s ease-in-out infinite;
      }
      
      .shape:nth-child(1) {
        width: 200px;
        height: 200px;
        top: 10%;
        left: -5%;
        animation-delay: -2s;
      }
      
      .shape:nth-child(2) {
        width: 150px;
        height: 150px;
        top: 70%;
        right: -3%;
        animation-delay: -4s;
      }
      
      .shape:nth-child(3) {
        width: 100px;
        height: 100px;
        top: 40%;
        right: 20%;
        animation-delay: -1s;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      
      /* 主内容区域 */
      .main-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
        min-height: calc(100vh - 60px);
      }
      
      .content-wrapper {
        width: 100%;
        max-width: 800px;
        opacity: 0;
        animation: slideInUp 0.8s var(--ease-out) 0.2s forwards;
      }
      
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      /* 个人资料卡片 */
      .profile-card {
        background: var(--background-secondary);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-8);
        overflow: hidden;
        border: 1px solid var(--border-subtle);
        transition: all 0.4s var(--ease-out);
        position: relative;
      }
      
      .profile-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--brand-primary), #63B1F7);
      }
      
      .profile-card:hover {
        box-shadow: var(--shadow-16);
        transform: translateY(-8px);
      }
      
      .profile-card iframe {
        width: 100%;
        height: 400px;
        border: none;
        display: block;
      }
      
      /* 错误状态 */
      .error-container {
        display: none;
        padding: 2rem;
        text-align: center;
      }
      
      .error-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 1rem;
        background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
      }
      
      .error-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 0.5rem 0;
      }
      
      .error-message {
        color: var(--text-secondary);
        margin: 0 0 1.5rem 0;
      }
      
      .retry-button {
        background: var(--brand-primary);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius-medium);
        font-family: var(--font-family);
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s var(--ease-out);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .retry-button:hover {
        background: var(--brand-primary-hover);
        transform: translateY(-2px);
        box-shadow: var(--shadow-8);
      }
      
      .retry-button:active {
        background: var(--brand-primary-pressed);
        transform: translateY(0);
      }
      
      /* 音乐控制器 */
      .music-controller {
        position: fixed;
        top: 2rem;
        right: 2rem;
        z-index: 1000;
      }
      
      .music-button {
        width: 56px;
        height: 56px;
        background: var(--background-secondary);
        border: 1px solid var(--border-subtle);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s var(--ease-out);
        box-shadow: var(--shadow-4);
        backdrop-filter: blur(10px);
      }
      
      .music-button:hover {
        background: var(--brand-secondary);
        border-color: var(--brand-primary);
        box-shadow: var(--shadow-8);
        transform: scale(1.05);
      }
      
      .music-button:active {
        transform: scale(0.95);
      }
      
      .music-icon {
        font-size: 20px;
        color: var(--brand-primary);
        transition: all 0.3s var(--ease-out);
      }
      
      .music-button.playing .music-icon {
        animation: pulse 2s ease-in-out infinite;
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      
      /* 底部区域 */
      .footer {
        height: 60px;
        background: var(--background-overlay);
        backdrop-filter: blur(20px);
        border-top: 1px solid var(--border-subtle);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 100;
      }
      
      .footer-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: var(--radius-medium);
        text-decoration: none;
        color: var(--text-secondary);
        font-size: 13px;
        font-weight: 500;
        transition: all 0.3s var(--ease-out);
      }
      
      .footer-link:hover {
        background: var(--brand-secondary);
        color: var(--brand-primary);
        transform: translateY(-2px);
      }
      
      .footer-icon {
        font-size: 16px;
      }
      
      /* 加载状态 */
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--background-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        transition: all 0.5s var(--ease-out);
      }
      
      .loading-spinner {
        width: 48px;
        height: 48px;
        border: 3px solid var(--border-subtle);
        border-top: 3px solid var(--brand-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      /* 响应式设计 */
      @media (max-width: 768px) {
        .main-content {
          padding: 1rem;
        }
        
        .music-controller {
          top: 1rem;
          right: 1rem;
        }
        
        .music-button {
          width: 48px;
          height: 48px;
        }
        
        .music-icon {
          font-size: 18px;
        }
        
        .profile-card iframe {
          height: 350px;
        }
      }
      
      @media (max-width: 480px) {
        .content-wrapper {
          max-width: 100%;
        }
        
        .profile-card {
          border-radius: var(--radius-large);
        }
        
        .profile-card iframe {
          height: 300px;
        }
        
        .error-container {
          padding: 1.5rem;
        }
      }
      
      /* 高对比度模式支持 */
      @media (prefers-contrast: high) {
        :root {
          --border-subtle: #000000;
          --border-medium: #000000;
          --shadow-2: 0 1px 2px rgba(0, 0, 0, 0.3);
          --shadow-4: 0 2px 4px rgba(0, 0, 0, 0.4);
          --shadow-8: 0 4px 8px rgba(0, 0, 0, 0.5);
          --shadow-16: 0 8px 16px rgba(0, 0, 0, 0.6);
        }
      }
      
      /* 减少动画偏好 */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="app-container">
      <!-- 背景装饰 -->
      <div class="background-gradient"></div>
      <div class="decorative-shapes">
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      
      <!-- 加载覆盖层 -->
      <div class="loading-overlay" id="loadingOverlay">
        <div class="loading-spinner"></div>
      </div>
      
      <!-- 音乐控制器 -->
      <div class="music-controller">
        <div class="music-button" id="musicButton" title="播放/暂停音乐">
          <i class="fluent-icon music-icon" id="musicIcon">&#xE8D6;</i>
        </div>
      </div>
      
      <!-- 主内容 -->
      <main class="main-content">
        <div class="content-wrapper">
          <div class="profile-card">
            <iframe 
              src="/proxy/gravatar/lingbu.card" 
              id="profileFrame"
              title="个人资料卡片"
              loading="lazy">
            </iframe>
            
            <!-- 错误状态 -->
            <div class="error-container" id="errorContainer">
              <div class="error-icon">
                <i class="fluent-icon">&#xE783;</i>
              </div>
              <h3 class="error-title">加载失败</h3>
              <p class="error-message">无法加载个人资料卡片，请检查网络连接后重试。</p>
              <button class="retry-button" id="retryButton">
                <i class="fluent-icon">&#xE72C;</i>
                重新加载
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <!-- 底部区域 -->
      <footer class="footer">
        <a 
          href="https://icp.gov.moe/?keyword=20250789" 
          target="_blank" 
          class="footer-link"
          rel="noopener noreferrer">
          <i class="fluent-icon footer-icon">&#xE8AC;</i>
          萌ICP备20250789号
        </a>
      </footer>
      
      <!-- 背景音乐 -->
      <audio loop preload="none" id="backgroundMusic">
        <source src="https://music.163.com/song/media/outer/url?id=2099310789.mp3" type="audio/mpeg">
      </audio>
    </div>
    
    <script>
      class PersonalHomepage {
        constructor() {
          this.elements = {
            loadingOverlay: document.getElementById('loadingOverlay'),
            musicButton: document.getElementById('musicButton'),
            musicIcon: document.getElementById('musicIcon'),
            backgroundMusic: document.getElementById('backgroundMusic'),
            profileFrame: document.getElementById('profileFrame'),
            errorContainer: document.getElementById('errorContainer'),
            retryButton: document.getElementById('retryButton')
          };
          
          this.isPlaying = false;
          this.isLoaded = false;
          
          this.init();
        }
        
        init() {
          this.setupEventListeners();
          this.setupMusicAutoplay();
          this.setupFrameLoading();
        }
        
        setupEventListeners() {
          // 音乐控制
          this.elements.musicButton.addEventListener('click', () => {
            this.toggleMusic();
          });
          
          // 重试按钮
          this.elements.retryButton.addEventListener('click', () => {
            this.retryLoading();
          });
          
          // 框架加载事件
          this.elements.profileFrame.addEventListener('load', () => {
            this.handleFrameLoad();
          });
          
          this.elements.profileFrame.addEventListener('error', () => {
            this.handleFrameError();
          });
        }
        
        setupMusicAutoplay() {
          // 尝试自动播放
          const playPromise = this.elements.backgroundMusic.play();
          
          if (playPromise !== undefined) {
            playPromise.then(() => {
              this.setMusicPlaying(true);
            }).catch(() => {
              // 自动播放被阻止，等待用户交互
              this.waitForUserInteraction();
            });
          }
        }
        
        waitForUserInteraction() {
          const handleFirstInteraction = () => {
            if (!this.isPlaying) {
              this.elements.backgroundMusic.play()
                .then(() => {
                  this.setMusicPlaying(true);
                })
                .catch(() => {});
            }
            
            // 移除事件监听器
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
          };
          
          document.addEventListener('click', handleFirstInteraction, { passive: true });
          document.addEventListener('keydown', handleFirstInteraction, { passive: true });
          document.addEventListener('touchstart', handleFirstInteraction, { passive: true });
        }
        
        toggleMusic() {
          if (this.isPlaying) {
            this.elements.backgroundMusic.pause();
            this.setMusicPlaying(false);
          } else {
            this.elements.backgroundMusic.play()
              .then(() => {
                this.setMusicPlaying(true);
              })
              .catch((error) => {
                console.warn('音乐播放失败:', error);
              });
          }
        }
        
        setMusicPlaying(playing) {
          this.isPlaying = playing;
          
          if (playing) {
            this.elements.musicIcon.innerHTML = '&#xE769;'; // Pause icon
            this.elements.musicButton.classList.add('playing');
            this.elements.musicButton.title = '暂停音乐';
          } else {
            this.elements.musicIcon.innerHTML = '&#xE8D6;'; // Play icon
            this.elements.musicButton.classList.remove('playing');
            this.elements.musicButton.title = '播放音乐';
          }
        }
        
        setupFrameLoading() {
          // 设置超时处理
          setTimeout(() => {
            if (!this.isLoaded) {
              this.hideLoading();
            }
          }, 8000);
        }
        
        handleFrameLoad() {
          setTimeout(() => {
            this.isLoaded = true;
            this.hideLoading();
          }, 800);
        }
        
        handleFrameError() {
          this.showError();
        }
        
        hideLoading() {
          this.elements.loadingOverlay.style.opacity = '0';
          setTimeout(() => {
            this.elements.loadingOverlay.style.display = 'none';
          }, 500);
        }
        
        showLoading() {
          this.elements.loadingOverlay.style.display = 'flex';
          this.elements.loadingOverlay.style.opacity = '1';
        }
        
        showError() {
          this.hideLoading();
          this.elements.errorContainer.style.display = 'block';
          this.elements.profileFrame.style.display = 'none';
        }
        
        hideError() {
          this.elements.errorContainer.style.display = 'none';
          this.elements.profileFrame.style.display = 'block';
        }
        
        retryLoading() {
          this.hideError();
          this.showLoading();
          this.isLoaded = false;
          
          // 添加时间戳避免缓存
          const timestamp = new Date().getTime();
          this.elements.profileFrame.src = \`/proxy/gravatar/lingbu.card?t=\${timestamp}\`;
        }
      }
      
      // 页面加载完成后初始化
      document.addEventListener('DOMContentLoaded', () => {
        try {
          new PersonalHomepage();
        } catch (error) {
          console.error('初始化失败:', error);
        }
      });
    </script>
  </body>
  </html>
    `;
  
    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  }